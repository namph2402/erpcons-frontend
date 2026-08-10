import './ProgressBar.css'

export interface ProgressBarProps {
  /** 0 – 100 */
  value: number
  tone?: 'info' | 'success' | 'warning' | 'danger' | 'brand'
  size?: 'sm' | 'md' | 'lg'
  /** Hiện % ở cuối thanh */
  showValue?: boolean
  label?: string
  className?: string
}

export default function ProgressBar({
  value,
  tone = 'info',
  size = 'md',
  showValue = false,
  label,
  className = '',
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className={`progress progress--${size} ${className}`.trim()}>
      <div
        className="progress__track"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`progress__fill progress__fill--${tone}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showValue && <span className="progress__value num">{pct}%</span>}
    </div>
  )
}
