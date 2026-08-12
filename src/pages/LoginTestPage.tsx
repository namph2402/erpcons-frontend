import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { login, logout, me, type SessionUser } from '../api/client'

/**
 * BÀN THỬ ĐĂNG NHẬP — `#/test-api/dang-nhap`
 *
 * Kiểm chứng riêng luồng xác thực trước khi ghép vào giao diện thật. Cố ý dùng
 * HTML thuần + style nội tuyến để lỗi (nếu có) chắc chắn nằm ở API/cookie chứ
 * không phải ở component UI.
 *
 * Ba thứ cần nhìn thấy để tin là luồng đúng:
 *   1. POST /api/v1/login trả {ok, csrfToken, user}  → mật khẩu đúng.
 *   2. GET  /api/v1/me sau khi F5 vẫn trả user       → cookie phiên được giữ.
 *   3. Một endpoint có phân quyền trả 200            → phiên thật sự dùng được.
 *
 * PHẢI chạy qua `npm run dev`: vite.config.ts proxy /api, /session, /user sang
 * Drupal để cùng origin. Gọi thẳng erpcons.localhost từ cổng 5173 là cross-site,
 * trình duyệt sẽ không gửi cookie và bạn luôn nhận 401.
 */

interface LogEntry {
  id: number
  at: string
  label: string
  ok: boolean
  status?: number
  detail: unknown
}

