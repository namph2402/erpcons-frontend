import DashboardShell from './DashboardShell'
import { COMPARE_OPTIONS } from '../../data/dashboardNav'
import {
  Badge,
  Card,
  DonutChart,
  GaugeChart,
  Icon,
  LineChart,
  StatCard,
  WordCloud,
} from '../../components/ui'
import { AiCopilotPanel } from '../../components/widgets'
import {
  aiFactors,
  aiForecast,
  aiRecommendations,
  aiRiskSplit,
  aiTopRisks,
  aiWords,
  analystUser,
  anomalies,
  sentimentSources,
} from '../../data/dashboards'

const AI_KPIS = [
  { id: 'forecast', label: 'Doanh thu dự báo (T6)', value: '136.8', unit: 'Tỷ VND', icon: 'query_stats', tone: 'ai' as const, trend: { direction: 'up' as const, value: '15.6%', label: 'so với kỳ trước' }, spark: [96, 101, 105, 110, 116, 121, 127, 132, 136.8] },
  { id: 'ontime', label: 'Xác suất hoàn thành đúng hạn', value: '82%', icon: 'schedule', tone: 'success' as const, trend: { direction: 'up' as const, value: '8%', label: 'so với kỳ trước' }, spark: [68, 70, 72, 74, 76, 78, 80, 81, 82] },
  { id: 'risk', label: 'Rủi ro tiềm ẩn', value: '16', icon: 'crisis_alert', tone: 'danger' as const, trend: { direction: 'down' as const, value: '12%', label: 'so với kỳ trước' }, spark: [24, 23, 22, 21, 20, 19, 18, 17, 16] },
  { id: 'upside', label: 'Cơ hội Upside', value: '24.7', unit: 'Tỷ VND', icon: 'explore', tone: 'info' as const, trend: { direction: 'up' as const, value: '22.4%', label: 'so với kỳ trước' }, spark: [14, 15, 16.5, 18, 19.6, 21, 22.4, 23.6, 24.7] },
  { id: 'cost-eff', label: 'Hiệu suất chi phí (AI)', value: '0.92', icon: 'monitoring', tone: 'warning' as const, trend: { direction: 'up' as const, value: '6.3%', label: 'so với kỳ trước' }, spark: [0.84, 0.85, 0.86, 0.87, 0.88, 0.89, 0.9, 0.91, 0.92] },
  { id: 'health', label: 'Mức độ sức khỏe dự án', value: '76', unit: '/100', icon: 'favorite', tone: 'automation' as const, trend: { direction: 'up' as const, value: '10 điểm', label: 'so với kỳ trước' }, spark: [62, 64, 66, 68, 70, 72, 74, 75, 76] },
]

const AI_SUGGESTIONS = [
  { id: 'as1', label: 'Dự báo doanh thu Q3/2024', icon: 'query_stats' },
  { id: 'as2', label: 'Những rủi ro cần lưu ý', icon: 'warning' },
  { id: 'as3', label: 'Đề xuất tối ưu chi phí', icon: 'savings' },
  { id: 'as4', label: 'Tóm tắt tiến độ dự án', icon: 'summarize' },
]

const PRIORITY_TONE = {
  'Ưu tiên cao': 'danger',
  'Ưu tiên trung bình': 'warning',
  'Ưu tiên thấp': 'info',
} as const

