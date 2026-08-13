import { useState } from 'react'
import { AppLayout } from '../components/layout'
import {
  Badge,
  Card,
  DonutChart,
  ProgressBar,
  Select,
  StatCard,
} from '../components/ui'
import {
  AiCopilotPanel,
  AlertList,
  NotificationDrawer,
  QuickAccess,
  TaskList,
  WelcomeBanner,
} from '../components/widgets'
import {
  enterpriseUser,
  notifications,
  projectProgress,
  todayTasks,
} from '../data/mock'
import type { TaskItem } from '../types'
import { appNav } from '../data/navigation'
import LogoutButton from '../auth/LogoutButton'
import { useUiUser } from '../auth/useUiUser'
import './pages.css'

const BUDGET_SPLIT = [
  { label: 'Vật tư', value: 42, color: 'var(--chart-4)' },
  { label: 'Nhân công', value: 28, color: 'var(--chart-1)' },
  { label: 'Thiết bị', value: 15, color: 'var(--chart-2)' },
  { label: 'Khác', value: 15, color: 'var(--chart-5)' },
]

const PARTNERS = [
  { id: 'c1', name: 'LPC Construction', share: 33 },
  { id: 'c2', name: 'Hòa Bình Group', share: 22 },
  { id: 'c3', name: 'Unicons', share: 18 },
  { id: 'c4', name: 'Ricons', share: 15 },
  { id: 'c5', name: 'Newtecnic', share: 12 },
]

const ALERTS = [
  { id: 'al1', title: 'NCR mới được tạo – GreenCity', time: '5 phút trước', icon: 'error', tone: 'danger' as const },
  { id: 'al2', title: 'Chi phí vượt ngân sách – HCM', time: '1 giờ trước', icon: 'warning', tone: 'warning' as const },
  { id: 'al3', title: '3 yêu cầu phê duyệt đang chờ', time: '2 giờ trước', icon: 'info', tone: 'info' as const },
  { id: 'al4', title: 'Cập nhật tiến độ – LPC Tower', time: '3 giờ trước', icon: 'info', tone: 'info' as const },
]

const QUICK_ACTIONS = [
  { id: 'q1', label: 'Tạo dự án', icon: 'add_box' },
  { id: 'q2', label: 'Tạo công việc', icon: 'post_add' },
  { id: 'q3', label: 'Upload tài liệu', icon: 'upload' },
  { id: 'q4', label: 'Quản lý ngân sách', icon: 'account_balance_wallet' },
  { id: 'q5', label: 'Báo cáo', icon: 'bar_chart' },
  { id: 'q6', label: 'Lên lịch họp', icon: 'event' },
]

const AI_SUGGESTIONS = [
  { id: 's1', label: 'Tóm tắt tiến độ các dự án', icon: 'summarize' },
  { id: 's2', label: 'Phân tích rủi ro dự án', icon: 'warning' },
  { id: 's3', label: 'Tìm tài liệu gần đây', icon: 'folder_open' },
  { id: 's4', label: 'Ghi nhớ cuộc họp hôm nay', icon: 'event_note' },
]

