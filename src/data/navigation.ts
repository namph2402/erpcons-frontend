import type { NavGroup, NavItem } from '../types'

/**
 * ============================================================
 * MENU DÙNG CHUNG TOÀN HỆ THỐNG — chỉ có MỘT nguồn duy nhất.
 * ============================================================
 * Mọi màn hình (desktop · dashboard · workspace · mobile) đều
 * truyền `appNav` vào AppLayout/MobileShell. Không màn hình nào
 * được tự định nghĩa menu riêng.
 *
 * Toàn bộ nhãn dùng tiếng Việt theo yêu cầu chuẩn hoá.
 */
export const appNav: NavGroup[] = [
  {
    id: 'dieu-hanh',
    title: 'Điều hành',
    items: [
      { id: 'home', label: 'Trang chủ', icon: 'home', href: '#/' },
      {
        id: 'dashboard',
        label: 'Bảng điều hành',
        icon: 'space_dashboard',
        href: '#/dashboard',
        children: [
          { id: 'dashboard-exec', label: 'Điều hành tổng thể', icon: 'insights', href: '#/dashboard/executive' },
          { id: 'dashboard-project', label: 'Dự án', icon: 'dashboard', href: '#/dashboard/project' },
          { id: 'dashboard-finance', label: 'Tài chính', icon: 'payments', href: '#/dashboard/finance' },
          { id: 'dashboard-construction', label: 'Thi công', icon: 'engineering', href: '#/dashboard/construction' },
          { id: 'dashboard-ai', label: 'Phân tích AI', icon: 'auto_awesome', href: '#/dashboard/ai-insight' },
          { id: 'dashboard-iot', label: 'Thiết bị IoT', icon: 'sensors', href: '#/dashboard/iot' },
          { id: 'dashboard-graph', label: 'Đồ thị tri thức', icon: 'hub', href: '#/dashboard/knowledge-graph' },
        ],
      },
      { id: 'projects', label: 'Dự án', icon: 'domain', href: '#/du-an' },
      { id: 'collaboration', label: 'Cộng tác', icon: 'forum', href: '#/cong-tac' },
    ],
  },
  {
    id: 'thi-cong',
    title: 'Thi công & Chất lượng',
    items: [
      { id: 'tasks', label: 'Công việc', icon: 'assignment', href: '#/lam-viec/cong-viec' },
      { id: 'issues', label: 'Vấn đề', icon: 'report', href: '#/lam-viec/van-de' },
      { id: 'ncr', label: 'Báo cáo không phù hợp', icon: 'rule', href: '#/lam-viec/ncr' },
      { id: 'rfi', label: 'Yêu cầu thông tin', icon: 'help_center', href: '#/lam-viec/rfi' },
      { id: 'drawings', label: 'Bản vẽ', icon: 'architecture', href: '#/lam-viec/ban-ve' },
      { id: 'meetings', label: 'Cuộc họp', icon: 'groups_3', href: '#/lam-viec/cuoc-hop' },
      { id: 'documents', label: 'Tài liệu', icon: 'folder_open', href: '#/lam-viec/tai-lieu' },
    ],
  },
  {
    id: 'tai-chinh',
    title: 'Tài chính & Mua sắm',
    items: [
      { id: 'contracts', label: 'Hợp đồng', icon: 'contract', href: '#/lam-viec/hop-dong' },
      { id: 'budget', label: 'Ngân sách', icon: 'account_balance_wallet', href: '#/lam-viec/ngan-sach' },
      { id: 'cost', label: 'Chi phí', icon: 'request_quote', href: '#/lam-viec/chi-phi' },
      { id: 'invoices', label: 'Hóa đơn', icon: 'receipt_long', href: '#/lam-viec/hoa-don' },
      { id: 'purchase', label: 'Đơn mua hàng', icon: 'shopping_cart', href: '#/lam-viec/don-mua-hang' },
      { id: 'suppliers', label: 'Nhà cung cấp', icon: 'local_shipping', href: '#/doi-tac/nha-cung-cap' },
      { id: 'customers', label: 'Khách hàng', icon: 'handshake', href: '#/doi-tac/khach-hang' },
    ],
  },
  {
    id: 'nguon-luc',
    title: 'Nguồn lực',
    items: [
      { id: 'assets', label: 'Tài sản', icon: 'inventory', href: '#/lam-viec/tai-san' },
      { id: 'equipment', label: 'Thiết bị', icon: 'precision_manufacturing', href: '#/lam-viec/thiet-bi' },
      { id: 'materials', label: 'Vật tư', icon: 'inventory_2', href: '#/lam-viec/vat-tu' },
      { id: 'hr', label: 'Nhân sự', icon: 'groups', href: '#/nhan-su' },
      { id: 'personal', label: 'Trang cá nhân', icon: 'account_circle', href: '#/ca-nhan' },
    ],
  },
  {
    id: 'thong-minh',
    title: 'Phân tích & Hệ thống',
    items: [
      { id: 'ai-result', label: 'Kết quả AI', icon: 'auto_awesome', href: '#/lam-viec/ket-qua-ai', tag: 'AI' },
      { id: 'reports', label: 'Báo cáo & BI', icon: 'monitoring', href: '#/bao-cao' },
      { id: 'mobile', label: 'Ứng dụng mobile', icon: 'smartphone', href: '#/mobile' },
      { id: 'settings', label: 'Cài đặt hệ thống', icon: 'settings', href: '#/cai-dat' },
    ],
  },
]

/** Mục cố định dưới đáy sidebar — dùng chung mọi màn hình */
export const appFooterNav: NavItem[] = [
  { id: 'help', label: 'Trợ giúp', icon: 'help', href: '#/tro-giup' },
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

/* ------------------------------------------------------------------ *
 * Bí danh tương thích ngược — tất cả đều trỏ về cùng một menu.
 * Giữ lại để các import cũ không vỡ; nên dùng `appNav` cho code mới.
 * ------------------------------------------------------------------ */
export const mainNav = appNav
export const enterpriseNav = appNav
export const personalNav = appNav
export const personalFooterNav = appFooterNav