export default function LoginTestPage() {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [creds, setCreds] = useState({ name: '', pass: '' })
  const [busy, setBusy] = useState(false)
  const [log, setLog] = useState<LogEntry[]>([])
  const seq = useRef(0)

  const push = (label: string, ok: boolean, detail: unknown, status?: number) =>
    setLog((prev) => [
      { id: ++seq.current, at: new Date().toLocaleTimeString('vi-VN'), label, ok, status, detail },
      ...prev,
    ])

  const run = async <T,>(label: string, fn: () => Promise<T>): Promise<T | null> => {
    setBusy(true)
    try {
      const res = await fn()
      push(label, true, res)
      return res
    } catch (e) {
      const err = e as Error & { status?: number; errors?: Record<string, string> }
      push(label, false, { message: err.message, errors: err.errors }, err.status)
      return null
    } finally {
      setBusy(false)
    }
  }

  /* Khôi phục phiên khi tải trang — cookie là HttpOnly nên JS không đọc được,
     bắt buộc phải hỏi server mới biết đang đăng nhập hay chưa. */
  useEffect(() => {
    void run('GET /api/v1/me (khôi phục phiên)', me).then((u) => setUser(u ?? null))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const doLogin = () =>
    run('POST /api/v1/login', () => login(creds.name, creds.pass)).then(
      (u) => u && setUser(u),
    )

  const doLogout = () =>
    run('POST /api/v1/logout', logout).then(() => setUser(null))

  const doMe = () => run('GET /api/v1/me', me).then((u) => setUser(u ?? null))

  /** Gọi một endpoint CÓ phân quyền để chứng minh phiên dùng được thật. */
  const doProtected = () =>
    run('GET /api/v1/employees?limit=1 (cần role)', async () => {
      const res = await fetch('/api/v1/employees?limit=1', {
        credentials: 'include',
        headers: { Accept: 'application/json' },
      })
      const body = await res.json().catch(() => null)
      if (!res.ok) {
        throw Object.assign(new Error(body?.message ?? `HTTP ${res.status}`), {
          status: res.status,
        })
      }
      return { httpStatus: res.status, total: body?.pager?.total, first: body?.items?.[0] }
    })

  /** Sai mật khẩu phải ra 401 kèm thông điệp gộp, KHÔNG lộ tài khoản có tồn tại. */
  const doWrongPass = () =>
    run('POST /api/v1/login — mật khẩu sai (chờ 401)', () =>
      login(creds.name || 'khong-ton-tai', 'mat-khau-sai-co-y'),
    )

  /** Thiếu trường phải ra 400 kèm errors theo từng ô. */
  const doMissingField = () =>
    run('POST /api/v1/login — thiếu mật khẩu (chờ 400)', async () => {
      const res = await fetch('/api/v1/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: creds.name || 'ai-do' }),
      })
      const body = await res.json()
      if (!res.ok) throw Object.assign(new Error(body?.message), { status: res.status, errors: body?.errors })
      return body
    })

  /** Ghi mà thiếu CSRF token phải bị chặn 403. */
  const doNoCsrf = () =>
    run('PATCH /api/v1/me — cố tình KHÔNG gửi CSRF (chờ 403)', async () => {
      const res = await fetch('/api/v1/me', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: '0900000000' }),
      })
      const body = await res.json().catch(() => null)
      if (!res.ok) throw Object.assign(new Error(body?.message), { status: res.status })
      return body
    })

  return (
    <div style={S.page}>
      <div style={S.wrap}>
        {/* ------------------------------ TRÁI ------------------------------ */}
        <section style={S.card}>
          <h2 style={S.h2}>Bàn thử đăng nhập</h2>

          <div style={{ ...S.state, background: user ? '#f0fdf4' : '#fef2f2' }}>
            {user ? (
              <>
                <strong>Đang đăng nhập</strong>
                <div style={S.muted}>
                  {user.name} · uid {user.id} · {user.email}
                </div>
                <div style={S.muted}>Role: {user.roles.join(', ')}</div>
                <div style={S.muted}>
                  Tổ chức: {user.company?.label ?? '—'} · Phòng ban: {user.department?.label ?? '—'}
                </div>
              </>
            ) : (
              <strong>Chưa đăng nhập</strong>
            )}
          </div>

          <label style={S.label}>Tên đăng nhập</label>
          <input
            style={S.input}
            value={creds.name}
            autoComplete="username"
            onChange={(e) => setCreds({ ...creds, name: e.target.value })}
          />

          <label style={S.label}>Mật khẩu</label>
          <input
            style={S.input}
            type="password"
            autoComplete="current-password"
            value={creds.pass}
            onChange={(e) => setCreds({ ...creds, pass: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && void doLogin()}
          />

          <button style={S.primary} disabled={busy} onClick={() => void doLogin()}>
            {busy ? 'Đang gửi…' : 'Đăng nhập'}
          </button>

          <h3 style={S.h3}>Kiểm tra phiên</h3>
          <div style={S.btnRow}>
            <button style={S.ghost} disabled={busy} onClick={() => void doMe()}>
              GET /me
            </button>
            <button style={S.ghost} disabled={busy} onClick={() => void doProtected()}>
              Gọi endpoint có phân quyền
            </button>
            <button style={S.ghost} disabled={busy} onClick={() => void doLogout()}>
              Đăng xuất
            </button>
            <button style={S.ghost} onClick={() => window.location.reload()}>
              F5 (thử giữ phiên)
            </button>
          </div>

          <h3 style={S.h3}>Các ca lỗi — phải fail đúng kiểu</h3>
          <div style={S.btnRow}>
            <button style={S.ghost} disabled={busy} onClick={() => void doWrongPass()}>
              Mật khẩu sai → 401
            </button>
            <button style={S.ghost} disabled={busy} onClick={() => void doMissingField()}>
              Thiếu mật khẩu → 400
            </button>
            <button style={S.ghost} disabled={busy} onClick={() => void doNoCsrf()}>
              Ghi thiếu CSRF → 403
            </button>
          </div>

          <p style={{ ...S.muted, marginTop: 14 }}>
            Lưu ý: đăng nhập sai nhiều lần sẽ bị flood control của Drupal khoá tạm (mã 429).
            Đó là hành vi đúng, không phải lỗi API.
          </p>
        </section>

        {/* ------------------------------ PHẢI ------------------------------ */}
        <section style={S.card}>
          <h2 style={S.h2}>
            Nhật ký request
            <button style={{ ...S.ghost, marginLeft: 8 }} onClick={() => setLog([])}>
              Xoá
            </button>
          </h2>
          {!log.length && <p style={S.muted}>Chưa có request nào.</p>}
          {log.map((e) => (
            <details key={e.id} style={S.item} open={e.id === seq.current}>
              <summary>
                <span style={{ color: e.ok ? '#16a34a' : '#dc2626', fontWeight: 700 }}>
                  {e.ok ? '✓' : '✕'}
                </span>{' '}
                <code>{e.label}</code>{' '}
                {e.status ? <span style={S.badge}>HTTP {e.status}</span> : null}{' '}
                <span style={S.muted}>{e.at}</span>
              </summary>
              <pre style={S.pre}>{JSON.stringify(e.detail, null, 2)}</pre>
            </details>
          ))}
        </section>
      </div>
    </div>
  )
}

const S: Record<string, CSSProperties> = {
  page: { font: '14px/1.5 system-ui, sans-serif', background: '#f6f7f9', minHeight: '100vh', padding: 24 },
  wrap: { display: 'grid', gridTemplateColumns: 'minmax(320px, 460px) minmax(320px, 1fr)', gap: 20, alignItems: 'start', maxWidth: 1200, margin: '0 auto' },
  card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 20 },
  h2: { fontSize: 16, margin: '0 0 14px', display: 'flex', alignItems: 'center' },
  h3: { fontSize: 13, margin: '20px 0 8px', color: '#374151' },
  state: { border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, marginBottom: 16 },
  label: { display: 'block', fontSize: 12, color: '#374151', marginTop: 10, marginBottom: 4 },
  input: { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: 6, font: 'inherit', boxSizing: 'border-box' },
  primary: { marginTop: 16, width: '100%', padding: '10px 12px', border: 0, borderRadius: 6, background: '#2563eb', color: '#fff', font: 'inherit', cursor: 'pointer' },
  ghost: { padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: 6, background: '#fff', font: 'inherit', cursor: 'pointer' },
  btnRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  muted: { color: '#6b7280', fontSize: 12 },
  badge: { fontSize: 11, padding: '1px 6px', borderRadius: 4, background: '#f1f5f9', color: '#334155' },
  item: { padding: '8px 0', borderTop: '1px solid #f1f5f9' },
  pre: { background: '#0f172a', color: '#e2e8f0', padding: 10, borderRadius: 6, fontSize: 11, overflow: 'auto', maxHeight: 300 },
}
