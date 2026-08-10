import type { NavGroup, NavItem } from '../types'

/**
 * Cấu hình menu — tách khỏi component để mọi màn hình kế thừa Sidebar
 * mà chỉ cần đổi bộ dữ liệu này.
 */

/** View 01 — Trang chủ Enterprise (menu theo module tiếng Anh) */
export const enterpriseNav: NavGroup[] = [
  {
    id: 'main',
    items: [
      { id: 'home', label: 'Trang chủ', icon: 'home', href: '#/' },
      { id: 'search', label: 'Enterprise Search', icon: 'search', href: '#/search' },
      { id: 'workspace', label: 'Workspace', icon: 'grid_view', href: '#/workspace' },
      { id: 'tasks', label: 'Tasks & Workflows', icon: 'checklist', href: '#/tasks' },
      { id: 'projects', label: 'Projects', icon: 'domain', href: '#/du-an' },
      { id: 'construction', label: 'Construction', icon: 'engineering', href: '#/construction' },
      { id: 'quality', label: 'Quality / HSE', icon: 'verified_user', href: '#/quality' },
      { id: 'finance', label: 'Finance', icon: 'payments', href: '#/finance' },
      { id: 'hr', label: 'HR & Admin', icon: 'groups', href: '#/hr' },
      { id: 'crm', label: 'CRM', icon: 'handshake', href: '#/crm' },
      { id: 'warehouse', label: 'Warehouse', icon: 'warehouse', href: '#/warehouse' },
      { id: 'assets', label: 'Assets', icon: 'precision_manufacturing', href: '#/assets' },
      { id: 'documents', label: 'Documents', icon: 'folder_open', href: '#/documents' },
      { id: 'reports', label: 'Reports & Analytics', icon: 'insights', href: '#/reports' },
      { id: 'copilot', label: 'AI Copilot', icon: 'smart_toy', href: '#/copilot' },
    ],
  },
]

/** View 02–04 — Menu vận hành chính (tiếng Việt) */
export const mainNav: NavGroup[] = [
  {
    id: 'operate',
    items: [
      { id: 'home', label: 'Trang chủ', icon: 'home', href: '#/dashboard' },
      {
        id: 'projects',
        label: 'Dự án',
        icon: 'domain',
        href: '#/du-an',
        children: [
          { id: 'project-list', label: 'Danh sách dự án', icon: 'list', href: '#/du-an' },
          { id: 'project-calendar', label: 'Lịch dự án', icon: 'event', href: '#/du-an/lich' },
          { id: 'project-diary', label: 'Nhật ký công trường', icon: 'menu_book', href: '#/du-an/nhat-ky' },
        ],
      },
      { id: 'tasks', label: 'Công việc', icon: 'assignment', href: '#/cong-viec' },
      { id: 'finance', label: 'Tài chính', icon: 'payments', href: '#/tai-chinh' },
      { id: 'procurement', label: 'Mua sắm', icon: 'shopping_cart', href: '#/mua-sam' },
      { id: 'contracts', label: 'Hợp đồng', icon: 'contract', href: '#/hop-dong' },
      { id: 'warehouse', label: 'Kho & Vật tư', icon: 'inventory_2', href: '#/kho' },
      { id: 'quality', label: 'Chất lượng (QA/QC)', icon: 'verified', href: '#/chat-luong' },
      { id: 'hse', label: 'An toàn (HSE)', icon: 'health_and_safety', href: '#/an-toan' },
      { id: 'hr', label: 'Nhân sự', icon: 'groups', href: '#/nhan-su' },
      { id: 'assets', label: 'Tài sản & Thiết bị', icon: 'precision_manufacturing', href: '#/tai-san' },
      { id: 'cde', label: 'Tài liệu (CDE)', icon: 'folder_open', href: '#/tai-lieu' },
      { id: 'crm', label: 'CRM', icon: 'handshake', href: '#/crm' },
    ],
  },
  {
    id: 'intelligence',
    items: [
      { id: 'reports', label: 'Báo cáo & BI', icon: 'monitoring', href: '#/bao-cao' },
      { id: 'ai', label: 'AI Insights', icon: 'auto_awesome', href: '#/ai-insights', tag: 'New' },
      { id: 'settings', label: 'Cài đặt hệ thống', icon: 'settings', href: '#/cai-dat' },
    ],
  },
]

/** View 05 — Trang chủ cá nhân (menu tự phục vụ nhân viên) */
export const personalNav: NavGroup[] = [
  {
    id: 'self-service',
    items: [
      { id: 'home', label: 'Trang chủ', icon: 'home', href: '#/ca-nhan' },
      { id: 'profile', label: 'Hồ sơ cá nhân', icon: 'account_circle', href: '#/ca-nhan/ho-so' },
      { id: 'tasks', label: 'Công việc', icon: 'assignment', href: '#/ca-nhan/cong-viec' },
      { id: 'calendar', label: 'Lịch & Họp', icon: 'event', href: '#/ca-nhan/lich' },
      { id: 'timesheet', label: 'Chấm công', icon: 'schedule', href: '#/ca-nhan/cham-cong' },
      { id: 'leave', label: 'Nghỉ phép', icon: 'beach_access', href: '#/ca-nhan/nghi-phep' },
      { id: 'payroll', label: 'Bảng lương', icon: 'payments', href: '#/ca-nhan/bang-luong' },
      { id: 'benefit', label: 'Phúc lợi', icon: 'redeem', href: '#/ca-nhan/phuc-loi' },
      { id: 'training', label: 'Đào tạo', icon: 'school', href: '#/ca-nhan/dao-tao' },
      { id: 'review', label: 'Đánh giá', icon: 'star_rate', href: '#/ca-nhan/danh-gia' },
      { id: 'documents', label: 'Tài liệu', icon: 'folder_open', href: '#/ca-nhan/tai-lieu' },
      { id: 'reports', label: 'Báo cáo', icon: 'monitoring', href: '#/ca-nhan/bao-cao' },
      { id: 'requests', label: 'Yêu cầu', icon: 'contact_support', href: '#/ca-nhan/yeu-cau' },
      { id: 'support', label: 'Hỗ trợ', icon: 'help', href: '#/ca-nhan/ho-tro' },
    ],
  },
]

export const personalFooterNav: NavItem[] = [
  { id: 'settings', label: 'Cài đặt', icon: 'settings', href: '#/ca-nhan/cai-dat' },
  { id: 'logout', label: 'Đăng xuất', icon: 'logout', href: '#/dang-xuat' },
]

/** Tab chính của workspace dự án — 03.4 Primary Navigation */
export const projectTabs = [
  { id: 'overview', label: 'Tổng quan' },
  { id: 'plan', label: 'Kế hoạch' },
  { id: 'tasks', label: 'Công việc' },
  { id: 'progress', label: 'Tiến độ' },
  { id: 'finance', label: 'Tài chính' },
  { id: 'contract', label: 'Hợp đồng' },
  { id: 'procurement', label: 'Mua sắm' },
  { id: 'documents', label: 'Tài liệu' },
  { id: 'reports', label: 'Báo cáo' },
  { id: 'risk', label: 'Rủi ro' },
  { id: 'diary', label: 'Nhật ký' },
  { id: 'settings', label: 'Cài đặt' },
]
