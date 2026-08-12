import DashboardShell from "./DashboardShell";
import {
  BarChart,
  Badge,
  Card,
  DonutChart,
  LineChart,
  ProgressBar,
  StatCard,
} from "../../components/ui";
import { CountRowList } from "../../components/widgets";
import {
  ceoUser,
  departmentKpis,
  execAlerts,
  execCashflow,
  executiveKpis,
  financialRatios,
  headcountByDept,
  projectStatusExec,
  revenueByBu,
  revenueProfit12m,
  topProjectsByRevenue,
} from "../../data/dashboards";

const RATING_TONE = {
  Tốt: "success",
  Khá: "warning",
  "Trung bình": "danger",
} as const;

/** 54 · Executive Dashboard — tổng quan toàn bộ hoạt động doanh nghiệp */
export default function ExecutiveDashboard() {
  return (
    <DashboardShell
      activeId="dashboard-executive"
      user={ceoUser}
      title="Điều hành tổng thể"
      subtitle="Tổng quan toàn bộ hoạt động doanh nghiệp"
      dateRange="01/05/2024 - 31/05/2024"
      utilityIcons={[{ icon: "more_vert", label: "Thao tác khác" }]}
      updatedAt="31/05/2024 10:30:45"
    >
      <div className="dash-kpis">
        {executiveKpis.map((k) => (
          <StatCard
            key={k.id}
            layout="stacked"
            label={k.label}
            value={k.value}
            unit={k.unit}
            icon={k.icon}
            tone={k.tone}
            trend={k.trend}
            sparkline={k.spark}
          />
        ))}
      </div>

      <div className="dash-grid dash-grid--main">
        <Card title="Doanh thu theo đơn vị kinh doanh (BU)">
          <DonutChart
            data={revenueByBu}
            size={168}
            thickness={30}
            centerValue="125.8"
            centerLabel="Tổng doanh thu · Tỷ VND"
            showPercent={false}
          />
        </Card>

        <Card title="Doanh thu & Lợi nhuận (12 tháng)">
          <BarChart
            labels={revenueProfit12m.labels}
            series={[
              {
                name: "Doanh thu (Tỷ VND)",
                color: "var(--info)",
                values: revenueProfit12m.revenue,
              },
            ]}
            line={{
              name: "Lợi nhuận (Tỷ VND)",
              color: "var(--success)",
              values: revenueProfit12m.profit,
            }}
            height={230}
          />
        </Card>

        <Card title="Tình hình dự án" link={{ label: "Xem chi tiết" }}>
          <DonutChart
            data={projectStatusExec}
            size={150}
            thickness={26}
            centerValue="68"
            centerLabel="Tổng dự án"
            showPercent={false}
          />
        </Card>
      </div>

      <div className="dash-grid dash-grid--main">
        <Card title="Dòng tiền" subtitle="(Tỷ VND)">
          <LineChart
            labels={execCashflow.labels}
            height={210}
            showLegend
            series={[
              {
                name: "Tiền vào",
                color: "var(--success)",
                points: execCashflow.in,
              },
              {
                name: "Tiền ra",
                color: "var(--danger)",
                points: execCashflow.out,
              },
              {
                name: "Dòng tiền thuần",
                color: "var(--info)",
                points: execCashflow.net,
                area: true,
              },
            ]}
          />
        </Card>

        <Card title="Các chỉ số tài chính" link={{ label: "Xem chi tiết" }}>
          <div className="metric-grid">
            {financialRatios.map((r) => (
              <div className="metric-tile" key={r.id}>
                <p className="metric-tile__label">{r.label}</p>
                <p className="metric-tile__value num">
                  {r.value}
                  {r.unit && (
                    <span className="metric-tile__unit">{r.unit}</span>
                  )}
                </p>
                <p
                  className={`metric-tile__delta metric-tile__delta--${r.tone}`}
                >
                  {r.delta}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Top dự án theo doanh thu" link={{ label: "Xem chi tiết" }}>
          <div className="progress-list">
            <div className="progress-list__head">
              <span>Dự án</span>
              <span>Doanh thu (Tỷ VND)</span>
              <span>%</span>
            </div>
            {topProjectsByRevenue.map((p) => (
              <div className="progress-list__row" key={p.id}>
                <span className="truncate">
                  {p.id}. {p.name}
                </span>
                <span className="num" style={{ textAlign: "right" }}>
                  {p.revenue}
                </span>
                <ProgressBar value={p.progress} size="sm" showValue />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="dash-grid dash-grid--main">
        <Card title="Cảnh báo & Rủi ro" link={{ label: "Xem tất cả" }}>
          <CountRowList rows={execAlerts} variant="icon" />
        </Card>

        <Card title="Hiệu suất theo phòng ban" link={{ label: "Xem chi tiết" }}>
          <table className="table table--dense">
            <thead>
              <tr>
                <th>Phòng ban</th>
                <th style={{ textAlign: "right" }}>KPI tổng hợp</th>
                <th style={{ textAlign: "center" }}>Xu hướng</th>
                <th style={{ textAlign: "center" }}>Đánh giá</th>
              </tr>
            </thead>
            <tbody>
              {departmentKpis.map((d) => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td
                    className="num"
                    style={{ textAlign: "right", fontWeight: 600 }}
                  >
                    {d.kpi}%
                  </td>
                  <td>
                    <div className="trend-cell">
                      <LineChart
                        minimal
                        height={26}
                        series={[
                          {
                            name: d.name,
                            color:
                              d.rating === "Tốt"
                                ? "var(--success)"
                                : "var(--warning)",
                            points: d.trend,
                          },
                        ]}
                      />
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Badge tone={RATING_TONE[d.rating]}>{d.rating}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card
          title="Phân bổ nhân sự theo phòng ban"
          link={{ label: "Xem chi tiết" }}
        >
          <DonutChart
            data={headcountByDept}
            size={150}
            thickness={26}
            centerValue="1,248"
            centerLabel="Tổng nhân sự"
            showPercent={false}
          />
        </Card>
      </div>
    </DashboardShell>
  );
}
