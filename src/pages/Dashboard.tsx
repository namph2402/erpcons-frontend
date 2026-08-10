import { useMemo, useState } from "react";
import { AppLayout } from "../components/layout";
import {
  Badge,
  Button,
  Card,
  DataTable,
  DonutChart,
  Icon,
  LineChart,
  ProgressBar,
  STATUS_TONE,
  Select,
  StatCard,
  Tabs,
} from "../components/ui";
import type { Column } from "../components/ui";
import {
  InsightStrip,
  NotificationDrawer,
  ScheduleTimeline,
  TaskList,
} from "../components/widgets";
import { mainNav } from "../data/navigation";
import {
  currentUser,
  meetings,
  myTasks,
  notifications,
  projects,
} from "../data/mock";
import type { Project, TaskItem } from "../types";
import "./pages.css";

const CASHFLOW_IN = [92, 101, 96, 118, 112, 128, 121, 134, 128.6];
const CASHFLOW_OUT = [78, 85, 81, 92, 88, 97, 93, 99, 96.4];
const NET_FLOW = [14, 16, 15, 26, 24, 31, 28, 35, 32.2];

const PROJECT_STATUS = [
  {
    label: "Đúng tiến độ",
    value: 12,
    color: "var(--success)",
    note: "12 (50%)",
  },
  { label: "Chậm tiến độ", value: 6, color: "var(--danger)", note: "6 (25%)" },
  { label: "Đang triển khai", value: 4, color: "var(--info)", note: "4 (17%)" },
  { label: "Chuẩn bị", value: 2, color: "var(--slate-300)", note: "2 (8%)" },
];

const INSIGHTS = [
  {
    id: "i1",
    title: "6 dự án có nguy cơ chậm tiến độ",
    description: "Dựa trên dữ liệu 14 ngày gần nhất",
    icon: "schedule",
    tone: "info" as const,
    linkLabel: "Xem chi tiết",
  },
  {
    id: "i2",
    title: "Chi phí vật liệu tăng 8.7%",
    description: "So với tháng trước",
    icon: "trending_up",
    tone: "success" as const,
    linkLabel: "Xem chi tiết",
  },
  {
    id: "i3",
    title: "Dòng tiền tuần tới dự báo âm",
    description: "-12.5 tỷ VND",
    icon: "water_drop",
    tone: "danger" as const,
    linkLabel: "Xem chi tiết",
  },
  {
    id: "i4",
    title: "3 hợp đồng sắp hết hạn",
    description: "Trong 30 ngày tới",
    icon: "contract",
    tone: "warning" as const,
    linkLabel: "Xem chi tiết",
  },
];

