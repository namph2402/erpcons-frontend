import { useEffect, type ReactNode } from 'react'
import Icon from './Icon'
import './Modal.css'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: ReactNode
  subtitle?: ReactNode
  /** Badge / chip cạnh tiêu đề */
  status?: ReactNode
  size?: ModalSize
  /** 05.12 · ACTION BAR — cụm nút dưới cùng */
  footer?: ReactNode
  /** Bỏ padding vùng thân (dùng khi tự chia cột bên trong) */
  flush?: boolean
  children: ReactNode
  className?: string
}

/**
 * Dialog dùng chung — 05.3 Data Entry Form + 02.11 Keyboard Shortcuts (Esc để đóng).
 * Mọi popup nhập liệu / xem chi tiết đều dựng trên component này để giữ
 * đúng radius, shadow, khoảng cách và vị trí action bar theo guideline.
 */
export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  status,
  size = 'md',
  footer,
  flush = false,
  children,
  className = '',
}: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal" role="presentation">
      <div className="modal__scrim" onClick={onClose} aria-hidden="true" />
      <div
        className={`modal__panel modal__panel--${size} ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
      >
        <header className="modal__header">
          <div className="modal__titles">
            <div className="modal__title-row">
              <h2 className="modal__title">{title}</h2>
              {status}
            </div>
            {subtitle && <p className="modal__subtitle">{subtitle}</p>}
          </div>
          <button
            className="modal__close"
            type="button"
            onClick={onClose}
            aria-label="Đóng"
          >
            <Icon name="close" size={20} />
          </button>
        </header>

        <div className={flush ? 'modal__body modal__body--flush' : 'modal__body scroll-y'}>
          {children}
        </div>

        {footer && <footer className="modal__footer">{footer}</footer>}
      </div>
    </div>
  )
}
