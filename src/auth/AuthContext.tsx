import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  login as apiLogin,
  logout as apiLogout,
  me,
  setUnauthorizedHandler,
  type SessionUser,
} from '../api/client'

/**
 * Trạng thái phiên dùng chung cho cả ứng dụng.
 *
 * VÌ SAO PHẢI HỎI SERVER: cookie phiên là `HttpOnly`, JavaScript KHÔNG đọc được
 * — đó chính là điểm mạnh của cơ chế này (XSS không lấy được phiên). Hệ quả là
 * sau mỗi lần tải trang, cách duy nhất để biết đã đăng nhập hay chưa là gọi
 * GET /api/v1/me. Đừng lưu cờ "đã đăng nhập" vào localStorage: nó sẽ lệch với
 * thực tế khi phiên hết hạn phía server và người dùng thấy màn hình trắng.
 *
 * `status`:
 *   checking — đang gọi /me lần đầu, chưa biết gì. Phải hiện splash, KHÔNG
 *              được hiện trang đăng nhập ở bước này, nếu không người đã đăng
 *              nhập sẽ thấy form login nhấp nháy mỗi lần F5.
 *   authed   — có phiên hợp lệ.
 *   anon     — chưa đăng nhập hoặc phiên đã hết hạn.
 */
export type AuthStatus = 'checking' | 'authed' | 'anon'

interface AuthContextValue {
  status: AuthStatus
  user: SessionUser | null
  signIn: (name: string, pass: string) => Promise<void>
  signOut: () => Promise<void>
  /** Gọi lại /me — dùng khi nghi ngờ phiên đã đổi ở tab khác. */
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('checking')
  const [user, setUser] = useState<SessionUser | null>(null)

  const refresh = useCallback(async () => {
    try {
      const u = await me()
      setUser(u)
      setStatus(u ? 'authed' : 'anon')
    } catch {
      // /me lỗi mạng hoặc server chết — coi như chưa đăng nhập để người dùng
      // còn thấy form mà thử lại, thay vì kẹt mãi ở splash.
      setUser(null)
      setStatus('anon')
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  /* Bất kỳ request nào trả 401 (phiên hết hạn, đăng xuất ở tab khác) đều đẩy
     ứng dụng về trạng thái chưa đăng nhập → App tự hiện trang đăng nhập. */
  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null)
      setStatus('anon')
    })

    return () => setUnauthorizedHandler(null)
  }, [])

  const signIn = useCallback(async (name: string, pass: string) => {
    // Lỗi được ném lên cho trang đăng nhập hiển thị; không nuốt ở đây.
    const u = await apiLogin(name, pass)
    setUser(u)
    setStatus('authed')
  }, [])

  const signOut = useCallback(async () => {
    try {
      await apiLogout()
    } finally {
      // Dù server trả lỗi thì phía client vẫn phải về trạng thái chưa đăng
      // nhập — giữ nguyên màn hình cũ sau khi bấm Đăng xuất là sai nghiêm trọng.
      setUser(null)
      setStatus('anon')
    }
  }, [])

  const value = useMemo(
    () => ({ status, user, signIn, signOut, refresh }),
    [status, user, signIn, signOut, refresh],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth phải nằm trong <AuthProvider>')
  return ctx
}
