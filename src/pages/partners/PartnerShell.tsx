import { useState, type ReactNode } from 'react'
import { AppLayout, PageHeader } from '../../components/layout'
import type { BreadcrumbItem } from '../../components/layout'
import { NotificationDrawer } from '../../components/widgets'
import { appFooterNav, appNav } from '../../data/navigation'
import { currentUser, notifications } from '../../data/mock'
import type { User } from '../../types'
import './partners.css'

export interface PartnerShellProps {
  activeId: string
  user?: User
  breadcrumbs?: BreadcrumbItem[]
  title: ReactNode
  code?: string
  subtitle?: ReactNode
  thumbnail?: ReactNode
  status?: ReactNode
  actions?: ReactNode
  tabs?: ReactNode
  searchPlaceholder?: string
  children: ReactNode
}

/**
 * Khung dùng chung cho nhóm Hợp đồng · Đối tác · Cộng tác.
 * Vẫn là ĐÚNG một Sidebar (`appNav`) + ĐÚNG một Topbar như mọi
 * màn hình khác, phần riêng nằm ở PageHeader.
 */
export default function PartnerShell({
  activeId,
  user = currentUser,
  breadcrumbs,
  title,
  code,
  subtitle,
  thumbnail,
  status,
  actions,
  tabs,
  searchPlaceholder = 'Tìm kiếm nhanh (Dự án, Công việc, Hợp đồng, Tài liệu...)',
  children,
}: PartnerShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <AppLayout
      navGroups={appNav}
      activeId={activeId}
      user={user}
      sidebarFooterItems={appFooterNav}
      contained={false}
      notificationCount={12}
      searchPlaceholder={searchPlaceholder}
      drawerOpen={drawerOpen}
      onOpenDrawer={() => setDrawerOpen(true)}
      onCloseDrawer={() => setDrawerOpen(false)}
      drawer={
        <NotificationDrawer items={notifications} onClose={() => setDrawerOpen(false)} />
      }
    >
      <div className="pt-page">
        <PageHeader
          breadcrumbs={breadcrumbs}
          title={title}
          code={code}
          subtitle={subtitle}
          thumbnail={thumbnail}
          status={status}
          actions={actions}
          tabs={tabs}
        />
        {children}
      </div>
    </AppLayout>
  )
}
