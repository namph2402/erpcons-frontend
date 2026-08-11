import { useState } from 'react'
import DashboardShell from './DashboardShell'
import { COMPARE_OPTIONS } from '../../data/dashboardNav'
import {
  Badge,
  Card,
  DonutChart,
  GaugeChart,
  Icon,
  LineChart,
  ProgressBar,
  SearchInput,
  Select,
  StatCard,
} from '../../components/ui'
import { DeviceMap } from '../../components/widgets'
import {
  gateways,
  iotAlarmHistory,
  iotDeviceStatus,
  iotDeviceTypes,
  iotDevices,
  iotRealtimeValues,
  iotSensorLabels,
  iotSensorSeries,
  iotTopAlarms,
  iotUser,
} from '../../data/dashboards'

const IOT_KPIS = [
  { id: 'total', label: 'Tổng thiết bị', value: '1,248', unit: 'Thiết bị', icon: 'developer_board', tone: 'info' as const, trend: { direction: 'up' as const, value: '8.6%', label: 'so với kỳ trước' }, spark: [1050, 1080, 1110, 1140, 1170, 1200, 1225, 1248] },
  { id: 'online', label: 'Thiết bị online', value: '1,067', unit: '85.6%', icon: 'check_circle', tone: 'success' as const, trend: { direction: 'up' as const, value: '5.3%', label: 'so với kỳ trước' }, spark: [900, 930, 960, 985, 1010, 1035, 1052, 1067] },
  { id: 'warning', label: 'Thiết bị cảnh báo', value: '28', unit: '2.2%', icon: 'warning', tone: 'warning' as const, trend: { direction: 'up' as const, value: '12.0%', label: 'so với kỳ trước' }, spark: [18, 20, 19, 22, 24, 25, 27, 28] },
  { id: 'error', label: 'Thiết bị lỗi', value: '15', unit: '1.2%', icon: 'error', tone: 'danger' as const, trend: { direction: 'down' as const, value: '6.3%', label: 'so với kỳ trước' }, spark: [22, 21, 20, 19, 18, 17, 16, 15] },
  { id: 'gateway', label: 'Gateway hoạt động', value: '36', unit: 'Gateway', icon: 'router', tone: 'automation' as const, trend: { direction: 'up' as const, value: '2.8%', label: 'so với kỳ trước' }, spark: [30, 31, 32, 33, 34, 35, 36, 36] },
  { id: 'data', label: 'Dữ liệu thu thập', value: '2.45', unit: 'TB', icon: 'database', tone: 'iot' as const, trend: { direction: 'up' as const, value: '18.7%', label: 'so với kỳ trước' }, spark: [1.4, 1.6, 1.75, 1.9, 2.05, 2.2, 2.35, 2.45] },
]

const DEVICE_STATUS_TONE: Record<string, 'success' | 'warning' | 'danger' | 'neutral'> = {
  Online: 'success',
  'Cảnh báo': 'warning',
  Lỗi: 'danger',
  Offline: 'neutral',
}

const ALARM_STATUS_TONE: Record<string, 'danger' | 'warning' | 'success'> = {
  'Chưa xử lý': 'danger',
  'Đang xử lý': 'warning',
  'Đã xác nhận': 'success',
}

const MAP_MARKERS = [
  { id: 'm1', x: 22, y: 26, label: 'Hà Nội', count: 48, tone: 'info' as const },
  { id: 'm2', x: 62, y: 18, label: 'Khu A', count: 6, tone: 'success' as const },
  { id: 'm3', x: 15, y: 52, label: 'Cảnh báo khu B', count: '!', tone: 'warning' as const },
  { id: 'm4', x: 34, y: 58, label: 'Tầng hầm', count: 5, tone: 'info' as const },
  { id: 'm5', x: 47, y: 47, label: 'Trạm điện', count: 8, tone: 'info' as const },
  { id: 'm6', x: 58, y: 44, label: 'Lỗi camera', count: '!', tone: 'danger' as const },
  { id: 'm7', x: 74, y: 40, label: 'Bình Dương', count: 72, tone: 'warning' as const },
  { id: 'm8', x: 66, y: 62, label: 'Hồ Chí Minh', count: 24, tone: 'info' as const },
  { id: 'm9', x: 18, y: 72, label: 'Kho vật tư', count: 3, tone: 'success' as const },
  { id: 'm10', x: 52, y: 72, label: 'Cổng chính', count: 8, tone: 'info' as const },
]

