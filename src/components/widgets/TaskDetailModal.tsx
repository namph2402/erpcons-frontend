import { useState } from 'react'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import Modal from '../ui/Modal'
import ProgressBar from '../ui/ProgressBar'
import Rating from '../ui/Rating'
import Tabs from '../ui/Tabs'
import RichTextEditor from './RichTextEditor'
import type { BoardTask, TaskComment } from '../../types'
import './TaskModals.css'

export interface TaskDetailModalProps {
  open: boolean
  onClose: () => void
  task: BoardTask | null
  /** Nhãn trạng thái theo id cột */
  statusLabel: string
  statusTone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
  onEdit?: (task: BoardTask) => void
  onComment?: (task: BoardTask, body: string) => void
}

/**
 * 03.6 · SIDE PANEL (DETAIL) + 06.5 · COMMENT & DISCUSSION.
 * Trái: thuộc tính đối tượng + nội dung / tệp đính kèm. Phải: trao đổi.
 * Trang cha mount lại component theo `key={task.id}` nên tab và ô nhập luôn về mặc định.
 */
export default function TaskDetailModal({
  open,
  onClose,
  task,
  statusLabel,
  statusTone = 'info',
  onEdit,
  onComment,
}: TaskDetailModalProps) {
  const [tab, setTab] = useState('content')
  const [draft, setDraft] = useState('')

  if (!task) return null

  const comments: TaskComment[] = task.comments ?? []

  const send = () => {
    if (!draft.trim()) return
    onComment?.(task, draft.trim())
    setDraft('')
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="xl"
      flush
      title={task.title}
      subtitle={task.id}
      status={<Badge tone={statusTone} dot>{statusLabel}</Badge>}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Đóng
          </Button>
          {onEdit && (
            <Button variant="secondary" icon="edit" onClick={() => onEdit(task)}>
              Chỉnh sửa
            </Button>
          )}
          <Button variant="primary" icon="send" onClick={send} disabled={!draft.trim()}>
            Lưu
          </Button>
        </>
      }
    >
      <div className="tdetail">
        <div className="tdetail__main scroll-y">
          <dl className="tdetail__grid">
            <div className="tdetail__cell">
              <dt>Dự án</dt>
              <dd>{task.project}</dd>
            </div>
            <div className="tdetail__cell">
              <dt>Trạng thái</dt>
              <dd>
                <Badge tone={statusTone} dot>
                  {statusLabel}
                </Badge>
              </dd>
            </div>
            <div className="tdetail__cell">
              <dt>Người phụ trách</dt>
              <dd>{task.owner ?? '—'}</dd>
            </div>

            <div className="tdetail__cell">
              <dt>Liên kết với Dplan</dt>
              <dd>{task.dplan ?? '—'}</dd>
            </div>
            <div className="tdetail__cell">
              <dt>Độ ưu tiên</dt>
              <dd>
                <Rating value={task.rating} size={16} />
              </dd>
            </div>
            <div className="tdetail__cell">
              <dt>Người giám sát</dt>
              <dd>{task.supervisor ?? '—'}</dd>
            </div>

            <div className="tdetail__cell">
              <dt>Thời gian bắt đầu</dt>
              <dd className="num">{task.start ?? '—'}</dd>
            </div>
            <div className="tdetail__cell">
              <dt>Khối lượng hoàn thành</dt>
              <dd>
                <span className="num">{task.progress}%</span>
                <ProgressBar
                  value={task.progress}
                  tone={task.progress === 100 ? 'success' : 'info'}
                  size="sm"
                  className="tdetail__bar"
                />
              </dd>
            </div>
            <div className="tdetail__cell">
              <dt>Người thực hiện</dt>
              <dd>
                <span className="tdetail__person">
                  <Avatar name={task.assignee} src={task.assigneeAvatar} size={24} />
                  {task.assignee}
                </span>
              </dd>
            </div>

            <div className="tdetail__cell">
              <dt>Thời gian kết thúc</dt>
              <dd className="num">{task.end ?? '—'}</dd>
            </div>
            <div className="tdetail__cell">
              <dt>Thời lượng</dt>
              <dd className="num">{task.duration ?? '—'}</dd>
            </div>
            <div className="tdetail__cell">
              <dt>Thời gian đã ghi nhận</dt>
              <dd className={task.overdue ? 'is-overdue num' : 'num'}>
                {task.spent ?? '0h:00m'}
                {task.overdue && <span className="tdetail__flag">Quá {task.overdue}</span>}
                {!task.overdue && task.remaining && (
                  <span className="tdetail__flag is-ok">Còn {task.remaining}</span>
                )}
              </dd>
            </div>
          </dl>

          <Tabs
            variant="underline"
            size="sm"
            value={tab}
            onChange={setTab}
            items={[
              { id: 'content', label: 'Nội dung' },
              { id: 'files', label: 'File', count: task.files?.length ?? 0 },
            ]}
            className="tdetail__tabs"
          />

          {tab === 'content' ? (
            <div className="tdetail__content">
              {task.content ? <p>{task.content}</p> : <p className="text-muted">Chưa có nội dung.</p>}
            </div>
          ) : (
            <ul className="tdetail__files">
              {(task.files ?? []).map((f) => (
                <li className="tfile" key={f.id}>
                  <span className="tfile__icon">
                    <Icon name="draft" size={20} />
                  </span>
                  <div className="truncate">
                    <p className="tfile__name truncate">{f.name}</p>
                    <p className="tfile__meta truncate">
                      {f.size} • {f.by} • {f.at}
                    </p>
                  </div>
                  <button className="tcard__act" type="button" aria-label="Tải xuống">
                    <Icon name="download" size={18} />
                  </button>
                </li>
              ))}
              {(task.files ?? []).length === 0 && (
                <li className="tdetail__dropzone">
                  <Icon name="cloud_upload" size={24} />
                  <p>Kéo thả file vào đây hoặc bấm để chọn file</p>
                  <span className="text-caption">PDF, DOCX, XLSX, JPG, PNG — tối đa 50MB</span>
                </li>
              )}
            </ul>
          )}
        </div>

        <aside className="tdetail__side">
          <p className="tdetail__side-title">
            Trao đổi<span className="field__req">*</span>
          </p>

          <div className="tdetail__comments scroll-y">
            {comments.map((c) => (
              <div className="tcomment" key={c.id}>
                <Avatar name={c.author} src={c.avatar} size={28} />
                <div className="tcomment__body">
                  <p className="tcomment__head">
                    <span className="tcomment__author">{c.author}</span>
                    <span className="tcomment__time num">{c.at}</span>
                  </p>
                  <p className="tcomment__text">{c.body}</p>
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-caption">Chưa có bình luận nào cho tác vụ này.</p>
            )}
          </div>

          <RichTextEditor
            compact
            value={draft}
            onChange={setDraft}
            placeholder="Nhập bình luận, dùng @ để nhắc tên đồng nghiệp..."
            minHeight={96}
          />
        </aside>
      </div>
    </Modal>
  )
}
