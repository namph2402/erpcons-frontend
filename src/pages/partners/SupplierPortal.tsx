import { useState } from 'react'
import PartnerShell from './PartnerShell'
import {
  Badge,
  Button,
  Card,
  DataTable,
  DonutChart,
  Icon,
  ProgressBar,
  Tabs,
} from '../../components/ui'
import type { Column } from '../../components/ui'
import { AlertList, DocumentList, QuickAccess } from '../../components/widgets'
import './partners.css'

const TABS = [
  { id: 'overview', label: 'Tổng quan' },
  { id: 'orders', label: 'Đơn hàng', count: 12 },
  { id: 'quotes', label: 'Báo giá', count: 3 },
  { id: 'delivery', label: 'Giao hàng', count: 4 },
  { id: 'invoices', label: 'Hóa đơn', count: 7 },
  { id: 'debt', label: 'Công nợ' },
  { id: 'contracts', label: 'Hợp đồng', count: 2 },
  { id: 'rating', label: 'Đánh giá' },
  { id: 'docs', label: 'Tài liệu' },
]

interface OrderRow extends Record<string, unknown> {
  id: string
  code: string
  project: string
  date: string
  amount: string
  status: string
  progress: number
}

const ORDERS: OrderRow[] = [
  { id: '1', code: 'PO-2024-0156', project: 'The Nexus Tower', date: '15/05/2024', amount: '3,850,000,000', status: 'Đang thực hiện', progress: 60 },
  { id: '2', code: 'PO-2024-0132', project: 'Sunshine Riverside', date: '10/05/2024', amount: '2,120,000,000', status: 'Đang giao hàng', progress: 80 },
  { id: '3', code: 'PO-2024-0118', project: 'Green City Villa', date: '02/05/2024', amount: '1,760,000,000', status: 'Sản xuất', progress: 40 },
  { id: '4', code: 'PO-2024-0104', project: 'Harbor View Hotel', date: '28/04/2024', amount: '1,250,000,000', status: 'Chờ xác nhận', progress: 0 },
  { id: '5', code: 'PO-2024-0091', project: 'Factory An Phát', date: '20/04/2024', amount: '640,000,000', status: 'Chờ giao hàng', progress: 0 },
]

const PERFORMANCE = [
  { label: 'Chất lượng', value: 95, color: 'var(--info)', note: '95%' },
  { label: 'Giao hàng đúng hạn', value: 90, color: 'var(--success)', note: '90%' },
  { label: 'Dịch vụ', value: 88, color: 'var(--warning)', note: '88%' },
  { label: 'Chi phí cạnh tranh', value: 95, color: 'var(--automation)', note: '95%' },
]

const DEBT_SPLIT = [
  { label: 'Trong hạn', value: 1.9, color: 'var(--success)', note: '1.90 tỷ', extra: '81%' },
  { label: 'Quá hạn 1-30 ngày', value: 0.3, color: 'var(--warning)', note: '300.00 tr', extra: '13%' },
  { label: 'Quá hạn 31-60 ngày', value: 0.1, color: 'var(--construction)', note: '100.00 tr', extra: '4%' },
  { label: 'Quá hạn > 60 ngày', value: 0.05, color: 'var(--danger)', note: '50.00 tr', extra: '2%' },
]

const TOP_ITEMS = [
  { id: 'i1', name: 'Thép cây D16', qty: '1,250 tấn', amount: '6,250,000,000', rate: 100 },
  { id: 'i2', name: 'Bê tông thương phẩm', qty: '2,800 m³', amount: '5,180,000,000', rate: 83 },
  { id: 'i3', name: 'Cát xây dựng', qty: '1,650 m³', amount: '2,640,000,000', rate: 42 },
  { id: 'i4', name: 'Đá 1x2', qty: '1,320 m³', amount: '1,980,000,000', rate: 32 },
  { id: 'i5', name: 'Gạch không nung', qty: '420,000 viên', amount: '1,420,000,000', rate: 23 },
]

const CERTS = [
  { id: 'c1', name: 'ISO 9001:2015', sub: 'Còn hiệu lực đến 12/08/2025', status: 'Còn hiệu lực', tone: 'success' as const, icon: 'verified' },
  { id: 'c2', name: 'Chứng chỉ năng lực XD', sub: 'Hạng I - Số: 1234/HN · đến 20/11/2025', status: 'Còn hiệu lực', tone: 'success' as const, icon: 'workspace_premium' },
  { id: 'c3', name: 'Chứng nhận an toàn lao động', sub: 'Số: ATLĐ-2024-056 · đến 15/09/2024', status: 'Sắp hết hạn', tone: 'warning' as const, icon: 'health_and_safety' },
  { id: 'c4', name: 'Chứng nhận môi trường', sub: 'ISO 14001:2015 · đến 05/03/2025', status: 'Còn hiệu lực', tone: 'success' as const, icon: 'eco' },
]

