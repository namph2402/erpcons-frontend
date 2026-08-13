import { useState } from "react";
import PartnerShell from "./PartnerShell";
import {
  Badge,
  Button,
  Card,
  DonutChart,
  DataTable,
  Icon,
  ProgressBar,
  Tabs,
} from "../../components/ui";
import type { Column } from "../../components/ui";
import { DocumentList } from "../../components/widgets";
import "./partners.css";

const TABS = [
  { id: "overview", label: "Tổng quan" },
  { id: "info", label: "Thông tin" },
  { id: "terms", label: "Điều khoản" },
  { id: "progress", label: "Tiến độ" },
  { id: "payment", label: "Thanh toán" },
  { id: "docs", label: "Tài liệu" },
  { id: "tasks", label: "Công việc" },
  { id: "log", label: "Nhật ký" },
  { id: "risk", label: "Rủi ro" },
  { id: "report", label: "Báo cáo" },
];

const KPIS = [
  {
    id: "k1",
    label: "Giá trị hợp đồng",
    value: "45,800,000,000",
    unit: "VND",
    icon: "contract",
    tone: "info",
  },
  {
    id: "k2",
    label: "Giá trị đã thanh toán",
    value: "18,320,000,000",
    unit: "VND",
    icon: "payments",
    tone: "success",
    sub: "40.0%",
  },
  {
    id: "k3",
    label: "Giá trị còn lại",
    value: "27,480,000,000",
    unit: "VND",
    icon: "savings",
    tone: "warning",
    sub: "60.0%",
  },
  {
    id: "k4",
    label: "Tiến độ hợp đồng",
    value: "58.6%",
    icon: "donut_small",
    tone: "ai",
    sub: "Kế hoạch: 75.0%",
  },
  {
    id: "k5",
    label: "Thời hạn hoàn thành",
    value: "30/09/2025",
    icon: "event_available",
    tone: "neutral",
    sub: "Còn 129 ngày",
  },
];

const TONE_CLASS: Record<string, string> = {
  info: "stat-card--info",
  success: "stat-card--success",
  warning: "stat-card--warning",
  ai: "stat-card--ai",
  neutral: "stat-card--neutral",
};

interface PhaseRow extends Record<string, unknown> {
  id: string;
  name: string;
  tasks: string;
  plan: number;
  actual: number;
  status: string;
}

const PHASES: PhaseRow[] = [
  {
    id: "1",
    name: "1. Công tác chuẩn bị",
    tasks: "3 công việc",
    plan: 100,
    actual: 100,
    status: "Hoàn thành",
  },
  {
    id: "2",
    name: "2. Thi công phần móng",
    tasks: "8 công việc",
    plan: 100,
    actual: 80,
    status: "Đang thực hiện",
  },
  {
    id: "3",
    name: "3. Thi công hầm",
    tasks: "6 công việc",
    plan: 75,
    actual: 45,
    status: "Đang thực hiện",
  },
  {
    id: "4",
    name: "4. Công tác hoàn thiện",
    tasks: "4 công việc",
    plan: 0,
    actual: 0,
    status: "Chưa bắt đầu",
  },
  {
    id: "5",
    name: "5. Nghiệm thu & bàn giao",
    tasks: "3 công việc",
    plan: 0,
    actual: 0,
    status: "Chưa bắt đầu",
  },
];

const PAYMENT_SPLIT = [
  { label: 'Đã thanh toán', value: 18.32, color: 'var(--success)', note: '18.32 tỷ', extra: '40.0%' },
  { label: 'Đang tạm ứng', value: 2.2, color: 'var(--warning)', note: '2.20 tỷ', extra: '4.8%' },
  { label: 'Chưa thanh toán', value: 25.28, color: 'var(--chart-track)', note: '25.28 tỷ', extra: '55.2%' },
]

