import { useState } from 'react'
import PartnerShell from './PartnerShell'
import {
  Avatar,
  Badge,
  Button,
  Card,
  DataTable,
  Icon,
  ProgressBar,
  Select,
  Tabs,
} from '../../components/ui'
import type { Column } from '../../components/ui'
import { ActivityFeed } from '../../components/widgets'
import './partners.css'

const TABS = [
  { id: 'timeline', label: 'Timeline tổng hợp' },
  { id: 'comment', label: 'Bình luận' },
  { id: 'approval', label: 'Phê duyệt' },
  { id: 'workflow', label: 'Luồng công việc' },
  { id: 'audit', label: 'Nhật ký hệ thống' },
  { id: 'version', label: 'So sánh phiên bản' },
]

const TIMELINE = [
  { id: 't1', actor: 'Nguyễn Văn A', action: 'đã phê duyệt Hợp đồng thi công hạng mục thân', time: 'Hôm nay 14:30', icon: 'approval', tone: 'success' as const },
  { id: 't2', actor: 'Trần Thị B', action: 'đã cập nhật tiến độ công việc: Thi công cốp pha tầng 10 – Đạt 70%', time: 'Hôm nay 10:15', icon: 'update', tone: 'info' as const },
  { id: 't3', actor: 'Hệ thống', action: 'ghi nhận chi phí — Phiếu chi PC-2024-0125: 125,000,000 VND', time: 'Hôm nay 09:30', icon: 'payments', tone: 'warning' as const },
  { id: 't4', actor: 'Lê Văn C', action: 'đã tải lên tài liệu — Bản vẽ shopdrawing tầng 10.pdf', time: 'Hôm nay 08:45', icon: 'upload_file', tone: 'ai' as const },
  { id: 't5', actor: 'Nguyễn Văn A', action: 'đã tạo cuộc họp — Họp giao ban công trường tuần 20', time: 'Hôm qua 16:20', icon: 'groups_3', tone: 'info' as const },
  { id: 't6', actor: 'Hệ thống AI', action: 'phát hiện vấn đề — 3 công nhân không đeo mũ bảo hộ', time: 'Hôm qua 14:10', icon: 'auto_awesome', tone: 'danger' as const },
]

const COMMENTS = [
  {
    id: 'c1',
    name: 'Nguyễn Văn A',
    role: 'Project Manager',
    time: '20/05/2024 10:30',
    mention: '@Trần Thị B',
    text: 'tiến độ tầng 10 khả quan. Đề nghị cập nhật hình ảnh thi công chi tiết phần cốp pha.',
    likes: 5,
  },
  {
    id: 'c2',
    name: 'Trần Thị B',
    role: 'Site Engineer',
    time: '20/05/2024 11:15',
    mention: '@Nguyễn Văn A',
    text: 'Dạ em đã cập nhật hình ảnh trong phần Tài liệu. Tiến độ dự kiến hoàn thành sớm hơn 2 ngày so với kế hoạch.',
    likes: 3,
  },
  {
    id: 'c3',
    name: 'Lê Văn C',
    role: 'QS Engineer',
    time: '20/05/2024 13:20',
    mention: '@Team',
    text: 'Đề nghị team kiểm tra lại khối lượng thép trước khi đổ bê tông tầng 11.',
    likes: 2,
  },
]

const APPROVALS = [
  { id: 'a1', code: 'HD-2024-018', name: 'Hợp đồng thi công hạng mục thân', project: 'The Nexus Tower', value: '12.5 tỷ VND', by: 'Trần Thị B', date: '20/05/2024 09:15' },
  { id: 'a2', code: 'PR-2024-025', name: 'Kế hoạch mua vật tư tháng 6', project: 'The Nexus Tower', value: '850 triệu VND', by: 'Lê Văn C', date: '20/05/2024 08:30' },
  { id: 'a3', code: 'RFI-2024-012', name: 'Điều chỉnh thiết kế tầng hầm', project: 'The Nexus Tower', value: '320 triệu VND', by: 'Nguyễn Văn A', date: '19/05/2024 17:20' },
]

const FLOW = [
  { id: 'f1', step: 1, title: 'Tạo đề xuất', who: 'Trần Thị B · 20/05/2024 09:15', state: 'done' as const, status: 'Đã hoàn thành' },
  { id: 'f2', step: 2, title: 'Trưởng phòng xem xét', who: 'Lê Văn C · 20/05/2024 10:20', state: 'done' as const, status: 'Đã hoàn thành' },
  { id: 'f3', step: 3, title: 'Giám đốc phê duyệt', who: 'Nguyễn Văn A · Thời hạn: 20/05/2024 17:00', state: 'current' as const, status: 'Đang xử lý' },
  { id: 'f4', step: 4, title: 'Phòng pháp chế', who: 'Chờ xử lý', state: 'todo' as const, status: 'Chờ xử lý' },
  { id: 'f5', step: 5, title: 'Tổng giám đốc', who: 'Chờ xử lý', state: 'todo' as const, status: 'Chờ xử lý' },
]

