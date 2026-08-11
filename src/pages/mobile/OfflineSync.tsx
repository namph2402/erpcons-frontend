import { useState } from 'react'
import { MobileShell } from '../../components/mobile'
import { GaugeChart, Icon } from '../../components/ui'
import { mainNav, personalFooterNav } from '../../data/navigation'
import { currentUser } from '../../data/mock'
import './mobile.css'

const SYNC_ITEMS = [
  { id: 's1', label: 'Dữ liệu công việc', done: 120, total: 120 },
  { id: 's2', label: 'Tài liệu & hình ảnh', done: 48, total: 62 },
  { id: 's3', label: 'Biểu mẫu', done: 18, total: 18 },
  { id: 's4', label: 'Ghi chú', done: 32, total: 32 },
  { id: 's5', label: 'Dữ liệu khác', done: 6, total: 6 },
]

/** 62 · Offline Sync — đồng bộ dữ liệu khi offline/online */
export default function OfflineSync() {
  const [offline, setOffline] = useState(true)

  const totalDone = SYNC_ITEMS.reduce((s, i) => s + i.done, 0)
  const totalAll = SYNC_ITEMS.reduce((s, i) => s + i.total, 0)
  const percent = Math.round((totalDone / totalAll) * 100)

  return (
    <MobileShell
      user={currentUser}
      navGroups={mainNav}
      drawerFooterItems={personalFooterNav}
      navActiveId="more"
      hideNavBar
      header={{
        variant: 'page',
        title: 'Đồng bộ dữ liệu',
        onBack: () => window.history.back(),
        actions: (
          <button className="mheader__icon-btn" type="button" aria-label="Cài đặt đồng bộ">
            <Icon name="settings" size={24} />
          </button>
        ),
      }}
    >
      <div className="m-sync-hero">
        <GaugeChart
          value={percent}
          max={100}
          variant="ring"
          size={190}
          thickness={14}
          color="var(--success)"
          label={
            <span className="row" style={{ justifyContent: 'center', gap: 4 }}>
              <Icon name="cloud_done" size={18} color="var(--success)" />
              Đang đồng bộ...
            </span>
          }
          formatValue={(v) => `${v}%`}
        />
      </div>

      <section className="m-card">
        <div className="m-card__head">
          <h2 className="m-card__title">Trạng thái đồng bộ</h2>
        </div>
        {SYNC_ITEMS.map((item) => {
          const complete = item.done === item.total
          return (
            <div className="m-sync-row" key={item.id}>
              <span className="m-sync-row__label">{item.label}</span>
              <span className="m-sync-row__count num">
                {item.done}/{item.total}
              </span>
              <Icon
                name={complete ? 'check_circle' : 'progress_activity'}
                size={20}
                filled={complete}
                className={`m-sync-row__state--${complete ? 'done' : 'busy'}`}
              />
            </div>
          )
        })}
      </section>

      <section className="m-card">
        <div className="m-card__head">
          <h2 className="m-card__title">Chế độ hoạt động</h2>
        </div>
        <div className="m-toggle-row">
          <span className="m-toggle-row__icon">
            <Icon name="cloud_off" size={20} />
          </span>
          <div className="m-toggle-row__body">
            <p className="m-toggle-row__label">Chế độ offline</p>
            <p className="m-toggle-row__sub">
              {offline ? 'Bạn đang làm việc offline' : 'Đang kết nối máy chủ'}
            </p>
          </div>
          <label className="m-switch">
            <input
              type="checkbox"
              checked={offline}
              onChange={(e) => setOffline(e.target.checked)}
              aria-label="Bật chế độ offline"
            />
            <span className="m-switch__track" />
          </label>
        </div>
      </section>

      <p className="text-caption" style={{ textAlign: 'center' }}>
        Cập nhật cuối: 09:30 31/05/2024
      </p>
    </MobileShell>
  )
}
