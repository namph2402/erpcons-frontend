import { useState, type FormEvent } from 'react'
import Logo from '../components/brand/Logo'
import Button from '../components/ui/Button'
import Field, { TextInput } from '../components/ui/Field'
import Icon from '../components/ui/Icon'
import { useAuth } from '../auth/AuthContext'
import './LoginPage.css'

/**
 * Trang đăng nhập chính thức.
 *
 * Không phải bàn thử — không có nút gọi thử API, không in nhật ký. Người dùng
 * chỉ thấy form; lỗi hiển thị bằng ngôn ngữ nghiệp vụ.
 *
 * Xác thực bằng cookie phiên của Drupal (xem src/api/client.ts). Trang này chỉ
 * gọi `signIn` của AuthProvider rồi để App tự chuyển sang giao diện chính.
 */

const POINTS = [
  'Quản trị dự án, tác vụ và tiến độ trên một nền tảng',
  'Số liệu tài chính, nhân sự, vật tư luôn nhất quán',
  'Phân quyền theo vai trò và sơ đồ tổ chức',
]

export default function LoginPage() {
  const { signIn } = useAuth()

  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [busy, setBusy] = useState(false)
  const [alert, setAlert] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (busy) return

    setAlert(null)
    setFieldErrors({})

    // Kiểm tra tại chỗ trước để khỏi tốn một lượt gọi mạng — và quan trọng hơn:
    // mỗi lần gọi sai đều bị flood control của Drupal ghi nhận.
    const local: Record<string, string> = {}
    if (!name.trim()) local.name = 'Vui lòng nhập tên đăng nhập.'
    if (!pass) local.pass = 'Vui lòng nhập mật khẩu.'
    if (Object.keys(local).length) {
      setFieldErrors(local)
      return
    }

    setBusy(true)
    try {
      await signIn(name.trim(), pass)
      // Không cần điều hướng: App thấy status = 'authed' sẽ tự dựng lại giao diện.
    } catch (e) {
      const err = e as Error & { status?: number; errors?: Record<string, string> }

      if (err.errors) setFieldErrors(err.errors)

      // 429 = flood control của Drupal. Nói rõ để người dùng khỏi bấm thêm cho
      // đến khi bị khoá lâu hơn.
      setAlert(
        err.status === 429
          ? err.message || 'Bạn đã đăng nhập sai quá nhiều lần. Vui lòng thử lại sau.'
          : err.message || 'Không đăng nhập được. Vui lòng thử lại.',
      )
      setPass('')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="login">
      <aside className="login__brand" aria-hidden="true">
        <div className="login__brand-top">
          <Logo variant="horizontal" onDark size={40} />
        </div>

        <div className="login__brand-body">
          <p className="login__tagline">Phần mềm quản trị doanh nghiệp xây dựng</p>
          <p className="login__sub">
            Nền tảng hợp nhất dữ liệu dự án, tài chính và nhân sự cho toàn hệ thống ERPCons.
          </p>
          <ul className="login__points">
            {POINTS.map((p) => (
              <li key={p}>
                <Icon name="check_circle" size={18} />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="login__brand-foot">© ERPCons. All rights reserved.</div>
      </aside>

      <main className="login__panel">
        <form className="login__form" onSubmit={submit} noValidate>
          <div className="login__mobile-logo">
            <Logo variant="horizontal" size={36} />
          </div>

          <h1 className="login__title">Đăng nhập</h1>
          <p className="login__hint">Sử dụng tài khoản nội bộ được cấp để tiếp tục.</p>

          {alert && (
            <div className="login__alert" role="alert">
              <Icon name="error" size={18} />
              <span>{alert}</span>
            </div>
          )}

          <Field
            label="Tên đăng nhập"
            required
            htmlFor="login-name"
            error={fieldErrors.name}
          >
            <TextInput
              id="login-name"
              name="username"
              autoComplete="username"
              autoFocus
              value={name}
              placeholder="Tên tài khoản hoặc email"
              onChange={(e) => setName(e.target.value)}
            />
          </Field>

          <Field label="Mật khẩu" required htmlFor="login-pass" error={fieldErrors.pass}>
            <span className="login__pass-wrap">
              <TextInput
                id="login-pass"
                name="password"
                type={showPass ? 'text' : 'password'}
                autoComplete="current-password"
                value={pass}
                placeholder="Nhập mật khẩu"
                onChange={(e) => setPass(e.target.value)}
              />
              <button
                type="button"
                className="login__eye"
                aria-label={showPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                onClick={() => setShowPass((v) => !v)}
              >
                <Icon name={showPass ? 'visibility_off' : 'visibility'} size={18} />
              </button>
            </span>
          </Field>

          <div className="login__row">
            <span />
            <a className="login__link" href="/user/password">
              Quên mật khẩu?
            </a>
          </div>

          <Button type="submit" variant="primary" block disabled={busy}>
            {busy ? 'Đang đăng nhập…' : 'Đăng nhập'}
          </Button>

          <p className="login__foot">
            Gặp sự cố đăng nhập? Liên hệ bộ phận IT để được hỗ trợ.
          </p>
        </form>
      </main>
    </div>
  )
}

/** Màn hình chờ trong lúc kiểm tra phiên — tránh nháy form đăng nhập khi F5. */
export function AuthSplash() {
  return (
    <div className="login-splash">
      <div className="login-splash__inner">
        <Logo variant="horizontal" size={38} />
        <span className="login-splash__spinner" aria-hidden="true" />
        <span>Đang kiểm tra phiên đăng nhập…</span>
      </div>
    </div>
  )
}
