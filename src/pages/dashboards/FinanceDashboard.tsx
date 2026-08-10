import DashboardShell from './DashboardShell'
import {
  BarChart,
  Card,
  DonutChart,
  Icon,
  ProgressBar,
  Select,
  StatCard,
} from '../../components/ui'
import { CountRowList } from '../../components/widgets'
import { financeNav } from '../../data/dashboardNav'
import {
  bankBalances,
  budgetExecution,
  cfoUser,
  execCashflow,
  financeAlerts,
  financeKpis,
  revenueProfit12m,
  revenueStructure,
  topCosts,
} from '../../data/dashboards'

const RATIOS = [
  { id: 'roa', label: 'ROA', value: '6.2', unit: '%', delta: '+0.8%', tone: 'up' as const },
  { id: 'roe', label: 'ROE', value: '11.3', unit: '%', delta: '+1.5%', tone: 'up' as const },
  { id: 'net-margin', label: 'Biên lợi nhuận ròng', value: '11.8', unit: '%', delta: '+1.4%', tone: 'up' as const },
  { id: 'asset-turn', label: 'Vòng quay TS', value: '0.54', delta: '+0.06', tone: 'up' as const },
  { id: 'ar-turn', label: 'Vòng quay khoản phải thu', value: '4.1', unit: 'lần', delta: '-0.3', tone: 'down' as const },
  { id: 'ap-turn', label: 'Vòng quay khoản phải trả', value: '6.8', unit: 'lần', delta: '+0.5', tone: 'up' as const },
]

const CASHFLOW_STATEMENT = [
  { id: 'op', label: 'LCTT từ HĐ kinh doanh', value: '38.6', tone: 'normal' as const },
  { id: 'inv', label: 'LCTT từ HĐ đầu tư', value: '(12.4)', tone: 'negative' as const },
  { id: 'fin', label: 'LCTT từ HĐ tài chính', value: '(3.8)', tone: 'negative' as const },
  { id: 'net', label: 'Lưu chuyển tiền thuần', value: '22.4', tone: 'strong' as const },
]

