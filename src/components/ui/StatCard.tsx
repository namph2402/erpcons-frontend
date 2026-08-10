import type { ReactNode } from 'react'
import Icon from './Icon'
import ProgressBar from './ProgressBar'
import './StatCard.css'

export type TrendDirection = 'up' | 'down' | 'flat'

export interface StatCardProps {
  label: string
  value: ReactNode
  /** Đơn vị hiển thị nhỏ cạnh số (tỷ VND, Dự án...) */
  unit?: string
  icon: string
  /** Màu icon + nền icon (dùng biến token) */
  tone?: 'info' | 'success' | 'warning' | 'danger' | 'ai' | 'brand' | 'neutral'
  trend?: {
    direction: TrendDirection
    value: string
    label?: string
  }
  /** Thanh tiến độ thay cho dòng trend */
  progress?: number
  /** Link phụ dưới đáy (Xem chi tiết →) */
  hint?: ReactNode
  onClick?: () => void
}

const TREND_ICON: Record<TrendDirection, string> = {
  up: 'trending_up',
  down: 'trending_down',
  flat: 'trending_flat',
}

export default function StatCard({
  label,
  value,
  unit,
  icon,
  tone = 'info',
  trend,
  progress,
  hint,
  onClick,
}: StatCardProps) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      className={`stat-card stat-card--${tone}${onClick ? ' stat-card--clickable' : ''}`}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      <span className="stat-card__icon">
        <Icon name={icon} size={24} />
      </span>
      <div className="stat-card__content">
        <p className="stat-card__label">{label}</p>
        <p className="stat-card__value num">
          {value}
          {unit && <span className="stat-card__unit">{unit}</span>}
        </p>

        {typeof progress === 'number' && (
          <div className="stat-card__progress">
            <ProgressBar value={progress} tone="success" size="sm" />
          </div>
        )}

        {trend && (
          <p className={`stat-card__trend stat-card__trend--${trend.direction}`}>
            <Icon name={TREND_ICON[trend.direction]} size={16} />
            <strong>{trend.value}</strong>
            {trend.label && <span>{trend.label}</span>}
          </p>
        )}

        {hint && <p className="stat-card__hint">{hint}</p>}
      </div>
    </Tag>
  )
}
