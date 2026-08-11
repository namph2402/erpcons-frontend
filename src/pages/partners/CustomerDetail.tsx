import { useState } from 'react'
import PartnerShell from './PartnerShell'
import {
  Badge,
  BarChart,
  Button,
  Card,
  DataTable,
  DonutChart,
  Icon,
  LineChart,
  Tabs,
} from '../../components/ui'
import type { Column } from '../../components/ui'
import { ActivityFeed, DocumentList } from '../../components/widgets'
import './partners.css'

const TABS = [
  { id: 'overview', label: 'Tổng quan' },
  { id: 'info', label: 'Thông tin' },
  { id: 'contacts', label: 'Liên hệ', count: 6 },
  { id: 'opportunities', label: 'Cơ hội', count: 8 },
  { id: 'quotes', label: 'Báo giá', count: 5 },
  { id: 'contracts', label: 'Hợp đồng', count: 4 },
  { id: 'orders', label: 'Đơn hàng', count: 12 },
  { id: 'invoices', label: 'Hóa đơn', count: 18 },
  { id: 'debt', label: 'Công nợ' },
  { id: 'history', label: 'Lịch sử giao dịch' },
  { id: 'docs', label: 'Tài liệu' },
]

const REVENUE = {
  labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
  y2023: [3.2, 4.6, 4.1, 4.4, 4.2, 4.6, 4.5, 4.7, 4.4, 4.9, 2.1, 4.6],
  y2024: [2.8, 3.4, 4.4, 6.2, 5.4, 6.5, 5.9, 6.2, 6.0, 6.8, 3.6, 0],
}

interface ContractRow extends Record<string, unknown> {
  id: string
  code: string
  name: string
  value: string
  from: string
  to: string
  status: string
}

const CONTRACTS: ContractRow[] = [
  { id: '1', code: 'HD-2024-0012', name: 'The Nexus Tower - Gói kết cấu', value: '12,500,000,000', from: '15/03/2024', to: '30/09/2024', status: 'Đang thực hiện' },
  { id: '2', code: 'HD-2024-0008', name: 'Cung cấp vật liệu xây thô 2024', value: '4,800,000,000', from: '01/04/2024', to: '31/12/2024', status: 'Đang thực hiện' },
  { id: '3', code: 'HD-2024-0005', name: 'Dịch vụ bảo trì định kỳ MEP', value: '920,000,000', from: '10/02/2024', to: '09/02/2025', status: 'Hiệu lực' },
  { id: '4', code: 'HD-2023-0021', name: 'Thi công hoàn thiện văn phòng', value: '680,000,000', from: '05/12/2023', to: '04/06/2024', status: 'Sắp hết hạn' },
]

const OPPORTUNITIES = [
  { id: 'o1', name: 'Dự án The Nexus Tower - Gói thầu kết cấu', value: '18.50 tỷ VND', rate: '80%', status: 'Đang đàm phán', tone: 'success' as const, date: '30/05/2024', icon: 'domain' },
  { id: 'o2', name: 'Cung cấp vật liệu xây thô Q3/2024', value: '2.80 tỷ VND', rate: '60%', status: 'Đề xuất', tone: 'info' as const, date: '20/05/2024', icon: 'inventory_2' },
  { id: 'o3', name: 'Dịch vụ bảo trì hệ thống MEP', value: '1.20 tỷ VND', rate: '40%', status: 'Khảo sát', tone: 'warning' as const, date: '15/05/2024', icon: 'build' },
  { id: 'o4', name: 'Thi công hoàn thiện nội thất văn phòng', value: '950 triệu VND', rate: '30%', status: 'Mới', tone: 'default' as const, date: '10/05/2024', icon: 'chair' },
]

const DEBT_SPLIT = [
  { label: 'Trong hạn', value: 1.9, color: 'var(--success)', note: '1.90 tỷ', extra: '81%' },
  { label: 'Quá hạn 1-30 ngày', value: 0.3, color: 'var(--warning)', note: '300 tr', extra: '13%' },
  { label: 'Quá hạn 31-60 ngày', value: 0.1, color: '#f97316', note: '100 tr', extra: '4%' },
  { label: 'Quá hạn > 60 ngày', value: 0.05, color: 'var(--danger)', note: '50 tr', extra: '2%' },
]

const ACTIVITIES = [
  { id: 'a1', actor: 'Trần Minh Đức', action: 'Gọi điện chăm sóc khách hàng — trao đổi tiến độ dự án The Nexus Tower', time: 'Hôm nay, 09:30', icon: 'call', tone: 'success' as const },
  { id: 'a2', actor: 'Lê Hải Đăng', action: 'Gửi báo giá BG-2024-0056 — Gói vật tư hoàn thiện', time: '20/05/2024, 14:15', icon: 'mail', tone: 'info' as const },
  { id: 'a3', actor: 'Phạm Quang Huy', action: 'Hợp đồng HD-2024-0012 được ký — Gói thầu kết cấu', time: '18/05/2024, 16:45', icon: 'contract', tone: 'ai' as const },
  { id: 'a4', actor: 'Trần Minh Đức', action: 'Hóa đơn INV-2024-0456 đã thanh toán — 1,250,000,000 VND', time: '18/05/2024, 10:20', icon: 'payments', tone: 'warning' as const },
  { id: 'a5', actor: 'Trần Minh Đức', action: 'Ghi chú nội bộ — Khách hàng hài lòng về tiến độ dự án', time: '17/05/2024, 11:05', icon: 'sticky_note_2', tone: 'neutral' as const },
]