interface AuditRow extends Record<string, unknown> {
  id: string
  time: string
  user: string
  action: string
  object: string
  detail: string
}

const AUDIT: AuditRow[] = [
  { id: '1', time: '20/05/2024 14:30', user: 'Nguyễn Văn A', action: 'Phê duyệt', object: 'HD-2024-018', detail: 'Phê duyệt hợp đồng thi công' },
  { id: '2', time: '20/05/2024 11:15', user: 'Trần Thị B', action: 'Cập nhật', object: 'TASK-2024-256', detail: 'Cập nhật tiến độ thi công cốp pha tầng 10' },
  { id: '3', time: '20/05/2024 10:30', user: 'Lê Văn C', action: 'Tải lên', object: 'DOC-2024-189', detail: 'Bản vẽ shopdrawing.pdf' },
  { id: '4', time: '20/05/2024 09:20', user: 'Nguyễn Văn A', action: 'Tạo mới', object: 'PRJ-2024-0057', detail: 'Tạo dự án The Nexus Tower' },
  { id: '5', time: '19/05/2024 16:45', user: 'Trần Thị B', action: 'Xóa', object: 'ISSUE-2024-078', detail: 'Xóa issue cũ' },
]

const VERSIONS = [
  { line: 4, title: 'Điều 4. Giá trị hợp đồng', old: 'Tổng giá trị hợp đồng: 12,000,000,000 VND (Bằng chữ: Mười hai tỷ đồng)', now: 'Tổng giá trị hợp đồng: 12,500,000,000 VND (Bằng chữ: Mười hai tỷ năm trăm triệu đồng)' },
  { line: 5, title: 'Điều 5. Tiến độ thực hiện', old: 'Thời gian: 180 ngày — Từ 01/06/2024 đến 27/11/2024', now: 'Thời gian: 178 ngày — Từ 01/06/2024 đến 25/11/2024' },
]

