import type { NavGroup, NavItem } from '../types'

/**
 * Cấu hình menu cho nhóm màn hình Dashboard (54–60).
 * Mỗi dashboard có ngữ cảnh điều hướng riêng nhưng dùng chung
 * component Sidebar — chỉ khác bộ dữ liệu này.
 */

/** Các mục tiện ích cố định dưới đáy sidebar dashboard */
export const dashboardUtilityNav: NavItem[] = [
  { id: 'notification', label: 'Thông báo', icon: 'notifications', count: 12, href: '#' },
  { id: 'message', label: 'Tin nhắn', icon: 'chat_bubble', count: 5, href: '#' },
  { id: 'favorite', label: 'Yêu thích', icon: 'star', href: '#' },
]

export const dashboardSettingsNav: NavItem[] = [
  { id: 'settings', label: 'Cài đặt', icon: 'settings', href: '#/dashboard/cai-dat' },
  { id: 'help', label: 'Trợ giúp', icon: 'help', href: '#' },
  { id: 'logout', label: 'Đăng xuất', icon: 'logout', href: '#' },
]

/** 54 · Executive Dashboard */
export const executiveNav: NavGroup[] = [
  {
    id: 'exec',
    items: [
      { id: 'exec', label: 'Tổng quan doanh nghiệp', icon: 'insights', href: '#/dashboard/executive' },
      { id: 'command', label: 'Trung tâm điều hành dự án', icon: 'dashboard', href: '#/dashboard/project' },
      { id: 'financial', label: 'Tổng quan tài chính', icon: 'payments', href: '#/dashboard/finance' },
      { id: 'sales', label: 'Kinh doanh & CRM', icon: 'handshake', href: '#' },
      { id: 'supply', label: 'Chuỗi cung ứng', icon: 'local_shipping', href: '#' },
      { id: 'contract', label: 'Hợp đồng', icon: 'contract', href: '#' },
      { id: 'camera', label: 'AI Camera', icon: 'videocam', href: '#' },
      { id: 'resource', label: 'Tài nguyên', icon: 'inventory_2', href: '#' },
      { id: 'workforce', label: 'Nhân lực', icon: 'groups', href: '#' },
      { id: 'risk', label: 'Rủi ro & Sự cố', icon: 'crisis_alert', href: '#' },
      { id: 'esg', label: 'ESG Dashboard', icon: 'eco', href: '#' },
      { id: 'system', label: 'Hệ thống', icon: 'monitor_heart', href: '#' },
    ],
  },
  {
    id: 'exec-config',
    items: [
      { id: 'custom-report', label: 'Báo cáo tùy chỉnh', icon: 'lab_profile', href: '#' },
      { id: 'setup', label: 'Thiết lập Dashboard', icon: 'tune', href: '#' },
    ],
  },
]

/** 55 · Project Dashboard */
export const projectDashboardNav: NavGroup[] = [
  {
    id: 'proj',
    items: [
      { id: 'exec', label: 'Tổng quan doanh nghiệp', icon: 'insights', href: '#/dashboard/executive' },
      { id: 'project', label: 'Dự án', icon: 'dashboard', href: '#/dashboard/project' },
      { id: 'command', label: 'Trung tâm điều hành dự án', icon: 'adjust', href: '#' },
      { id: 'workboard', label: 'Bảng công việc', icon: 'view_kanban', href: '#' },
      { id: 'financial', label: 'Tổng quan tài chính', icon: 'payments', href: '#/dashboard/finance' },
      { id: 'contract', label: 'Hợp đồng', icon: 'contract', href: '#' },
      { id: 'supply', label: 'Chuỗi cung ứng', icon: 'local_shipping', href: '#' },
      { id: 'camera', label: 'AI Camera', icon: 'videocam', href: '#' },
      { id: 'document', label: 'Tài liệu', icon: 'folder_open', href: '#' },
      { id: 'rfi', label: 'Yêu cầu thông tin', icon: 'help_center', href: '#' },
      { id: 'issue', label: 'Vấn đề', icon: 'report', href: '#' },
      { id: 'risk', label: 'Rủi ro', icon: 'crisis_alert', href: '#' },
      { id: 'resource', label: 'Tài nguyên', icon: 'inventory_2', href: '#' },
      { id: 'reports', label: 'Báo cáo', icon: 'monitoring', href: '#' },
    ],
  },
]

