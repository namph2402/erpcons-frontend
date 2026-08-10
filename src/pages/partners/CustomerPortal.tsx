import PartnerShell from './PartnerShell'
import { Badge, Button, Card, Icon, LineChart, StatCard } from '../../components/ui'
import { ActivityFeed } from '../../components/widgets'
import './partners.css'

const KPIS = [
  { id: 'k1', label: 'Tổng chi tiêu', value: '1,245,800,000', unit: '₫', icon: 'payments', tone: 'info' as const, trend: { direction: 'up' as const, value: '12.5%', label: 'so với tháng trước' }, spark: [620, 700, 760, 840, 910, 1010, 1120, 1245.8] },
  { id: 'k2', label: 'Đơn hàng', value: '36', icon: 'shopping_cart', tone: 'success' as const, trend: { direction: 'up' as const, value: '8 đơn hàng', label: 'so với tháng trước' }, spark: [16, 19, 21, 24, 27, 30, 33, 36] },
  { id: 'k3', label: 'Hóa đơn', value: '18', icon: 'receipt_long', tone: 'ai' as const, trend: { direction: 'up' as const, value: '4 hóa đơn', label: 'so với tháng trước' }, spark: [8, 9, 11, 12, 14, 15, 17, 18] },
  { id: 'k4', label: 'Ticket hỗ trợ', value: '7', icon: 'support_agent', tone: 'danger' as const, trend: { direction: 'up' as const, value: '2 ticket', label: 'chưa xử lý' }, spark: [3, 4, 4, 5, 5, 6, 6, 7] },
]

const ORDERS = [
  { id: 'o1', code: 'PO-2024-0156', project: 'The Nexus Tower', status: 'Đã giao', tone: 'success' as const, amount: '3,850,000,000₫', date: '15/05/2024' },
  { id: 'o2', code: 'PO-2024-0132', project: 'Sunshine Riverside', status: 'Đang xử lý', tone: 'info' as const, amount: '2,120,000,000₫', date: '10/05/2024' },
  { id: 'o3', code: 'PO-2024-0118', project: 'Green City Villa', status: 'Đã giao', tone: 'success' as const, amount: '1,760,000,000₫', date: '02/05/2024' },
  { id: 'o4', code: 'PO-2024-0104', project: 'Harbor View Hotel', status: 'Chờ xác nhận', tone: 'warning' as const, amount: '1,250,000,000₫', date: '28/04/2024' },
  { id: 'o5', code: 'PO-2024-0091', project: 'Factory An Phát', status: 'Đang xử lý', tone: 'info' as const, amount: '640,000,000₫', date: '20/04/2024' },
]

const PRODUCTS = [
  { id: 'p1', name: 'Xi măng PCB40', amount: '320,000,000₫', qty: '32 đơn hàng' },
  { id: 'p2', name: 'Thép xây dựng D10', amount: '210,000,000₫', qty: '21 đơn hàng' },
  { id: 'p3', name: 'Gạch đỏ đặc', amount: '150,000,000₫', qty: '15 đơn hàng' },
  { id: 'p4', name: 'Sơn nội thất Dulux', amount: '95,000,000₫', qty: '9 đơn hàng' },
  { id: 'p5', name: 'Cát xây dựng', amount: '80,000,000₫', qty: '8 đơn hàng' },
]

const INVOICES = [
  { id: 'i1', code: 'INV-2024-0456', date: '15/05/2024', status: 'Đã thanh toán', tone: 'success' as const, amount: '3,850,000,000₫' },
  { id: 'i2', code: 'INV-2024-0443', date: '14/05/2024', status: 'Đã thanh toán', tone: 'success' as const, amount: '1,760,000,000₫' },
  { id: 'i3', code: 'INV-2024-0431', date: '10/05/2024', status: 'Chưa thanh toán', tone: 'danger' as const, amount: '2,120,000,000₫' },
  { id: 'i4', code: 'INV-2024-0420', date: '05/05/2024', status: 'Đã thanh toán', tone: 'success' as const, amount: '640,000,000₫' },
]

const TICKETS = [
  { id: 't1', code: 'TIC-2024-0087', date: '14/05/2024', status: 'Đang xử lý', tone: 'info' as const, subject: 'Hỗ trợ kỹ thuật phần mềm' },
  { id: 't2', code: 'TIC-2024-0071', date: '09/05/2024', status: 'Chờ phản hồi', tone: 'warning' as const, subject: 'Lỗi khi xuất hóa đơn' },
  { id: 't3', code: 'TIC-2024-0062', date: '05/05/2024', status: 'Đã giải quyết', tone: 'success' as const, subject: 'Không đăng nhập được' },
  { id: 't4', code: 'TIC-2024-0051', date: '28/04/2024', status: 'Đã giải quyết', tone: 'success' as const, subject: 'Yêu cầu nâng cấp tính năng' },
]

const ACTIVITIES = [
  { id: 'a1', actor: 'Hệ thống', action: 'Bạn đã thanh toán hóa đơn #INV-2024-0456', time: '15/05/2024 10:34', icon: 'payments', tone: 'success' as const },
  { id: 'a2', actor: 'Hệ thống', action: 'Đơn hàng PO-2024-0156 đã được giao', time: '15/05/2024 09:15', icon: 'local_shipping', tone: 'info' as const },
  { id: 'a3', actor: 'Hỗ trợ', action: 'Yêu cầu hỗ trợ #TIC-2024-0087 đã được cập nhật', time: '14/05/2024 16:42', icon: 'support_agent', tone: 'warning' as const },
  { id: 'a4', actor: 'Hệ thống', action: 'Hóa đơn #INV-2024-0443 đã được thanh toán', time: '14/05/2024 11:27', icon: 'receipt_long', tone: 'success' as const },
  { id: 'a5', actor: 'Bạn', action: 'Bạn đã tạo yêu cầu báo giá #RFQ-2024-0065', time: '13/05/2024 14:18', icon: 'request_quote', tone: 'ai' as const },
]