const CONTACTS = [
  { id: 'c1', name: 'Trần Văn B', role: 'Giám đốc', phone: '0909 123 456', email: 'tranvb@abc.com.vn' },
  { id: 'c2', name: 'Phạm Thị C', role: 'Kế toán trưởng', phone: '0908 987 654', email: 'ketoan@abc.com.vn' },
]

const DOCS = [
  { id: 'd1', name: 'Hợp đồng HD-2024-0012', ext: 'pdf', size: '2.4 MB', meta: '18/05/2024' },
  { id: 'd2', name: 'Báo giá BG-2024-0056', ext: 'pdf', size: '1.8 MB', meta: '20/05/2024' },
  { id: 'd3', name: 'Hóa đơn INV-2024-0456', ext: 'pdf', size: '1.2 MB', meta: '18/05/2024' },
  { id: 'd4', name: 'Biên bản nghiệm thu BB-2024-001', ext: 'pdf', size: '1.6 MB', meta: '16/05/2024' },
  { id: 'd5', name: 'Catalogue sản phẩm 2024', ext: 'pdf', size: '5.1 MB', meta: '10/05/2024' },
]

/** Khách hàng 360° — Erpcons/page/khách hàng.jpg */
export default function CustomerDetail() {
  const [tab, setTab] = useState('overview')

  const contractColumns: Column<ContractRow>[] = [
    { key: 'code', header: 'Mã hợp đồng', width: '150px', render: (r) => <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--info)' }}>{r.code}</span> },
    { key: 'name', header: 'Tên hợp đồng' },
    { key: 'value', header: 'Giá trị (VND)', width: '160px', align: 'right', render: (r) => <span className="num">{r.value}</span> },
    { key: 'from', header: 'Ngày hiệu lực', width: '130px' },
    { key: 'to', header: 'Ngày hết hạn', width: '130px' },
    {
      key: 'status',
      header: 'Trạng thái',
      width: '150px',
      render: (r) => (
        <Badge tone={r.status === 'Sắp hết hạn' ? 'warning' : r.status === 'Hiệu lực' ? 'success' : 'info'}>
          {r.status}
        </Badge>
      ),
    },
  ]

  return (
    <PartnerShell
      activeId="customers"
      breadcrumbs={[{ label: 'Khách hàng', href: '#/doi-tac/khach-hang' }, { label: 'KH-2024-00056' }]}
      title="Công ty TNHH ABC"
      thumbnail={<Icon name="corporate_fare" size={28} />}
      status={<Badge tone="info" size="md">Khách hàng</Badge>}
      subtitle={
        <>
          <span>Mã KH: KH-2024-00056</span>
          <span className="page-header__dot">•</span>
          <span>MST: 0312345678</span>
          <span className="page-header__dot">•</span>
          <span>Nhóm: Khách hàng chiến lược</span>
          <span className="page-header__dot">•</span>
          <span>Khu vực: Miền Nam</span>
        </>
      }
      actions={
        <>
          <Button icon="share">Chia sẻ</Button>
          <Button iconOnly icon="more_horiz" aria-label="Thao tác khác" />
          <Button variant="primary" icon="add" trailingIcon="expand_more">
            Tạo mới
          </Button>
        </>
      }
      tabs={<Tabs items={TABS} value={tab} onChange={setTab} />}
      searchPlaceholder="Tìm kiếm (Khách hàng, Liên hệ, Cơ hội, Hợp đồng...)"
    >
      <div className="pt-kpi-strip">
        {[
          { id: 'k1', label: 'Doanh số (YTD)', value: '28.45', unit: 'tỷ VND', icon: 'payments', tone: 'info', sub: '▲ 18.6% so với cùng kỳ 2023' },
          { id: 'k2', label: 'Lợi nhuận (YTD)', value: '4.32', unit: 'tỷ VND', icon: 'savings', tone: 'success', sub: '▲ 16.2% so với cùng kỳ 2023' },
          { id: 'k3', label: 'Công nợ hiện tại', value: '2.35', unit: 'tỷ VND', icon: 'account_balance', tone: 'warning', sub: 'Quá hạn: 450.00 triệu' },
          { id: 'k4', label: 'Hợp đồng đang hiệu lực', value: '4', unit: 'hợp đồng', icon: 'contract', tone: 'ai', sub: 'Tổng giá trị: 18.83 tỷ VND' },
          { id: 'k5', label: 'Chỉ số hài lòng (CSAT)', value: '4.6', unit: '/ 5', icon: 'sentiment_satisfied', tone: 'success', sub: '★★★★☆' },
        ].map((k) => (
          <div className="pt-kpi" key={k.id}>
            <span className={`pt-kpi__icon stat-card__icon stat-card--${k.tone}`}>
              <Icon name={k.icon} size={20} />
            </span>
            <div className="truncate">
              <p className="pt-kpi__label">{k.label}</p>
              <p className="pt-kpi__value num">
                {k.value}
                <span className="pt-kpi__unit">{k.unit}</span>
              </p>
              <p className="pt-kpi__sub">{k.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-grid pt-grid--main">
        <div className="pt-col">
          <Card title="Doanh số theo tháng (VND)" link={{ label: 'Xem báo cáo' }}>
            <BarChart
              labels={REVENUE.labels}
              height={230}
              series={[
                { name: 'Năm 2023', color: 'var(--slate-300)', values: REVENUE.y2023 },
                { name: 'Năm 2024', color: 'var(--info)', values: REVENUE.y2024 },
              ]}
            />
          </Card>

          <Card title="Hợp đồng đang hiệu lực" link={{ label: 'Xem tất cả' }} flush>
            <DataTable columns={contractColumns} rows={CONTRACTS} rowKey={(r) => r.id} dense />
          </Card>

          <Card title="Tài liệu & lịch sử giao dịch" link={{ label: 'Xem tất cả' }}>
            <DocumentList items={DOCS} variant="card" />
          </Card>
        </div>

        <div className="pt-col">
          <Card title="Cơ hội nổi bật" link={{ label: 'Xem tất cả' }}>
            {OPPORTUNITIES.map((o) => (
              <div className="pt-contact" key={o.id}>
                <span className="count-row__icon count-row__icon--info">
                  <Icon name={o.icon} size={18} />
                </span>
                <div className="pt-contact__body">
                  <p className="pt-contact__name truncate">{o.name}</p>
                  <p className="pt-contact__role">
                    {o.value} · {o.rate}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Badge tone={o.tone}>{o.status}</Badge>
                  <p className="text-caption" style={{ marginTop: 2 }}>{o.date}</p>
                </div>
              </div>
            ))}
          </Card>

          <Card title="Hoạt động gần đây" link={{ label: 'Xem tất cả' }}>
            <ActivityFeed items={ACTIVITIES} />
          </Card>

          <Card title="Công nợ" link={{ label: 'Xem chi tiết' }}>
            <DonutChart
              data={DEBT_SPLIT}
              size={150}
              thickness={26}
              centerValue="2.35"
              centerLabel="tỷ VND"
              showPercent={false}
            />
            <p className="text-caption" style={{ marginTop: 'var(--sp-3)' }}>
              Hạn mức tín dụng: <strong>10.00 tỷ VND</strong> · Hạn mức còn lại:{' '}
              <strong style={{ color: 'var(--info)' }}>7.65 tỷ VND</strong>
            </p>
          </Card>

          <Card title="Liên hệ chính" link={{ label: 'Xem tất cả' }}>
            {CONTACTS.map((c) => (
              <div className="pt-contact" key={c.id}>
                <span className="count-row__icon count-row__icon--neutral">
                  <Icon name="person" size={18} />
                </span>
                <div className="pt-contact__body">
                  <p className="pt-contact__name">{c.name}</p>
                  <p className="pt-contact__role">{c.role}</p>
                  <p className="pt-contact__role num">
                    {c.phone} · {c.email}
                  </p>
                </div>
                <div className="pt-contact__actions">
                  <Button iconOnly icon="call" size="sm" aria-label="Gọi" />
                  <Button iconOnly icon="mail" size="sm" aria-label="Gửi email" />
                </div>
              </div>
            ))}
          </Card>

          <Card title="Ghi chú nội bộ" link={{ label: 'Xem tất cả' }}>
            <p className="text-caption" style={{ lineHeight: 1.6 }}>
              Khách hàng đánh giá cao chất lượng thi công và tiến độ dự án. Cần follow up gói thầu
              hoàn thiện nội thất trong tháng 05.
            </p>
            <p className="text-caption" style={{ marginTop: 'var(--sp-2)' }}>
              — Trần Minh Đức (Sales Manager) · 17/05/2024, 11:05
            </p>
          </Card>

          <Card title="Xu hướng doanh số 6 tháng">
            <LineChart
              height={140}
              labels={['T12', 'T1', 'T2', 'T3', 'T4', 'T5']}
              series={[{ name: 'Doanh số', color: 'var(--info)', points: [4.6, 2.8, 3.4, 4.4, 6.2, 5.4], area: true }]}
            />
          </Card>
        </div>
      </div>
    </PartnerShell>
  )
}