/** 59 · IoT Dashboard — tổng quan hệ thống thiết bị & cảm biến */
export default function IotDashboard() {
  const [mapFilter, setMapFilter] = useState('all')
  const [sensor, setSensor] = useState('temp')

  return (
    <DashboardShell
      activeId="dashboard-iot"
      user={iotUser}
      title="Thiết bị IoT"
      tag={{ label: 'IoT', tone: 'info' }}
      subtitle="Tổng quan hệ thống thiết bị & cảm biến"
      dateRange="01/05/2024 - 31/05/2024"
      compare={{
        options: [{ value: 'all', label: 'Tất cả dự án' }, ...COMPARE_OPTIONS],
        value: 'all',
      }}
      utilityIcons={[{ icon: 'refresh', label: 'Làm mới' }]}
      updatedAt="31/05/2024 10:30:45"
      syncNote="Dữ liệu được thu thập mỗi 10 giây"
    >
      <div className="dash-kpis">
        {IOT_KPIS.map((k) => (
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
        <Card title="Tình trạng thiết bị" link={{ label: 'Xem chi tiết' }}>
          <DonutChart
            data={iotDeviceStatus}
            size={150}
            thickness={26}
            centerValue="1,248"
            centerLabel="Tổng thiết bị"
            showPercent={false}
          />
        </Card>

        <Card
          title="Dữ liệu cảm biến theo thời gian thực"
          action={
            <Select
              size="sm"
              variant="soft"
              value={sensor}
              onChange={(e) => setSensor(e.target.value)}
              options={[
                { value: 'temp', label: 'Nhiệt độ (°C)' },
                { value: 'hum', label: 'Độ ẩm (%)' },
                { value: 'co2', label: 'CO2 (ppm)' },
              ]}
            />
          }
        >
          <LineChart
            labels={iotSensorLabels}
            height={190}
            series={[{ name: 'Nhiệt độ', color: 'var(--info)', points: iotSensorSeries, area: true }]}
          />
          <div className="summary-box" style={{ marginTop: 'var(--sp-2)' }}>
            <p className="summary-box__row">
              10:30 · Nhiệt độ (°C) <strong>32.5°C</strong>
            </p>
            <p className="summary-box__row">
              Thiết bị <strong>TEMP-001</strong>
            </p>
          </div>
        </Card>

        <Card title="Phân loại thiết bị">
          <DonutChart
            data={iotDeviceTypes}
            size={150}
            thickness={26}
            showPercent={false}
          />
        </Card>
      </div>

      <div className="dash-grid dash-grid--main">
        <Card title="Bản đồ thiết bị">
          <DeviceMap
            markers={MAP_MARKERS}
            height={280}
            activeFilter={mapFilter}
            onFilterChange={setMapFilter}
            filters={[
              { id: 'all', label: 'Tất cả' },
              { id: 'online', label: 'Online' },
              { id: 'warning', label: 'Cảnh báo' },
              { id: 'error', label: 'Lỗi' },
            ]}
          />
        </Card>

        <Card
          title="Danh sách thiết bị"
          action={<SearchInput placeholder="Tìm kiếm thiết bị..." shortcut="" />}
          flush
          footer={
            <a className="card__link" href="#/dashboard/iot">
              Xem tất cả thiết bị
              <Icon name="chevron_right" size={16} />
            </a>
          }
        >
          <table className="table table--dense">
            <thead>
              <tr>
                <th>Thiết bị</th>
                <th>Loại thiết bị</th>
                <th>Trạng thái</th>
                <th>Vị trí</th>
                <th style={{ width: 110 }}>Pin</th>
              </tr>
            </thead>
            <tbody>
              {iotDevices.map((d) => (
                <tr key={d.id}>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{d.id}</td>
                  <td>{d.type}</td>
                  <td>
                    <Badge tone={DEVICE_STATUS_TONE[d.status]}>{d.status}</Badge>
                  </td>
                  <td>{d.location}</td>
                  <td>
                    <ProgressBar
                      value={d.battery}
                      tone={d.battery > 50 ? 'success' : d.battery > 20 ? 'warning' : 'danger'}
                      size="sm"
                      showValue
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Top 5 thiết bị cảnh báo" link={{ label: 'Xem tất cả' }}>
          <ul className="count-rows">
            {iotTopAlarms.map((a) => (
              <li key={a.id}>
                <div className="count-row">
                  <span className={`count-row__icon count-row__icon--${a.tone}`}>
                    <Icon name={a.icon} size={18} />
                  </span>
                  <span className="count-row__body">
                    <span className="count-row__label" style={{ fontFamily: 'var(--font-mono)' }}>
                      {a.id}
                    </span>
                    <span className="count-row__sub">{a.name}</span>
                  </span>
                  <span className="count-row__value num">
                    {a.value}
                    <br />
                    <span className="count-row__sub">{a.time}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="dash-grid dash-grid--main">
        <Card title="Lịch sử cảnh báo (24 giờ qua)" link={{ label: 'Xem tất cả' }} flush>
          <table className="table table--dense">
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Thiết bị</th>
                <th>Loại cảnh báo</th>
                <th>Mức độ</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {iotAlarmHistory.map((a) => (
                <tr key={a.id}>
                  <td className="num">{a.time}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{a.device}</td>
                  <td>{a.type}</td>
                  <td style={{ color: a.level === 'Cao' ? 'var(--danger)' : 'var(--warning)', fontWeight: 600 }}>
                    {a.level}
                  </td>
                  <td>
                    <Badge tone={ALARM_STATUS_TONE[a.status]}>{a.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Hiệu suất hệ thống" link={{ label: 'Xem chi tiết' }}>
          <div className="dash-grid dash-grid--3">
            <GaugeChart value={98} variant="ring" size={96} thickness={10} color="var(--success)" label="Kết nối mạng" sublabel="Rất tốt" formatValue={(v) => `${v}%`} />
            <GaugeChart value={96} variant="ring" size={96} thickness={10} color="var(--success)" label="Thu thập dữ liệu" sublabel="Rất tốt" formatValue={(v) => `${v}%`} />
            <GaugeChart value={79} variant="ring" size={96} thickness={10} color="var(--warning)" label="Lưu trữ dữ liệu" sublabel="Tốt" formatValue={(v) => `${v}%`} />
          </div>
          <div className="metric-grid" style={{ marginTop: 'var(--sp-4)' }}>
            <div className="metric-tile">
              <p className="metric-tile__label">Gateway</p>
              <p className="metric-tile__value num">36</p>
            </div>
            <div className="metric-tile">
              <p className="metric-tile__label">Dữ liệu/tháng</p>
              <p className="metric-tile__value num">2.45 TB</p>
            </div>
            <div className="metric-tile">
              <p className="metric-tile__label">Điểm dữ liệu/ngày</p>
              <p className="metric-tile__value num">1.2M</p>
            </div>
            <div className="metric-tile">
              <p className="metric-tile__label">Độ trễ trung bình</p>
              <p className="metric-tile__value num">256 ms</p>
            </div>
          </div>
        </Card>

        <Card title="Tình trạng Gateway" link={{ label: 'Xem tất cả' }} flush>
          <table className="table table--dense">
            <thead>
              <tr>
                <th>Gateway</th>
                <th>Vị trí</th>
                <th>Trạng thái</th>
                <th style={{ textAlign: 'right' }}>Uptime</th>
                <th style={{ textAlign: 'center' }}>Tín hiệu</th>
              </tr>
            </thead>
            <tbody>
              {gateways.map((g) => (
                <tr key={g.id}>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{g.id}</td>
                  <td>{g.location}</td>
                  <td>
                    <Badge tone={DEVICE_STATUS_TONE[g.status]}>{g.status}</Badge>
                  </td>
                  <td className="num" style={{ textAlign: 'right' }}>
                    {g.uptime}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`signal${g.signal <= 2 ? ' signal--weak' : ''}`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <i key={n} className={n <= g.signal ? 'is-on' : undefined} />
                      ))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <Card title="Giá trị cảm biến thời gian thực" link={{ label: 'Xem tất cả' }}>
        {iotRealtimeValues.map((s) => (
          <div className="sensor-row" key={s.id}>
            <span className="sensor-row__icon">
              <Icon name={s.icon} size={18} />
            </span>
            <span>
              <span className="sensor-row__label">{s.label}</span>
              <br />
              <span className="sensor-row__id">{s.id}</span>
            </span>
            <span className="sensor-row__value num">
              {s.value}
              <span className="sensor-row__unit">{s.unit}</span>
            </span>
            <span className={`sensor-row__delta sensor-row__delta--${s.up ? 'up' : 'down'}`}>
              {s.delta}
            </span>
            <LineChart
              minimal
              height={30}
              series={[
                { name: s.label, color: s.up ? 'var(--danger)' : 'var(--success)', points: s.spark },
              ]}
            />
          </div>
        ))}
      </Card>
    </DashboardShell>
  )
}