/** Cộng tác (Level 5) — Erpcons/page/level5.jpg */
export default function Collaboration() {
  const [tab, setTab] = useState('timeline')

  const auditColumns: Column<AuditRow>[] = [
    { key: 'time', header: 'Thời gian', width: '160px', render: (r) => <span className="num">{r.time}</span> },
    { key: 'user', header: 'Người dùng', width: '150px' },
    {
      key: 'action',
      header: 'Hành động',
      width: '130px',
      render: (r) => (
        <Badge
          tone={
            r.action === 'Xóa' ? 'danger' : r.action === 'Phê duyệt' ? 'success' : r.action === 'Tạo mới' ? 'info' : 'default'
          }
        >
          {r.action}
        </Badge>
      ),
    },
    { key: 'object', header: 'Đối tượng', width: '160px', render: (r) => <span style={{ fontFamily: 'var(--font-mono)' }}>{r.object}</span> },
    { key: 'detail', header: 'Chi tiết' },
  ]

  return (
    <PartnerShell
      activeId="collaboration"
      title="Cộng tác"
      subtitle="Làm việc cùng nhau — Minh bạch · Truy vết · Kiểm soát"
      actions={
        <>
          <Select
            size="md"
            defaultValue="nexus"
            options={[
              { value: 'nexus', label: 'The Nexus Tower · PRJ-2024-0057' },
              { value: 'sunrise', label: 'Sunrise Riverside · PRJ-2024-0058' },
            ]}
          />
          <Button icon="filter_list">Bộ lọc</Button>
          <Button variant="primary" icon="add">
            Tạo mới
          </Button>
        </>
      }
      tabs={<Tabs items={TABS} value={tab} onChange={setTab} />}
    >
      <div className="pt-grid pt-grid--main">
        <Card title="Timeline tổng hợp" link={{ label: 'Xem thêm' }}>
          <ActivityFeed items={TIMELINE} />
        </Card>

        <div className="pt-col">
          <Card title="Bàn luận & Bình luận">
            <div className="pt-composer">
              <Avatar name="Nguyễn Văn A" size={28} />
              <input placeholder="Nhập bình luận... (Nhấn @ để nhắc người, # để gắn thẻ)" aria-label="Nhập bình luận" />
              <Button variant="primary" size="sm" icon="send">
                Gửi
              </Button>
            </div>

            {COMMENTS.map((c) => (
              <div className="pt-comment" key={c.id}>
                <Avatar name={c.name} size={32} />
                <div className="pt-comment__body">
                  <div className="pt-comment__head">
                    <span className="pt-comment__name">{c.name}</span>
                    <span className="pt-comment__role">{c.role}</span>
                    <span className="pt-comment__time">· {c.time}</span>
                  </div>
                  <p className="pt-comment__text">
                    <span className="pt-comment__mention">{c.mention}</span> {c.text}
                  </p>
                  <div className="pt-comment__actions">
                    <button type="button">
                      <Icon name="thumb_up" size={16} /> {c.likes}
                    </button>
                    <button type="button">Trả lời</button>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <div className="pt-grid pt-grid--main">
        <Card
          title="Phê duyệt"
          action={
            <div className="row">
              <Badge tone="info" size="md">Cần phê duyệt 5</Badge>
              <Badge tone="warning" size="md">Đang xử lý 12</Badge>
              <Badge tone="danger" size="md">Quá hạn 3</Badge>
            </div>
          }
        >
          {APPROVALS.map((a) => (
            <div className="pt-contact" key={a.id}>
              <span className="count-row__icon count-row__icon--info">
                <Icon name="description" size={18} />
              </span>
              <div className="pt-contact__body">
                <p className="pt-contact__name truncate">{a.name}</p>
                <p className="pt-contact__role">
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--info)' }}>{a.code}</span> · {a.project}
                </p>
                <p className="pt-contact__role">
                  Người đề xuất: {a.by} · {a.date}
                </p>
              </div>
              <div className="row" style={{ flexShrink: 0 }}>
                <span className="num" style={{ fontWeight: 700 }}>{a.value}</span>
                <Button size="sm">Từ chối</Button>
                <Button size="sm" variant="primary" icon="check">
                  Phê duyệt
                </Button>
              </div>
            </div>
          ))}
        </Card>

        <Card title="Luồng công việc" subtitle="Phê duyệt hợp đồng">
          <div className="pt-flow">
            {FLOW.map((f) => (
              <div className="pt-flow__step" key={f.id}>
                <span className={`pt-flow__badge pt-flow__badge--${f.state}`}>
                  {f.state === 'done' ? <Icon name="check" size={16} /> : f.step}
                </span>
                <div className="pt-flow__body">
                  <p className="pt-flow__title">{f.title}</p>
                  <p className="pt-flow__sub">{f.who}</p>
                </div>
                <Badge tone={f.state === 'done' ? 'success' : f.state === 'current' ? 'info' : 'default'}>
                  {f.status}
                </Badge>
              </div>
            ))}
          </div>

          <div className="row-between" style={{ marginTop: 'var(--sp-3)' }}>
            <span className="text-caption">
              Thời gian xử lý <strong>4h 35m</strong> / SLA <strong>8h</strong>
            </span>
            <span className="text-caption num">57%</span>
          </div>
          <ProgressBar value={57} tone="success" size="sm" />
        </Card>
      </div>

      <div className="pt-grid pt-grid--main">
        <Card
          title="Nhật ký hệ thống"
          link={{ label: 'Xuất Excel' }}
          action={
            <Select
              size="sm"
              variant="soft"
              defaultValue="7d"
              options={[
                { value: '7d', label: '7 ngày qua' },
                { value: '30d', label: '30 ngày qua' },
              ]}
            />
          }
          flush
        >
          <DataTable columns={auditColumns} rows={AUDIT} rowKey={(r) => r.id} dense />
        </Card>

        <Card title="So sánh phiên bản" subtitle="Hop_dong_thi_cong_The_Nexus_Tower.docx">
          <div className="row-between" style={{ marginBottom: 'var(--sp-3)' }}>
            <Select
              size="sm"
              defaultValue="1.2"
              options={[{ value: '1.2', label: 'Phiên bản 1.2 (Hiện tại)' }]}
            />
            <span className="text-caption">với</span>
            <Select
              size="sm"
              defaultValue="1.3"
              options={[{ value: '1.3', label: 'Phiên bản 1.3 (Mới nhất)' }]}
            />
          </div>

          {VERSIONS.map((v) => (
            <div key={v.line} style={{ marginBottom: 'var(--sp-3)' }}>
              <p className="ws-detail__section-title">{v.title}</p>
              <div className="pt-diff">
                <span className="pt-diff__cell pt-diff__cell--num">{v.line}</span>
                <span className="pt-diff__cell pt-diff__cell--old">{v.old}</span>
                <span className="pt-diff__cell pt-diff__cell--new">{v.now}</span>
              </div>
            </div>
          ))}

          <div className="row" style={{ marginTop: 'var(--sp-3)' }}>
            <Badge tone="success">Thêm mới</Badge>
            <Badge tone="danger">Xóa bỏ</Badge>
            <Badge tone="warning">Thay đổi</Badge>
            <Button size="sm" className="spacer" icon="download">
              Tải phiên bản mới nhất
            </Button>
          </div>
        </Card>
      </div>
    </PartnerShell>
  )
}
