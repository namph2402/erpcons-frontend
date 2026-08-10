import { useState } from 'react'
import Icon from '../ui/Icon'
import type { GanttTask } from '../../types'
import './GanttChart.css'

export interface GanttChartProps {
  tasks: GanttTask[]
  /** Nhãn cột trục thời gian (T2, T3, ... CN) */
  columns: string[]
  /** Tiêu đề khoảng thời gian, vd "Tháng 5, 2024" */
  periodLabel?: string
  /** Chỉ số cột được đánh dấu "Hôm nay" */
  todayIndex?: number
}

const TONE_CLASS: Record<GanttTask['tone'], string> = {
  done: 'is-done',
  doing: 'is-doing',
  plan: 'is-plan',
}

/** Biểu đồ Gantt tiến độ dự án (03.10 · Gantt View) */
export default function GanttChart({
  tasks,
  columns,
  periodLabel,
  todayIndex,
}: GanttChartProps) {
  const [collapsed, setCollapsed] = useState<string[]>([])

  const toggle = (id: string) =>
    setCollapsed((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )

  /** Ẩn công việc con của nhóm cha đang thu gọn */
  const visible: GanttTask[] = []
  let hiddenParent: string | null = null
  tasks.forEach((t) => {
    if (t.level === 0) {
      hiddenParent = collapsed.includes(t.id) ? t.id : null
      visible.push(t)
    } else if (!hiddenParent) {
      visible.push(t)
    }
  })

  return (
    <div className="gantt">
      <div className="gantt__side">
        <div className="gantt__side-head">Hạng mục / Công việc</div>
        {visible.map((t) => (
          <div key={t.id} className={`gantt__row gantt__row--level-${t.level}`}>
            {t.level === 0 ? (
              <button
                className="gantt__toggle"
                type="button"
                onClick={() => toggle(t.id)}
                aria-label="Thu gọn / mở rộng"
              >
                <Icon
                  name={collapsed.includes(t.id) ? 'chevron_right' : 'expand_more'}
                  size={18}
                />
              </button>
            ) : (
              <span className={`gantt__check gantt__check--${t.tone}`}>
                <Icon
                  name={t.progress === 100 ? 'check_circle' : 'radio_button_unchecked'}
                  size={18}
                />
              </span>
            )}
            <span className="gantt__name truncate">{t.name}</span>
            <span className="gantt__pct num">{t.progress}%</span>
            <i className={`gantt__flag gantt__flag--${t.tone}`} />
          </div>
        ))}
      </div>

      <div className="gantt__timeline scroll-y">
        <div className="gantt__period">{periodLabel}</div>
        <div
          className="gantt__cols"
          style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(28px, 1fr))` }}
        >
          {columns.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className={`gantt__col-label${i === todayIndex ? ' is-today' : ''}`}
            >
              {i === todayIndex ? <b>{c}</b> : c}
            </span>
          ))}
        </div>

        <div
          className="gantt__grid"
          style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(28px, 1fr))` }}
        >
          {columns.map((c, i) => (
            <span
              key={`line-${c}-${i}`}
              className={`gantt__gridline${i === todayIndex ? ' is-today' : ''}`}
            />
          ))}

          {visible.map((t, rowIndex) => (
            <div
              key={t.id}
              className={`gantt__bar ${TONE_CLASS[t.tone]}`}
              style={{
                gridColumn: `${t.start + 1} / span ${t.span}`,
                gridRow: 1,
                top: rowIndex * 36 + 8,
              }}
            >
              <span className="gantt__bar-fill" style={{ width: `${t.progress}%` }} />
              {t.milestone && <i className="gantt__milestone" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
