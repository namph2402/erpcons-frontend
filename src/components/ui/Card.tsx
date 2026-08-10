import type { ReactNode } from 'react'
import Icon from './Icon'
import './Card.css'

export interface CardProps {
  /** Tiêu đề card — bỏ trống nếu card không cần header */
  title?: ReactNode
  subtitle?: ReactNode
  /** Icon nhỏ trước tiêu đề */
  icon?: string
  iconColor?: string
  /** Vùng thao tác bên phải header (filter, select...) */
  action?: ReactNode
  /** Link "Xem tất cả" ở góc phải header */
  link?: { label: string; href?: string; onClick?: () => void }
  /** Bỏ padding vùng body (dùng cho bảng tràn viền) */
  flush?: boolean
  className?: string
  children?: ReactNode
  footer?: ReactNode
}

export default function Card({
  title,
  subtitle,
  icon,
  iconColor,
  action,
  link,
  flush = false,
  className = '',
  children,
  footer,
}: CardProps) {
  const hasHeader = Boolean(title || action || link)
  return (
    <section className={`card ${className}`.trim()}>
      {hasHeader && (
        <header className="card__header">
          <div className="card__titles">
            <div className="card__title-row">
              {icon && <Icon name={icon} size={20} color={iconColor} />}
              <h2 className="card__title">{title}</h2>
            </div>
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </div>
          <div className="card__actions">
            {action}
            {link && (
              <a
                className="card__link"
                href={link.href ?? '#'}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault()
                    link.onClick()
                  }
                }}
              >
                {link.label}
                <Icon name="chevron_right" size={16} />
              </a>
            )}
          </div>
        </header>
      )}
      <div className={flush ? 'card__body card__body--flush' : 'card__body'}>
        {children}
      </div>
      {footer && <footer className="card__footer">{footer}</footer>}
    </section>
  )
}
