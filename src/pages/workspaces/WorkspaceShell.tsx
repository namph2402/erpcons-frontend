import { useState, type ReactNode } from 'react'
import { AppLayout, PageHeader } from '../../components/layout'
import {
  Button,
  Icon,
  SearchInput,
  Select,
  StatCard,
  Tabs,
} from '../../components/ui'
import type { TabItem } from '../../components/ui'
import { NotificationDrawer, QuickAccess } from '../../components/widgets'
import type { QuickAction } from '../../components/widgets'
import { appFooterNav, appNav } from '../../data/navigation'
import { currentUser, notifications } from '../../data/mock'
import type { StatCardProps } from '../../components/ui'
import type { User } from '../../types'
import './workspaces.css'

export interface WorkspaceFilter {
  id: string
  label: string
  options: { value: string; label: string }[]
}

export interface WorkspaceShellProps {
  /** id mục đang active trong menu chung */
  activeId: string
  title: string
  subtitle: string
  user?: User
  /** Nhãn nút hành động chính, vd "Tạo NCR" */
  createLabel: string
  searchPlaceholder: string
  /** Hàng KPI đầu trang */
  kpis: (Omit<StatCardProps, 'layout'> & { id: string })[]
  /** Select lọc trên thanh công cụ */
  filters?: WorkspaceFilter[]
  /** Tab phân loại dưới thanh lọc */
  tabs?: TabItem[]
  activeTab?: string
  onTabChange?: (id: string) => void
  /** Panel chi tiết bên phải */
  detail?: ReactNode
  /** Thao tác nhanh cuối trang */
  quickActions?: QuickAction[]
  children: ReactNode
}

/**
 * Khung dùng chung cho toàn bộ Object Workspace (Tài sản, Thiết bị,
 * Vật tư, Tài liệu, Công việc, Vấn đề, NCR, RFI, Bản vẽ, Cuộc họp,
 * Hóa đơn, Đơn mua hàng, Ngân sách, Chi phí, Kết quả AI).
 *
 * Dùng ĐÚNG một Sidebar (`appNav`) và ĐÚNG một Topbar như mọi màn hình
 * khác — workspace chỉ khác nhau ở KPI, bộ lọc, bảng và phân tích.
 */
export default function WorkspaceShell({
  activeId,
  title,
  subtitle,
  user = currentUser,
  createLabel,
  searchPlaceholder,
  kpis,
  filters = [],
  tabs,
  activeTab,
  onTabChange,
  detail,
  quickActions,
  children,
}: WorkspaceShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [starred, setStarred] = useState(false)

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
      <div className="ws-page">
        <PageHeader
          title={
            <span className="ws-title">
              {title}
              <button
                className={`ws-star${starred ? ' is-on' : ''}`}
                type="button"
                aria-label="Đánh dấu yêu thích"
                onClick={() => setStarred((v) => !v)}
              >
                <Icon name="star" size={20} filled={starred} />
              </button>
            </span>
          }
          subtitle={subtitle}
          actions={
            <>
              <Button icon="monitoring">Báo cáo</Button>
              <Button variant="primary" icon="add" trailingIcon="expand_more">
                {createLabel}
              </Button>
              <Button iconOnly icon="more_vert" aria-label="Thao tác khác" />
            </>
          }
        />

        <div className="ws-kpis">
          {kpis.map(({ id, ...kpi }) => (
            <StatCard key={id} layout="stacked" {...kpi} />
          ))}
        </div>

        <div className={detail ? 'ws-body ws-body--with-detail' : 'ws-body'}>
          <div className="ws-main">
            <div className="ws-toolbar">
              <SearchInput placeholder={searchPlaceholder} shortcut="" className="ws-toolbar__search" />
              {filters.map((f) => (
                <Select
                  key={f.id}
                  size="md"
                  aria-label={f.label}
                  options={f.options}
                />
              ))}
              <Button icon="filter_list">Bộ lọc</Button>
              <Button iconOnly icon="refresh" aria-label="Làm mới" />
              <Button iconOnly icon="more_vert" aria-label="Tuỳ chọn bảng" />
            </div>

            {tabs && tabs.length > 0 && (
              <Tabs
                items={tabs}
                value={activeTab ?? tabs[0].id}
                onChange={(id) => onTabChange?.(id)}
              />
            )}

            {children}
          </div>

          {detail && <aside className="ws-detail">{detail}</aside>}
        </div>

        {quickActions && quickActions.length > 0 && (
          <section className="ws-quick">
            <h2 className="ws-quick__title">Thao tác nhanh</h2>
            <QuickAccess actions={quickActions} />
          </section>
        )}
      </div>
    </AppLayout>
  )
}