const NOTICES = [
  { id: 'n1', title: 'Đơn hàng PO-2024-0156 — Yêu cầu xác nhận tiến độ giao hàng', time: '2 giờ trước', icon: 'shopping_cart', tone: 'danger' as const },
  { id: 'n2', title: 'Hóa đơn INV-2024-0456 — Đã được phê duyệt thanh toán', time: '1 ngày trước', icon: 'receipt_long', tone: 'success' as const },
  { id: 'n3', title: 'Yêu cầu báo giá RFQ-2024-0089 — Hạn chốt 25/05/2024', time: '2 ngày trước', icon: 'request_quote', tone: 'warning' as const },
  { id: 'n4', title: 'Giao hàng DH-2024-0214 — Đã hoàn thành và được nghiệm thu', time: '3 ngày trước', icon: 'local_shipping', tone: 'info' as const },
]

const CONTACTS = [
  { id: 'p1', name: 'Trần Văn B', role: 'Giám đốc kinh doanh', phone: '0909 123 456', email: 'tranvb@abc.com.vn' },
  { id: 'p2', name: 'Phạm Thị C', role: 'Kế toán trưởng', phone: '0908 987 654', email: 'phamtc@abc.com.vn' },
]

const SHARED_DOCS = [
  { id: 'd1', name: 'Bảng báo giá thép tháng 05/2024', ext: 'xlsx', size: '2.4 MB', meta: '20/05/2024' },
  { id: 'd2', name: 'Catalogue sản phẩm 2024', ext: 'pdf', size: '5.1 MB', meta: '18/05/2024' },
  { id: 'd3', name: 'Hợp đồng cung cấp nguyên vật liệu', ext: 'pdf', size: '1.8 MB', meta: '15/05/2024' },
]

const QUICK = [
  { id: 'q1', label: 'Tạo báo giá', icon: 'request_quote' },
  { id: 'q2', label: 'Tạo đề xuất', icon: 'post_add' },
  { id: 'q3', label: 'Tạo đơn hàng', icon: 'shopping_cart' },
  { id: 'q4', label: 'Tạo hóa đơn', icon: 'receipt_long' },
  { id: 'q5', label: 'Gửi chứng từ', icon: 'upload_file' },
  { id: 'q6', label: 'Liên hệ ERPCons', icon: 'support_agent' },
  { id: 'q7', label: 'Tra cứu công nợ', icon: 'account_balance' },
]

