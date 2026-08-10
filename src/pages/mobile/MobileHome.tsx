import { MobileShell } from '../../components/mobile'
import { Avatar, Badge, Icon, ProgressBar } from '../../components/ui'
import { mainNav } from '../../data/navigation'
import { personalFooterNav } from '../../data/navigation'
import { currentUser } from '../../data/mock'
import './mobile.css'

const TILES = [
  { id: 'todo', value: 12, label: 'Việc cần làm', tone: 'info' as const, icon: 'assignment' },
  { id: 'pending', value: 5, label: 'Chờ xử lý', tone: 'info' as const, icon: 'hourglass_top' },
  { id: 'unread', value: 23, label: 'Chưa đọc', tone: 'warning' as const, icon: 'mark_email_unread' },
  { id: 'today', value: 7, label: 'Hôm nay', tone: 'success' as const, icon: 'event' },
]

const PROJECTS = [
  { id: 'p1', name: 'The Nexus Tower', progress: 68, tone: 'info' as const },
  { id: 'p2', name: 'Sunshine Residence', progress: 42, tone: 'warning' as const },
  { id: 'p3', name: 'Factory Expansion', progress: 25, tone: 'danger' as const },
]

const TASKS = [
  {
    id: 't1',
    title: 'Kiểm tra bản vẽ kết cấu tầng 12',
    context: 'The Nexus Tower',
    due: 'Hôm nay',
    tone: 'danger' as const,
    icon: 'engineering',
  },
  {
    id: 't2',
    title: 'Nghiệm thu cốt thép dầm D20',
    context: 'Sunshine Residence',
    due: 'Mai',
    tone: 'default' as const,
    icon: 'verified',
  },
  {
    id: 't3',
    title: 'Báo cáo an toàn tuần 21',
    context: 'Factory Expansion',
    due: '20/05',
    tone: 'success' as const,
    icon: 'health_and_safety',
  },
]

/** 61 · Mobile Home — màn hình trang chủ mobile */
export default function MobileHome() {
  return (
    <MobileShell
      user={currentUser}
      navGroups={mainNav}
      menuActiveId="home"
      drawerFooterItems={personalFooterNav}
      navActiveId="home"
      header={{ variant: 'home', notificationCount: 12 }}
      fab={{ icon: 'add', label: 'Tạo nhanh' }}
    >
      <div className="m-greet">
        <Avatar name={currentUser.name} size={40} status="online" />
        <div className="truncate">
          <p className="m-greet__name truncate">Xin chào, {currentUser.name}</p>
          <p className="m-greet__sub truncate">Chúc bạn một ngày làm việc hiệu quả!</p>
        </div>
      </div>

      <section className="m-card">
        <div className="m-card__head">
          <h2 className="m-card__title">Tổng quan hôm nay</h2>
          <span className="m-card__meta">Cập nhật 09:41</span>
        </div>
        <div className="m-tiles">
          {TILES.map((t) => (
            <button key={t.id} type="button" className={`m-tile m-tile--${t.tone}`}>
              <Icon name={t.icon} size={18} />
              <span className="m-tile__value num">{t.value}</span>
              <span className="m-tile__label">{t.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="m-card">
        <div className="m-card__head">
          <h2 className="m-card__title">Dự án đang theo dõi</h2>
          <a className="m-card__link" href="#/du-an">
            Xem tất cả
          </a>
        </div>
        {PROJECTS.map((p) => (
          <div className="m-project" key={p.id}>
            <span className="m-project__thumb">
              <Icon name="apartment" size={20} />
            </span>
            <div className="m-project__body">
              <p className="m-project__name truncate">{p.name}</p>
              <div className="m-project__row">
                <span className="m-project__label">Tiến độ</span>
                <ProgressBar value={p.progress} tone={p.tone} size="sm" showValue />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="m-card">
        <div className="m-card__head">
          <h2 className="m-card__title">Công việc của tôi</h2>
          <a className="m-card__link" href="#/cong-viec">
            Xem tất cả
          </a>
        </div>
        {TASKS.map((t) => (
          <div className="m-task" key={t.id}>
            <span className="m-task__icon">
              <Icon name={t.icon} size={18} />
            </span>
            <div className="m-task__body">
              <p className="m-task__title truncate">{t.title}</p>
              <p className="m-task__context truncate">{t.context}</p>
            </div>
            <Badge tone={t.tone}>{t.due}</Badge>
          </div>
        ))}
      </section>
    </MobileShell>
  )
}
