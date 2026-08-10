import DashboardShell from './DashboardShell'
import {
  Badge,
  Card,
  DonutChart,
  Icon,
  LineChart,
  ProgressBar,
  SearchInput,
  Select,
  StatCard,
  WordCloud,
} from '../../components/ui'
import { KnowledgeGraphView } from '../../components/widgets'
import { COMPARE_OPTIONS, knowledgeNav } from '../../data/dashboardNav'
import {
  entityTypes,
  graphActivity,
  graphNodes,
  graphRelations,
  graphSources,
  graphSuggestions,
  graphWords,
  knowledgeUser,
} from '../../data/dashboards'

const KG_KPIS = [
  { id: 'entities', label: 'Thực thể (Entities)', value: '24,358', icon: 'hub', tone: 'automation' as const, trend: { direction: 'up' as const, value: '12.6%', label: 'so với kỳ trước' } },
  { id: 'relations', label: 'Mối quan hệ (Relationships)', value: '68,742', icon: 'share', tone: 'ai' as const, trend: { direction: 'up' as const, value: '8.9%', label: 'so với kỳ trước' } },
  { id: 'types', label: 'Loại thực thể (Entity Types)', value: '156', icon: 'category', tone: 'info' as const, trend: { direction: 'up' as const, value: '3 loại mới' } },
  { id: 'sources', label: 'Nguồn dữ liệu (Sources)', value: '42', icon: 'database', tone: 'iot' as const, trend: { direction: 'up' as const, value: '2 nguồn mới' } },
  { id: 'confidence', label: 'Độ tin cậy trung bình', value: '92.6%', icon: 'verified', tone: 'success' as const, trend: { direction: 'up' as const, value: '4.3%', label: 'so với kỳ trước' } },
  { id: 'updated', label: 'Cập nhật gần nhất', value: '10 phút', unit: 'trước', icon: 'schedule', tone: 'neutral' as const, hint: '31/05/2024 10:30' },
]

