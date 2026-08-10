import { useMemo, useState } from "react";
import { AppLayout } from "../components/layout";
import {
  Avatar,
  Badge,
  Button,
  Card,
  DonutChart,
  Icon,
  ProgressBar,
  SearchInput,
  Select,
  Tabs,
} from "../components/ui";
import {
  AlertList,
  DocumentList,
  MiniCalendar,
  NotificationDrawer,
  ProfileCard,
  QuickAccess,
  ScheduleTimeline,
  TaskList,
} from "../components/widgets";
import { personalFooterNav, personalNav } from "../data/navigation";
import {
  notifications,
  personalDocuments,
  personalMeetings,
  personalTasks,
  personalUser,
} from "../data/mock";
import type { TaskItem } from "../types";
import "./pages.css";

const LEAVE_SPLIT = [
  { label: "Đã dùng", value: 11.5, color: "var(--success)", note: "11.5 ngày" },
  { label: "Đã duyệt", value: 0.001, color: "var(--info)", note: "0 ngày" },
  { label: "Chờ duyệt", value: 0.001, color: "var(--warning)", note: "0 ngày" },
  { label: "Còn lại", value: 8.5, color: "var(--slate-200)", note: "8.5 ngày" },
];

const GOALS = [
  {
    id: "g1",
    title: "Hoàn thành 95% công việc đúng hạn",
    value: "75%",
    progress: 75,
    tone: "success" as const,
    due: "Hạn: 30/06/2024",
    icon: "target",
  },
  {
    id: "g2",
    title: "Nâng cao kỹ năng UI/UX",
    value: "60%",
    progress: 60,
    tone: "info" as const,
    due: "Hạn: 30/06/2024",
    icon: "workspace_premium",
  },
  {
    id: "g3",
    title: "Đóng góp 2 sáng kiến cải tiến",
    value: "1 / 2",
    progress: 50,
    tone: "warning" as const,
    due: "Hạn: 31/12/2024",
    icon: "lightbulb",
  },
];

const BIRTHDAYS = [
  { id: "b1", name: "Trần Minh Đức", dept: "Phòng Thiết kế", date: "23/05" },
  { id: "b2", name: "Lê Hải Đăng", dept: "Phòng Phát triển", date: "25/05" },
  { id: "b3", name: "Phạm Quang Huy", dept: "Phòng QA", date: "27/05" },
];

const CONTACTS = ["Đức", "Huy", "Đăng", "Nam", "Hương"];

const PERSONAL_ALERTS = [
  {
    id: "pa1",
    title: 'Công việc "Thiết kế giao diện Trang chủ" đã quá hạn',
    time: "2 giờ trước",
    icon: "error",
    tone: "danger" as const,
  },
  {
    id: "pa2",
    title: "Đơn xin nghỉ phép ngày 24/05 đã được duyệt",
    time: "4 giờ trước",
    icon: "task_alt",
    tone: "success" as const,
  },
  {
    id: "pa3",
    title: "Bảng lương tháng 05/2024 đã sẵn sàng",
    time: "1 ngày trước",
    icon: "payments",
    tone: "info" as const,
  },
  {
    id: "pa4",
    title: 'Training "Design System v2.0" vào 24/05',
    time: "1 ngày trước",
    icon: "school",
    tone: "info" as const,
  },
];

const SHORTCUTS = [
  { id: "sc1", label: "Tạo yêu cầu", icon: "add_task" },
  { id: "sc2", label: "Đặt lịch họp", icon: "event" },
  { id: "sc3", label: "Xin nghỉ phép", icon: "beach_access" },
  { id: "sc4", label: "Check-in", icon: "fingerprint" },
];