/** View 01 — Trang chủ Enterprise (banner chào mừng + tổng quan toàn công ty) */
export default function HomeEnterprise() {
  const sessionUser = useUiUser()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [tasks, setTasks] = useState<TaskItem[]>(todayTasks)

  const toggleTask = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )

  return (
    <AppLayout
      navGroups={appNav}
      activeId="home"
      // Tài khoản thật từ phiên; còn `enterpriseUser` chỉ là mock dự phòng cho
      // lúc chạy giao diện mà chưa có backend.
      user={sessionUser ?? enterpriseUser}
      topbarActions={<LogoutButton />}
      notificationCount={12}
      drawerOpen={drawerOpen}
      onOpenDrawer={() => setDrawerOpen(true)}
      onCloseDrawer={() => setDrawerOpen(false)}
      drawer={
        <NotificationDrawer
          items={notifications}
          onClose={() => setDrawerOpen(false)}
        />
      }
      footer={
        <div className="page-footer">
          <span>© 2026 ERPCons Construction OS. All rights reserved.</span>
          <div className="page-footer__links">
            <span>Chính xác bảo mật</span>
            <span>Hiệu quả vượt trội</span>
            <span>Hợp tác toàn diện</span>
          </div>
          <a className="page-footer__brand" href="#/">
            ERPCons.com
          </a>
        </div>
      }
    >
      <div className="page">
        <WelcomeBanner
          name={enterpriseUser.name}
          weather={{ temperature: '32°C', condition: 'Nắng nhẹ', location: 'Hà Nội, Việt Nam' }}
          date={{ weekday: 'Thứ Hai', full: '26/05/2026', time: '08:45 AM' }}
        />

        <div className="stat-row">
          <StatCard
            label="Dự án đang hoạt động"
            value="12"
            icon="domain"
            tone="info"
            trend={{ direction: 'up', value: '+2', label: 'so với tuần trước' }}
          />
          <StatCard
            label="Tổng ngân sách dự án"
            value="8,240"
            unit="tỷ VND"
            icon="donut_small"
            tone="ai"
            trend={{ direction: 'up', value: '+6.5%', label: 'so với tháng trước' }}
          />
          <StatCard
            label="Tỷ lệ hoàn thành TB"
            value="67%"
            icon="auto_awesome"
            tone="warning"
            progress={67}
            trend={{ direction: 'up', value: '+4.2%' }}
          />
          <StatCard
            label="Vấn đề đang xử lý"
            value="48"
            icon="report"
            tone="danger"
            trend={{ direction: 'down', value: '-12%', label: 'so với tuần trước' }}
          />
          <StatCard
            label="Chứng từ chờ phê duyệt"
            value="23"
            icon="fact_check"
            tone="warning"
            trend={{ direction: 'up', value: '+8%', label: 'so với tuần trước' }}
          />
        </div>

        <div className="grid-1-1-1.2">
          <Card
            title="Tiến độ dự án"
            action={
              <Select
                size="sm"
                variant="soft"
                defaultValue="7d"
                options={[
                  { value: '7d', label: '7 ngày gần nhất' },
                  { value: '30d', label: '30 ngày gần nhất' },
                  { value: 'q', label: 'Quý này' },
                ]}
              />
            }
          >
            <div className="progress-list">
              <div className="progress-list__head">
                <span>Dự án</span>
                <span>Tiến độ</span>
                <span />
              </div>
              {projectProgress.map((p) => (
                <div className="progress-list__row" key={p.id}>
                  <span className="truncate">{p.name}</span>
                  <ProgressBar value={p.progress} size="md" />
                  <span className="progress-list__value num">{p.progress}%</span>
                </div>
              ))}
            </div>
          </Card>

          <Card
            title="Công việc hôm nay"
            link={{ label: `Xem tất cả (${tasks.length + 8})` }}
          >
            <TaskList tasks={tasks} onToggle={toggleTask} variant="schedule" />
          </Card>

          <AiCopilotPanel suggestions={AI_SUGGESTIONS} />
        </div>

        <div className="grid-3">
          <Card title="Cảnh báo & Thông báo" link={{ label: 'Xem tất cả', onClick: () => setDrawerOpen(true) }}>
            <AlertList items={ALERTS} />
          </Card>

          <Card title="Phân bổ ngân sách">
            <DonutChart
              data={BUDGET_SPLIT}
              size={150}
              thickness={26}
              centerValue="8,240"
              centerLabel="tỷ VND"
            />
          </Card>

          <Card title="Top 5 nhà thầu / đối tác" link={{ label: 'Xem tất cả' }}>
            <div className="rank-list">
              {PARTNERS.map((c) => (
                <div className="rank-list__row" key={c.id}>
                  <span className="truncate">{c.name}</span>
                  <ProgressBar value={c.share} size="md" />
                  <span className="progress-list__value num">{c.share}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card title="Truy cập nhanh" action={<Badge tone="default">6 lối tắt</Badge>}>
          <QuickAccess actions={QUICK_ACTIONS} />
        </Card>
      </div>
    </AppLayout>
  )
}