/** 56 · Finance Dashboard — tổng quan tài chính doanh nghiệp */
export default function FinanceDashboard() {
  return (
    <DashboardShell
      navGroups={financeNav}
      activeId="finance"
      user={cfoUser}
      index="56."
      title="Finance Dashboard"
      subtitle="Tổng quan tài chính doanh nghiệp"
      dateRange="01/05/2024 - 31/05/2024"
      utilityIcons={[{ icon: 'download', label: 'Tải xuống' }]}
      updatedAt="31/05/2024 10:30:45"
    >
      <div className="dash-kpis">
        {financeKpis.map((k) => (
          <StatCard
            key={k.id}
            layout="stacked"
            label={k.label}
            value={k.value}
            unit={k.unit}
            icon={k.icon}
            tone={k.tone}
            trend={{ direction: 'up', value: k.trend, label: 'so với tháng trước' }}
            sparkline={k.spark}
          />
        ))}
      </div>

      <div className="dash-grid dash-grid--main">
        <Card
          title="Doanh thu & Lợi nhuận (12 tháng)"
          action={
            <Select
              size="sm"
              variant="soft"
              defaultValue="12m"
              options={[
                { value: '12m', label: '12 tháng' },
                { value: '6m', label: '6 tháng' },
                { value: '3m', label: '3 tháng' },
              ]}
            />
          }
        >
          <BarChart
            labels={revenueProfit12m.labels}
            series={[
              { name: 'Doanh thu (Tỷ VND)', color: 'var(--info)', values: revenueProfit12m.revenue },
            ]}
            line={{
              name: 'Lợi nhuận sau thuế (Tỷ VND)',
              color: 'var(--success)',
              values: revenueProfit12m.profit,
            }}
            height={240}
          />
        </Card>

        <Card title="Cơ cấu doanh thu" link={{ label: 'Xem chi tiết' }}>
          <DonutChart
            data={revenueStructure}
            size={160}
            thickness={28}
            centerValue="125.8"
            centerLabel="Tỷ VND"
            showPercent={false}
          />
        </Card>

        <Card
          title="Tình hình thực hiện ngân sách"
          link={{ label: 'Xem chi tiết' }}
          action={
            <Select
              size="sm"
              variant="soft"
              defaultValue="all"
              options={[{ value: 'all', label: 'Tất cả ngân sách' }]}
            />
          }
        >
          <div className="progress-list">
            <div className="progress-list__head">
              <span />
              <span style={{ textAlign: 'right' }}>Thực tế / Ngân sách</span>
              <span>%</span>
            </div>
            {budgetExecution.map((b) => (
              <div className="progress-list__row" key={b.id} style={{ display: 'block' }}>
                <div className="row-between" style={{ marginBottom: 'var(--sp-2)' }}>
                  <span>{b.label}</span>
                  <span className="num text-caption">
                    {b.actual} / {b.budget}
                  </span>
                  <span className="progress-list__value num">{b.rate}%</span>
                </div>
                <ProgressBar value={b.rate} tone={b.tone} size="md" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="dash-grid dash-grid--main">
        <Card title="Dòng tiền" subtitle="(Tỷ VND)">
          <BarChart
            labels={execCashflow.labels}
            height={220}
            series={[
              { name: 'Dòng tiền vào', color: 'var(--success)', values: execCashflow.in },
              { name: 'Dòng tiền ra', color: 'var(--danger)', values: execCashflow.out.map((v) => -v) },
            ]}
            line={{ name: 'Dòng tiền thuần', color: 'var(--info)', values: execCashflow.net }}
          />
        </Card>

        <Card title="Top 5 chi phí lớn nhất" link={{ label: 'Xem chi tiết' }} flush>
          <table className="table table--dense">
            <thead>
              <tr>
                <th>Hạng mục chi phí</th>
                <th style={{ textAlign: 'right' }}>Số tiền (Tỷ VND)</th>
                <th style={{ textAlign: 'right' }}>Tỷ trọng</th>
              </tr>
            </thead>
            <tbody>
              {topCosts.map((c) => (
                <tr key={c.id}>
                  <td>
                    {c.id}. {c.name}
                  </td>
                  <td className="num" style={{ textAlign: 'right' }}>
                    {c.value}
                  </td>
                  <td className="num" style={{ textAlign: 'right' }}>
                    {c.rate}
                  </td>
                </tr>
              ))}
              <tr>
                <td style={{ fontWeight: 700 }}>Tổng</td>
                <td className="num" style={{ textAlign: 'right', fontWeight: 700 }}>
                  90.6
                </td>
                <td className="num" style={{ textAlign: 'right', fontWeight: 700 }}>
                  84.7%
                </td>
              </tr>
            </tbody>
          </table>
        </Card>

        <Card title="Tình hình công nợ" link={{ label: 'Xem chi tiết' }}>
          <div className="dash-grid dash-grid--2">
            <div>
              <p className="text-caption">Phải thu khách hàng</p>
              <p className="stat-card__value num">
                95.6<span className="stat-card__unit">Tỷ VND</span>
              </p>
              <p className="metric-tile__delta metric-tile__delta--up">Trong hạn 72.4 (75.7%)</p>
              <p className="metric-tile__delta metric-tile__delta--down">Quá hạn 23.2 (24.3%)</p>
            </div>
            <div>
              <p className="text-caption">Phải trả nhà cung cấp</p>
              <p className="stat-card__value num">
                63.2<span className="stat-card__unit">Tỷ VND</span>
              </p>
              <p className="metric-tile__delta metric-tile__delta--up">Trong hạn 49.1 (77.7%)</p>
              <p className="metric-tile__delta metric-tile__delta--down">Quá hạn 14.1 (22.3%)</p>
            </div>
          </div>
          <p className="text-caption" style={{ marginTop: 'var(--sp-3)' }}>
            D/S quá hạn &gt; 30 ngày: <strong>12.6 Tỷ VND</strong> · Phải trả:{' '}
            <strong>8.7 Tỷ VND</strong>
          </p>
        </Card>
      </div>

      <div className="dash-grid dash-grid--main">
        <Card title="Số dư ngân hàng" link={{ label: 'Xem chi tiết' }}>
          <div className="progress-list">
            <div className="progress-list__head">
              <span />
              <span />
              <span style={{ textAlign: 'right' }}>Số dư (Tỷ VND)</span>
            </div>
            {bankBalances.map((b) => (
              <div className="progress-list__row" key={b.id}>
                <span className="row">
                  <i
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: b.color,
                      flexShrink: 0,
                    }}
                  />
                  <span className="truncate">{b.name}</span>
                </span>
                <span className="text-caption num truncate">{b.account}</span>
                <span className="progress-list__value num">{b.balance}</span>
              </div>
            ))}
            <div className="progress-list__row">
              <span style={{ fontWeight: 700 }}>Tổng</span>
              <span />
              <span className="progress-list__value num">72.6</span>
            </div>
          </div>
        </Card>

        <Card title="Hiệu quả tài chính">
          <div className="metric-grid">
            {RATIOS.map((r) => (
              <div className="metric-tile" key={r.id}>
                <p className="metric-tile__label">{r.label}</p>
                <p className="metric-tile__value num">
                  {r.value}
                  {r.unit && <span className="metric-tile__unit">{r.unit}</span>}
                </p>
                <p className={`metric-tile__delta metric-tile__delta--${r.tone}`}>{r.delta}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Lưu chuyển tiền tệ" subtitle="(Tỷ VND)" link={{ label: 'Xem chi tiết' }}>
          <div className="progress-list">
            {CASHFLOW_STATEMENT.map((c) => (
              <div className="progress-list__row" key={c.id} style={{ gridTemplateColumns: '1fr auto' }}>
                <span>{c.label}</span>
                <span
                  className="num"
                  style={{
                    fontWeight: c.tone === 'strong' ? 700 : 600,
                    color:
                      c.tone === 'negative'
                        ? 'var(--danger)'
                        : c.tone === 'strong'
                          ? 'var(--info)'
                          : 'var(--text-primary)',
                  }}
                >
                  {c.value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Cảnh báo tài chính" link={{ label: 'Xem chi tiết' }} icon="warning" iconColor="var(--warning)">
        <CountRowList rows={financeAlerts} variant="icon" chevron={false} />
      </Card>

      <p className="text-caption" style={{ display: 'flex', gap: 'var(--sp-2)' }}>
        <Icon name="info" size={16} />
        Các chỉ số được tính trên dữ liệu hợp nhất toàn tập đoàn, đã loại trừ giao dịch nội bộ.
      </p>
    </DashboardShell>
  )
}
