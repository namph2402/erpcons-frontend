import { useState, type ReactNode } from 'react'
import { AppLayout } from '../../components/layout'
import { DashboardHeader, NotificationDrawer } from '../../components/widgets'
import type { DashboardHeaderProps } from '../../components/widgets'
import { COMPARE_OPTIONS, dashboardSettingsNav } from '../../data/dashboardNav'
import { notifications } from '../../data/mock'
import type { NavGroup, NavItem, User } from '../../types'
import './dashboards.css'

export interface DashboardShellProps
  extends Omit<DashboardHeaderProps, 'onToggleSidebar' | 'onOpenNotifications'> {
  navGroups: NavGroup[]
  activeId: string
  user: User
  /** Mục cố định đáy sidebar — mặc định Cài đặt / Trợ giúp / Đăng xuất */
  sidebarFooterItems?: NavItem[]
  sidebarExtra?: ReactNode
  /** Dòng chân trang: mốc cập nhật + chu kỳ đồng bộ */
  updatedAt?: string
  syncNote?: string
  children: ReactNode
}

/**
 * Khung dùng chung của nhóm Dashboard (54–60).
 * Kế thừa nguyên vẹn AppLayout + Sidebar của các màn hình trước,
 * chỉ thay Topbar nghiệp vụ bằng DashboardHeader.
 */
export default function DashboardShell({
  navGroups,
  activeId,
  user,
  sidebarFooterItems = dashboardSettingsNav,
  sidebarExtra,
  updatedAt,
  syncNote = 'Dữ liệu được cập nhật tự động 15 phút/lần',
  children,
  compare,
  notificationCount = 12,
  ...headerProps
}: DashboardShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <AppLayout
      navGroups={navGroups}
      activeId={activeId}
      user={user}
      sidebarFooterItems={sidebarFooterItems}
      sidebarExtra={sidebarExtra}
      contained={false}
      drawerOpen={drawerOpen}
      onOpenDrawer={() => setDrawerOpen(true)}
      onCloseDrawer={() => setDrawerOpen(false)}
      drawer={
        <NotificationDrawer items={notifications} onClose={() => setDrawerOpen(false)} />
      }
      topbar={({ toggleSidebar }) => (
        <DashboardHeader
          {...headerProps}
          compare={compare ?? { options: COMPARE_OPTIONS, value: 'prev-month' }}
          notificationCount={notificationCount}
          onOpenNotifications={() => setDrawerOpen(true)}
          onToggleSidebar={toggleSidebar}
        />
      )}
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
      <div className="dash-page">{children}</div>
    </AppLayout>
  )
}
