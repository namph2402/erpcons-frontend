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
      { id: 'exec', label: 'Executive Dashboard', icon: 'insights', href: '#/dashboard/executive' },
      { id: 'command', label: 'Project Command Center', icon: 'dashboard', href: '#/dashboard/project' },
      { id: 'financial', label: 'Financial Dashboard', icon: 'payments', href: '#/dashboard/finance' },
      { id: 'sales', label: 'Sales & CRM Dashboard', icon: 'handshake', href: '#' },
      { id: 'supply', label: 'Supply Chain Dashboard', icon: 'local_shipping', href: '#' },
      { id: 'contract', label: 'Contract Dashboard', icon: 'contract', href: '#' },
      { id: 'camera', label: 'AI Camera Dashboard', icon: 'videocam', href: '#' },
      { id: 'resource', label: 'Resource Dashboard', icon: 'inventory_2', href: '#' },
      { id: 'workforce', label: 'Workforce Dashboard', icon: 'groups', href: '#' },
      { id: 'risk', label: 'Risk & Issue Dashboard', icon: 'crisis_alert', href: '#' },
      { id: 'esg', label: 'ESG Dashboard', icon: 'eco', href: '#' },
      { id: 'system', label: 'System Dashboard', icon: 'monitor_heart', href: '#' },
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
      { id: 'exec', label: 'Executive Dashboard', icon: 'insights', href: '#/dashboard/executive' },
      { id: 'project', label: 'Project Dashboard', icon: 'dashboard', href: '#/dashboard/project' },
      { id: 'command', label: 'Project Command Center', icon: 'adjust', href: '#' },
      { id: 'workboard', label: 'Workboard', icon: 'view_kanban', href: '#' },
      { id: 'financial', label: 'Financial Dashboard', icon: 'payments', href: '#/dashboard/finance' },
      { id: 'contract', label: 'Contract Dashboard', icon: 'contract', href: '#' },
      { id: 'supply', label: 'Supply Chain Dashboard', icon: 'local_shipping', href: '#' },
      { id: 'camera', label: 'AI Camera Dashboard', icon: 'videocam', href: '#' },
      { id: 'document', label: 'Document Workspace', icon: 'folder_open', href: '#' },
      { id: 'rfi', label: 'RFI Workspace', icon: 'help_center', href: '#' },
      { id: 'issue', label: 'Issue Workspace', icon: 'report', href: '#' },
      { id: 'risk', label: 'Risk Workspace', icon: 'crisis_alert', href: '#' },
      { id: 'resource', label: 'Resource Dashboard', icon: 'inventory_2', href: '#' },
      { id: 'reports', label: 'Reports', icon: 'monitoring', href: '#' },
    ],
  },
]

