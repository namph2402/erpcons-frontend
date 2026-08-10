import Avatar from '../ui/Avatar'
import Icon from '../ui/Icon'
import type { ActivityItem } from '../../types'
import './ActivityFeed.css'

export interface ActivityFeedProps {
  items: ActivityItem[]
  /** icon: vòng tròn icon trạng thái · avatar: ảnh người thực hiện */
  lead?: 'icon' | 'avatar' | 'both'
}

/** 03.7 · ACTIVITY PANEL — dòng thời gian hoạt động dùng chung */
export default function ActivityFeed({ items, lead = 'both' }: ActivityFeedProps) {
  return (
    <ul className="activity">
      {items.map((item) => (
        <li key={item.id} className="activity__item">
          <div className="activity__lead">
            {(lead === 'icon' || lead === 'both') && (
              <span className={`activity__icon activity__icon--${item.tone}`}>
                <Icon name={item.icon} size={16} />
              </span>
            )}
            {(lead === 'avatar' || lead === 'both') && (
              <Avatar name={item.actor} src={item.avatar} size={24} />
            )}
          </div>

          <div className="activity__body">
            <p className="activity__action">{item.action}</p>
            <p className="activity__meta">
              <span className="activity__actor">{item.actor}</span>
              <span className="activity__dot">•</span>
              <span>{item.time}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