const UPCOMING = [
  {
    id: "u1",
    name: "Đợt 4 - Thi công hầm B2",
    plan: "Kế hoạch: 30/06/2024",
    amount: "3,850,000,000",
  },
  {
    id: "u2",
    name: "Đợt 5 - Thi công hầm B1",
    plan: "Kế hoạch: 31/07/2024",
    amount: "4,250,000,000",
  },
  {
    id: "u3",
    name: "Đợt 6 - Thi công hầm B1",
    plan: "Kế hoạch: 31/08/2024",
    amount: "4,700,000,000",
  },
];

const RISKS = [
  {
    id: "r1",
    level: "Cao",
    tone: "danger" as const,
    title: "Chậm tiến độ thi công hầm B1",
    date: "15/05/2024",
  },
  {
    id: "r2",
    level: "Trung bình",
    tone: "warning" as const,
    title: "Biến động giá thép",
    date: "12/05/2024",
  },
  {
    id: "r3",
    level: "Thấp",
    tone: "success" as const,
    title: "Thời tiết mưa nhiều",
    date: "10/05/2024",
  },
];

const TIMELINE = [
  {
    id: "t1",
    date: "15/03/2024",
    title: "Ký kết hợp đồng",
    by: "Trần Minh Đức",
    tone: "success" as const,
  },
  {
    id: "t2",
    date: "18/03/2024",
    title: "Tạm ứng lần 1",
    by: "Bùi Quang Huy",
    tone: "info" as const,
  },
  {
    id: "t3",
    date: "20/04/2024",
    title: "Nghiệm thu móng",
    by: "Lê Hải Đăng",
    tone: "info" as const,
  },
  {
    id: "t4",
    date: "15/05/2024",
    title: "Thanh toán đợt 2",
    by: "Lê Hải Đăng",
    tone: "success" as const,
  },
  {
    id: "t5",
    date: "30/09/2025",
    title: "Dự kiến hoàn thành",
    by: "",
    tone: "neutral" as const,
  },
];

const APPROVALS = [
  {
    id: "a1",
    title: "Thanh toán đợt 3 - 15%",
    by: "Lê Hải Đăng",
    date: "20/05/2024",
    status: "Đã duyệt",
    tone: "success" as const,
  },
  {
    id: "a2",
    title: "Điều chỉnh tiến độ",
    by: "Trần Minh Đức",
    date: "19/05/2024",
    status: "Đã duyệt",
    tone: "success" as const,
  },
  {
    id: "a3",
    title: "Nghiệm thu hầm B2",
    by: "Phạm Quang Huy",
    date: "18/05/2024",
    status: "Chờ duyệt",
    tone: "warning" as const,
  },
];

const CONTRACT_DOCS = [
  {
    id: "d1",
    name: "Hợp đồng gốc",
    ext: "pdf",
    size: "2.4 MB",
    meta: "Cập nhật 15/03/2024",
  },
  {
    id: "d2",
    name: "Phụ lục 01 - Bảng khối lượng",
    ext: "docx",
    size: "1.1 MB",
    meta: "Cập nhật 18/03/2024",
  },
  {
    id: "d3",
    name: "Tiến độ tổng thể",
    ext: "xlsx",
    size: "98 KB",
    meta: "Cập nhật 20/03/2024",
  },
  {
    id: "d4",
    name: "Bảo lãnh thực hiện HĐ",
    ext: "pdf",
    size: "1.3 MB",
    meta: "Cập nhật 15/03/2024",
  },
];

const LINKS = [
  { id: "l1", label: "Dự án", meta: "The Nexus Tower", icon: "domain" },
  {
    id: "l2",
    label: "Nhà thầu",
    meta: "XYZ Construction",
    icon: "engineering",
  },
  { id: "l3", label: "Công việc", meta: "28 công việc", icon: "assignment" },
  { id: "l4", label: "Thanh toán", meta: "12 khoản", icon: "payments" },
  { id: "l5", label: "Tài liệu", meta: "36 tài liệu", icon: "folder_open" },
  { id: "l6", label: "Nhật ký", meta: "125 hoạt động", icon: "history" },
];

