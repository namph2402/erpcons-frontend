import type { ReactNode } from 'react'
import './Badge.css'

/** 03.8 · STATUS SYSTEM — chip/tag bo tròn 999 */
export type BadgeTone =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'brand'
  | 'ai'
  | 'neutral'

export interface BadgeProps {
  tone?: BadgeTone
  /** Chấm tròn trạng thái phía trước */
  dot?: boolean
  size?: 'sm' | 'md'
  children: ReactNode
  className?: string
}

export default function Badge({
  tone = 'default',
  dot = false,
  size = 'sm',
  children,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`badge badge--${tone} badge--${size} ${className}`.trim()}
    >
      {dot && <i className="badge__dot" />}
      {children}
    </span>
  )
}
