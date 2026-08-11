import Avatar from '../ui/Avatar'
import Icon from '../ui/Icon'
import Logo from '../brand/Logo'
import type { NavGroup, NavItem, User } from '../../types'
import './MobileDrawer.css'

export interface MobileDrawerProps {
  open: boolean
  onClose: () => void
  user: User
  groups: NavGroup[]
  activeId: string
  footerItems?: NavItem[]
  onNavigate?: (item: NavItem) => void
}

/**
 * "Menu thu gọn" của mobile — panel trượt từ trái.
 * Dùng lại đúng cấu trúc dữ liệu NavGroup/NavItem của Sidebar desktop,
 * nên mọi màn hình chỉ cần truyền cùng bộ menu đang có.
 */
export default function MobileDrawer({
  open,
  onClose,
  user,
  groups,
  activeId,
  footerItems,
  onNavigate,
}: MobileDrawerProps) {
  const renderItem = (item: NavItem) => (
    <li key={item.id}>
      <a
        className={`mdrawer__item${item.id === activeId ? ' is-active' : ''}`}
        href={item.href ?? '#'}
        onClick={(e) => {
          if (onNavigate) {
            e.preventDefault()
            onNavigate(item)
          }
          onClose()
        }}
      >
        <Icon name={item.icon} size={24} filled={item.id === activeId} />
        <span className="mdrawer__label truncate">{item.label}</span>
        {item.tag && <span className="mdrawer__tag">{item.tag}</span>}
        {typeof item.count === 'number' && (
          <span className="mdrawer__count num">{item.count}</span>
        )}
      </a>
    </li>
  )

  return (
    <>
      {open && <div className="mdrawer__scrim" onClick={onClose} aria-hidden="true" />}

      <aside
        className={`mdrawer${open ? ' is-open' : ''}`}
        aria-hidden={!open}
        inert={!open}
      >
        <header className="mdrawer__header">
          <Logo variant="horizontal" onDark size={32} />
          <button
            className="mdrawer__close"
            type="button"
            onClick={onClose}
            aria-label="Đóng menu"
          >
            <Icon name="close" size={24} />
          </button>
        </header>

        <div className="mdrawer__user">
          <Avatar name={user.name} src={user.avatar} size={40} status={user.status} />
          <div className="truncate">
            <p className="mdrawer__user-name truncate">{user.name}</p>
            <p className="mdrawer__user-role truncate">{user.role}</p>
          </div>
          <Icon name="chevron_right" size={20} />
        </div>

        <nav className="mdrawer__nav scroll-y" aria-label="Menu">
          {groups.map((g) => (
            <div className="mdrawer__group" key={g.id}>
              {g.title && <p className="mdrawer__group-title">{g.title}</p>}
              <ul>{g.items.map(renderItem)}</ul>
            </div>
          ))}
        </nav>

        {footerItems && footerItems.length > 0 && (
          <ul className="mdrawer__footer">{footerItems.map(renderItem)}</ul>
        )}
      </aside>
    </>
  )
}