/** View 02 & 03 — Trang chủ điều hành (Dashboard) + Notification Center */
export default function Dashboard({
  initialDrawerOpen = false,
}: {
  initialDrawerOpen?: boolean;
}) {
  const [drawerOpen, setDrawerOpen] = useState(initialDrawerOpen);
  const [taskTab, setTaskTab] = useState("all");
  const [tasks, setTasks] = useState<TaskItem[]>(myTasks);

  const toggleTask = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );

  const filteredTasks = useMemo(() => {
    if (taskTab === "overdue")
      return tasks.filter((t) => t.state === "overdue");
    if (taskTab === "today") return tasks.filter((t) => t.state === "today");
    if (taskTab === "upcoming")
      return tasks.filter((t) => t.state === "upcoming");
    return tasks;
  }, [tasks, taskTab]);

  const projectColumns: Column<Project & Record<string, unknown>>[] = [
    {
      key: "name",
      header: "Dự án",
      render: (p) => (
        <div className="cell-object">
          <span className="cell-object__thumb">
            <Icon name="apartment" size={20} />
          </span>
          <div className="truncate">
            <p className="cell-object__name truncate">{p.name}</p>
            <p className="cell-object__code">{p.code}</p>
          </div>
        </div>
      ),
    },
    {
      key: "budget",
      header: "Ngân sách",
      width: "160px",
      render: (p) => (
        <span className="num">
          {p.budgetUsed.toFixed(1)} / {p.budgetTotal.toFixed(1)} tỷ
        </span>
      ),
    },
    {
      key: "progress",
      header: "Tiến độ",
      width: "180px",
      render: (p) => (
        <div className="row">
          <span className="num" style={{ minWidth: 34, fontWeight: 600 }}>
            {p.progress}%
          </span>
          <ProgressBar value={p.progress} size="sm" />
        </div>
      ),
    },
    {
      key: "status",
      header: "Trạng thái",
      width: "150px",
      render: (p) => (
        <Badge tone={STATUS_TONE[p.status] ?? "default"} size="md">
          {p.status}
        </Badge>
      ),
    },
  ];

  return (
    <AppLayout
      navGroups={mainNav}
      activeId="home"
      user={currentUser}
      notificationCount={12}
      searchPlaceholder="Tìm kiếm nhanh (Dự án, Công việc, Hợp đồng, Tài liệu...)"
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
              Chào buổi sáng, {currentUser.name}! 👋
            </h1>
            <p className="greeting__subtitle">
              Chúc bạn có một ngày làm việc hiệu quả.
            </p>
          </div>
          <Button variant="primary" icon="add" trailingIcon="expand_more">
            Tạo nhanh
          </Button>
        </div>

        <div className="stat-row">
          <StatCard
            label="Tổng doanh thu (YTD)"
            value="248.6"
            unit="tỷ VND"
            icon="paid"
            tone="info"
            trend={{ direction: "up", value: "18.6%", label: "so với cùng kỳ" }}
          />
          <StatCard
            label="Chi phí (YTD)"
            value="186.2"
            unit="tỷ VND"
            icon="savings"
            tone="success"
            trend={{ direction: "up", value: "12.4%", label: "so với cùng kỳ" }}
          />
          <StatCard
            label="Lợi nhuận (YTD)"
            value="62.4"
            unit="tỷ VND"
            icon="explore"
            tone="ai"
            trend={{ direction: "up", value: "28.7%", label: "so với cùng kỳ" }}
          />
          <StatCard
            label="Dự án đang triển khai"
            value="24"
            unit="Dự án"
            icon="calendar_month"
            tone="neutral"
            trend={{
              direction: "up",
              value: "2 dự án",
              label: "mới trong tháng",
            }}
          />
        </div>

        <div className="grid-main-aside">
          <Card
            title="Tổng quan dự án"
            link={{ label: "Xem tất cả dự án" }}
            flush
          >
            <div style={{ padding: "0 var(--sp-5)" }}>
              <div className="kpi-strip">
                <div className="kpi-strip__item">
                  <p className="kpi-strip__label">Tổng số dự án</p>
                  <p className="kpi-strip__value num">24</p>
                </div>
                <div className="kpi-strip__item">
                  <p className="kpi-strip__label">Đang triển khai</p>
                  <p className="kpi-strip__value kpi-strip__value--info num">
                    18
                  </p>
                </div>
                <div className="kpi-strip__item">
                  <p className="kpi-strip__label">Đúng tiến độ</p>
                  <p className="kpi-strip__value kpi-strip__value--info num">
                    12
                  </p>
                </div>
                <div className="kpi-strip__item">
                  <p className="kpi-strip__label">Chậm tiến độ</p>
                  <p className="kpi-strip__value kpi-strip__value--danger num">
                    6
                  </p>
                </div>
                <div className="kpi-strip__item">
                  <p className="kpi-strip__label">Hoàn thành</p>
                  <p className="kpi-strip__value kpi-strip__value--success num">
                    6
                  </p>
                </div>
              </div>
            </div>

            <DataTable
              columns={projectColumns}
              rows={projects as (Project & Record<string, unknown>)[]}
              rowKey={(p) => p.id}
              onRowClick={() => {
                window.location.hash = "#/du-an/NT-2024-001";
              }}
            />
          </Card>

          <Card
            title="Công việc của tôi"
            link={{ label: "Xem tất cả" }}
            footer={
              <button className="card__link" type="button">
                <Icon name="add" size={16} />
                Tạo công việc mới
              </button>
            }
          >
            <Tabs
              variant="underline"
              size="sm"
              value={taskTab}
              onChange={setTaskTab}
              items={[
                { id: "all", label: "Tất cả", count: tasks.length },
                { id: "overdue", label: "Quá hạn", count: 5 },
                { id: "today", label: "Hôm nay", count: 6 },
                { id: "upcoming", label: "Sắp tới", count: 7 },
              ]}
            />
            <TaskList tasks={filteredTasks} onToggle={toggleTask} showDot />
          </Card>
        </div>

        <div className="grid-1-1-1.2">
          <Card title="Dòng tiền (Cashflow)" link={{ label: "Xem chi tiết" }}>
            <div className="mini-stat-row">
              <div className="mini-stat">
                <p className="mini-stat__label">Thu vào</p>
                <p className="mini-stat__value num">
                  128.6<span className="mini-stat__unit">tỷ VND</span>
                </p>
                <LineChart
                  minimal
                  height={40}
                  series={[
                    {
                      name: "in",
                      color: "var(--success)",
                      points: CASHFLOW_IN,
                      area: true,
                    },
                  ]}
                />
              </div>
              <div className="mini-stat">
                <p className="mini-stat__label">Chi ra</p>
                <p className="mini-stat__value num">
                  96.4<span className="mini-stat__unit">tỷ VND</span>
                </p>
                <LineChart
                  minimal
                  height={40}
                  series={[
                    {
                      name: "out",
                      color: "var(--danger)",
                      points: CASHFLOW_OUT,
                      area: true,
                    },
                  ]}
                />
              </div>
            </div>

            <div className="mini-stat" style={{ marginTop: "var(--sp-3)" }}>
              <p className="mini-stat__label">Dòng tiền ròng</p>
              <p className="mini-stat__value num">
                32.2<span className="mini-stat__unit">tỷ VND</span>
              </p>
              <LineChart
                minimal
                height={70}
                series={[
                  {
                    name: "net",
                    color: "var(--info)",
                    points: NET_FLOW,
                    area: true,
                  },
                ]}
              />
              <div className="linechart__labels">
                <span>01/05</span>
                <span>08/05</span>
                <span>15/05</span>
                <span>22/05</span>
                <span>31/05</span>
              </div>
            </div>
          </Card>

          <Card
            title="Biểu đồ tiến độ tổng hợp"
            link={{ label: "Xem chi tiết" }}
          >
            <DonutChart
              data={PROJECT_STATUS}
              size={150}
              thickness={26}
              centerValue="24"
              centerLabel="Tổng dự án"
            />
          </Card>

          <Card
            title="Lịch của tôi"
            link={{ label: "Xem lịch" }}
            action={
              <Select
                size="sm"
                variant="soft"
                defaultValue="today"
                options={[
                  { value: "today", label: "Thứ Tư, 22/05/2024" },
                  { value: "week", label: "Tuần này" },
                ]}
              />
            }
          >
            <ScheduleTimeline items={meetings} />
          </Card>
        </div>

        <InsightStrip items={INSIGHTS} />
      </div>
    </AppLayout>
  );
}
