import Icon from '../ui/Icon'
import './CountRowList.css'

export interface CountRow {
  id: string
  label: string
  count: number | string
  /** Màu huy hiệu số đếm */
  tone?: 'info' | 'success' | 'warning' | 'danger' | 'neutral'
  /** Icon thay cho huy hiệu số */
  icon?: string
  sub?: string
  onClick?: () => void
}

export interface CountRowListProps {
  rows: CountRow[]
  /** badge: số đếm tròn bên trái · icon: icon bên trái, số bên phải */
  variant?: 'badge' | 'icon'
  /** Hiện mũi tên điều hướng cuối dòng */
  chevron?: boolean
  /** Tiêu đề nhóm nhỏ phía trên danh sách */
  groupLabel?: string
}

/**
 * Danh sách "nhãn – số đếm" dùng lại ở nhiều dashboard:
 * Cảnh báo & Rủi ro, Vấn đề & Rủi ro, Tình hình công trường...
 */
export default function CountRowList({
  rows,
  variant = 'badge',
  chevron = true,
  groupLabel,
}: CountRowListProps) {
  return (
    <div className="count-rows">
      {groupLabel && <p className="count-rows__group">{groupLabel}</p>}
      <ul>
        {rows.map((row) => (
          <li key={row.id}>
            <button className="count-row" type="button" onClick={row.onClick}>
              {variant === 'badge' ? (
                <span className={`count-row__badge count-row__badge--${row.tone ?? 'neutral'}`}>
                  {row.count}
                </span>
              ) : (
                <span className={`count-row__icon count-row__icon--${row.tone ?? 'neutral'}`}>
                  <Icon name={row.icon ?? 'info'} size={20} />
                </span>
              )}

              <span className="count-row__body">
                <span className="count-row__label truncate">{row.label}</span>
                {row.sub && <span className="count-row__sub truncate">{row.sub}</span>}
              </span>

              {variant === 'icon' && (
                <span className="count-row__value num">{row.count}</span>
              )}
              {chevron && <Icon name="chevron_right" size={18} className="count-row__chev" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