/** 56 · Finance Dashboard */
export const financeNav: NavGroup[] = [
  {
    id: 'fin',
    items: [
      { id: 'exec', label: 'Tổng quan doanh nghiệp', icon: 'insights', href: '#/dashboard/executive' },
      { id: 'project', label: 'Dự án', icon: 'dashboard', href: '#/dashboard/project' },
      { id: 'finance', label: 'Tổng quan tài chính', icon: 'payments', href: '#/dashboard/finance' },
      { id: 'budget', label: 'Ngân sách', icon: 'account_balance_wallet', href: '#' },
      { id: 'cost', label: 'Chi phí', icon: 'request_quote', href: '#' },
      { id: 'contract', label: 'Hợp đồng', icon: 'contract', href: '#' },
      { id: 'ar', label: 'AR', icon: 'call_received', href: '#' },
      { id: 'ap', label: 'AP', icon: 'call_made', href: '#' },
      { id: 'cashflow', label: 'Dòng tiền', icon: 'water_drop', href: '#' },
      { id: 'bank', label: 'Ngân hàng', icon: 'account_balance', href: '#' },
      { id: 'tax', label: 'Thuế', icon: 'receipt_long', href: '#' },
      { id: 'fixed-asset', label: 'Tài sản cố định', icon: 'precision_manufacturing', href: '#' },
      { id: 'report-center', label: 'Trung tâm báo cáo', icon: 'lab_profile', href: '#' },
      { id: 'ai-result', label: 'AI Result', icon: 'auto_awesome', href: '#' },
    ],
  },
  {
    id: 'fin-shortcut',
    title: 'Quick shortcut',
    items: [
      { id: 'journal', label: 'Journal Entry', icon: 'edit_note', href: '#' },
      { id: 'payment', label: 'Payment Request', icon: 'send_money', href: '#' },
      { id: 'receive', label: 'Receive Money', icon: 'savings', href: '#' },
      { id: 'invoice', label: 'Invoice List', icon: 'receipt', href: '#' },
      { id: 'coa', label: 'Chart of Accounts', icon: 'account_tree', href: '#' },
    ],
  },
]

/** 57 · Construction Dashboard */
export const constructionNav: NavGroup[] = [
  {
    id: 'overview',
    title: 'Tổng quan',
    items: [
      { id: 'exec', label: 'Tổng quan doanh nghiệp', icon: 'insights', href: '#/dashboard/executive' },
      { id: 'project', label: 'Dự án', icon: 'dashboard', href: '#/dashboard/project' },
      { id: 'construction', label: 'Xây dựng', icon: 'engineering', href: '#/dashboard/construction' },
      { id: 'site', label: 'Hiện trường', icon: 'foundation', href: '#' },
      { id: 'camera', label: 'AI Camera', icon: 'videocam', href: '#' },
    ],
  },
  {
    id: 'project-mgmt',
    title: 'Quản lý dự án',
    items: [
      { id: 'workboard', label: 'Bảng công việc', icon: 'view_kanban', href: '#' },
      { id: 'gantt', label: 'Lịch dự án', icon: 'calendar_view_week', href: '#' },
      { id: 'cost', label: 'Chi phí', icon: 'request_quote', href: '#' },
      { id: 'contract', label: 'Hợp đồng', icon: 'contract', href: '#' },
      { id: 'budget', label: 'Ngân sách', icon: 'account_balance_wallet', href: '#' },
      { id: 'document', label: 'Tài liệu', icon: 'folder_open', href: '#' },
      { id: 'rfi', label: 'RFI / Vấn đề không gian làm việc', icon: 'help_center', href: '#' },
    ],
  },
  {
    id: 'site-mgmt',
    title: 'Quản lý công trường',
    items: [
      { id: 'diary', label: 'Nhật ký công trường', icon: 'menu_book', href: '#' },
      { id: 'daily', label: 'Báo cáo hàng ngày', icon: 'assignment', href: '#' },
      { id: 'safety', label: 'An toàn', icon: 'health_and_safety', href: '#' },
      { id: 'quality', label: 'Chất lượng', icon: 'verified', href: '#' },
      { id: 'resource', label: 'Tài nguyên', icon: 'inventory_2', href: '#' },
    ],
  },
  {
    id: 'analytics',
    title: 'Báo cáo & Phân tích',
    items: [
      { id: 'reports', label: 'Báo cáo', icon: 'monitoring', href: '#' },
      { id: 'bi', label: 'Phân tích BI', icon: 'analytics', href: '#' },
      { id: 'data', label: 'Phân tích dữ liệu', icon: 'query_stats', href: '#' },
    ],
  },
]

