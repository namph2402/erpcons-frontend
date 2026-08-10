import type { ReactNode } from 'react'
import './DonutChart.css'

export interface DonutSlice {
  label: string
  value: number
  color: string
  /** Text phụ hiển thị ở legend (vd "12 (50%)") */
  note?: string
  /** Cột số thứ hai ở legend (vd note = "37", extra = "54%") */
  extra?: string
}

export interface DonutChartProps {
  data: DonutSlice[]
  size?: number
  thickness?: number
  /** Nội dung giữa vòng tròn */
  centerValue?: ReactNode
  centerLabel?: ReactNode
  legend?: 'right' | 'bottom' | 'none'
  /** Hiện % tự tính ở legend khi slice không có note */
  showPercent?: boolean
}

/** Biểu đồ vành khuyên thuần SVG — không phụ thuộc thư viện ngoài */
export default function DonutChart({
  data,
  size = 160,
  thickness = 22,
  centerValue,
  centerLabel,
  legend = 'right',
  showPercent = true,
}: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius

  /** Tính sẵn độ dài + độ lệch của từng cung để không mutate khi render */
  const arcs = data.reduce<{ slice: DonutSlice; len: number; offset: number }[]>(
    (acc, slice) => {
      const len = (slice.value / total) * circumference
      const prev = acc[acc.length - 1]
      const offset = prev ? prev.offset + prev.len : 0
      acc.push({ slice, len, offset })
      return acc
    },
    [],
  )

  return (
    <div className={`donut donut--legend-${legend}`}>
      <div className="donut__figure" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img">
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            {arcs.map(({ slice, len, offset }) => (
              <circle
                key={slice.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={slice.color}
                strokeWidth={thickness}
                strokeDasharray={`${len} ${circumference - len}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            ))}
          </g>
        </svg>
        {(centerValue || centerLabel) && (
          <div className="donut__center">
            <span className="donut__center-value num">{centerValue}</span>
            <span className="donut__center-label">{centerLabel}</span>
          </div>
        )}
      </div>

      {legend !== 'none' && (
        <ul className="donut__legend">
          {data.map((d) => (
            <li key={d.label} className="donut__legend-item">
              <i className="donut__dot" style={{ background: d.color }} />
              <span className="donut__legend-label truncate">{d.label}</span>
              <span className="donut__legend-value num">
                {d.note ??
                  (showPercent ? `${Math.round((d.value / total) * 100)}%` : d.value)}
              </span>
              {d.extra && <span className="donut__legend-extra num">{d.extra}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