/** 60 · Knowledge Graph — trực quan hoá mối quan hệ dữ liệu trong hệ thống */
export default function KnowledgeGraphDashboard() {
  return (
    <DashboardShell
      navGroups={knowledgeNav}
      activeId="knowledge"
      user={knowledgeUser}
      index="60."
      title="Knowledge Graph"
      tag={{ label: 'Graph', tone: 'ai', icon: 'hub' }}
      subtitle="Trực quan hóa mối quan hệ dữ liệu trong hệ thống"
      dateRange="01/05/2024 - 31/05/2024"
      compare={{
        options: [
          { value: 'all', label: 'Tất cả dự án' },
          ...COMPARE_OPTIONS,
        ],
        value: 'all',
      }}
      utilityIcons={[{ icon: 'download', label: 'Tải xuống' }]}
      updatedAt="31/05/2024 10:30:45"
      syncNote="Dữ liệu được xử lý bởi ERPcons AI Engine"
    >
      <div className="dash-kpis">
        {KG_KPIS.map((k) => (
          <StatCard
            key={k.id}
            layout="stacked"
            label={k.label}
            value={k.value}
            unit={k.unit}
            icon={k.icon}
            tone={k.tone}
            trend={k.trend}
            hint={k.hint}
          />
        ))}
      </div>

      <div className="dash-grid dash-grid--main">
        <Card
          title="Đồ thị tri thức (Knowledge Graph)"
          icon="info"
          iconColor="var(--slate-400)"
          action={
            <div className="row">
              <SearchInput placeholder="Tìm thực thể trong đồ thị..." shortcut="" />
              <Select
                size="sm"
                variant="soft"
                defaultValue="2"
                options={[
                  { value: '1', label: 'Hiển thị: 1 cấp' },
                  { value: '2', label: 'Hiển thị: 2 cấp' },
                  { value: '3', label: 'Hiển thị: 3 cấp' },
                ]}
              />
            </div>
          }
        >
          <KnowledgeGraphView
            center={{ label: 'Dự án', sub: 'The Nexus Tower', icon: 'domain', color: 'var(--automation)' }}
            nodes={graphNodes}
            size={520}
          />
          <ul className="linechart__legend" style={{ justifyContent: 'center' }}>
            {[
              { label: 'Dự án', color: 'var(--automation)' },
              { label: 'Tổ chức', color: 'var(--success)' },
              { label: 'Hợp đồng', color: 'var(--info)' },
              { label: 'Hạng mục', color: 'var(--danger)' },
              { label: 'Tài nguyên', color: 'var(--ocr)' },
              { label: 'Chứng từ', color: 'var(--warning)' },
            ].map((l) => (
              <li key={l.label}>
                <i style={{ background: l.color, width: 8, height: 8, borderRadius: 999 }} />
                {l.label}
              </li>
            ))}
          </ul>
        </Card>

        <div className="dash-col">
          <Card
            title="Thông tin thực thể đang chọn"
            action={
              <button className="dash-header__icon-btn" type="button" aria-label="Mở rộng">
                <Icon name="open_in_new" size={18} />
              </button>
            }
          >
            <div className="row-between" style={{ marginBottom: 'var(--sp-3)' }}>
              <span className="row">
                <span className="count-row__icon count-row__icon--info">
                  <Icon name="domain" size={18} />
                </span>
                <strong>Dự án: The Nexus Tower</strong>
              </span>
              <Badge tone="info">Đang thực hiện</Badge>
            </div>

            <div className="progress-list">
              {[
                ['Loại thực thể', 'Mã'],
                ['Mã', 'PRJ-2024-0001'],
                ['Chủ đầu tư', 'PI Holding'],
                ['Giá trị hợp đồng', '325.6 tỷ VND'],
                ['Ngày bắt đầu', '01/01/2024'],
                ['Ngày kết thúc dự kiến', '30/09/2025'],
                ['Trạng thái', 'Đang thực hiện'],
              ].map(([k, v]) => (
                <div className="progress-list__row" key={k} style={{ gridTemplateColumns: '1fr auto' }}>
                  <span className="text-caption">{k}</span>
                  <span style={{ fontWeight: 500 }}>{v}</span>
                </div>
              ))}
              <div className="progress-list__row" style={{ gridTemplateColumns: '1fr auto' }}>
                <span className="text-caption">Mức độ tin cậy</span>
                <span className="row">
                  {[1, 2, 3, 4].map((s) => (
                    <Icon key={s} name="star" size={16} filled color="var(--warning)" />
                  ))}
                  <Icon name="star_half" size={16} filled color="var(--warning)" />
                </span>
              </div>
            </div>

            <div className="row" style={{ marginTop: 'var(--sp-3)', flexWrap: 'wrap' }}>
              <span className="text-caption">Tags</span>
              <Badge tone="info">Dự án cao tầng</Badge>
              <Badge tone="info">Hà Nội</Badge>
              <Badge tone="info">Khu đô thị</Badge>
              <button className="card__link" type="button">
                <Icon name="add" size={16} />
              </button>
            </div>
          </Card>

          <Card title="Phân loại thực thể" link={{ label: 'Xem chi tiết' }}>
            <DonutChart
              data={entityTypes}
              size={150}
              thickness={26}
              centerValue="24,358"
              centerLabel="Tổng thực thể"
              showPercent={false}
            />
          </Card>
        </div>

        <div className="dash-col">
          <Card title="Mối quan hệ (Top 10)" link={{ label: 'Xem tất cả' }} flush>
            <table className="table table--dense">
              <thead>
                <tr>
                  <th>Thực thể liên quan</th>
                  <th>Loại quan hệ</th>
                  <th style={{ width: 110 }}>Độ tin cậy</th>
                </tr>
              </thead>
              <tbody>
                {graphRelations.map((r) => (
                  <tr key={r.id}>
                    <td className="truncate">{r.entity}</td>
                    <td>{r.type}</td>
                    <td>
                      <ProgressBar value={r.confidence} size="sm" showValue />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card title="Nguồn dữ liệu" link={{ label: 'Xem chi tiết' }}>
            {graphSources.map((s) => (
              <div className="source-row" key={s.id}>
                <span className="truncate">{s.name}</span>
                <ProgressBar value={s.rate} tone="brand" size="sm" />
                <span className="source-row__value num">
                  {s.value} <span className="text-muted">({s.rate}%)</span>
                </span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div className="dash-grid dash-grid--main">
        <Card title="Timeline hoạt động của đồ thị" link={{ label: 'Xem chi tiết' }}>
          <LineChart
            labels={graphActivity.labels}
            height={190}
            showLegend
            series={[
              { name: 'Thực thể mới', color: 'var(--automation)', points: graphActivity.entities, area: true },
              { name: 'Mối quan hệ mới', color: 'var(--ai)', points: graphActivity.relations },
            ]}
          />
          <p className="text-caption" style={{ marginTop: 'var(--sp-2)' }}>
            30/05/2024 · Thực thể mới: <strong>842</strong> · Mối quan hệ mới: <strong>2,156</strong>
          </p>
        </Card>

        <Card title="Entity Type Cloud (Top 20)" link={{ label: 'Xem chi tiết' }}>
          <WordCloud words={graphWords} />
        </Card>

        <Card title="Đề xuất (AI Recommendations)" link={{ label: 'Xem tất cả' }}>
          {graphSuggestions.map((s) => (
            <div className="suggest-row" key={s.id}>
              <span className="suggest-row__icon">
                <Icon name={s.icon} size={18} />
              </span>
              <span className="suggest-row__body">
                {s.label}
                {s.sub && <span className="suggest-row__sub"> {s.sub}</span>}
              </span>
              <button className="card__link" type="button">
                Xem chi tiết
              </button>
            </div>
          ))}
        </Card>
      </div>
    </DashboardShell>
  )
}
