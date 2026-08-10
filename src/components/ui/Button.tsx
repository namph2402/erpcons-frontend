import type { ButtonHTMLAttributes, ReactNode } from 'react'
import Icon from './Icon'
import './Button.css'

export type ButtonVariant =
  | 'primary' // CTA chính — ERP Red / Info Blue tuỳ ngữ cảnh
  | 'brand'
  | 'secondary'
  | 'ghost'
  | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Tên Material Symbol đặt trước label */
  icon?: string
  /** Tên Material Symbol đặt sau label (vd: expand_more) */
  trailingIcon?: string
  /** Nút chỉ có icon — bắt buộc truyền aria-label */
  iconOnly?: boolean
  block?: boolean
  children?: ReactNode
}

export default function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  trailingIcon,
  iconOnly = false,
  block = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : 18
  return (
    <button
      className={[
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        iconOnly ? 'btn--icon' : '',
        block ? 'btn--block' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {icon && <Icon name={icon} size={iconSize} />}
      {!iconOnly && children}
      {trailingIcon && <Icon name={trailingIcon} size={iconSize} />}
    </button>
  )
}
