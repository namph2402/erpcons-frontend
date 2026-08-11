import { appFooterNav, appNav } from './navigation'

/**
 * Nhóm Dashboard KHÔNG còn menu riêng — dùng chung `appNav` như mọi
 * màn hình khác. File này chỉ giữ các tuỳ chọn riêng của dashboard.
 */

/** Kỳ so sánh dùng chung ở thanh công cụ các dashboard */
export const COMPARE_OPTIONS = [
  { value: 'prev-month', label: 'So với tháng trước' },
  { value: 'prev-period', label: 'So với kỳ trước' },
  { value: 'prev-year', label: 'So với cùng kỳ năm trước' },
]

/* ---- Bí danh tương thích ngược: mọi menu dashboard = menu chung ---- */
export const executiveNav = appNav
export const projectDashboardNav = appNav
export const financeNav = appNav
export const constructionNav = appNav
export const aiInsightNav = appNav
export const iotNav = appNav
export const knowledgeNav = appNav
export const dashboardUtilityNav = appFooterNav
export const dashboardSettingsNav = appFooterNav
