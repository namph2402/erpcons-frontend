import { useState } from 'react'
import Icon from '../ui/Icon'
import './MiniCalendar.css'

export interface MiniCalendarProps {
  /** Ngày được chọn (1–31) trong tháng hiển thị */
  selected?: number
  /** Các ngày có sự kiện — hiện chấm dưới số */
  marked?: number[]
  month: number
  year: number
  onSelect?: (day: number) => void
}

const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

/** Lịch tháng thu nhỏ — 03.10 Calendar View */
export default function MiniCalendar({
  selected,
  marked = [],
  month,
  year,
  onSelect,
}: MiniCalendarProps) {
  const [view, setView] = useState({ month, year })

  const first = new Date(view.year, view.month - 1, 1)
  /** JS: CN = 0 → chuyển sang tuần bắt đầu Thứ 2 */
  const startOffset = (first.getDay() + 6) % 7
  const daysInMonth = new Date(view.year, view.month, 0).getDate()
  const daysInPrev = new Date(view.year, view.month - 1, 0).getDate()

  const cells: { day: number; muted: boolean }[] = []
  for (let i = startOffset - 1; i >= 0; i -= 1) {
    cells.push({ day: daysInPrev - i, muted: true })
  }
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push({ day: d, muted: false })
  }
  let next = 1
  while (cells.length % 7 !== 0 || cells.length < 42) {
    if (cells.length >= 42) break
    cells.push({ day: next, muted: true })
    next += 1
  }

  const shift = (delta: number) => {
    setView((v) => {
      const m = v.month + delta
      if (m < 1) return { month: 12, year: v.year - 1 }
      if (m > 12) return { month: 1, year: v.year + 1 }
      return { month: m, year: v.year }
    })
  }

  return (
    <div className="mini-cal">
      <div className="mini-cal__nav">
        <button type="button" onClick={() => shift(-1)} aria-label="Tháng trước">
          <Icon name="chevron_left" size={18} />
        </button>
        <span className="mini-cal__month">
          Tháng {String(view.month).padStart(2, '0')}/{view.year}
        </span>
        <button type="button" onClick={() => shift(1)} aria-label="Tháng sau">
          <Icon name="chevron_right" size={18} />
        </button>
      </div>

      <div className="mini-cal__grid">
        {WEEKDAYS.map((w) => (
          <span key={w} className="mini-cal__weekday">
            {w}
          </span>
        ))}
        {cells.map((c, i) => {
          const isSelected = !c.muted && c.day === selected
          const isMarked = !c.muted && marked.includes(c.day)
          return (
            <button
              key={`${c.day}-${i}`}
              type="button"
              className={[
                'mini-cal__day',
                c.muted ? 'is-muted' : '',
                isSelected ? 'is-selected' : '',
                isMarked ? 'is-marked' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => !c.muted && onSelect?.(c.day)}
            >
              {c.day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
