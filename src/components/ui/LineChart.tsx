import './LineChart.css'

export interface LineSeries {
  name: string
  color: string
  points: number[]
  /** Vẽ nét đứt (dùng cho đường "Kế hoạch") */
  dashed?: boolean
  /** Tô nền gradient dưới đường */
  area?: boolean
}

export interface LineChartProps {
  series: LineSeries[]
  labels?: string[]
  height?: number
  /** Ẩn lưới + trục — dùng cho sparkline trong ô nhỏ */
  minimal?: boolean
  showLegend?: boolean
  yTicks?: number
  className?: string
}

/** Biểu đồ đường thuần SVG (responsive theo viewBox) */
export default function LineChart({
  series,
  labels = [],
  height = 180,
  minimal = false,
  showLegend = false,
  yTicks = 4,
  className = '',
}: LineChartProps) {
  const W = 600
  const H = height
  const padL = minimal ? 0 : 34
  const padR = minimal ? 0 : 8
  const padT = minimal ? 4 : 10
  const padB = minimal ? 4 : 22

  const all = series.flatMap((s) => s.points)
  const max = Math.max(...all, 1)
  const min = Math.min(...all, 0)
  const span = max - min || 1
  const count = Math.max(...series.map((s) => s.points.length), 2)

  const x = (i: number) => padL + (i * (W - padL - padR)) / (count - 1)
  const y = (v: number) => padT + (1 - (v - min) / span) * (H - padT - padB)

  const linePath = (pts: number[]) =>
    pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')

  const areaPath = (pts: number[]) =>
    `${linePath(pts)} L${x(pts.length - 1).toFixed(1)},${(H - padB).toFixed(1)} L${x(0).toFixed(1)},${(H - padB).toFixed(1)} Z`

  return (
    <div className={`linechart ${className}`.trim()}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img">
        <defs>
          {series.map((s, si) => (
            <linearGradient key={s.name} id={`lc-grad-${si}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.24" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {!minimal &&
          Array.from({ length: yTicks + 1 }, (_, i) => {
            const v = min + (span * i) / yTicks
            const yy = y(v)
            return (
              <g key={i}>
                <line
                  x1={padL}
                  y1={yy}
                  x2={W - padR}
                  y2={yy}
                  stroke="var(--chart-grid)"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
                <text
                  x={padL - 6}
                  y={yy + 3}
                  textAnchor="end"
                  className="linechart__axis"
                >
                  {Math.round(v)}
                </text>
              </g>
            )
          })}

        {series.map((s, si) => (
          <g key={s.name}>
            {s.area && (
              <path d={areaPath(s.points)} fill={`url(#lc-grad-${si})`} stroke="none" />
            )}
            <path
              d={linePath(s.points)}
              fill="none"
              stroke={s.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={s.dashed ? '6 5' : undefined}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>

      {!minimal && labels.length > 0 && (
        <div className="linechart__labels" style={{ paddingLeft: `${(padL / W) * 100}%` }}>
          {labels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      )}

      {showLegend && (
        <ul className="linechart__legend">
          {series.map((s) => (
            <li key={s.name}>
              <i
                style={{
                  background: s.dashed ? 'transparent' : s.color,
                  borderTop: s.dashed ? `2px dashed ${s.color}` : undefined,
                }}
              />
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
