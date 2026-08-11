import { useState } from 'react'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import Icon from '../ui/Icon'
import ProgressBar from '../ui/ProgressBar'
import Rating from '../ui/Rating'
import EmptyState from '../ui/EmptyState'
import type { BoardTask } from '../../types'
import './TaskBoard.css'

export type BoardTone = 'neutral' | 'warning' | 'info' | 'success' | 'danger'

export interface BoardColumn {
  id: string
  label: string
  /** Màu trạng thái theo 03.8 · STATUS SYSTEM */
  tone: BoardTone
}

export interface TaskBoardProps {
  columns: BoardColumn[]
  tasks: BoardTask[]
  onOpen?: (task: BoardTask) => void
  onEdit?: (task: BoardTask) => void
  onDelete?: (task: BoardTask) => void
  /** Kéo thả card sang cột khác */
  onMove?: (taskId: string, columnId: string) => void
  /** Nút "+" trên đầu cột */
  onAdd?: (columnId: string) => void
  className?: string
}

/** Thanh tiến độ đổi màu theo trạng thái cột */
const PROGRESS_TONE: Record<BoardTone, 'info' | 'success' | 'warning' | 'danger' | 'brand'> = {
  neutral: 'info',
  warning: 'warning',
  info: 'info',
  success: 'success',
  danger: 'danger',
}

const WEIGHT_TONE: Record<string, 'danger' | 'warning' | 'neutral'> = {
  Lớn: 'danger',
  'Trung bình': 'warning',
  Nhỏ: 'neutral',
}

/**
 * 03.10 · BOARD VIEW (Kanban) — bảng tác vụ dùng chung.
 * Card giữ đúng cấu trúc "một đối tượng một nguồn dữ liệu": định danh, thuộc tính,
 * người chịu trách nhiệm, tiến độ, thời gian và hành động nhanh.
 */
export default function TaskBoard({
  columns,
  tasks,
  onOpen,
  onEdit,
  onDelete,
  onMove,
  onAdd,
  className = '',
}: TaskBoardProps) {
  const [dragId, setDragId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)

  const drop = (columnId: string) => {
    if (dragId && onMove) onMove(dragId, columnId)
    setDragId(null)
    setOverId(null)
  }

  return (
    <div className={`board scroll-y ${className}`.trim()}>
      {columns.map((col) => {
        const items = tasks.filter((t) => t.status === col.id)
        return (
          <section
            key={col.id}
            className={`board__col${overId === col.id ? ' is-over' : ''}`}
            onDragOver={(e) => {
              if (!dragId) return
              e.preventDefault()
              setOverId(col.id)
            }}
            onDragLeave={() => setOverId((v) => (v === col.id ? null : v))}
            onDrop={() => drop(col.id)}
          >
            <header className={`board__head board__head--${col.tone}`}>
              <span className="board__dot" aria-hidden="true" />
              <h3 className="board__label">{col.label}</h3>
              <span className="board__count num">{items.length}</span>
              {onAdd && (
                <button
                  className="board__add"
                  type="button"
                  aria-label={`Thêm tác vụ vào ${col.label}`}
                  onClick={() => onAdd(col.id)}
                >
                  <Icon name="add" size={18} />
                </button>
              )}
            </header>

            <div className="board__list scroll-y">
              {items.map((task) => (
                <article
                  key={task.id}
                  className={`tcard${dragId === task.id ? ' is-dragging' : ''}`}
                  draggable={Boolean(onMove)}
                  onDragStart={() => setDragId(task.id)}
                  onDragEnd={() => {
                    setDragId(null)
                    setOverId(null)
                  }}
                  onClick={() => onOpen?.(task)}
                >
                  <h4 className="tcard__title">{task.title}</h4>

                  <dl className="tcard__meta">
                    <div className="tcard__row">
                      <dt>Dự án</dt>
                      <dd>{task.project}</dd>
                    </div>
                    {task.work && (
                      <div className="tcard__row">
                        <dt>Công việc</dt>
                        <dd>{task.work}</dd>
                      </div>
                    )}
                    {task.weight && (
                      <div className="tcard__row">
                        <dt>Đánh giá tác vụ</dt>
                        <dd>
                          <Badge tone={WEIGHT_TONE[task.weight] ?? 'neutral'}>{task.weight}</Badge>
                        </dd>
                      </div>
                    )}
                    {task.owner && (
                      <div className="tcard__row">
                        <dt>Người phụ trách</dt>
                        <dd>{task.owner}</dd>
                      </div>
                    )}
                    {task.supervisor && (
                      <div className="tcard__row">
                        <dt>Người giám sát</dt>
                        <dd>{task.supervisor}</dd>
                      </div>
                    )}
                    <div className="tcard__row">
                      <dt>Người thực hiện</dt>
                      <dd>{task.assignee}</dd>
                    </div>
                  </dl>

                  <div className="tcard__time">
                    <span className="tcard__chip">
                      <Icon name="timer" size={16} />
                      <span className="num">{task.spent ?? '0h:00m'}</span>
                    </span>
                    {task.overdue ? (
                      <span className="tcard__due is-overdue">
                        <Icon name="error" size={16} />
                        Quá: {task.overdue}
                      </span>
                    ) : task.remaining ? (
                      <span className="tcard__due">
                        <Icon name="schedule" size={16} />
                        Còn: {task.remaining}
                      </span>
                    ) : null}
                  </div>

                  <div className="tcard__progress">
                    <div className="tcard__progress-head">
                      <span className="tcard__assignee">{task.assignee}</span>
                      <span className="tcard__pct num">{task.progress}%</span>
                    </div>
                    <ProgressBar
                      value={task.progress}
                      tone={task.progress === 100 ? 'success' : PROGRESS_TONE[col.tone]}
                      size="sm"
                    />
                  </div>

                  <footer className="tcard__foot">
                    <Avatar name={task.assignee} src={task.assigneeAvatar} size={28} />
                    <span className="tcard__date num">{task.date}</span>
                    <Rating value={task.rating} size={12} className="tcard__rating" />

                    <span className="tcard__acts">
                      <button
                        className="tcard__act"
                        type="button"
                        aria-label="Xem chi tiết"
                        onClick={(e) => {
                          e.stopPropagation()
                          onOpen?.(task)
                        }}
                      >
                        <Icon name="visibility" size={18} />
                      </button>
                      {onEdit && (
                        <button
                          className="tcard__act"
                          type="button"
                          aria-label="Chỉnh sửa"
                          onClick={(e) => {
                            e.stopPropagation()
                            onEdit(task)
                          }}
                        >
                          <Icon name="edit" size={18} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="tcard__act tcard__act--danger"
                          type="button"
                          aria-label="Xoá tác vụ"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete(task)
                          }}
                        >
                          <Icon name="delete" size={18} />
                        </button>
                      )}
                    </span>
                  </footer>
                </article>
              ))}

              {items.length === 0 && (
                <EmptyState
                  icon="task_alt"
                  title="Chưa có tác vụ"
                  description="Kéo thả card vào đây hoặc tạo tác vụ mới."
                  action={onAdd ? { label: 'Thêm mới', onClick: () => onAdd(col.id) } : undefined}
                />
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}