/** 58 · AI Insight Dashboard — tổng quan thông minh & dự báo */
export default function AiInsightDashboard() {
  return (
    <DashboardShell
      activeId="dashboard-ai"
      user={analystUser}
      title="Phân tích AI"
      tag={{ label: 'AI', tone: 'ai' }}
      subtitle="Tổng quan thông minh & dự báo"
      dateRange="01/05/2024 - 31/05/2024"
      compare={{ options: COMPARE_OPTIONS, value: 'prev-period' }}
      utilityIcons={[{ icon: 'download', label: 'Tải xuống' }]}
      updatedAt="31/05/2024 10:30"
      syncNote="Dữ liệu được xử lý bởi ERPcons AI Engine"
    >
      <div className="dash-kpis">
        {AI_KPIS.map((k) => (
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
        <Card title="Dự báo doanh thu (6 tháng tới)">
          <LineChart
            labels={aiForecast.labels}
            height={230}
            showLegend
            series={[
              { name: 'Thực tế', color: 'var(--info)', points: aiForecast.actual },
              { name: 'Dự báo (AI)', color: 'var(--ai)', points: aiForecast.forecast, dashed: true, area: true },
            ]}
          />
          <p className="text-caption" style={{ marginTop: 'var(--sp-2)' }}>
            11/24 (Dự báo): <strong>136.8 Tỷ VND</strong>{' '}
            <span style={{ color: 'var(--success)' }}>(+15.6%)</span> · Khoảng tin cậy 90%
          </p>
        </Card>

        <Card
          title="Các yếu tố ảnh hưởng lớn nhất (AI)"
          icon="info"
          iconColor="var(--text-disabled)"
        >
          <div className="factor-row" style={{ color: 'var(--text-tertiary)' }}>
            <span />
            <span />
            <span style={{ textAlign: 'center' }}>Ảnh hưởng</span>
            <span className="factor-row__level">Mức độ</span>
          </div>
          {aiFactors.map((f) => (
            <div className="factor-row" key={f.id}>
              <span className="truncate">{f.label}</span>
              <span
                className={`factor-row__value factor-row__value--${f.impact >= 0 ? 'up' : 'down'}`}
              >
                {f.impact > 0 ? '+' : ''}
                {f.impact}%
              </span>
              <span className="factor-bar">
                <span
                  style={{
                    left: f.impact >= 0 ? '50%' : `${50 - Math.abs(f.impact) / 2}%`,
                    width: `${Math.abs(f.impact) / 2}%`,
                    background: f.impact >= 0 ? 'var(--success)' : 'var(--danger)',
                  }}
                />
              </span>
              <span className="factor-row__level">{f.level}</span>
            </div>
          ))}
        </Card>

        <Card title="Phân tích rủi ro AI" link={{ label: 'Xem tất cả' }}>
          <DonutChart
            data={aiRiskSplit}
            size={140}
            thickness={24}
            centerValue="16"
            centerLabel="Rủi ro"
            showPercent={false}
          />
          <p className="text-caption" style={{ margin: 'var(--sp-4) 0 var(--sp-2)', fontWeight: 600 }}>
            Rủi ro nổi bật
          </p>
          <ul className="count-rows">
            {aiTopRisks.map((r) => (
              <li key={r.id}>
                <div className="count-row">
                  <span className={`count-row__icon count-row__icon--${r.tone}`}>
                    <Icon name="warning" size={18} />
                  </span>
                  <span className="count-row__body">
                    <span className="count-row__label">{r.label}</span>
                  </span>
                  <Badge tone={r.tone}>{r.level}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="dash-grid dash-grid--main">
        <Card title="Phát hiện bất thường (Anomaly Detection)" link={{ label: 'Xem tất cả' }} flush>
          <table className="table table--dense">
            <thead>
              <tr>
                <th>Chỉ số</th>
                <th style={{ textAlign: 'right' }}>Giá trị hiện tại</th>
                <th style={{ textAlign: 'right' }}>Kỳ trước</th>
                <th style={{ textAlign: 'right' }}>Độ lệch</th>
                <th style={{ textAlign: 'center' }}>Đánh giá</th>
              </tr>
            </thead>
            <tbody>
              {anomalies.map((a) => (
                <tr key={a.id}>
                  <td>{a.metric}</td>
                  <td className="num" style={{ textAlign: 'right' }}>
                    {a.current}
                  </td>
                  <td className="num" style={{ textAlign: 'right' }}>
                    {a.previous}
                  </td>
                  <td className="num" style={{ textAlign: 'right', color: 'var(--danger)', fontWeight: 600 }}>
                    {a.delta}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <Badge tone={a.verdict === 'Bất thường' ? 'danger' : 'warning'}>
                      {a.verdict}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Dự đoán tiến độ hoàn thành">
          <GaugeChart
            value={82}
            max={100}
            variant="semi"
            size={200}
            thickness={20}
            segments={[
              { to: 50, color: 'var(--danger)' },
              { to: 75, color: 'var(--warning)' },
              { to: 100, color: 'var(--success)' },
            ]}
            label="Khả năng đúng hạn"
            formatValue={(v) => `${v}%`}
          />
          <div className="summary-box" style={{ marginTop: 'var(--sp-4)' }}>
            <p className="summary-box__row">
              Dự kiến hoàn thành <strong>30/09/2024</strong>
            </p>
            <p className="summary-box__row">
              Độ lệch dự kiến <strong style={{ color: 'var(--danger)' }}>-3 ngày</strong>
            </p>
          </div>
        </Card>

        <Card title="AI Recommendation" subtitle="(Đề xuất thông minh)" link={{ label: 'Xem tất cả' }}>
          <ul className="count-rows">
            {aiRecommendations.map((r) => (
              <li key={r.id}>
                <div className="count-row">
                  <span className={`count-row__icon count-row__icon--${r.tone}`}>
                    <Icon name={r.icon} size={18} />
                  </span>
                  <span className="count-row__body">
                    <span className="count-row__label">{r.label}</span>
                    <span className="count-row__sub">{r.sub}</span>
                  </span>
                  <Badge tone={PRIORITY_TONE[r.priority as keyof typeof PRIORITY_TONE]}>
                    {r.priority}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="dash-grid dash-grid--main">
        <Card title="Phân tích cảm xúc (Sentiment Analysis)" link={{ label: 'Xem chi tiết' }}>
          <div className="dash-grid dash-grid--2">
            <div style={{ textAlign: 'center' }}>
              <Icon name="sentiment_satisfied" size={40} color="var(--success)" />
              <p className="stat-card__value num" style={{ color: 'var(--success)' }}>
                78%
              </p>
              <p className="text-caption">Tích cực</p>
              <p className="metric-tile__delta metric-tile__delta--warn">Trung lập 16%</p>
              <p className="metric-tile__delta metric-tile__delta--down">Tiêu cực 6%</p>
            </div>
            <div>
              <p className="text-caption" style={{ fontWeight: 600, marginBottom: 'var(--sp-2)' }}>
                Nguồn dữ liệu
              </p>
              {sentimentSources.map((s) => (
                <div className="source-row" key={s.id} style={{ gridTemplateColumns: '1fr auto' }}>
                  <span className="truncate">{s.label}</span>
                  <span className="source-row__value num">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Word Cloud – Chủ đề nổi bật">
          <WordCloud words={aiWords} />
        </Card>

        <Card title="AI Chat Assistant" link={{ label: 'Xem lịch sử' }}>
          <AiCopilotPanel
            greeting="Xin chào Nguyễn Văn A! Tôi có thể giúp gì cho bạn hôm nay?"
            suggestions={AI_SUGGESTIONS}
          />
        </Card>
      </div>
    </DashboardShell>
  )
}