/** Cổng nhà cung cấp — Erpcons/page/nhà cung cấp.jpg */
export default function SupplierPortal() {
  const [tab, setTab] = useState('overview')

  const orderColumns: Column<OrderRow>[] = [
    { key: 'code', header: 'Mã đơn hàng', width: '140px', render: (r) => <span style={{ fontFamily: 'var(--font-mono)' }}>{r.code}</span> },
    { key: 'project', header: 'Dự án' },
    { key: 'date', header: 'Ngày đặt', width: '120px' },
    { key: 'amount', header: 'Giá trị (VND)', width: '160px', align: 'right', render: (r) => <span className="num">{r.amount}</span> },
    {
      key: 'status',
      header: 'Trạng thái',
      width: '150px',
      render: (r) => (
        <Badge tone={r.status.includes('Chờ') ? 'warning' : r.status === 'Sản xuất' ? 'warning' : 'info'}>
          {r.status}
        </Badge>
      ),
    },
    { key: 'progress', header: 'Tiến độ giao hàng', width: '160px', render: (r) => <ProgressBar value={r.progress} size="sm" showValue /> },
  ]

  return (
    <PartnerShell
      activeId="suppliers"
      title="Xin chào, Công ty TNHH ABC! 👋"
      subtitle="Đây là tổng quan hoạt động của bạn với ERPCons"
      actions={
        <>
          <Button icon="share">Chia sẻ</Button>
          <Button variant="primary" icon="add" trailingIcon="expand_more">
            Tạo đề xuất
          </Button>
        </>
      }
      tabs={<Tabs items={TABS} value={tab} onChange={setTab} />}
      searchPlaceholder="Tìm kiếm (Đơn hàng, Hợp đồng, Mặt hàng, Yêu cầu...)"
    >
      <div className="pt-grid pt-grid--main">
        <Card>
          <div className="pt-profile">
            <span className="pt-profile__logo">ABC</span>
            <div className="truncate">
              <p className="pt-profile__name">
                Công ty TNHH ABC
                <Badge tone="success" size="md">Nhà cung cấp đã xác thực</Badge>
              </p>
              <p className="pt-profile__meta">
                MST: 0312345678 · Mã NCC: SUP-000123 · Hạng nhà cung cấp: A · Ngày tham gia: 12/03/2023
              </p>
              <p className="pt-profile__meta">
                <Badge tone="success" dot>Hoạt động</Badge>
              </p>
            </div>
            <Button icon="badge" className="spacer">
              Xem hồ sơ
            </Button>
          </div>
        </Card>

        <div className="pt-kpi-strip">
          <div className="pt-kpi">
            <span className="pt-kpi__icon stat-card__icon stat-card--info">
              <Icon name="local_shipping" size={20} />
            </span>
            <div>
              <p className="pt-kpi__label">Tổng giá trị đơn hàng</p>
              <p className="pt-kpi__value num">28.45<span className="pt-kpi__unit">tỷ VND</span></p>
              <p className="pt-kpi__sub" style={{ color: 'var(--success)' }}>▲ 18.6% so với kỳ trước</p>
            </div>
          </div>
          <div className="pt-kpi">
            <span className="pt-kpi__icon stat-card__icon stat-card--warning">
              <Icon name="pending_actions" size={20} />
            </span>
            <div>
              <p className="pt-kpi__label">Đơn hàng đang thực hiện</p>
              <p className="pt-kpi__value num">12<span className="pt-kpi__unit">đơn hàng</span></p>
              <p className="pt-kpi__sub">Tổng giá trị: 9.62 tỷ VND</p>
            </div>
          </div>
          <div className="pt-kpi">
            <span className="pt-kpi__icon stat-card__icon stat-card--success">
              <Icon name="check_circle" size={20} />
            </span>
            <div>
              <p className="pt-kpi__label">Đơn hàng hoàn thành</p>
              <p className="pt-kpi__value num">156<span className="pt-kpi__unit">đơn hàng</span></p>
              <p className="pt-kpi__sub">Tổng giá trị: 18.83 tỷ VND</p>
            </div>
          </div>
          <div className="pt-kpi">
            <span className="pt-kpi__icon stat-card__icon stat-card--danger">
              <Icon name="account_balance" size={20} />
            </span>
            <div>
              <p className="pt-kpi__label">Công nợ hiện tại</p>
              <p className="pt-kpi__value num">2.35<span className="pt-kpi__unit">tỷ VND</span></p>
              <p className="pt-kpi__sub" style={{ color: 'var(--danger)' }}>Quá hạn: 450.00 triệu</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-grid pt-grid--main">
        <div className="pt-col">
          <Card title="Đơn hàng đang thực hiện" link={{ label: 'Xem tất cả' }} flush>
            <DataTable columns={orderColumns} rows={ORDERS} rowKey={(r) => r.id} dense />
          </Card>

          <div className="pt-grid pt-grid--2">
            <Card title="Top mặt hàng cung cấp" link={{ label: 'Xem báo cáo' }}>
              {TOP_ITEMS.map((i) => (
                <div className="ws-rank" key={i.id}>
                  <span className="truncate">
                    {i.name}
                    <br />
                    <span className="text-caption">{i.qty}</span>
                  </span>
                  <ProgressBar value={i.rate} size="sm" />
                  <span className="ws-rank__value num">{i.amount}</span>
                </div>
              ))}
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
              <Button block variant="secondary" style={{ marginTop: 'var(--sp-4)' }}>
                Xem chi tiết công nợ
              </Button>
            </Card>
          </div>

          <Card title="Thao tác nhanh">
            <QuickAccess actions={QUICK} />
          </Card>
        </div>

        <div className="pt-col">
          <Card title="Hiệu suất cung cấp (12 tháng)" link={{ label: 'Xem báo cáo' }}>
            <DonutChart
              data={PERFORMANCE}
              size={150}
              thickness={26}
              centerValue="92%"
              centerLabel="Tổng điểm"
              showPercent={false}
            />
            <p className="text-caption" style={{ marginTop: 'var(--sp-3)', textAlign: 'center' }}>
              Xếp hạng: <Badge tone="success">A (Nhà cung cấp xuất sắc)</Badge>
            </p>
          </Card>

          <Card title="Thông báo" link={{ label: 'Xem tất cả' }}>
            <AlertList items={NOTICES} />
          </Card>

          <Card title="Chứng chỉ & Năng lực" link={{ label: 'Xem tất cả' }}>
            {CERTS.map((c) => (
              <div className="pt-contact" key={c.id}>
                <span className={`count-row__icon count-row__icon--${c.tone}`}>
                  <Icon name={c.icon} size={18} />
                </span>
                <div className="pt-contact__body">
                  <p className="pt-contact__name truncate">{c.name}</p>
                  <p className="pt-contact__role truncate">{c.sub}</p>
                </div>
                <Badge tone={c.tone}>{c.status}</Badge>
              </div>
            ))}
          </Card>

          <Card title="Liên hệ chính" link={{ label: 'Xem tất cả' }}>
            {CONTACTS.map((p) => (
              <div className="pt-contact" key={p.id}>
                <span className="count-row__icon count-row__icon--neutral">
                  <Icon name="person" size={18} />
                </span>
                <div className="pt-contact__body">
                  <p className="pt-contact__name">{p.name}</p>
                  <p className="pt-contact__role">{p.role}</p>
                  <p className="pt-contact__role num">
                    {p.phone} · {p.email}
                  </p>
                </div>
                <div className="pt-contact__actions">
                  <Button iconOnly icon="call" size="sm" aria-label="Gọi" />
                  <Button iconOnly icon="mail" size="sm" aria-label="Gửi email" />
                </div>
              </div>
            ))}
          </Card>

          <Card title="Tài liệu chia sẻ gần đây" link={{ label: 'Xem tất cả' }}>
            <DocumentList items={SHARED_DOCS} />
          </Card>
        </div>
      </div>
    </PartnerShell>
  )
}
