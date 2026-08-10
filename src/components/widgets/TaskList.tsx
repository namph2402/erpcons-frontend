import Badge from '../ui/Badge'
import Checkbox from '../ui/Checkbox'
import Icon from '../ui/Icon'
import type { TaskItem } from '../../types'
import './TaskList.css'

export interface TaskListProps {
  tasks: TaskItem[]
  onToggle?: (id: string) => void
  /** Hiển thị chấm ưu tiên bên phải thay vì nhãn hạn */
  showDot?: boolean
  /** Kiểu "công việc hôm nay": nhãn giờ + chip module */
  variant?: 'default' | 'schedule' | 'detailed'
}

const STATE_TONE = {
  overdue: 'danger',
  today: 'info',
  upcoming: 'neutral',
  done: 'success',
} as const

/** Danh sách công việc dùng chung — 03.7 / Công việc của tôi */
export default function TaskList({
  tasks,
  onToggle,
  showDot = false,
  variant = 'default',
}: TaskListProps) {
  return (
    <ul className={`task-list task-list--${variant}`}>
      {tasks.map((task) => (
        <li key={task.id} className={`task${task.done ? ' is-done' : ''}`}>
          <Checkbox
            checked={Boolean(task.done)}
            onChange={() => onToggle?.(task.id)}
            aria-label={task.title}
          />

          <div className="task__body">
            <p className="task__title">{task.title}</p>
            <div className="task__meta">
              <span className="task__context truncate">{task.context}</span>
              {task.tag && (
                <Badge tone={task.state === 'overdue' ? 'danger' : 'info'}>{task.tag}</Badge>
              )}
            </div>
          </div>

          <div className="task__right">
            {variant === 'detailed' && task.priority && (
              <span className={`task__priority task__priority--${task.state}`}>
                {task.priority}
              </span>
            )}
            <span className={`task__due task__due--${task.state}`}>
              {variant === 'schedule' && <Icon name="schedule" size={16} />}
              {task.due}
            </span>
            {showDot && <i className={`task__dot task__dot--${STATE_TONE[task.state]}`} />}
          </div>
        </li>
      ))}
    </ul>
  )
}
