import Icon from '../ui/Icon'
import './MobileNavBar.css'

export interface MobileNavItem {
  id: string
  label: string
  icon: string
  href?: string
  /** Số đếm hiển thị trên icon */
  count?: number
  onClick?: () => void
}

export interface MobileNavBarProps {
  items: MobileNavItem[]
  activeId: string
  /** Nút hành động chính đặt giữa thanh (FAB nổi) */
  fab?: { icon?: string; label?: string; onClick?: () => void }
  onNavigate?: (item: MobileNavItem) => void
}

/**
 * Thanh điều hướng đáy cho mobile (Level 7).
 * FAB được chèn vào giữa danh sách: 2 mục trái · FAB · 2 mục phải.
 */
export default function MobileNavBar({
  items,
  activeId,
  fab,
  onNavigate,
}: MobileNavBarProps) {
  const middle = Math.ceil(items.length / 2)
  const left = fab ? items.slice(0, middle) : items
  const right = fab ? items.slice(middle) : []

  const renderItem = (item: MobileNavItem) => {
    const active = item.id === activeId
    return (
      <a
        key={item.id}
        className={`mnav__item${active ? ' is-active' : ''}`}
        href={item.href ?? '#'}
        aria-current={active ? 'page' : undefined}
        onClick={(e) => {
          if (item.onClick || onNavigate) {
            e.preventDefault()
            item.onClick?.()
            onNavigate?.(item)
          }
        }}
      >
        <span className="mnav__icon">
          <Icon name={item.icon} size={24} filled={active} />
          {typeof item.count === 'number' && item.count > 0 && (
            <span className="mnav__badge num">{item.count > 99 ? '99+' : item.count}</span>
          )}
        </span>
        <span className="mnav__label">{item.label}</span>
      </a>
    )
  }

  return (
    <nav className="mnav" aria-label="Điều hướng chính">
      {left.map(renderItem)}

      {fab && (
        <button
          className="mnav__fab"
          type="button"
          onClick={fab.onClick}
          aria-label={fab.label ?? 'Tạo mới'}
        >
          <Icon name={fab.icon ?? 'add'} size={24} />
        </button>
      )}

      {right.map(renderItem)}
    </nav>
  )
}

