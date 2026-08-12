/**
 * Lớp gọi API Drupal — xác thực bằng Cookie/Session + CSRF.
 *
 * KHÔNG dùng JWT/Bearer: site ERPCons bật oauth2_server, provider `oauth2` của
 * nó chạy trước `cookie` và nuốt mọi header Authorization, request sẽ bị chặn
 * trước khi tới controller.
 *
 * Hai điều bắt buộc, thiếu là hỏng:
 *  1. `credentials: 'include'` ở MỌI request (kể cả GET) — nếu không trình
 *     duyệt không gửi cookie phiên và Drupal coi là khách (401). Postman tự gửi
 *     cookie nên lỗi này chỉ lộ ra khi chạy trong trình duyệt.
 *  2. Header `X-CSRF-Token` cho POST/PATCH/DELETE. GET thì không cần —
 *     CsrfRequestHeaderAccessCheck bỏ qua hoàn toàn các method chỉ đọc.
 */

/** Để rỗng nếu React chạy chung origin với Drupal (khuyến nghị: reverse proxy). */
export const API_BASE = import.meta.env.VITE_API_BASE ?? ''

export interface ApiError extends Error {
  status: number
  /** Lỗi theo từng trường, khớp tên trường mà form gửi lên. */
  errors?: Record<string, string>
}

let csrfToken: string | null = null

/**
 * Được gọi khi BẤT KỲ request nào trả 401.
 *
 * Phiên Drupal có thể hết hạn giữa chừng, hoặc người dùng đăng xuất ở tab khác.
 * Không có móc này thì ứng dụng vẫn hiện giao diện chính nhưng mọi thao tác đều
 * lỗi — người dùng không hiểu vì sao. AuthProvider đăng ký vào đây để chuyển
 * ngay về trang đăng nhập.
 */
let onUnauthorized: (() => void) | null = null

export function setUnauthorizedHandler(fn: (() => void) | null) {
  onUnauthorized = fn
}

const buildError = (status: number, message: string, errors?: Record<string, string>): ApiError =>
  Object.assign(new Error(message), { status, errors }) as ApiError

/** Lấy CSRF token của phiên hiện tại. Cùng seed với endpoint đăng nhập. */
async function fetchCsrfToken(): Promise<string> {
  const res = await fetch(`${API_BASE}/session/token`, { credentials: 'include' })
  if (!res.ok) throw buildError(res.status, 'Không lấy được CSRF token.')
  return res.text()
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: unknown
  /** Nội bộ: đánh dấu đã thử làm mới token, tránh lặp vô hạn. */
  retried?: boolean
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, retried = false } = options
  const isWrite = method !== 'GET'

  if (isWrite && !csrfToken) csrfToken = await fetchCsrfToken()

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(isWrite && csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  // 403 trên request ghi thường là token cũ (người dùng đăng nhập lại ở tab
  // khác nên phiên đổi). Làm mới token và thử lại đúng MỘT lần; nếu vẫn 403 thì
  // đó là thiếu quyền thật.
  if (res.status === 403 && isWrite && !retried) {
    csrfToken = await fetchCsrfToken()
    return apiRequest<T>(path, { ...options, retried: true })
  }

  const data = await res.json().catch(() => null)

  if (!res.ok || !data?.ok) {
    // 401 = chưa đăng nhập / phiên hết hạn. Báo cho AuthProvider TRƯỚC khi ném
    // lỗi, để giao diện quay về trang đăng nhập ngay cả khi nơi gọi quên bắt.
    // Bỏ qua chính /api/v1/me: nó vốn được dùng để DÒ trạng thái, gọi handler ở
    // đó sẽ thành đệ quy.
    if (res.status === 401 && !path.startsWith('/api/v1/me')) {
      onUnauthorized?.()
    }

    throw buildError(
      res.status,
      data?.message ?? `Lỗi HTTP ${res.status}`,
      data?.errors as Record<string, string> | undefined,
    )
  }

  return data as T
}

/* ------------------------------- Phiên ---------------------------------- */

/** Khớp đúng khối `user` mà GET /api/v1/me và POST /api/v1/login trả về. */
export interface SessionUser {
  id: number
  name: string
  email: string
  roles: string[]
  /** field_user_telephone */
  phone: string | null
  /** field_user_work_position — chức danh do HR nhập */
  workPosition: string | null
  company: { id: number; label: string } | null
  department: { id: number; label: string } | null
}

export async function login(name: string, pass: string) {
  const res = await fetch(`${API_BASE}/api/v1/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, pass }),
  })
  const data = await res.json().catch(() => null)
  if (!res.ok || !data?.ok) {
    throw buildError(res.status, data?.message ?? 'Đăng nhập thất bại.', data?.errors)
  }
  // Endpoint đăng nhập trả sẵn token — khỏi gọi thêm /session/token.
  csrfToken = data.csrfToken
  return data.user as SessionUser
}

export async function logout() {
  await apiRequest('/api/v1/logout', { method: 'POST' })
  csrfToken = null
}

/** Ai đang đăng nhập; trả null nếu chưa. Dùng để khôi phục phiên sau khi F5. */
export async function me(): Promise<SessionUser | null> {
  const data = await apiRequest<{ authenticated: boolean; csrfToken?: string; user: SessionUser | null }>(
    '/api/v1/me',
  )
  if (data.csrfToken) csrfToken = data.csrfToken
  return data.authenticated ? data.user : null
}
