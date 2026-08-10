import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import type { NavGroup, NavItem, User } from "../../types";
import "./AppLayout.css";

export interface AppLayoutProps {
  /** Cấu hình menu — mỗi màn hình truyền bộ menu riêng */
  navGroups: NavGroup[];
  activeId: string;
  onNavigate?: (item: NavItem) => void;
  user: User;
  /** Mục cố định dưới đáy sidebar */
  sidebarFooterItems?: NavItem[];
  /** Nội dung phụ cuối vùng cuộn sidebar (dự án gần đây...) */
  sidebarExtra?: ReactNode;
  /* ---- Topbar ---- */
  topbarLeading?: ReactNode;
  topbarActions?: ReactNode;
  notificationCount?: number;
  searchPlaceholder?: string;
  /** Ẩn topbar khi trang tự dựng header riêng */
  hideTopbar?: boolean;
  /**
   * Thay thế Topbar mặc định bằng header riêng (vd DashboardHeader).
   * Nhận sẵn hàm mở/đóng sidebar để nút hamburger vẫn hoạt động trên mobile.
   */
  topbar?: (api: { toggleSidebar: () => void }) => ReactNode;
  /* ---- Drawer phải (02.8 Notification Center) ---- */
  drawer?: ReactNode;
  drawerOpen?: boolean;
  onCloseDrawer?: () => void;
  onOpenDrawer?: () => void;
  /* ---- Nội dung ---- */
  children: ReactNode;
  footer?: ReactNode;
  /** Giới hạn bề rộng nội dung theo container-max */
  contained?: boolean;
}

/**
 * Khung ứng dụng dùng chung: Sidebar + Topbar + Content (+ Drawer phải).
 * Mọi page chỉ cần render phần children — không tự dựng lại menu/header.
 */
export default function AppLayout({
  navGroups,
  activeId,
  onNavigate,
  user,
  sidebarFooterItems,
  sidebarExtra,
  topbarLeading,
  topbarActions,
  notificationCount = 0,
  searchPlaceholder,
  hideTopbar = false,
  topbar,
  drawer,
  drawerOpen = false,
  onCloseDrawer,
  onOpenDrawer,
  children,
  footer,
  contained = true,
}: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-layout">
      <div
        className={
          mobileOpen ? "app-layout__sidebar is-open" : "app-layout__sidebar"
        }
      >
        <Sidebar
          groups={navGroups}
          activeId={activeId}
          onNavigate={(item) => {
            setMobileOpen(false);
            onNavigate?.(item);
          }}
          user={user}
          footerItems={sidebarFooterItems}
          extra={sidebarExtra}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((v) => !v)}
        />
      </div>

      {mobileOpen && (
        <div
          className="app-layout__scrim"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="app-layout__main">
        {topbar
          ? topbar({ toggleSidebar: () => setMobileOpen((v) => !v) })
          : null}

        {!topbar && !hideTopbar && (
          <Topbar
            user={user}
            notificationCount={notificationCount}
            onOpenNotifications={onOpenDrawer}
            onToggleSidebar={() => setMobileOpen((v) => !v)}
            leading={topbarLeading}
            actions={topbarActions}
            searchPlaceholder={searchPlaceholder}
          />
        )}

        <div className="app-layout__body">
          <main
            className={`app-layout__content scroll-y${contained ? " is-contained" : ""}`}
          >
            {children}
            {footer && <footer className="app-layout__footer">{footer}</footer>}
          </main>

          {drawer && drawerOpen && (
            <>
              <div
                className="app-layout__drawer-scrim"
                onClick={onCloseDrawer}
                aria-hidden="true"
              />
              <aside className="app-layout__drawer scroll-y">{drawer}</aside>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
