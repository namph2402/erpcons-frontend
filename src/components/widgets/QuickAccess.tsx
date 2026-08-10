import Icon from '../ui/Icon'
import './QuickAccess.css'

export interface QuickAction {
  id: string
  label: string
  icon: string
  onClick?: () => void
}

export interface QuickAccessProps {
  title?: string
  actions: QuickAction[]
  /** row: hàng ngang cuối trang · grid: lưới ô vuông trong card */
  variant?: 'row' | 'grid'
  columns?: number
}

/** Truy cập nhanh / Lối tắt — dùng ở Trang chủ & Trang cá nhân */
export default function QuickAccess({
  title,
  actions,
  variant = 'row',
  columns = 4,
}: QuickAccessProps) {
  return (
    <div className={`quick quick--${variant}`}>
      {title && <p className="quick__title">{title}</p>}
      <ul
        className="quick__list"
        style={
          variant === 'grid'
            ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
            : undefined
        }
      >
        {actions.map((a) => (
          <li key={a.id}>
            <button type="button" className="quick__item" onClick={a.onClick}>
              <span className="quick__icon">
                <Icon name={a.icon} size={20} />
              </span>
              <span className="quick__label">{a.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