/** 58 · AI Insight Dashboard */
export const aiInsightNav: NavGroup[] = [
  {
    id: 'dash',
    title: 'Dashboard',
    items: [
      { id: 'exec', label: 'Tổng quan doanh nghiệp', icon: 'insights', href: '#/dashboard/executive' },
      { id: 'project', label: 'Dự án', icon: 'dashboard', href: '#/dashboard/project' },
      { id: 'finance', label: 'Tổng quan tài chính', icon: 'payments', href: '#/dashboard/finance' },
      { id: 'construction', label: 'Xây dựng', icon: 'engineering', href: '#/dashboard/construction' },
      { id: 'ai-insight', label: 'AI chuyên sâu', icon: 'auto_awesome', href: '#/dashboard/ai-insight' },
      { id: 'camera', label: 'AI Camera', icon: 'videocam', href: '#' },
    ],
  },
  {
    id: 'ai-workspace',
    title: 'AI workspace',
    items: [
      { id: 'ai-result', label: 'AI Result', icon: 'lightbulb', href: '#' },
      { id: 'model', label: 'AI Model', icon: 'model_training', href: '#' },
      { id: 'prompt', label: 'Prompt', icon: 'menu_book', href: '#' },
      { id: 'source', label: 'Nguồn dữ liệu', icon: 'database', href: '#' },
      { id: 'automation', label: 'Tự động hóa', icon: 'bolt', href: '#' },
    ],
  },
  {
    id: 'ai-quick',
    title: 'Quick access',
    items: [
      { id: 'chat', label: 'Chat với trợ lý AI', icon: 'smart_toy', href: '#' },
      { id: 'insight-report', label: 'Báo cáo chuyên sâu', icon: 'lab_profile', href: '#' },
      { id: 'anomaly', label: 'Phát hiện bất thường', icon: 'troubleshoot', href: '#' },
      { id: 'prediction', label: 'Dự đoán', icon: 'online_prediction', href: '#' },
    ],
  },
]

