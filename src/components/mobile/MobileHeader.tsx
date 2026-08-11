import type { ReactNode } from 'react'
import Logo from '../brand/Logo'
import Icon from '../ui/Icon'
import './MobileHeader.css'

export interface MobileHeaderProps {
  /**
   * home  — hamburger + logo + tìm kiếm + chuông (màn hình gốc)
   * page  — nút quay lại + tiêu đề + hành động (màn hình con)
   */
  variant?: 'home' | 'page'
  title?: string
  onBack?: () => void
  onOpenMenu?: () => void
  notificationCount?: number
  onOpenNotifications?: () => void
  /** Nút icon bên phải (thay cụm mặc định) */
  actions?: ReactNode
  /** Nội dung chèn dưới header (chip lọc, tab...) */
  below?: ReactNode
  /** Header trong suốt đặt trên nền camera */
  overlay?: boolean
}

/** Header mobile (Level 7) — dùng chung cho mọi màn hình mobile */
export default function MobileHeader({
  variant = 'home',
  title,
  onBack,
  onOpenMenu,
  notificationCount = 0,
  onOpenNotifications,
  actions,
  below,
  overlay = false,
}: MobileHeaderProps) {
  return (
    <header className={`mheader${overlay ? ' mheader--overlay' : ''}`}>
      <div className="mheader__bar">
        {variant === 'home' ? (
          <>
            <button
              className="mheader__icon-btn"
              type="button"
              onClick={onOpenMenu}
              aria-label="Mở menu"
            >
              <Icon name="menu" size={24} />
            </button>
            <Logo variant="horizontal" size={0} className="mheader__logo" />
            <div className="mheader__spacer" />
            {actions ?? (
              <>
                <button className="mheader__icon-btn" type="button" aria-label="Tìm kiếm">
                  <Icon name="search" size={24} />
                </button>
                <button
                  className="mheader__icon-btn"
                  type="button"
                  aria-label={`Thông báo (${notificationCount} chưa đọc)`}
                  onClick={onOpenNotifications}
                >
                  <Icon name="notifications" size={24} />
                  {notificationCount > 0 && (
                    <span className="mheader__badge num">{notificationCount}</span>
                  )}
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <button
              className="mheader__icon-btn"
              type="button"
              onClick={onBack}
              aria-label="Quay lại"
            >
              <Icon name="arrow_back" size={24} />
            </button>
            <h1 className="mheader__title truncate">{title}</h1>
            {actions}
          </>
        )}
      </div>

      {below && <div className="mheader__below">{below}</div>}
    </header>
  )
}
