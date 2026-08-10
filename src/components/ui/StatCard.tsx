import type { ReactNode } from 'react'
import Icon from './Icon'
import LineChart from './LineChart'
import ProgressBar from './ProgressBar'
import './StatCard.css'

export type TrendDirection = 'up' | 'down' | 'flat'
export type StatTone =
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'ai'
  | 'brand'
  | 'neutral'
  | 'automation'
  | 'iot'

export interface StatCardProps {
  label: string
  value: ReactNode
  /** Đơn vị hiển thị nhỏ cạnh số (tỷ VND, Dự án...) */
  unit?: string
  /** Bỏ trống nếu thẻ không dùng icon (biến thể Project Dashboard) */
  icon?: string
  /** Màu icon + nền icon (dùng biến token) */
  tone?: StatTone
  /**
   * inline  — icon bên trái, nội dung bên phải (dùng ở Trang chủ / Workspace)
   * stacked — icon + nhãn trên một hàng, số nằm dưới (dùng ở các Dashboard)
   */
  layout?: 'inline' | 'stacked'
  trend?: {
    direction: TrendDirection
    value: string
    label?: string
  }
  /** Thanh tiến độ thay cho dòng trend */
  progress?: number
  /** Vòng tròn tiến độ đặt bên phải (Project Dashboard – Tiến độ tổng thể) */
  ring?: number
  /** Sparkline dưới đáy thẻ (chuẩn KPI của các Dashboard 54–60) */
  sparkline?: number[]
  /** Link phụ dưới đáy (Xem chi tiết →) */
  hint?: ReactNode
  onClick?: () => void
}

const TREND_ICON: Record<TrendDirection, string> = {
  up: 'trending_up',
  down: 'trending_down',
  flat: 'trending_flat',
}

const TONE_COLOR: Record<StatTone, string> = {
  info: 'var(--info)',
  success: 'var(--success)',
  warning: 'var(--warning)',
  danger: 'var(--danger)',
  ai: 'var(--ai)',
  brand: 'var(--erp-red)',
  neutral: 'var(--slate-500)',
  automation: 'var(--automation)',
  iot: 'var(--iot)',
}

export default function StatCard({
  label,
  value,
  unit,
  icon,
  tone = 'info',
  layout = 'inline',
  trend,
  progress,
  ring,
  sparkline,
  hint,
  onClick,
}: StatCardProps) {
  const Tag = onClick ? 'button' : 'div'

  const iconEl = icon && (
    <span className="stat-card__icon">
      <Icon name={icon} size={24} />
    </span>
  )

  const body = (
    <>
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
    </>
  )

  return (
    <Tag
      className={[
        'stat-card',
        `stat-card--${tone}`,
        `stat-card--${layout}`,
        onClick ? 'stat-card--clickable' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      {layout === 'inline' ? (
        <>
          {iconEl}
          <div className="stat-card__content">
            <p className="stat-card__label">{label}</p>
            {body}
          </div>
        </>
      ) : (
        <div className="stat-card__content">
          <div className="stat-card__head">
            {iconEl}
            <p className="stat-card__label">{label}</p>
          </div>
          <div className="stat-card__main">
            <div className="stat-card__main-text">{body}</div>
            {typeof ring === 'number' && (
              <RingProgress value={ring} color={TONE_COLOR[tone]} />
            )}
          </div>
          {sparkline && sparkline.length > 1 && (
            <div className="stat-card__spark">
              <LineChart
                minimal
                height={40}
                series={[{ name: label, color: TONE_COLOR[tone], points: sparkline }]}
              />
            </div>
          )}
        </div>
      )}
    </Tag>
  )
}

/** Vòng tròn tiến độ nhỏ dùng trong KPI card */
function RingProgress({ value, color }: { value: number; color: string }) {
  const size = 56
  const stroke = 7
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, value))
  return (
    <svg className="stat-card__ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--slate-100)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * c} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  )
}
