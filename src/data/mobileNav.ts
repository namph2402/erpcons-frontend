import type { MobileNavItem } from '../components/mobile/MobileNavBar'

/**
 * Bộ mục điều hướng đáy mặc định của ERPCons mobile (Level 7).
 * FAB ở giữa được cấu hình riêng qua prop `fab` của MobileNavBar/AppLayout.
 */
export const DEFAULT_MOBILE_NAV: MobileNavItem[] = [
  { id: 'home', label: 'Trang chủ', icon: 'home', href: '#/mobile' },
  { id: 'tasks', label: 'Công việc', icon: 'assignment', href: '#/mobile/cong-viec' },
  {
    id: 'notification',
    label: 'Thông báo',
    icon: 'notifications',
    count: 12,
    href: '#/mobile/thong-bao',
  },
  { id: 'more', label: 'Thêm', icon: 'more_horiz', href: '#/mobile/them' },
]
