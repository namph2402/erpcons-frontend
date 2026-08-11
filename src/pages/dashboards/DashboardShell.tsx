import { useState, type ReactNode } from 'react'
import { AppLayout, PageHeader } from '../../components/layout'
import { Badge, Icon } from '../../components/ui'
import {
  DashboardControls,
  NotificationDrawer,
} from '../../components/widgets'
import type { DashboardControlsProps } from '../../components/widgets'
import type { BadgeTone } from '../../components/ui'
import { COMPARE_OPTIONS } from '../../data/dashboardNav'
import { appFooterNav, appNav } from '../../data/navigation'
import { notifications } from '../../data/mock'
import type { BreadcrumbItem } from '../../components/layout'
import type { NavItem, User } from '../../types'
import './dashboards.css'

export interface DashboardShellProps extends DashboardControlsProps {
  /** id mục đang active trong menu chung */
  activeId: string
  user: User
  /** Mục cố định đáy sidebar — mặc định Trợ giúp / Đăng xuất */
  sidebarFooterItems?: NavItem[]
  sidebarExtra?: ReactNode
  /* ---- Tiêu đề trang ---- */
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  /** Chip cạnh tiêu đề (AI · IoT · Đồ thị) */
  tag?: { label: string; tone?: BadgeTone; icon?: string }
  /* ---- Chân trang ---- */
  updatedAt?: string
  syncNote?: string
  notificationCount?: number
  children: ReactNode
}

/**
 * Khung dùng chung của nhóm Dashboard.
 *
 * Dùng ĐÚNG một Sidebar (`appNav`) và ĐÚNG một Topbar như mọi màn hình
 * khác; phần riêng của dashboard (khoảng thời gian, kỳ so sánh,
 * "Thêm widget") nằm trong `actions` của PageHeader.
 */
export default function DashboardShell({
  activeId,
  user,
  sidebarFooterItems = appFooterNav,
  sidebarExtra,
  title,
  subtitle,
  breadcrumbs,
  tag,
  updatedAt,
  syncNote = 'Dữ liệu được cập nhật tự động 15 phút/lần',
  notificationCount = 12,
  children,
  compare,
  ...controls
}: DashboardShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <AppLayout
      navGroups={appNav}
      activeId={activeId}
      user={user}
      sidebarFooterItems={sidebarFooterItems}
      sidebarExtra={sidebarExtra}
      contained={false}
      notificationCount={notificationCount}
      searchPlaceholder="Tìm kiếm nhanh (Dự án, Công việc, Hợp đồng, Tài liệu...)"
      mobileNavActiveId="home"
      drawerOpen={drawerOpen}
      onOpenDrawer={() => setDrawerOpen(true)}
      onCloseDrawer={() => setDrawerOpen(false)}
      drawer={
        <NotificationDrawer items={notifications} onClose={() => setDrawerOpen(false)} />
      }
      footer={
        updatedAt ? (
          <div className="dash-footer">
            <span>
              <i className="dash-footer__dot" />
              Cập nhật lần cuối: {updatedAt}
            </span>
            <span>{syncNote}</span>
          </div>
        ) : undefined
      }
    >
      <div className="dash-page">
        <PageHeader
          breadcrumbs={breadcrumbs}
          title={title}
          subtitle={subtitle}
          status={
            tag ? (
              <Badge tone={tag.tone ?? 'ai'} size="md">
                {tag.icon && <Icon name={tag.icon} size={12} />}
                {tag.label}
              </Badge>
            ) : undefined
          }
          actions={
            <DashboardControls
              {...controls}
              compare={compare ?? { options: COMPARE_OPTIONS, value: 'prev-month' }}
            />
          }
        />

        {children}
      </div>
    </AppLayout>
  )
}