/** View 05 — Trang chủ cá nhân (Employee Self-Service) */
export default function PersonalHome() {
  const [taskTab, setTaskTab] = useState("all");
  const [tasks, setTasks] = useState<TaskItem[]>(personalTasks);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleTask = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );

  const filteredTasks = useMemo(() => {
    if (taskTab === "doing")
      return tasks.filter((t) => !t.done && t.state !== "overdue");
    if (taskTab === "overdue")
      return tasks.filter((t) => t.state === "overdue");
    if (taskTab === "done") return tasks.filter((t) => t.done);
    return tasks;
  }, [tasks, taskTab]);

  return (
    <AppLayout
      navGroups={personalNav}
      sidebarFooterItems={personalFooterNav}
      activeId="home"
      user={personalUser}
      notificationCount={12}
      searchPlaceholder="Tìm kiếm (Công việc, tài liệu, đồng nghiệp...)"
      drawerOpen={drawerOpen}
      onOpenDrawer={() => setDrawerOpen(true)}
      onCloseDrawer={() => setDrawerOpen(false)}
      drawer={
        <NotificationDrawer
          items={notifications}
          onClose={() => setDrawerOpen(false)}
        />
      }
    >
      <div className="page">
        <div className="greeting">
          <div>
            <h1 className="greeting__title">
              Chào buổi sáng, {personalUser.name}! 👋
            </h1>
            <p className="greeting__subtitle">Thứ Tư, 22/05/2024 • Tuần 21</p>
          </div>
        </div>

        <div className="grid-main-aside">
          <div className="col-stack">
            <ProfileCard
              user={personalUser}
              tag="Product Designer"
              department="Phòng Thiết kế – Khối Công nghệ"
              stats={[
                {
                  id: "st1",
                  label: "Ngày làm việc",
                  value: "18",
                  total: "22",
                  caption: "Tháng 05/2024",
                  icon: "event_available",
                  tone: "info",
                },
                {
                  id: "st2",
                  label: "Giờ làm việc",
                  value: "142.5",
                  total: "176h",
                  caption: "Đã duyệt",
                  icon: "schedule",
                  tone: "success",
                },
                {
                  id: "st3",
                  label: "Nghỉ phép năm",
                  value: "8.5",
                  total: "20 ngày",
                  caption: "Đã dùng",
                  icon: "beach_access",
                  tone: "warning",
                },
                {
                  id: "st4",
                  label: "Công việc quá hạn",
                  value: "2",
                  caption: "Cần xử lý",
                  icon: "error",
                  tone: "danger",
                },
              ]}
            />

            <div className="grid-main-aside">
              <Card title="Công việc của tôi" link={{ label: "Xem tất cả" }}>
                <Tabs
                  variant="underline"
                  size="sm"
                  value={taskTab}
                  onChange={setTaskTab}
                  items={[
                    { id: "all", label: "Tất cả", count: 8 },
                    { id: "doing", label: "Đang làm", count: 5 },
                    { id: "overdue", label: "Quá hạn", count: 2 },
                    { id: "done", label: "Hoàn thành", count: 1 },
                  ]}
                />
                <TaskList
                  tasks={filteredTasks}
                  onToggle={toggleTask}
                  variant="detailed"
                />
              </Card>

              <Card
                title="Lịch làm việc"
                link={{ label: "Xem lịch" }}
                action={
                  <Select
                    size="sm"
                    variant="soft"
                    defaultValue="today"
                    options={[
                      { value: "today", label: "Hôm nay" },
                      { value: "week", label: "Tuần này" },
                    ]}
                  />
                }
              >
                <ScheduleTimeline
                  items={personalMeetings}
                  variant="detailed"
                  dateLabel="Thứ Tư, 22/05/2024"
                />
              </Card>
            </div>

            <div className="grid-3">
              <Card title="Ngày phép" link={{ label: "Xem chi tiết" }}>
                <DonutChart
                  data={LEAVE_SPLIT}
                  size={130}
                  thickness={16}
                  centerValue="8.5"
                  centerLabel="Ngày còn lại"
                  showPercent={false}
                />
                <p
                  className="text-caption"
                  style={{ marginTop: "var(--sp-4)", textAlign: "center" }}
                >
                  Tổng <strong>20 ngày phép</strong> / năm
                </p>
              </Card>

              <Card
                title="Bảng lương mới nhất"
                link={{ label: "Xem chi tiết" }}
              >
                <div className="row" style={{ marginBottom: "var(--sp-3)" }}>
                  <span className="text-caption">Tháng 05/2024</span>
                  <Badge tone="success">Đã thanh toán</Badge>
                </div>
                <p className="stat-card__value num">23,450,000 VND</p>
                <p
                  className="text-caption"
                  style={{ marginTop: "var(--sp-2)" }}
                >
                  Ngày thanh toán: 15/05/2024
                </p>
                <Button
                  block
                  variant="secondary"
                  style={{ marginTop: "var(--sp-4)" }}
                >
                  Xem bảng lương
                </Button>
              </Card>

              <Card title="Mục tiêu của tôi" link={{ label: "Xem tất cả" }}>
                <div className="goal-list">
                  {GOALS.map((g) => (
                    <div className="goal" key={g.id}>
                      <span className="goal__icon">
                        <Icon name={g.icon} size={18} />
                      </span>
                      <div className="goal__body">
                        <div className="goal__head">
                          <p className="goal__title">{g.title}</p>
                          <span className="goal__value num">{g.value}</span>
                        </div>
                        <ProgressBar
                          value={g.progress}
                          tone={g.tone}
                          size="sm"
                          className="goal__bar"
                        />
                        <p className="goal__due">{g.due}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card title="Tài liệu gần đây" link={{ label: "Xem tất cả" }}>
              <DocumentList items={personalDocuments} variant="card" />
            </Card>
          </div>

          <div className="col-stack">
            <Card title="Lịch tháng 05/2024" link={{ label: "Xem lịch" }}>
              <MiniCalendar
                month={5}
                year={2024}
                selected={22}
                marked={[11, 15, 22, 25, 26, 29, 30, 31]}
              />
            </Card>

            <Card
              title="Thông báo"
              link={{ label: "Xem tất cả", onClick: () => setDrawerOpen(true) }}
            >
              <AlertList items={PERSONAL_ALERTS} />
            </Card>

            <Card title="🎂 Sinh nhật sắp tới" link={{ label: "Xem tất cả" }}>
              <div className="people-list">
                {BIRTHDAYS.map((b) => (
                  <div className="people-list__row" key={b.id}>
                    <Avatar name={b.name} size={36} />
                    <div className="truncate">
                      <p className="people-list__name truncate">{b.name}</p>
                      <p className="people-list__sub truncate">{b.dept}</p>
                    </div>
                    <span className="people-list__meta">{b.date}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Lối tắt" link={{ label: "Tùy chỉnh" }}>
              <QuickAccess actions={SHORTCUTS} variant="grid" columns={4} />
            </Card>

            <Card title="Danh bạ" link={{ label: "Xem tất cả" }}>
              <SearchInput
                placeholder="Tìm kiếm đồng nghiệp..."
                shortcut=""
                size="md"
              />
              <div className="contact-grid">
                {CONTACTS.map((c) => (
                  <div className="contact-grid__item" key={c}>
                    <Avatar name={c} size={40} status="online" />
                    {c}
                  </div>
                ))}
                <div className="contact-grid__item">
                  <span
                    className="avatar-group__more"
                    style={{ width: 40, height: 40, marginLeft: 0 }}
                  >
                    +12
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
