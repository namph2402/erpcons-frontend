import { useState } from 'react'
import Icon from '../components/ui/Icon'
import './ScreenSwitcher.css'

interface ScreenGroup {
  title: string
  screens: { path: string; label: string; icon: string; hash: string }[]
}

const GROUPS: ScreenGroup[] = [
  {
    title: 'Vận hành',
    screens: [
      { path: '/', label: 'Trang chủ Enterprise', icon: 'home', hash: '#/' },
      { path: '/dashboard/thong-bao', label: 'Dashboard + Thông báo', icon: 'notifications', hash: '#/dashboard/thong-bao' },
      { path: '/dashboard', label: 'Dashboard điều hành', icon: 'space_dashboard', hash: '#/dashboard' },
      { path: '/du-an', label: 'Workspace dự án', icon: 'domain', hash: '#/du-an/NT-2024-001' },
      { path: '/ca-nhan', label: 'Trang chủ cá nhân', icon: 'account_circle', hash: '#/ca-nhan' },
    ],
  },
  {
    title: 'Dashboard 54–60',
    screens: [
      { path: '/dashboard/executive', label: '54 · Executive', icon: 'insights', hash: '#/dashboard/executive' },
      { path: '/dashboard/project', label: '55 · Project', icon: 'dashboard', hash: '#/dashboard/project' },
      { path: '/dashboard/finance', label: '56 · Finance', icon: 'payments', hash: '#/dashboard/finance' },
      { path: '/dashboard/construction', label: '57 · Construction', icon: 'engineering', hash: '#/dashboard/construction' },
      { path: '/dashboard/ai-insight', label: '58 · AI Insight', icon: 'auto_awesome', hash: '#/dashboard/ai-insight' },
      { path: '/dashboard/iot', label: '59 · IoT', icon: 'sensors', hash: '#/dashboard/iot' },
      { path: '/dashboard/knowledge-graph', label: '60 · Knowledge Graph', icon: 'hub', hash: '#/dashboard/knowledge-graph' },
    ],
  },
  {
    title: 'Mobile 61–65',
    screens: [
      { path: '/mobile', label: '61 · Mobile Home', icon: 'smartphone', hash: '#/mobile' },
      { path: '/mobile/dong-bo', label: '62 · Offline Sync', icon: 'cloud_sync', hash: '#/mobile/dong-bo' },
      { path: '/mobile/qr', label: '63 · QR Scanner', icon: 'qr_code_scanner', hash: '#/mobile/qr' },
      { path: '/mobile/camera-ai', label: '64 · Camera AI', icon: 'videocam', hash: '#/mobile/camera-ai' },
      { path: '/mobile/bao-cao', label: '65 · Field Report', icon: 'edit_note', hash: '#/mobile/bao-cao' },
    ],
  },
]

/**
 * Bảng chuyển màn hình — chỉ phục vụ giai đoạn review giao diện.
 * Xoá component này (và lời gọi trong App.tsx) khi lên production.
 */
export default function ScreenSwitcher({ current }: { current: string }) {
  const [open, setOpen] = useState(false)

  /** Các route là tiền tố của route khác → chỉ active khi khớp tuyệt đối */
  const EXACT = ['/', '/dashboard', '/mobile']

  const isActive = (path: string) => {
    if (path === '/') return current === '/' || current === ''
    if (EXACT.includes(path)) return current === path
    return current.startsWith(path)
  }

  return (
    <div className={`screen-switcher${open ? ' is-open' : ''}`}>
      {open && (
        <div className="screen-switcher__panel scroll-y">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <p className="screen-switcher__title">{g.title}</p>
              <ul>
                {g.screens.map((s) => (
                  <li key={s.path}>
                    <a
                      href={s.hash}
                      className={isActive(s.path) ? 'is-active' : ''}
                      onClick={() => setOpen(false)}
                    >
                      <Icon name={s.icon} size={18} />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
