import DashboardShell from './DashboardShell'
import {
  Badge,
  Card,
  DonutChart,
  Icon,
  LineChart,
  ProgressBar,
  StatCard,
  Tabs,
} from '../../components/ui'
import {
  ActivityFeed,
  CountRowList,
  ProjectSelector,
} from '../../components/widgets'
import { projectDashboardNav } from '../../data/dashboardNav'
import {
  pmUser,
  projectBudgetSplit,
  projectCashflow,
  projectIssues,
  projectMainTasks,
  projectMilestones,
  projectRisks,
  projectSCurve,
  projectTaskStatus,
} from '../../data/dashboards'
import { projectActivities, projects } from '../../data/mock'
import { useState } from 'react'

const STATUS_MAP: Record<string, 'info' | 'success' | 'warning' | 'neutral'> = {
  'Đang thực hiện': 'info',
  'Chờ phản hồi': 'warning',
  'Chưa bắt đầu': 'neutral',
  'Hoàn thành': 'success',
}

/** 55 · Project Dashboard — tổng quan dự án theo thời gian thực */
export default function ProjectDashboard() {
  const [period, setPeriod] = useState('month')

  return (
    <DashboardShell
      navGroups={projectDashboardNav}
      activeId="project"
      user={pmUser}
      index="55."
      title="Project Dashboard"
      subtitle="Tổng quan dự án theo thời gian thực"
      breadcrumbs={[{ label: 'Projects', href: '#/du-an' }, { label: 'The Nexus Tower' }]}
      selector={<ProjectSelector name="The Nexus Tower" />}
      dateRange="01/05/2024 - 31/05/2024"
      utilityIcons={[
        { icon: 'download', label: 'Tải xuống' },
        { icon: 'share', label: 'Chia sẻ' },
      ]}
      updatedAt="31/05/2024 10:30"
      syncNote="Dữ liệu đồng bộ từ ERPcons"
      sidebarExtra={
        <div className="sidenav__extra">
          <p className="sidenav__extra-title">Dự án hiện hữu</p>
          {projects.slice(0, 5).map((p, i) => (
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
                <span className="sidenav__project-code">{p.status}</span>
              </span>
            </a>
          ))}
          <a className="sidenav__extra-link" href="#/du-an">
            Xem tất cả dự án
          </a>
        </div>
      }
    >
      <div className="dash-kpis">
        <StatCard
          layout="stacked"
          label="Tiến độ tổng thể"
          value="68%"
          tone="info"
          ring={68}
          hint="Đang thi công"
          trend={{ direction: 'up', value: '6%', label: 'so với tháng trước' }}
        />
        <StatCard
          layout="stacked"
          label="Giá trị hợp đồng (GTHĐ)"
          value="325.6"
          unit="Tỷ VND"
          tone="neutral"
          trend={{ direction: 'flat', value: 'Không đổi' }}
        />
        <StatCard
          layout="stacked"
          label="Giá trị đã thực hiện (EV)"
          value="221.5"
          unit="Tỷ VND"
          tone="success"
          trend={{ direction: 'up', value: '12.4%', label: 'so với tháng trước' }}
        />
        <StatCard
          layout="stacked"
          label="Chi phí thực tế (AC)"
          value="198.7"
          unit="Tỷ VND"
          tone="warning"
          trend={{ direction: 'up', value: '8.6%', label: 'so với tháng trước' }}
        />
        <StatCard
          layout="stacked"
          label="Dự toán còn lại (EAC - EV)"
          value="104.1"
          unit="Tỷ VND"
          tone="danger"
          trend={{ direction: 'down', value: '-3.2%', label: 'so với tháng trước' }}
        />
        <StatCard
          layout="stacked"
          label="Dự kiến hoàn thành"
          value="30/09/2024"
          tone="ai"
          hint="Còn 122 ngày"
        />
      </div>

      <div className="dash-grid dash-grid--main">
        <Card
          title="Tiến độ thi công"
          action={
            <Tabs
              variant="pill"
              value={period}
              onChange={setPeriod}
              items={[
                { id: 'week', label: 'Tuần' },
                { id: 'month', label: 'Tháng' },
                { id: 'quarter', label: 'Quý' },
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
              <p className="summary-box__title">Tổng quan</p>
              <p className="summary-box__row">
                Tiến độ kế hoạch <strong>62%</strong>
              </p>
              <p className="summary-box__row">
                Tiến độ thực tế <strong>68%</strong>
              </p>
              <p className="summary-box__row summary-box__row--accent">
                Chênh lệch <strong>+6%</strong>
              </p>
              <p className="summary-box__row">
                Dự báo hoàn thành <strong>30/09/2024</strong>
              </p>
              <p className="summary-box__row">
                Độ tin cậy dự báo <strong>85%</strong>
              </p>
            </div>
          </div>
        </Card>

        <Card title="Ngân sách & Chi phí" link={{ label: 'Xem chi tiết' }}>
          <DonutChart
            data={projectBudgetSplit}
            size={150}
            thickness={26}
            centerValue="325.6"
            centerLabel="Tỷ VND · GTHĐ"
            showPercent={false}
          />
          <div className="metric-grid" style={{ marginTop: 'var(--sp-4)' }}>
            <div className="metric-tile">
              <p className="metric-tile__label">Chỉ số CPI</p>
              <p className="metric-tile__value num">1.11</p>
              <p className="metric-tile__delta metric-tile__delta--up">Hiệu quả chi phí</p>
            </div>
            <div className="metric-tile">
              <p className="metric-tile__label">Chỉ số SPI</p>
              <p className="metric-tile__value num">1.10</p>
              <p className="metric-tile__delta metric-tile__delta--up">Hiệu quả tiến độ</p>
            </div>
          </div>
        </Card>

        <Card title="Công việc theo trạng thái" link={{ label: 'Xem chi tiết' }}>
          <DonutChart
            data={projectTaskStatus}
            size={150}
            thickness={26}
            centerValue="284"
            centerLabel="Tổng công việc"
            showPercent={false}
          />
          <p className="text-caption" style={{ marginTop: 'var(--sp-3)', textAlign: 'center' }}>
            <Badge tone="danger">Quá hạn 9 (3%)</Badge>
          </p>
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
              {projectMainTasks.map((t) => (
                <tr key={t.id}>
                  <td className="num">{t.id}</td>
                  <td>{t.name}</td>
                  <td>
                    <ProgressBar value={t.progress} size="sm" showValue />
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
          <CountRowList rows={projectIssues} groupLabel="Vấn đề" />
          <CountRowList rows={projectRisks} groupLabel="Rủi ro" />
        </Card>

        <Card
          title="Hình ảnh công trường"
          subtitle="(Cập nhật: Hôm nay 09:30)"
          link={{ label: 'Xem tất cả' }}
        >
          <div className="site-photos">
            {Array.from({ length: 6 }, (_, i) => (
              <div className="site-photo" key={i}>
                <Icon name="photo_camera" size={24} />
              </div>
            ))}
          </div>
          <button className="card__link" type="button" style={{ marginTop: 'var(--sp-3)' }}>
            <Icon name="collections" size={16} />
            Mở thư viện ảnh
          </button>
        </Card>
      </div>

      <div className="dash-grid dash-grid--main">
        <Card title="Dòng tiền dự án" link={{ label: 'Xem chi tiết' }}>
          <div className="chart-with-summary">
            <LineChart
              labels={projectCashflow.labels}
              height={190}
              showLegend
              series={[
                { name: 'Kế hoạch', color: 'var(--info)', points: projectCashflow.planned },
                { name: 'Thực tế', color: 'var(--success)', points: projectCashflow.actual },
                { name: 'Dự báo', color: 'var(--warning)', points: projectCashflow.forecast, dashed: true },
              ]}
            />
            <div className="summary-box">
              <p className="summary-box__row">
                Tổng kế hoạch <strong>325.6 Tỷ</strong>
              </p>
              <p className="summary-box__row">
                Thực tế lũy kế <strong>158.2 Tỷ</strong>
              </p>
              <p className="summary-box__row">
                Đã thanh toán <strong>158.2 Tỷ</strong>
              </p>
              <p className="summary-box__row summary-box__row--accent">
                Dự báo đến hoàn thành <strong>325.6 Tỷ</strong>
              </p>
            </div>
          </div>
        </Card>

        <Card title="Cột mốc sắp tới" link={{ label: 'Xem tất cả' }}>
          <ul className="count-rows">
            {projectMilestones.map((m) => (
              <li key={m.id}>
                <div className="count-row">
                  <span className="count-row__icon count-row__icon--info">
                    <Icon name="flag" size={18} />
                  </span>
                  <span className="count-row__body">
                    <span className="count-row__label truncate">{m.label}</span>
                    <span className="count-row__sub num">{m.date}</span>
                  </span>
                  <span className="count-row__value" style={{ fontSize: 'var(--fs-caption-2)' }}>
                    {m.remain}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Hoạt động mới nhất" link={{ label: 'Xem tất cả' }}>
          <ActivityFeed items={projectActivities} lead="avatar" />
        </Card>
      </div>
    </DashboardShell>
  )
}
