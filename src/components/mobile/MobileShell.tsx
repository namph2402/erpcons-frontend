import { useState, type ReactNode } from 'react'
import MobileDrawer from './MobileDrawer'
import MobileHeader, { type MobileHeaderProps } from './MobileHeader'
import MobileNavBar, { type MobileNavItem } from './MobileNavBar'
import { DEFAULT_MOBILE_NAV } from '../../data/mobileNav'
import type { NavGroup, NavItem, User } from '../../types'
import './MobileShell.css'

export interface MobileShellProps {
  user: User
  /** Menu thu gọn — dùng lại bộ NavGroup của desktop */
  navGroups: NavGroup[]
  /** id mục đang active trong menu thu gọn */
  menuActiveId?: string
  drawerFooterItems?: NavItem[]
  /* ---- Header ---- */
  header?: MobileHeaderProps
  /* ---- Thanh điều hướng đáy ---- */
  navItems?: MobileNavItem[]
  navActiveId: string
  fab?: { icon?: string; label?: string; onClick?: () => void }
  /** Ẩn thanh đáy ở các màn hình toàn khung (quét QR, camera) */
  hideNavBar?: boolean
  /** Nội dung không cuộn, chiếm trọn khung (camera / scanner) */
  fullBleed?: boolean
  children: ReactNode
}

/**
 * Khung ứng dụng mobile (Level 7 · 61–65).
 *
 * Trên màn hình nhỏ: chiếm trọn viewport như một app thật.
 * Trên desktop: hiển thị trong khung điện thoại để review thiết kế —
 * thanh trạng thái giả lập chỉ xuất hiện ở chế độ này.
 */
export default function MobileShell({
  user,
  navGroups,
  menuActiveId = '',
  drawerFooterItems,
  header,
  navItems = DEFAULT_MOBILE_NAV,
  navActiveId,
  fab = { icon: 'add', label: 'Tạo mới' },
  hideNavBar = false,
  fullBleed = false,
  children,
}: MobileShellProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="mobile-stage">
      <div className="mobile-device">
        <div className="mobile-statusbar" aria-hidden="true">
          <span className="num">9:41</span>
          <span className="mobile-statusbar__icons">
            <i className="signal">
              <i className="is-on" />
              <i className="is-on" />
              <i className="is-on" />
              <i className="is-on" />
              <i />
            </i>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
              <path d="M7.5 9.8 9.4 8a2.7 2.7 0 0 0-3.8 0l1.9 1.8ZM3.8 6.2l1.2 1.1a3.9 3.9 0 0 1 5 0l1.2-1.1a5.6 5.6 0 0 0-7.4 0ZM.9 3.4l1.2 1.2a7.9 7.9 0 0 1 10.8 0l1.2-1.2a9.6 9.6 0 0 0-13.2 0Z" />
            </svg>
            <svg width="24" height="11" viewBox="0 0 24 11" fill="none">
              <rect x="0.5" y="0.5" width="19" height="10" rx="2.5" stroke="currentColor" />
              <rect x="2" y="2" width="16" height="7" rx="1.5" fill="currentColor" />
              <path d="M21 4v3a2 2 0 0 0 0-3Z" fill="currentColor" />
            </svg>
          </span>
        </div>

        <div className="mobile-viewport">
          {header && (
            <MobileHeader
              {...header}
              onOpenMenu={header.onOpenMenu ?? (() => setMenuOpen(true))}
            />
          )}

          <main className={fullBleed ? 'mobile-content mobile-content--full' : 'mobile-content scroll-y'}>
            {children}
          </main>

          {!hideNavBar && (
            <MobileNavBar items={navItems} activeId={navActiveId} fab={fab} />
          )}

          <MobileDrawer
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            user={user}
            groups={navGroups}
            activeId={menuActiveId}
            footerItems={drawerFooterItems}
          />
        </div>
      </div>
    </div>
  )
}
