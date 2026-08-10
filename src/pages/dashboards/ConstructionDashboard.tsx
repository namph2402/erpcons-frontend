import { useState } from 'react'
import DashboardShell from './DashboardShell'
import {
  Badge,
  Card,
  DonutChart,
  GaugeChart,
  Icon,
  LineChart,
  ProgressBar,
  Select,
  StatCard,
} from '../../components/ui'
import { CountRowList, DocumentList, ProjectSelector } from '../../components/widgets'
import { constructionNav } from '../../data/dashboardNav'
import {
  constructionCostSplit,
  constructionDocs,
  constructionTasks,
  equipmentSplit,
  pmUser,
  projectSCurve,
  siteStatus,
  weatherForecast7d,
  workforceSplit,
} from '../../data/dashboards'
import { ganttTasks } from '../../data/mock'

const STATUS_MAP: Record<string, 'info' | 'success' | 'warning' | 'neutral'> = {
  'Đang thực hiện': 'info',
  'Chờ bắt đầu': 'neutral',
  'Hoàn thành': 'success',
}

/** 57 · Construction Dashboard — tổng quan dự án xây dựng */
export default function ConstructionDashboard() {
  const [scope, setScope] = useState('all')

  return (
    <DashboardShell
      navGroups={constructionNav}
      activeId="construction"
      user={pmUser}
      index="57."
      title="Construction Dashboard"
      subtitle="Tổng quan dự án xây dựng"
      selector={<ProjectSelector name="The Nexus Tower" />}
      dateRange="01/05/2024 - 31/05/2024"
      utilityIcons={[{ icon: 'download', label: 'Tải xuống' }]}
      updatedAt="21/05/2024 10:30"
      syncNote="Dữ liệu đồng bộ từ ERPcons"
    >
      <div className="dash-kpis">
        <StatCard layout="stacked" label="Tiến độ tổng thể" value="68.2%" icon="bar_chart" tone="info" ring={68} trend={{ direction: 'up', value: '6.4%', label: 'so với tháng trước' }} />
        <StatCard layout="stacked" label="Giá trị hợp đồng (GTHĐ)" value="325.6" unit="Tỷ VND" icon="savings" tone="success" trend={{ direction: 'flat', value: 'Không đổi' }} />
        <StatCard layout="stacked" label="Giá trị đã thực hiện (EV)" value="221.5" unit="Tỷ VND" icon="pie_chart" tone="ai" trend={{ direction: 'up', value: '12.6%', label: 'so với tháng trước' }} />
        <StatCard layout="stacked" label="Giá trị dự toán (BAC)" value="410.0" unit="Tỷ VND" icon="sync_alt" tone="warning" />
        <StatCard layout="stacked" label="Chi phí thực tế (AC)" value="198.7" unit="Tỷ VND" icon="payments" tone="danger" trend={{ direction: 'up', value: '8.6%', label: 'so với tháng trước' }} />
        <StatCard layout="stacked" label="Dự kiến hoàn thành" value="30/09/2024" icon="event_available" tone="neutral" hint="Còn 122 ngày" />
      </div>

      <div className="dash-grid dash-grid--main">
        <Card
          title="Tiến độ thi công (S-Curve)"
          action={
            <Select
              size="sm"
              variant="soft"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              options={[
                { value: 'all', label: 'Tổng thể' },
                { value: 'structure', label: 'Phần kết cấu' },
                { value: 'mep', label: 'Phần MEP' },
              ]}
            />
          }
        >
          <div className="chart-with-summary">
            <LineChart
              labels={projectSCurve.labels}
              height={230}
              showLegend
              series={[
                { name: 'Kế hoạch (Planned)', color: 'var(--info)', points: projectSCurve.planned },
                { name: 'Thực tế (Actual)', color: 'var(--success)', points: projectSCurve.actual },
                { name: 'Dự báo (Forecast)', color: 'var(--warning)', points: projectSCurve.forecast, dashed: true },
              ]}
            />
            <div className="summary-box">
              <p className="summary-box__row">
                Tiến độ kế hoạch <strong>68.2%</strong>
              </p>
              <p className="summary-box__row">
                Tiến độ thực tế <strong>68.2%</strong>
              </p>
              <p className="summary-box__row summary-box__row--accent">
                Chênh lệch <strong>+0.0%</strong>
              </p>
              <p className="summary-box__row">
                Dự kiến hoàn thành <strong>30/09/2024</strong>
              </p>
              <p className="summary-box__row">
                Độ tin cậy dự báo <strong>85%</strong>
              </p>
            </div>
          </div>
        </Card>

        <Card title="Phân bổ chi phí theo hạng mục" link={{ label: 'Xem chi tiết' }}>
          <DonutChart
            data={constructionCostSplit}
            size={150}
            thickness={26}
            centerValue="198.7"
            centerLabel="Tỷ VND"
            showPercent={false}
          />
          <div className="metric-grid" style={{ marginTop: 'var(--sp-4)' }}>
            <div className="metric-tile">
              <p className="metric-tile__label">CPI (Hiệu quả chi phí)</p>
              <p className="metric-tile__value num" style={{ color: 'var(--success)' }}>
                1.11
              </p>
              <p className="metric-tile__delta metric-tile__delta--up">&gt; 1: Hiệu quả</p>
            </div>
            <div className="metric-tile">
              <p className="metric-tile__label">SPI (Hiệu quả tiến độ)</p>
              <p className="metric-tile__value num" style={{ color: 'var(--success)' }}>
                1.03
              </p>
              <p className="metric-tile__delta metric-tile__delta--up">&gt; 1: Hiệu quả</p>
            </div>
          </div>
        </Card>

        <Card title="Tình hình công trường" link={{ label: 'Xem chi tiết' }}>
          <ul className="count-rows">
            {siteStatus.map((s) => (
              <li key={s.id}>
                <div className="count-row">
                  <span className={`count-row__icon count-row__icon--${s.tone}`}>
                    <Icon name={s.icon} size={18} />
                  </span>
                  <span className="count-row__body">
                    <span className="count-row__label truncate">{s.label}</span>
                  </span>
                  <span className="count-row__value num">
                    {s.value}
                    <span className="stat-card__unit">{s.unit}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="site-photo" style={{ aspectRatio: '16 / 6', marginTop: 'var(--sp-3)' }}>
            <span className="row" style={{ color: 'var(--white)' }}>
              <Icon name="videocam" size={20} />
              Camera AI · 12 camera online
            </span>
          </div>
        </Card>
      </div>

      <div className="dash-grid dash-grid--main">
        <Card title="Hoạt động chính" link={{ label: 'Xem tất cả' }} flush>
          <table className="table table--dense">
            <thead>
              <tr>
                <th style={{ width: 40 }}>STT</th>
                <th>Hạng mục công việc</th>
                <th style={{ width: 130 }}>Tiến độ</th>
                <th style={{ width: 130 }}>Trạng thái</th>
                <th style={{ width: 120 }}>Phụ trách</th>
                <th style={{ width: 120 }}>Hạn hoàn thành</th>
              </tr>
            </thead>
            <tbody>
              {constructionTasks.map((t) => (
                <tr key={t.id}>
                  <td className="num">{t.id}</td>
                  <td>{t.name}</td>
                  <td>
                    <ProgressBar
                      value={t.progress}
                      tone={t.progress === 100 ? 'success' : 'info'}
                      size="sm"
                      showValue
                    />
                  </td>
                  <td>
                    <Badge tone={STATUS_MAP[t.status] ?? 'neutral'}>{t.status}</Badge>
                  </td>
                  <td>{t.owner}</td>
                  <td className="num">{t.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Vấn đề & Rủi ro" link={{ label: 'Xem tất cả' }}>
          <CountRowList
            groupLabel="Vấn đề"
            rows={[
              { id: 'ci1', label: 'Thiếu vật tư thép D20', count: 3, tone: 'danger' },
              { id: 'ci2', label: 'Chậm duyệt bản vẽ shopdrawing', count: 2, tone: 'warning' },
              { id: 'ci3', label: 'Thời tiết mưa nhiều ảnh hưởng tiến độ', count: 1, tone: 'info' },
            ]}
          />
          <CountRowList
            groupLabel="Rủi ro"
            rows={[
              { id: 'cr1', label: 'Rủi ro chậm tiến độ', count: 2, tone: 'danger' },
              { id: 'cr2', label: 'Rủi ro tăng giá vật liệu', count: 2, tone: 'warning' },
              { id: 'cr3', label: 'Rủi ro an toàn lao động', count: 1, tone: 'info' },
            ]}
          />
        </Card>

        <Card title="Nhân lực và thiết bị" link={{ label: 'Xem chi tiết' }}>
          <div className="dash-grid dash-grid--2">
            <div>
              <p className="text-caption" style={{ marginBottom: 'var(--sp-2)' }}>
                Nhân lực theo loại
              </p>
              <DonutChart
                data={workforceSplit}
                size={110}
                thickness={20}
                centerValue="142"
                centerLabel="Người"
                legend="bottom"
                showPercent={false}
              />
            </div>
            <div>
              <p className="text-caption" style={{ marginBottom: 'var(--sp-2)' }}>
                Thiết bị thi công
              </p>
              <DonutChart
                data={equipmentSplit}
                size={110}
                thickness={20}
                centerValue="32"
                centerLabel="Thiết bị"
                legend="bottom"
                showPercent={false}
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="dash-grid dash-grid--main">
        <Card title="Dự báo thời tiết (7 ngày tới)" link={{ label: 'Xem chi tiết' }}>
          <div className="forecast-7d">
            {weatherForecast7d.map((w) => (
              <div key={w.day}>
                <p className="forecast-7d__day">{w.day}</p>
                <p className="forecast-7d__date num">{w.date}</p>
                <Icon name={w.icon} size={24} className="forecast-7d__icon" />
                <p className="forecast-7d__high num">{w.high}</p>
                <p className="forecast-7d__low num">{w.low}</p>
                <p className="forecast-7d__rain num">{w.rain}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Lịch thi công tổng thể (Gantt)" link={{ label: 'Xem chi tiết' }}>
          <div className="progress-list">
            <div className="progress-list__head">
              <span>Hạng mục</span>
              <span>Tiến độ</span>
              <span>%</span>
            </div>
            {ganttTasks
              .filter((t) => t.level === 0)
              .concat(
                ganttTasks.filter((t) => t.level === 1).slice(0, 3),
              )
              .slice(0, 6)
              .map((t) => (
                <div className="progress-list__row" key={t.id}>
                  <span className="truncate">{t.name}</span>
                  <ProgressBar
                    value={t.progress}
                    tone={t.progress === 100 ? 'success' : t.progress > 0 ? 'info' : 'warning'}
                    size="sm"
                  />
                  <span className="progress-list__value num">{t.progress}%</span>
                </div>
              ))}
          </div>
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
              Chưa bắt đầu
            </li>
          </ul>
        </Card>

        <Card title="Tài liệu cần chú ý" link={{ label: 'Xem tất cả' }}>
          <DocumentList items={constructionDocs} />
        </Card>
      </div>

      <div className="dash-grid dash-grid--3">
        <Card title="An toàn lao động">
          <GaugeChart
            value={125}
            max={150}
            variant="semi"
            color="var(--success)"
            label="ngày an toàn liên tục"
            size={180}
            showBounds
          />
        </Card>
        <Card title="Chất lượng (tỷ lệ đạt nghiệm thu)">
          <GaugeChart
            value={96.4}
            max={100}
            variant="ring"
            color="var(--info)"
            label="Đạt nghiệm thu"
            size={150}
            formatValue={(v) => `${v}%`}
          />
        </Card>
        <Card title="Rủi ro tổng hợp">
          <GaugeChart
            value={1.03}
            max={2}
            variant="semi"
            size={180}
            segments={[
              { to: 0.9, color: 'var(--danger)' },
              { to: 1.1, color: 'var(--warning)' },
              { to: 2, color: 'var(--success)' },
            ]}
            label="SPI tổng thể"
          />
        </Card>
      </div>
    </DashboardShell>
  )
}
