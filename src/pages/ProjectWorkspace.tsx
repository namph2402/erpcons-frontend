import { useState } from 'react'
import { AppLayout, PageHeader } from '../components/layout'
import {
  Avatar,
  Badge,
  Button,
  Card,
  Icon,
  StatCard,
  Tabs,
} from '../components/ui'
import {
  ActivityFeed,
  DocumentList,
  GanttChart,
  NotificationDrawer,
  TaskList,
} from '../components/widgets'
import {
  currentUser,
  ganttColumns,
  ganttTasks,
  myTasks,
  notifications,
  projectActivities,
  projectDocuments,
  projects,
} from '../data/mock'
import type { TaskItem } from '../types'
import { appNav, projectTabs } from '../data/navigation'
import './pages.css'

const RISKS = [
  {
    id: 'r1',
    level: 'Cao',
    tone: 'danger' as const,
    title: 'Rủi ro chậm tiến độ do mưa kéo dài',
    date: '21/05/2024',
  },
  {
    id: 'r2',
    level: 'Trung bình',
    tone: 'warning' as const,
    title: 'Biến động giá thép',
    date: '20/05/2024',
  },
  {
    id: 'r3',
    level: 'Thấp',
    tone: 'success' as const,
    title: 'Thiếu hụt nhân lực kỹ thuật',
    date: '18/05/2024',
  },
]

const FORECAST = [
  { day: 'T2', icon: 'sunny', temp: '32°/26°' },
  { day: 'T3', icon: 'sunny', temp: '33°/27°' },
  { day: 'T4', icon: 'partly_cloudy_day', temp: '33°/27°' },
  { day: 'T5', icon: 'rainy', temp: '31°/26°' },
  { day: 'T6', icon: 'rainy', temp: '30°/25°' },
]

const MEMBERS = [
  'Nguyễn Văn A',
  'Đỗ Thành Trung',
  'Lê Hải Đăng',
  'Phạm Quang Huy',
  'Nguyễn Hoàng Nam',
  'Vũ Thị Hương',
]

