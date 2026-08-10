import type { ReactNode } from 'react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import Select from '../ui/Select'
import type { BadgeTone } from '../ui/Badge'
import type { SelectOption } from '../ui/Select'
import './DashboardHeader.css'

export interface DashboardHeaderProps {
  /** Số thứ tự màn hình theo bộ thiết kế, vd "54." */
  index?: string
  title: string
  subtitle?: string
  /** Chip cạnh tiêu đề (AI · IoT · Knowledge Graph) */
  tag?: { label: string; tone?: BadgeTone; icon?: string }
  /** Breadcrumb phía trên tiêu đề */
  breadcrumbs?: { label: string; href?: string }[]
  /** Bộ chọn đối tượng đặt giữa header (chọn dự án) */
  selector?: ReactNode
  /** Khoảng thời gian đang xem */
  dateRange?: string
  /** Bộ chọn kỳ so sánh / phạm vi */
  compare?: { options: SelectOption[]; value?: string; onChange?: (v: string) => void }
  /** Nút hành động chính (mặc định "+ Thêm widget") */
  primaryAction?: { label: string; icon?: string; onClick?: () => void }
  /** Các nút icon phụ: tải xuống, chia sẻ, làm mới... */
  utilityIcons?: { icon: string; label: string; onClick?: () => void }[]
  notificationCount?: number
  onOpenNotifications?: () => void
  onToggleSidebar?: () => void
}

/**
 * Header chuẩn của nhóm màn hình Dashboard (54–60).
 * Khác Topbar nghiệp vụ: không có global search, thay bằng
 * tiêu đề dashboard + bộ lọc thời gian + hành động widget.
 */
export default function DashboardHeader({
  index,
  title,
  subtitle,
  tag,
  breadcrumbs,
  selector,
  dateRange,
  compare,
  primaryAction = { label: 'Thêm widget', icon: 'add' },
  utilityIcons = [],
  notificationCount = 0,
  onOpenNotifications,
  onToggleSidebar,
}: DashboardHeaderProps) {
  return (
    <header className="dash-header">
      <button
        className="dash-header__burger"
        type="button"
        onClick={onToggleSidebar}
        aria-label="Mở / đóng menu"
      >
        <Icon name="menu" size={24} />
      </button>

      <div className="dash-header__titles">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="dash-header__crumbs" aria-label="Đường dẫn">
            {breadcrumbs.map((b, i) => (
              <span key={b.label}>
                {i > 0 && <Icon name="chevron_right" size={16} />}
                <a href={b.href ?? '#'}>{b.label}</a>
              </span>
            ))}
          </nav>
        )}
        <div className="dash-header__title-row">
          <h1 className="dash-header__title">
            {index && <span className="dash-header__index">{index}</span>}
            {title}
          </h1>
          {tag && (
            <Badge tone={tag.tone ?? 'ai'} size="md">
              {tag.icon && <Icon name={tag.icon} size={12} />}
              {tag.label}
            </Badge>
          )}
        </div>
        {subtitle && <p className="dash-header__subtitle">{subtitle}</p>}
      </div>

      <div className="dash-header__controls">
        {selector}

        {dateRange && (
          <button className="dash-header__range" type="button">
            <span className="num">{dateRange}</span>
            <Icon name="calendar_month" size={18} />
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
            /* Không có handler → để select tự quản lý, tránh controlled input thiếu onChange */
            <Select size="md" options={compare.options} defaultValue={compare.value} />
          ))}

        {primaryAction && (
          <Button variant="primary" icon={primaryAction.icon} onClick={primaryAction.onClick}>
            {primaryAction.label}
          </Button>
        )}

        {utilityIcons.map((u) => (
          <button
            key={u.icon}
            className="dash-header__icon-btn"
            type="button"
            aria-label={u.label}
            title={u.label}
            onClick={u.onClick}
          >
            <Icon name={u.icon} size={20} />
          </button>
        ))}

        <button
          className="dash-header__icon-btn"
          type="button"
          aria-label={`Thông báo (${notificationCount} chưa đọc)`}
          onClick={onOpenNotifications}
        >
          <Icon name="notifications" size={24} />
          {notificationCount > 0 && (
            <span className="dash-header__badge num">{notificationCount}</span>
          )}
        </button>

        <button className="dash-header__icon-btn" type="button" aria-label="Trợ giúp">
          <Icon name="help" size={20} />
        </button>
      </div>
    </header>
  )
}

/** Bộ chọn dự án dùng ở Project / Construction Dashboard */
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
        <Icon name="apartment" size={18} />
      </span>
      <span className="dash-selector__name truncate">{name}</span>
      <Icon name="expand_more" size={18} />
    </button>
  )
}
