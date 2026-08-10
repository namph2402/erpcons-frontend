import AvatarGroup from '../ui/AvatarGroup'
import type { MeetingItem } from '../../types'
import './ScheduleTimeline.css'

export interface ScheduleTimelineProps {
  items: MeetingItem[]
  /** compact: một dòng giờ – tiêu đề · detailed: có mốc tròn + người tham dự */
  variant?: 'compact' | 'detailed'
  /** Ngày hiển thị đầu danh sách */
  dateLabel?: string
}

/** Lịch làm việc trong ngày — dùng ở Trang chủ và Trang cá nhân */
export default function ScheduleTimeline({
  items,
  variant = 'compact',
  dateLabel,
}: ScheduleTimelineProps) {
  return (
    <div className={`schedule schedule--${variant}`}>
      {dateLabel && <p className="schedule__date">{dateLabel}</p>}
      <ul className="schedule__list">
        {items.map((item) => (
          <li key={item.id} className="schedule__item">
            <span className="schedule__time num">
              {item.from}
              {item.to && ` – ${item.to}`}
            </span>

            <span className={`schedule__marker schedule__marker--${item.tone}`} />

            <div className="schedule__body">
              <p className="schedule__title">{item.title}</p>
              <p className="schedule__place">{item.place}</p>
            </div>

            {variant === 'detailed' && item.attendees && item.attendees.length > 0 && (
              <AvatarGroup people={item.attendees} size={24} max={3} />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