/** View 04 — Workspace chi tiết dự án (03.3 · Project Workspace) */
export default function ProjectWorkspace() {
  const [tab, setTab] = useState('overview')
  const [view, setView] = useState<'gantt' | 'list'>('gantt')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [tasks, setTasks] = useState<TaskItem[]>(myTasks.slice(0, 4))

  const project = projects[0]

  const toggleTask = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  return (
    <AppLayout
      navGroups={appNav}
      activeId="projects"
      user={currentUser}
      notificationCount={12}
      searchPlaceholder="Tìm kiếm nhanh (Dự án, Công việc, Tài liệu, Hợp đồng...)"
      topbarLeading={
        <button className="context-switcher" type="button">
          Dự án
          <Icon name="expand_more" size={18} />
        </button>
      }
      topbarActions={
        <Button variant="primary" icon="add">
          Tạo mới
        </Button>
      }
      drawerOpen={drawerOpen}
      onOpenDrawer={() => setDrawerOpen(true)}
      onCloseDrawer={() => setDrawerOpen(false)}
      drawer={
        <NotificationDrawer items={notifications} onClose={() => setDrawerOpen(false)} />
      }
      sidebarExtra={
        <div className="sidenav__extra">
          <p className="sidenav__extra-title">Dự án gần đây</p>
          {projects.slice(0, 3).map((p, i) => (
            <a
              key={p.id}
              className={`sidenav__project${i === 0 ? ' is-active' : ''}`}
              href={`#/du-an/${p.code}`}
            >
              <span className="sidenav__project-thumb">
                <Icon name="apartment" size={16} />
              </span>
              <span className="truncate">
                <span className="sidenav__project-name truncate">{p.name}</span>
                <br />
                <span className="sidenav__project-code">{p.code}</span>
              </span>
            </a>
          ))}
          <a className="sidenav__extra-link" href="#/du-an">
            Xem tất cả dự án
          </a>
        </div>
      }
    >
      <div className="page">
        <PageHeader
          thumbnail={<Icon name="apartment" size={28} />}
          title={project.name}
          status={
            <Badge tone="success" dot size="md">
              Đang triển khai
            </Badge>
          }
          code={project.code}
          subtitle={
            <>
              <span>Chung cư cao tầng</span>
              <span className="page-header__dot">•</span>
              <span>{project.location}</span>
            </>
          }
          actions={
            <>
              <Button icon="share" size="md">
                Chia sẻ
              </Button>
              <Button icon="star" size="md">
                Theo dõi
              </Button>
              <Button iconOnly icon="more_horiz" aria-label="Thao tác khác" />
            </>
          }
          tabs={<Tabs items={projectTabs} value={tab} onChange={setTab} />}
        />

        <div className="stat-row">
          <StatCard
            label="Tiến độ tổng thể"
            value="71%"
            icon="speed"
            tone="info"
            progress={71}
            trend={{ direction: 'up', value: '+ 8%', label: 'so với kế hoạch' }}
          />
          <StatCard
            label="Giá trị hợp đồng (GTV)"
            value="450.0"
            unit="tỷ VND"
            icon="request_quote"
            tone="success"
            hint="Đã nghiệm thu: 320.5 tỷ (71%)"
          />
          <StatCard
            label="Chi phí đã phát sinh"
            value="283.7"
            unit="tỷ VND"
            icon="payments"
            tone="warning"
            hint="62.97% / 450.0 tỷ"
          />
          <StatCard
            label="Dự báo hoàn thành"
            value="15/12/2025"
            icon="event_available"
            tone="ai"
            hint={<span style={{ color: 'var(--danger)' }}>Trễ 15 ngày</span>}
          />
          <StatCard
            label="Rủi ro cao"
            value="3"
            icon="crisis_alert"
            tone="danger"
            hint={<a className="card__link" href="#/du-an/rui-ro">Xem chi tiết</a>}
          />
          <StatCard
            label="Yêu cầu thay đổi"
            value="12"
            icon="published_with_changes"
            tone="neutral"
            hint={<a className="card__link" href="#/du-an/thay-doi">Chờ phê duyệt</a>}
          />
        </div>

        <div className="grid-main-aside">
          <Card
            title="Tiến độ dự án"
            action={
              <div className="row">
                <Tabs
                  variant="pill"
                  value={view}
                  onChange={(v) => setView(v as 'gantt' | 'list')}
                  items={[
                    { id: 'gantt', label: 'Gantt' },
                    { id: 'list', label: 'Danh sách' },
                  ]}
                />
                <Button iconOnly icon="calendar_month" size="sm" aria-label="Chọn khoảng thời gian" />
                <Button iconOnly icon="fullscreen" size="sm" aria-label="Toàn màn hình" />
              </div>
            }
          >
            {view === 'gantt' ? (
              <>
                <GanttChart
                  tasks={ganttTasks}
                  columns={ganttColumns}
                  periodLabel="Tháng 5, 2024"
                  todayIndex={7}
                />
                <ul className="gantt-legend">
                  <li>
                    <i className="is-done" />
                    Hoàn thành
                  </li>
                  <li>
                    <i className="is-doing" />
                    Đang thực hiện
                  </li>
                  <li>
                    <i className="is-plan" />
                    Kế hoạch
                  </li>
                  <li>
                    <i className="is-milestone" />
                    Mốc
                  </li>
                  <li>
                    <i className="is-today" />
                    Hôm nay
                  </li>
                </ul>
              </>
            ) : (
              <div className="progress-list">
                {ganttTasks
                  .filter((t) => t.level === 0)
                  .map((t) => (
                    <div className="progress-list__row" key={t.id}>
                      <span className="truncate">{t.name}</span>
                      <span className="text-caption">
                        {t.tone === 'done' ? 'Hoàn thành' : 'Đang thực hiện'}
                      </span>
                      <span className="progress-list__value num">{t.progress}%</span>
                    </div>
                  ))}
              </div>
            )}
          </Card>

          <div className="col-stack">
            <Card title="Hoạt động gần đây" link={{ label: 'Xem tất cả' }}>
              <ActivityFeed items={projectActivities} />
              <Button block variant="secondary" size="sm" style={{ marginTop: 'var(--sp-4)' }}>
                Xem tất cả hoạt động
              </Button>
            </Card>

            <Card title="Thời tiết công trường" subtitle={`📍 ${project.location}`}>
              <div className="weather-now">
                <div className="weather-now__temp">
                  <Icon name="sunny" size={40} filled color="var(--warning)" />
                  <div>
                    <p className="weather-now__value num">32°C</p>
                    <p className="weather-now__desc">Nắng nhẹ</p>
                  </div>
                </div>
                <div className="weather-meta">
                  <span className="weather-meta__row">
                    <Icon name="humidity_percentage" size={18} />
                    Độ ẩm <strong>65%</strong>
                  </span>
                  <span className="weather-meta__row">
                    <Icon name="air" size={18} />
                    Gió <strong>10 km/h</strong>
                  </span>
                  <span className="weather-meta__row">
                    <Icon name="rainy" size={18} />
                    Mưa <strong>0 mm</strong>
                  </span>
                </div>
              </div>

              <div className="weather-forecast">
                {FORECAST.map((f) => (
                  <div key={f.day}>
                    <p className="weather-forecast__day">{f.day}</p>
                    <Icon name={f.icon} size={24} className="weather-forecast__icon" />
                    <p className="weather-forecast__temp num">{f.temp}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card title={`Thành viên dự án (${24})`} link={{ label: 'Xem tất cả' }}>
              <div className="members__avatars">
                {MEMBERS.map((m) => (
                  <Avatar key={m} name={m} size={36} />
                ))}
                <span className="avatar-group__more" style={{ width: 36, height: 36, marginLeft: 0 }}>
                  +18
                </span>
              </div>
              <div className="members__roles">
                <span className="member-role">
                  <Icon name="badge" size={16} /> 6 PM
                </span>
                <span className="member-role">
                  <Icon name="engineering" size={16} /> Kỹ sư
                </span>
                <span className="member-role">
                  <Icon name="visibility" size={16} /> Giám sát
                </span>
                <span className="member-role">
                  <Icon name="handyman" size={16} /> Nhà thầu
                </span>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid-3">
          <Card title="Công việc của tôi" link={{ label: 'Xem tất cả' }}>
            <TaskList tasks={tasks} onToggle={toggleTask} />
          </Card>

          <Card title="Tài liệu mới cập nhật" link={{ label: 'Xem tất cả' }}>
            <DocumentList items={projectDocuments} />
          </Card>

          <Card title="Các rủi ro cần theo dõi" link={{ label: 'Xem tất cả' }}>
            <div className="risk-list">
              {RISKS.map((r) => (
                <div className="risk" key={r.id}>
                  <Badge tone={r.tone} size="md">
                    {r.level}
                  </Badge>
                  <div className="risk__body">
                    <p className="risk__title">{r.title}</p>
                    <p className="risk__meta">Ngày cập nhật: {r.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