/** 56 · Finance Dashboard */
export const financeNav: NavGroup[] = [
  {
    id: 'fin',
    items: [
      { id: 'exec', label: 'Executive Dashboard', icon: 'insights', href: '#/dashboard/executive' },
      { id: 'project', label: 'Project Dashboard', icon: 'dashboard', href: '#/dashboard/project' },
      { id: 'finance', label: 'Finance Dashboard', icon: 'payments', href: '#/dashboard/finance' },
      { id: 'budget', label: 'Budget Workspace', icon: 'account_balance_wallet', href: '#' },
      { id: 'cost', label: 'Cost Workspace', icon: 'request_quote', href: '#' },
      { id: 'contract', label: 'Contract Dashboard', icon: 'contract', href: '#' },
      { id: 'ar', label: 'AR Dashboard', icon: 'call_received', href: '#' },
      { id: 'ap', label: 'AP Dashboard', icon: 'call_made', href: '#' },
      { id: 'cashflow', label: 'Cashflow Dashboard', icon: 'water_drop', href: '#' },
      { id: 'bank', label: 'Bank Dashboard', icon: 'account_balance', href: '#' },
      { id: 'tax', label: 'Tax Dashboard', icon: 'receipt_long', href: '#' },
      { id: 'fixed-asset', label: 'Fixed Asset Dashboard', icon: 'precision_manufacturing', href: '#' },
      { id: 'report-center', label: 'Report Center', icon: 'lab_profile', href: '#' },
      { id: 'ai-result', label: 'AI Result Workspace', icon: 'auto_awesome', href: '#' },
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
      { id: 'exec', label: 'Executive Dashboard', icon: 'insights', href: '#/dashboard/executive' },
      { id: 'project', label: 'Project Dashboard', icon: 'dashboard', href: '#/dashboard/project' },
      { id: 'construction', label: 'Construction Dashboard', icon: 'engineering', href: '#/dashboard/construction' },
      { id: 'site', label: 'Site Dashboard', icon: 'foundation', href: '#' },
      { id: 'camera', label: 'AI Camera Dashboard', icon: 'videocam', href: '#' },
    ],
  },
  {
    id: 'project-mgmt',
    title: 'Quản lý dự án',
    items: [
      { id: 'workboard', label: 'Workboard', icon: 'view_kanban', href: '#' },
      { id: 'gantt', label: 'Gantt Schedule', icon: 'calendar_view_week', href: '#' },
      { id: 'cost', label: 'Cost Workspace', icon: 'request_quote', href: '#' },
      { id: 'contract', label: 'Contract Dashboard', icon: 'contract', href: '#' },
      { id: 'budget', label: 'Budget Workspace', icon: 'account_balance_wallet', href: '#' },
      { id: 'document', label: 'Document Workspace', icon: 'folder_open', href: '#' },
      { id: 'rfi', label: 'RFI / Issue Workspace', icon: 'help_center', href: '#' },
    ],
  },
  {
    id: 'site-mgmt',
    title: 'Quản lý công trường',
    items: [
      { id: 'diary', label: 'Site Diary', icon: 'menu_book', href: '#' },
      { id: 'daily', label: 'Daily Report', icon: 'assignment', href: '#' },
      { id: 'safety', label: 'Safety Dashboard', icon: 'health_and_safety', href: '#' },
      { id: 'quality', label: 'Quality Dashboard', icon: 'verified', href: '#' },
      { id: 'resource', label: 'Resource Dashboard', icon: 'inventory_2', href: '#' },
    ],
  },
  {
    id: 'analytics',
    title: 'Báo cáo & Phân tích',
    items: [
      { id: 'reports', label: 'Reports', icon: 'monitoring', href: '#' },
      { id: 'bi', label: 'BI Dashboard', icon: 'analytics', href: '#' },
      { id: 'data', label: 'Data Analytics', icon: 'query_stats', href: '#' },
    ],
  },
]

/** 58 · AI Insight Dashboard */
export const aiInsightNav: NavGroup[] = [
  {
    id: 'dash',
    title: 'Dashboard',
    items: [
      { id: 'exec', label: 'Executive Dashboard', icon: 'insights', href: '#/dashboard/executive' },
      { id: 'project', label: 'Project Dashboard', icon: 'dashboard', href: '#/dashboard/project' },
      { id: 'finance', label: 'Finance Dashboard', icon: 'payments', href: '#/dashboard/finance' },
      { id: 'construction', label: 'Construction Dashboard', icon: 'engineering', href: '#/dashboard/construction' },
      { id: 'ai-insight', label: 'AI Insight Dashboard', icon: 'auto_awesome', href: '#/dashboard/ai-insight' },
      { id: 'camera', label: 'AI Camera Dashboard', icon: 'videocam', href: '#' },
    ],
  },
  {
    id: 'ai-workspace',
    title: 'AI workspace',
    items: [
      { id: 'ai-result', label: 'AI Result Workspace', icon: 'lightbulb', href: '#' },
      { id: 'model', label: 'AI Model Center', icon: 'model_training', href: '#' },
      { id: 'prompt', label: 'Prompt Library', icon: 'menu_book', href: '#' },
      { id: 'source', label: 'Data Source', icon: 'database', href: '#' },
      { id: 'automation', label: 'Automation', icon: 'bolt', href: '#' },
    ],
  },
  {
    id: 'ai-quick',
    title: 'Quick access',
    items: [
      { id: 'chat', label: 'AI Chat Assistant', icon: 'smart_toy', href: '#' },
      { id: 'insight-report', label: 'Insight Report', icon: 'lab_profile', href: '#' },
      { id: 'anomaly', label: 'Anomaly Detection', icon: 'troubleshoot', href: '#' },
      { id: 'prediction', label: 'Prediction Center', icon: 'online_prediction', href: '#' },
    ],
  },
]