/** 59 · IoT Dashboard */
export const iotNav: NavGroup[] = [
  {
    id: 'dash',
    title: 'Dashboard',
    items: [
      { id: 'exec', label: 'Tổng quan doanh nghiệp', icon: 'insights', href: '#/dashboard/executive' },
      { id: 'project', label: 'Dự án', icon: 'dashboard', href: '#/dashboard/project' },
      { id: 'finance', label: 'Tổng quan tài chính', icon: 'payments', href: '#/dashboard/finance' },
      { id: 'construction', label: 'Xây dựng', icon: 'engineering', href: '#/dashboard/construction' },
      { id: 'ai-insight', label: 'AI chuyên sâu', icon: 'auto_awesome', href: '#/dashboard/ai-insight' },
      { id: 'iot', label: 'IoT', icon: 'sensors', href: '#/dashboard/iot' },
      { id: 'device', label: 'Quản lý thiết bị', icon: 'developer_board', href: '#' },
      { id: 'monitoring', label: 'Giám sát dữ liệu', icon: 'monitor_heart', href: '#' },
      { id: 'alarm', label: 'Trung tâm cảnh báo', icon: 'notification_important', href: '#' },
      { id: 'automation', label: 'Tự động hóa', icon: 'bolt', href: '#' },
      { id: 'reports', label: 'Báo cáo', icon: 'monitoring', href: '#' },
    ],
  },
  {
    id: 'iot-workspace',
    title: 'IoT workspace',
    items: [
      { id: 'gateway', label: 'Edge Gateway', icon: 'router', href: '#' },
      { id: 'rule', label: 'Bộ quy tắc', icon: 'rule', href: '#' },
      { id: 'group', label: 'Nhóm thiết bị', icon: 'widgets', href: '#' },
      { id: 'firmware', label: 'Cập nhật Firmware', icon: 'system_update', href: '#' },
    ],
  },
  {
    id: 'iot-quick',
    title: 'Truy cập nhanh',
    items: [
      { id: 'camera', label: 'Camera trực tiếp', icon: 'videocam', href: '#' },
      { id: 'map', label: 'Bản đồ IoT', icon: 'map', href: '#' },
      { id: 'energy', label: 'Theo dõi năng lượng', icon: 'bolt', href: '#' },
    ],
  },
]

/** 60 · Knowledge Graph */
export const knowledgeNav: NavGroup[] = [
  {
    id: 'dash',
    title: 'Dashboard',
    items: [
      { id: 'exec', label: 'Tổng quan doanh nghiệp', icon: 'insights', href: '#/dashboard/executive' },
      { id: 'project', label: 'Dự án', icon: 'dashboard', href: '#/dashboard/project' },
      { id: 'finance', label: 'Tổng quan tài chính', icon: 'payments', href: '#/dashboard/finance' },
      { id: 'construction', label: 'Xây dựng', icon: 'engineering', href: '#/dashboard/construction' },
      { id: 'ai-insight', label: 'AI chuyên sâu', icon: 'auto_awesome', href: '#/dashboard/ai-insight' },
      { id: 'iot', label: 'IoT', icon: 'sensors', href: '#/dashboard/iot' },
      { id: 'knowledge', label: 'Đồ thị tri thức', icon: 'hub', href: '#/dashboard/knowledge-graph' },
    ],
  },
  {
    id: 'km',
    title: 'Quản lý tri thức',
    items: [
      { id: 'library', label: 'Thư viện tài liệu', icon: 'folder_open', href: '#' },
      { id: 'dictionary', label: 'Từ điển dữ liệu', icon: 'database', href: '#' },
      { id: 'glossary', label: 'Thuật ngữ', icon: 'menu_book', href: '#' },
      { id: 'faq', label: 'Câu hỏi thường gặp', icon: 'help_center', href: '#' },
      { id: 'best', label: 'Best Practices', icon: 'workspace_premium', href: '#' },
    ],
  },
  {
    id: 'semantic',
    title: 'AI & semantic',
    items: [
      { id: 'ai-search', label: 'Tìm kiếm AI', icon: 'search', href: '#' },
      { id: 'semantic-search', label: 'Tìm kiếm ngữ nghĩa', icon: 'manage_search', href: '#' },
      { id: 'nlp', label: 'NLP chuyên sâu', icon: 'psychology', href: '#' },
      { id: 'recommend', label: 'Đề xuất', icon: 'recommend', href: '#' },
    ],
  },
  {
    id: 'kg-quick',
    title: 'Truy cập nhanh',
    items: [
      { id: 'recent', label: 'Xem gần đây', icon: 'history', href: '#' },
      { id: 'saved', label: 'Lưu truy vấn', icon: 'bookmark', href: '#' },
      { id: 'collections', label: 'Bộ sưu tập', icon: 'collections_bookmark', href: '#' },
    ],
  },
]

/** Kỳ so sánh dùng chung ở header các dashboard */
export const COMPARE_OPTIONS = [
  { value: 'prev-month', label: 'So với tháng trước' },
  { value: 'prev-period', label: 'So với kỳ trước' },
  { value: 'prev-year', label: 'So với cùng kỳ năm trước' },
]
