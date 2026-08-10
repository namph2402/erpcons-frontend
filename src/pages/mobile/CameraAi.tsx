import { useState } from 'react'
import { MobileShell } from '../../components/mobile'
import { Icon } from '../../components/ui'
import { currentUser } from '../../data/mock'
import { appFooterNav, appNav } from '../../data/navigation'
import './mobile.css'

const FILTERS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'safety', label: 'An toàn' },
  { id: 'equipment', label: 'Thiết bị' },
  { id: 'worker', label: 'Công nhân' },
]

/** Khung nhận diện AI — toạ độ theo % khung hình */
const DETECTIONS = [
  { id: 'd1', label: 'Mũ bảo hộ', score: 98, tone: 'ok' as const, x: 52, y: 22, w: 22, h: 26 },
  { id: 'd2', label: 'Áo phản quang', score: 97, tone: 'ok' as const, x: 12, y: 34, w: 24, h: 30 },
  { id: 'd3', label: 'Không đeo mũ', score: 89, tone: 'alert' as const, x: 68, y: 40, w: 24, h: 32 },
]

/** 64 · Camera AI — nhận diện AI từ camera */
export default function CameraAi() {
  const [filter, setFilter] = useState('all')

  const visible =
    filter === 'safety'
      ? DETECTIONS.filter((d) => d.tone === 'alert')
      : DETECTIONS

  return (
    <MobileShell
      user={currentUser}
      navGroups={appNav}
      drawerFooterItems={appFooterNav}
      navActiveId="more"
      hideNavBar
      fullBleed
      header={{
        variant: 'page',
        title: 'Camera AI',
        onBack: () => window.history.back(),
        actions: (
          <button className="mheader__icon-btn" type="button" aria-label="Cài đặt camera">
            <Icon name="settings" size={24} />
          </button>
        ),
        below: (
          <div className="m-chips">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`m-chip${f.id === filter ? ' is-active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        ),
      }}
    >
      <div className="m-camera">
        {visible.map((d) => (
          <div
            key={d.id}
            className={`m-camera__box m-camera__box--${d.tone}`}
            style={{ left: `${d.x}%`, top: `${d.y}%`, width: `${d.w}%`, height: `${d.h}%` }}
          >
            <span className="m-camera__tag">
              {d.label} <span className="num">{d.score}%</span>
            </span>
          </div>
        ))}

        <div className="m-camera__panel">
          <p className="m-camera__panel-title">Phân tích AI thời gian thực</p>
          <div className="m-camera__stats">
            <div>
              <p className="m-camera__stat-label">Công nhân</p>
              <p className="m-camera__stat-value num">23</p>
            </div>
            <div>
              <p className="m-camera__stat-label">An toàn</p>
              <p className="m-camera__stat-value num" style={{ color: 'var(--success)' }}>
                18
              </p>
              <p className="m-camera__stat-note m-camera__stat-note--ok">+ Tốt</p>
            </div>
            <div>
              <p className="m-camera__stat-label">Vi phạm</p>
              <p className="m-camera__stat-value num" style={{ color: 'var(--danger)' }}>
                2
              </p>
              <p className="m-camera__stat-note m-camera__stat-note--alert">▲ Cảnh báo</p>
            </div>
          </div>
        </div>
      </div>

      <div className="m-camera__actions">
        <button className="m-camera__action" type="button">
          <Icon name="photo_camera" size={24} />
          Chụp ảnh
        </button>
        <button className="m-camera__action m-camera__action--main" type="button">
          <Icon name="videocam" size={24} />
          Ghi hình
        </button>
        <button className="m-camera__action" type="button">
          <Icon name="collections" size={24} />
          Thư viện
        </button>
      </div>
    </MobileShell>
  )
}
