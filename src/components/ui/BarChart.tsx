import './BarChart.css'

export interface BarSeries {
  name: string
  color: string
  values: number[]
}

export interface BarChartProps {
  series: BarSeries[]
  labels: string[]
  height?: number
  /** Đường phủ lên biểu đồ cột (vd Lợi nhuận trên nền Doanh thu) */
  line?: { name: string; color: string; values: number[]; dashed?: boolean }
  /** Gộp các series thành một cột xếp chồng */
  stacked?: boolean
  showLegend?: boolean
  yTicks?: number
  /** Nhãn trục Y (vd "Tỷ VND") */
  yUnit?: string
  className?: string
}

/**
 * Biểu đồ cột thuần SVG — hỗ trợ giá trị âm (dòng tiền ra),
 * nhóm cột cạnh nhau, xếp chồng và đường phủ.
 */
export default function BarChart({
  series,
  labels,
  height = 220,
  line,
  stacked = false,
  showLegend = true,
  yTicks = 5,
  yUnit,
  className = '',
}: BarChartProps) {
  const W = 640
  const H = height
  const padL = 40
  const padR = line ? 34 : 8
  const padT = 12
  const padB = 26

  const groupCount = labels.length || 1
  const all = series.flatMap((s) => s.values)
  const stackedTotals = stacked
    ? labels.map((_, i) => series.reduce((sum, s) => sum + (s.values[i] ?? 0), 0))
    : []

  const rawMax = Math.max(...(stacked ? stackedTotals : all), 0)
  const rawMin = Math.min(...(stacked ? stackedTotals : all), 0)
  const max = rawMax === 0 && rawMin === 0 ? 1 : rawMax
  const min = rawMin
  const span = max - min || 1

  const plotW = W - padL - padR
  const plotH = H - padT - padB
  const bandW = plotW / groupCount
  const barGroupW = bandW * 0.62
  const barW = stacked ? barGroupW : barGroupW / series.length

  const y = (v: number) => padT + (1 - (v - min) / span) * plotH
  const zeroY = y(0)

  // Đường phủ dùng thang đo riêng (trục phải)
  const lineMax = line ? Math.max(...line.values, 1) : 1
  const lineMin = line ? Math.min(...line.values, 0) : 0
  const lineSpan = lineMax - lineMin || 1
  const ly = (v: number) => padT + (1 - (v - lineMin) / lineSpan) * plotH
  const lx = (i: number) => padL + bandW * i + bandW / 2

  return (
    <div className={`barchart ${className}`.trim()}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img">
        {/* lưới ngang + trục trái */}
        {Array.from({ length: yTicks + 1 }, (_, i) => {
          const v = min + (span * i) / yTicks
          const yy = y(v)
          return (
            <g key={i}>
              <line
                x1={padL}
                y1={yy}
                x2={W - padR}
                y2={yy}
                stroke="var(--slate-200)"
                strokeWidth="1"
                strokeDasharray={v === 0 ? undefined : '3 4'}
              />
              <text x={padL - 6} y={yy + 3} textAnchor="end" className="barchart__axis">
                {formatTick(v)}
              </text>
            </g>
          )
        })}

        {/* cột */}
        {labels.map((label, i) => {
          let stackOffset = 0
          return (
            <g key={`${label}-${i}`}>
              {series.map((s, si) => {
                const v = s.values[i] ?? 0
                const x = stacked
                  ? padL + bandW * i + (bandW - barGroupW) / 2
                  : padL + bandW * i + (bandW - barGroupW) / 2 + si * barW
                const top = stacked ? y(stackOffset + v) : y(Math.max(v, 0))
                const bottom = stacked ? y(stackOffset) : zeroY
                const h = Math.max(Math.abs(bottom - top), 1)
                if (stacked) stackOffset += v
                return (
                  <rect
                    key={s.name}
                    x={x + (stacked ? 0 : 1)}
                    y={Math.min(top, bottom)}
                    width={Math.max(barW - (stacked ? 0 : 2), 2)}
                    height={h}
                    rx="3"
                    fill={s.color}
                  />
                )
              })}
            </g>
          )
        })}

        {/* đường phủ */}
        {line && (
          <>
            <path
              d={line.values
                .map((v, i) => `${i === 0 ? 'M' : 'L'}${lx(i).toFixed(1)},${ly(v).toFixed(1)}`)
                .join(' ')}
              fill="none"
              stroke={line.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={line.dashed ? '6 5' : undefined}
            />
            {line.values.map((v, i) => (
              <circle key={i} cx={lx(i)} cy={ly(v)} r="3" fill={line.color} />
            ))}
          </>
        )}

        {/* nhãn trục X */}
        {labels.map((label, i) => (
          <text
            key={`lb-${label}-${i}`}
            x={lx(i)}
            y={H - 8}
            textAnchor="middle"
            className="barchart__axis"
          >
            {label}
          </text>
        ))}
      </svg>

      {yUnit && <span className="barchart__unit">{yUnit}</span>}

      {showLegend && (
        <ul className="barchart__legend">
          {series.map((s) => (
            <li key={s.name}>
              <i style={{ background: s.color }} />
              {s.name}
            </li>
          ))}
          {line && (
            <li>
              <i className="barchart__legend-line" style={{ background: line.color }} />
              {line.name}
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

function formatTick(v: number): string {
  const abs = Math.abs(v)
  if (abs >= 1000) return `${Math.round(v / 1000)}k`
  return `${Math.round(v)}`
}