const SPENDING = {
  labels: ['12/2023', '01/2024', '02/2024', '03/2024', '04/2024', '05/2024'],
  current: [140, 260, 560, 600, 950, 1180],
  previous: [180, 420, 590, 880, 620, 1010],
}

/** Cổng khách hàng — Erpcons/page/dashboard-khách hàng.jpg */
export default function CustomerPortal() {
  return (
    <PartnerShell
      activeId="customers"
      title="Xin chào, Nguyễn Văn A! 👋"
      subtitle="Chào mừng bạn đến với không gian khách hàng của ERPCons."
      actions={
        <Button variant="primary" icon="support_agent">
          Tạo ticket hỗ trợ
        </Button>
      }
      searchPlaceholder="Tìm kiếm đơn hàng, sản phẩm, hóa đơn, ticket..."
    >
      <div className="ws-kpis" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        {KPIS.map((k) => (
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

      <div className="pt-grid pt-grid--3">
        <Card title="Đơn hàng gần đây" link={{ label: 'Xem tất cả' }}>
          {ORDERS.map((o) => (
            <div className="pt-contact" key={o.id}>
              <span className="count-row__icon count-row__icon--info">
                <Icon name="description" size={18} />
              </span>
              <div className="pt-contact__body">
                <p className="pt-contact__name" style={{ fontFamily: 'var(--font-mono)' }}>
                  {o.code}
                </p>
                <p className="pt-contact__role truncate">{o.project}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Badge tone={o.tone}>{o.status}</Badge>
                <p className="text-caption num" style={{ marginTop: 2 }}>
                  {o.amount}
                </p>
                <p className="text-caption num">{o.date}</p>
              </div>
            </div>
          ))}
        </Card>

        <Card title="Chi tiêu theo thời gian" link={{ label: '6 tháng gần nhất' }}>
          <LineChart
            labels={SPENDING.labels}
            height={230}
            showLegend
            series={[
              { name: 'Chi tiêu (₫)', color: 'var(--info)', points: SPENDING.current, area: true },
              { name: 'So với kỳ trước', color: 'var(--slate-400)', points: SPENDING.previous, dashed: true },
            ]}
          />
        </Card>

        <Card title="Hoạt động gần đây" link={{ label: 'Xem tất cả' }}>
          <ActivityFeed items={ACTIVITIES} lead="icon" />
        </Card>
      </div>

      <div className="pt-grid pt-grid--3">
        <Card title="Sản phẩm được mua nhiều" link={{ label: 'Xem tất cả' }}>
          {PRODUCTS.map((p) => (
            <div className="pt-contact" key={p.id}>
              <span className="count-row__icon count-row__icon--neutral">
                <Icon name="inventory_2" size={18} />
              </span>
              <div className="pt-contact__body">
                <p className="pt-contact__name truncate">{p.name}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="pt-contact__name num">{p.amount}</p>
                <p className="pt-contact__role">{p.qty}</p>
              </div>
            </div>
          ))}
        </Card>

        <Card title="Hóa đơn gần đây" link={{ label: 'Xem tất cả' }}>
          {INVOICES.map((i) => (
            <div className="pt-contact" key={i.id}>
              <span className="count-row__icon count-row__icon--info">
                <Icon name="receipt_long" size={18} />
              </span>
              <div className="pt-contact__body">
                <p className="pt-contact__name" style={{ fontFamily: 'var(--font-mono)' }}>
                  {i.code}
                </p>
                <p className="pt-contact__role num">{i.date}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Badge tone={i.tone}>{i.status}</Badge>
                <p className="text-caption num" style={{ marginTop: 2 }}>
                  {i.amount}
                </p>
              </div>
            </div>
          ))}
        </Card>

        <Card title="Ticket hỗ trợ gần đây" link={{ label: 'Xem tất cả' }}>
          {TICKETS.map((t) => (
            <div className="pt-contact" key={t.id}>
              <span className="count-row__icon count-row__icon--warning">
                <Icon name="support_agent" size={18} />
              </span>
              <div className="pt-contact__body">
                <p className="pt-contact__name" style={{ fontFamily: 'var(--font-mono)' }}>
                  {t.code}
                </p>
                <p className="pt-contact__role num">{t.date}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Badge tone={t.tone}>{t.status}</Badge>
                <p className="text-caption truncate" style={{ marginTop: 2, maxWidth: 160 }}>
                  {t.subject}
                </p>
              </div>
            </div>
          ))}
        </Card>
      </div>

      <Card>
        <div className="row-between">
          <div className="row">
            <span className="count-row__icon count-row__icon--info" style={{ width: 44, height: 44 }}>
              <Icon name="support_agent" size={24} />
            </span>
            <div>
              <p className="pt-profile__name" style={{ fontSize: 'var(--fs-title-2)' }}>
                Bạn cần hỗ trợ?
              </p>
              <p className="text-caption">
                Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp bạn giải quyết mọi vấn đề.
              </p>
            </div>
          </div>
          <Button variant="primary" icon="add">
            Tạo ticket hỗ trợ
          </Button>
        </div>
      </Card>
    </PartnerShell>
  )
}