/** Chi tiết hợp đồng — Erpcons/page/Hợp đồng.jpg */
export default function ContractDetail() {
  const [tab, setTab] = useState("overview");

  const phaseColumns: Column<PhaseRow>[] = [
    {
      key: "name",
      header: "Hạng mục công việc",
      render: (r) => (
        <div>
          <p className="pt-progress-row__name">{r.name}</p>
          <p className="pt-progress-row__sub">{r.tasks}</p>
        </div>
      ),
    },
    {
      key: "plan",
      header: "Kế hoạch",
      width: "160px",
      render: (r) => (
        <ProgressBar value={r.plan} tone="success" size="sm" showValue />
      ),
    },
    {
      key: "actual",
      header: "Thực tế",
      width: "90px",
      align: "right",
      render: (r) => (
        <span className="num" style={{ fontWeight: 600 }}>
          {r.actual}%
        </span>
      ),
    },
    {
      key: "status",
      header: "Trạng thái",
      width: "150px",
      render: (r) => (
        <Badge
          tone={
            r.status === "Hoàn thành"
              ? "success"
              : r.status === "Đang thực hiện"
                ? "info"
                : "neutral"
          }
        >
          {r.status}
        </Badge>
      ),
    },
  ];

  return (
    <PartnerShell
      activeId="contracts"
      breadcrumbs={[
        { label: "Hợp đồng", href: "#/lam-viec/hop-dong" },
        { label: "HD-2024-0156" },
      ]}
      title="Hợp đồng Thi công phần móng & hầm – The Nexus Tower"
      status={
        <Badge tone="success" dot size="md">
          Đang thực hiện
        </Badge>
      }
      subtitle={
        <>
          <span>Dự án: The Nexus Tower</span>
          <span className="page-header__dot">•</span>
          <span>Nhà thầu: XYZ Construction JSC</span>
          <span className="page-header__dot">•</span>
          <span>Loại: Hợp đồng thi công</span>
          <span className="page-header__dot">•</span>
          <span>Giá trị: 45,800,000,000 VND</span>
        </>
      }
      actions={
        <>
          <Button icon="share">Chia sẻ</Button>
          <Button iconOnly icon="more_horiz" aria-label="Thao tác khác" />
          <Button variant="primary" icon="bolt" trailingIcon="expand_more">
            Thao tác
          </Button>
        </>
      }
      tabs={<Tabs items={TABS} value={tab} onChange={setTab} />}
      searchPlaceholder="Tìm kiếm (Hợp đồng, Dự án, Nhà cung cấp, Tài liệu...)"
    >
      <div className="pt-kpi-strip">
        {KPIS.map((k) => (
          <div className="pt-kpi" key={k.id}>
            <span
              className={`pt-kpi__icon stat-card__icon ${TONE_CLASS[k.tone]}`}
            >
              <Icon name={k.icon} size={20} />
            </span>
            <div className="truncate">
              <p className="pt-kpi__label">{k.label}</p>
              <p className="pt-kpi__value num">
                {k.value}
                {k.unit && <span className="pt-kpi__unit">{k.unit}</span>}
              </p>
              {k.sub && <p className="pt-kpi__sub">{k.sub}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-grid pt-grid--main">
        <div className="pt-col">
          <Card
            title="Tiến độ thực hiện"
            action={
              <ul className="gantt-legend" style={{ marginTop: 0 }}>
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
                  Chưa bắt đầu
                </li>
              </ul>
            }
            flush
          >
            <DataTable
              columns={phaseColumns}
              rows={PHASES}
              rowKey={(r) => r.id}
              dense
            />
          </Card>

          <div className="pt-grid pt-grid--3">
            <Card title="Thanh toán" link={{ label: "Xem chi tiết" }}>
              <DonutChart
                data={PAYMENT_SPLIT}
                size={140}
                thickness={24}
                centerValue="18.32"
                centerLabel="Tỷ VND"
                legend="bottom"
                showPercent={false}
              />
            </Card>

            <Card
              title="Hạng mục thanh toán sắp tới"
              link={{ label: "Xem tất cả" }}
            >
              {UPCOMING.map((u) => (
                <div
                  className="pt-prop"
                  key={u.id}
                  style={{ gridTemplateColumns: "1fr auto" }}
                >
                  <div>
                    <p className="pt-progress-row__name">{u.name}</p>
                    <p className="pt-progress-row__sub">{u.plan}</p>
                  </div>
                  <span className="num" style={{ fontWeight: 600 }}>
                    {u.amount}
                    <br />
                    <span className="text-caption">VND</span>
                  </span>
                </div>
              ))}
            </Card>

            <Card title="Rủi ro & vấn đề" link={{ label: "Xem tất cả" }}>
              <div
                className="row-between"
                style={{ marginBottom: "var(--sp-3)" }}
              >
                <div style={{ textAlign: "center", flex: 1 }}>
                  <p className="text-caption">Rủi ro</p>
                  <p className="pt-kpi__value num">3</p>
                </div>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <p className="text-caption">Vấn đề</p>
                  <p className="pt-kpi__value num">5</p>
                </div>
              </div>
              {RISKS.map((r) => (
                <div className="pt-contact" key={r.id}>
                  <Badge tone={r.tone}>{r.level}</Badge>
                  <div className="pt-contact__body">
                    <p className="pt-contact__name truncate">{r.title}</p>
                  </div>
                  <span className="text-caption">{r.date}</span>
                </div>
              ))}
            </Card>
          </div>

          <Card title="Tài liệu hợp đồng" link={{ label: "Xem tất cả" }}>
            <DocumentList items={CONTRACT_DOCS} variant="card" />
          </Card>
        </div>

        <div className="pt-col">
          <Card title="Thông tin hợp đồng">
            <div className="pt-props">
              {[
                ["Mã hợp đồng", "HD-2024-0156"],
                ["Số hợp đồng", "02/2024/HĐTC"],
                ["Ngày ký hợp đồng", "15/03/2024"],
                ["Hiệu lực từ", "15/03/2024"],
                ["Hiệu lực đến", "30/09/2025"],
                ["Hình thức hợp đồng", "Trọn gói"],
                ["Điều khoản thanh toán", "Theo tiến độ"],
                ["Bảo lãnh thực hiện", "5% giá trị HĐ"],
                ["Điều phối hợp đồng", "Trần Minh Đức"],
              ].map(([k, v]) => (
                <div className="pt-prop" key={k}>
                  <span className="pt-prop__label">{k}</span>
                  <span className="pt-prop__value">{v}</span>
                </div>
              ))}
              <div className="pt-prop">
                <span className="pt-prop__label">Trạng thái</span>
                <span className="pt-prop__value">
                  <Badge tone="success" dot>
                    Đang thực hiện
                  </Badge>
                </span>
              </div>
            </div>
          </Card>

          <Card title="Timeline hợp đồng" link={{ label: "Xem tất cả" }}>
            <div className="pt-timeline">
              {TIMELINE.map((t) => (
                <div className="pt-timeline__item" key={t.id}>
                  <span className="pt-timeline__date num">{t.date}</span>
                  <div className="pt-timeline__body">
                    <span
                      className={`pt-timeline__dot pt-timeline__dot--${t.tone}`}
                    />
                    <p className="pt-timeline__title">{t.title}</p>
                    {t.by && <p className="pt-timeline__sub">{t.by}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Phê duyệt gần đây" link={{ label: "Xem tất cả" }}>
            {APPROVALS.map((a) => (
              <div className="pt-contact" key={a.id}>
                <span className="count-row__icon count-row__icon--info">
                  <Icon name="approval" size={18} />
                </span>
                <div className="pt-contact__body">
                  <p className="pt-contact__name truncate">{a.title}</p>
                  <p className="pt-contact__role">
                    {a.by} · {a.date}
                  </p>
                </div>
                <Badge tone={a.tone}>{a.status}</Badge>
              </div>
            ))}
          </Card>

          <Card title="Liên kết nhanh">
            <div className="pt-links">
              {LINKS.map((l) => (
                <button className="pt-link" type="button" key={l.id}>
                  <Icon name={l.icon} size={20} />
                  <span className="pt-link__label">{l.label}</span>
                  <span className="pt-link__meta">{l.meta}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PartnerShell>
  );
}
