import { useState } from 'react'
import Icon from '../components/ui/Icon'
import './ScreenSwitcher.css'

const SCREENS = [
  { path: '/', label: 'Trang chủ Enterprise', icon: 'home', hash: '#/' },
  { path: '/dashboard', label: 'Dashboard điều hành', icon: 'dashboard', hash: '#/dashboard' },
  {
    path: '/dashboard/thong-bao',
    label: 'Dashboard + Thông báo',
    icon: 'notifications',
    hash: '#/dashboard/thong-bao',
  },
  { path: '/du-an', label: 'Workspace dự án', icon: 'domain', hash: '#/du-an/NT-2024-001' },
  { path: '/ca-nhan', label: 'Trang chủ cá nhân', icon: 'account_circle', hash: '#/ca-nhan' },
]

/**
 * Bảng chuyển màn hình — chỉ phục vụ giai đoạn review giao diện.
 * Xoá component này (và lời gọi trong App.tsx) khi lên production.
 */
export default function ScreenSwitcher({ current }: { current: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`screen-switcher${open ? ' is-open' : ''}`}>
      {open && (
        <ul className="screen-switcher__list">
          <li className="screen-switcher__title">Màn hình mẫu</li>
          {SCREENS.map((s) => {
            const active =
              s.path === '/'
                ? current === '/' || current === ''
                : current.startsWith(s.path)
            return (
              <li key={s.path}>
                <a
                  href={s.hash}
                  className={active ? 'is-active' : ''}
                  onClick={() => setOpen(false)}
                >
                  <Icon name={s.icon} size={18} />
                  {s.label}
                </a>
              </li>
            )
          })}
        </ul>
      )}

      <button
        className="screen-switcher__fab"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Chuyển màn hình mẫu"
      >
        <Icon name={open ? 'close' : 'grid_view'} size={20} />
      </button>
    </div>
  )
}
