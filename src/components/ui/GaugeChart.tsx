import type { ReactNode } from 'react'
import './GaugeChart.css'

export interface GaugeSegment {
  /** Ngưỡng kết thúc của dải màu (theo cùng thang với max) */
  to: number
  color: string
}

export interface GaugeChartProps {
  value: number
  max?: number
  min?: number
  /** semi: cung 180° (CPI, khả năng đúng hạn) · ring: vòng tròn đầy (uptime) */
  variant?: 'semi' | 'ring'
  size?: number
  thickness?: number
  /** Dải màu theo ngưỡng — bỏ trống thì dùng 1 màu duy nhất */
  segments?: GaugeSegment[]
  color?: string
  label?: ReactNode
  sublabel?: ReactNode
  /** Hiện mốc min / max hai đầu cung */
  showBounds?: boolean
  formatValue?: (v: number) => string
}

/** Đồng hồ đo hiệu suất — CPI/SPI, uptime, xác suất hoàn thành đúng hạn */
export default function GaugeChart({
  value,
  max = 100,
  min = 0,
  variant = 'semi',
  size = 160,
  thickness = 16,
  segments,
  color = 'var(--info)',
  label,
  sublabel,
  showBounds = false,
  formatValue,
}: GaugeChartProps) {
  const isSemi = variant === 'semi'
  const r = (size - thickness) / 2
  const cx = size / 2
  const cy = isSemi ? size / 2 : size / 2
  const sweep = isSemi ? Math.PI : 2 * Math.PI
  const startAngle = isSemi ? Math.PI : -Math.PI / 2
  const ratio = Math.max(0, Math.min(1, (value - min) / (max - min || 1)))
  const arcLen = sweep * r

  /** Toạ độ điểm trên cung tại tỉ lệ t (0–1) */
  const pointAt = (t: number) => {
    const a = startAngle + sweep * t * (isSemi ? 1 : 1)
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  }

  const arcPath = (from: number, to: number) => {
    const [x1, y1] = pointAt(from)
    const [x2, y2] = pointAt(to)
    const large = to - from > 0.5 ? 1 : 0
    return `M${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 ${large} 1 ${x2.toFixed(2)},${y2.toFixed(2)}`
  }

  const height = isSemi ? size / 2 + thickness : size

  return (
    <div className={`gauge gauge--${variant}`} style={{ width: size }}>
      <svg width={size} height={height} viewBox={`0 0 ${size} ${height}`} role="img">
        {/* nền */}
        {isSemi ? (
          <path
            d={arcPath(0, 1)}
            fill="none"
            stroke="var(--chart-track)"
            strokeWidth={thickness}
            strokeLinecap="round"
          />
        ) : (
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="var(--chart-track)"
            strokeWidth={thickness}
          />
        )}

        {/* dải màu theo ngưỡng */}
        {segments &&
          segments.map((seg, i) => {
            const from = i === 0 ? 0 : (segments[i - 1].to - min) / (max - min)
            const to = (seg.to - min) / (max - min)
            return isSemi ? (
              <path
                key={seg.to}
                d={arcPath(from, to)}
                fill="none"
                stroke={seg.color}
                strokeWidth={thickness}
              />
            ) : (
              <circle
                key={seg.to}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={thickness}
                strokeDasharray={`${(to - from) * arcLen} ${arcLen}`}
                strokeDashoffset={-from * arcLen}
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            )
          })}

        {/* giá trị */}
        {!segments &&
          (isSemi ? (
            <path
              d={arcPath(0, Math.max(ratio, 0.001))}
              fill="none"
              stroke={color}
              strokeWidth={thickness}
              strokeLinecap="round"
            />
          ) : (
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={color}
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={`${ratio * arcLen} ${arcLen}`}
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          ))}

        {/* kim chỉ khi có dải màu */}
        {segments && isSemi && (
          <g>
            {(() => {
              const [px, py] = pointAt(ratio)
              return (
                <>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={px}
                    y2={py}
                    stroke="var(--text-primary)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx={cx} cy={cy} r="5" fill="var(--text-primary)" />
                </>
              )
            })()}
          </g>
        )}
      </svg>

      <div className={isSemi ? 'gauge__label gauge__label--semi' : 'gauge__label'}>
        <span className="gauge__value num">
          {formatValue ? formatValue(value) : value}
        </span>
        {label && <span className="gauge__caption">{label}</span>}
        {sublabel && <span className="gauge__sub">{sublabel}</span>}
      </div>

      {showBounds && isSemi && (
        <div className="gauge__bounds num">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  )
}