/** 59 · IoT Dashboard */
export const iotNav: NavGroup[] = [
  {
    id: 'dash',
    title: 'Dashboard',
    items: [
      { id: 'exec', label: 'Executive Dashboard', icon: 'insights', href: '#/dashboard/executive' },
      { id: 'project', label: 'Project Dashboard', icon: 'dashboard', href: '#/dashboard/project' },
      { id: 'finance', label: 'Finance Dashboard', icon: 'payments', href: '#/dashboard/finance' },
      { id: 'construction', label: 'Construction Dashboard', icon: 'engineering', href: '#/dashboard/construction' },
      { id: 'ai-insight', label: 'AI Insight Dashboard', icon: 'auto_awesome', href: '#/dashboard/ai-insight' },
      { id: 'iot', label: 'IoT Dashboard', icon: 'sensors', href: '#/dashboard/iot' },
      { id: 'device', label: 'Device Management', icon: 'developer_board', href: '#' },
      { id: 'monitoring', label: 'Data Monitoring', icon: 'monitor_heart', href: '#' },
      { id: 'alarm', label: 'Alarm Center', icon: 'notification_important', href: '#' },
      { id: 'automation', label: 'Automation', icon: 'bolt', href: '#' },
      { id: 'reports', label: 'Reports', icon: 'monitoring', href: '#' },
    ],
  },
  {
    id: 'iot-workspace',
    title: 'IoT workspace',
    items: [
      { id: 'gateway', label: 'Edge Gateway', icon: 'router', href: '#' },
      { id: 'rule', label: 'Rule Engine', icon: 'rule', href: '#' },
      { id: 'group', label: 'Device Group', icon: 'widgets', href: '#' },
      { id: 'firmware', label: 'Firmware Update', icon: 'system_update', href: '#' },
    ],
  },
  {
    id: 'iot-quick',
    title: 'Quick access',
    items: [
      { id: 'camera', label: 'Live Camera', icon: 'videocam', href: '#' },
      { id: 'map', label: 'IoT Map', icon: 'map', href: '#' },
      { id: 'energy', label: 'Energy Monitor', icon: 'bolt', href: '#' },
    ],
  },
]

/** 60 · Knowledge Graph */
export const knowledgeNav: NavGroup[] = [
  {
    id: 'dash',
    title: 'Dashboard',
    items: [
      { id: 'exec', label: 'Executive Dashboard', icon: 'insights', href: '#/dashboard/executive' },
      { id: 'project', label: 'Project Dashboard', icon: 'dashboard', href: '#/dashboard/project' },
      { id: 'finance', label: 'Finance Dashboard', icon: 'payments', href: '#/dashboard/finance' },
      { id: 'construction', label: 'Construction Dashboard', icon: 'engineering', href: '#/dashboard/construction' },
      { id: 'ai-insight', label: 'AI Insight Dashboard', icon: 'auto_awesome', href: '#/dashboard/ai-insight' },
      { id: 'iot', label: 'IoT Dashboard', icon: 'sensors', href: '#/dashboard/iot' },
      { id: 'knowledge', label: 'Knowledge Graph', icon: 'hub', href: '#/dashboard/knowledge-graph' },
    ],
  },
  {
    id: 'km',
    title: 'Knowledge management',
    items: [
      { id: 'library', label: 'Document Library', icon: 'folder_open', href: '#' },
      { id: 'dictionary', label: 'Data Dictionary', icon: 'database', href: '#' },
      { id: 'glossary', label: 'Glossary', icon: 'menu_book', href: '#' },
      { id: 'faq', label: 'FAQ & Help Center', icon: 'help_center', href: '#' },
      { id: 'best', label: 'Best Practices', icon: 'workspace_premium', href: '#' },
    ],
  },
  {
    id: 'semantic',
    title: 'AI & semantic',
    items: [
      { id: 'ai-search', label: 'AI Search', icon: 'search', href: '#' },
      { id: 'semantic-search', label: 'Semantic Search', icon: 'manage_search', href: '#' },
      { id: 'nlp', label: 'NLP Insights', icon: 'psychology', href: '#' },
      { id: 'recommend', label: 'Recommendation', icon: 'recommend', href: '#' },
    ],
  },
  {
    id: 'kg-quick',
    title: 'Quick access',
    items: [
      { id: 'recent', label: 'Recent Viewed', icon: 'history', href: '#' },
      { id: 'saved', label: 'Saved Queries', icon: 'bookmark', href: '#' },
      { id: 'collections', label: 'My Collections', icon: 'collections_bookmark', href: '#' },
    ],
  },
]

/** Kỳ so sánh dùng chung ở header các dashboard */
export const COMPARE_OPTIONS = [
  { value: 'prev-month', label: 'So với tháng trước' },
  { value: 'prev-period', label: 'So với kỳ trước' },
  { value: 'prev-year', label: 'So với cùng kỳ năm trước' },
]
