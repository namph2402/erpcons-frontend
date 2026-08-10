import Icon from '../ui/Icon'
import './AlertList.css'

export interface AlertItem {
  id: string
  title: string
  time: string
  icon: string
  tone: 'info' | 'success' | 'warning' | 'danger'
  onClick?: () => void
}

export interface AlertListProps {
  items: AlertItem[]
}

/** Cảnh báo & Thông báo — danh sách gọn 1 dòng, icon trạng thái bên trái */
export default function AlertList({ items }: AlertListProps) {
  return (
    <ul className="alert-list">
      {items.map((item) => (
        <li key={item.id} className="alert" onClick={item.onClick}>
          <span className={`alert__icon alert__icon--${item.tone}`}>
            <Icon name={item.icon} size={20} filled={item.tone === 'danger'} />
          </span>
          <p className="alert__title truncate">{item.title}</p>
          <span className="alert__time">{item.time}</span>
        </li>
      ))}
    </ul>
  )
}
