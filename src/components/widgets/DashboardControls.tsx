import Button from '../ui/Button'
import Icon from '../ui/Icon'
import Select from '../ui/Select'
import type { SelectOption } from '../ui/Select'
import './DashboardControls.css'

export interface DashboardControlsProps {
  /** Bộ chọn đối tượng (chọn dự án) */
  selector?: React.ReactNode
  /** Khoảng thời gian đang xem */
  dateRange?: string
  /** Bộ chọn kỳ so sánh / phạm vi */
  compare?: { options: SelectOption[]; value?: string; onChange?: (v: string) => void }
  /** Nút hành động chính (mặc định "+ Thêm widget") */
  primaryAction?: { label: string; icon?: string; onClick?: () => void }
  /** Nút icon phụ: tải xuống, chia sẻ, làm mới... */
  utilityIcons?: { icon: string; label: string; onClick?: () => void }[]
}

/**
 * Cụm điều khiển riêng của Dashboard.
 * Đặt trong `actions` của PageHeader — KHÔNG thay thế Topbar chung,
 * để mọi màn hình giữ đúng một header duy nhất.
 */
export default function DashboardControls({
  selector,
  dateRange,
  compare,
  primaryAction = { label: 'Thêm widget', icon: 'add' },
  utilityIcons = [],
}: DashboardControlsProps) {
  return (
    <>
      {selector}

      {dateRange && (
        <button className="dash-range" type="button">
          <span className="num">{dateRange}</span>
          <Icon name="calendar_month" size={20} />
        </button>
      )}

      {compare &&
        (compare.onChange ? (
          <Select
            size="md"
            options={compare.options}
            value={compare.value}
            onChange={(e) => compare.onChange?.(e.target.value)}
          />
        ) : (
          <Select size="md" options={compare.options} defaultValue={compare.value} />
        ))}

      {primaryAction && (
        <Button variant="primary" icon={primaryAction.icon} onClick={primaryAction.onClick}>
          {primaryAction.label}
        </Button>
      )}

      {utilityIcons.map((u) => (
        <Button
          key={u.icon}
          iconOnly
          icon={u.icon}
          aria-label={u.label}
          title={u.label}
          onClick={u.onClick}
        />
      ))}
    </>
  )
}

/** Bộ chọn dự án dùng ở Dashboard dự án / thi công */
export function ProjectSelector({
  name,
  onClick,
}: {
  name: string
  onClick?: () => void
}) {
  return (
    <button className="dash-selector" type="button" onClick={onClick}>
      <span className="dash-selector__thumb">
        <Icon name="apartment" size={20} />
      </span>
      <span className="dash-selector__name truncate">{name}</span>
      <Icon name="expand_more" size={20} />
    </button>
  )
}
