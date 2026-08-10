import type { BadgeTone } from './Badge'

/**
 * 03.8 · STATUS SYSTEM — ánh xạ trạng thái nghiệp vụ sang tone màu chuẩn.
 * Tách khỏi Badge.tsx để file component chỉ export component (fast refresh).
 */
export const STATUS_TONE: Record<string, BadgeTone> = {
  'Đang triển khai': 'info',
  'Đúng tiến độ': 'success',
  'Chậm tiến độ': 'danger',
  'Hoàn thành': 'success',
  'Chuẩn bị': 'neutral',
  'Tạm dừng': 'warning',
  'In Progress': 'info',
  Completed: 'success',
  'Not Started': 'neutral',
  Planning: 'info',
  'On Hold': 'warning',
  Cancelled: 'danger',
}
