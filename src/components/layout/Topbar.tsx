import type { ReactNode } from 'react'
import Avatar from '../ui/Avatar'
import Icon from '../ui/Icon'
import SearchInput from '../ui/SearchInput'
import type { User } from '../../types'
import './Topbar.css'

export interface TopbarProps {
  user: User
  /** Số thông báo chưa đọc hiển thị trên chuông */
  notificationCount?: number
  onOpenNotifications?: () => void
  onToggleSidebar?: () => void
  /** Vùng bên trái (context switcher, tiêu đề trang...) */
  leading?: ReactNode
  /** Vùng bên phải trước cụm icon (nút Tạo mới...) */
  actions?: ReactNode
  searchPlaceholder?: string
  /** Hiển thị tên người dùng cạnh avatar (chỉ ở màn rộng) */
  showUserName?: boolean
  language?: string
  className?: string
}

/**
 * 02.2 · LAYOUT OVERVIEW — thanh header dùng chung.
 * Thứ tự chuẩn: Logo/Leading · Global Search · Quick Action ·
 * Notification · Message · Help · User Menu.
 */
export default function Topbar({
  user,
  notificationCount = 0,
  onOpenNotifications,
  onToggleSidebar,
  leading,
  actions,
  searchPlaceholder,
  showUserName = true,
  language = 'VI',
  className = '',
}: TopbarProps) {
  return (
    <header className={`topbar ${className}`.trim()}>
      <div className="topbar__left">
        <button
          className="topbar__burger"
          type="button"
          onClick={onToggleSidebar}
          aria-label="Mở / đóng menu"
        >
          <Icon name="menu" size={24} />
        </button>
        {leading}
      </div>

      <div className="topbar__search">
        <SearchInput placeholder={searchPlaceholder} aria-label="Tìm kiếm toàn hệ thống" />
      </div>

      <div className="topbar__right">
        {actions}

        <button className="topbar__icon-btn" type="button" aria-label="Ngôn ngữ">
          <Icon name="language" size={20} />
          <span className="topbar__lang">{language}</span>
          <Icon name="expand_more" size={16} />
        </button>

        <button
          className="topbar__icon-btn"
          type="button"
          aria-label={`Thông báo (${notificationCount} chưa đọc)`}
          onClick={onOpenNotifications}
        >
          <Icon name="notifications" size={24} />
          {notificationCount > 0 && (
            <span className="topbar__badge num">{notificationCount}</span>
          )}
        </button>

        <button className="topbar__icon-btn" type="button" aria-label="Tin nhắn">
          <Icon name="chat_bubble" size={20} />
        </button>

        <button className="topbar__icon-btn" type="button" aria-label="Trợ giúp">
          <Icon name="help" size={20} />
        </button>

        <button className="topbar__user" type="button">
          <Avatar name={user.name} src={user.avatar} size={32} status={user.status} />
          {showUserName && <span className="topbar__user-name">{user.name}</span>}
          <Icon name="expand_more" size={18} className="topbar__user-caret" />
        </button>
      </div>
    </header>
  )
}
