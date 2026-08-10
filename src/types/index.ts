/** Kiểu dữ liệu dùng chung toàn hệ thống ERPCons */

export interface NavItem {
  id: string;
  label: string;
  /** Tên Material Symbols Rounded */
  icon: string;
  /** Đường dẫn hash (vd "#/du-an") */
  href?: string;
  /** Số đếm (việc quá hạn, thông báo...) */
  count?: number;
  /** Nhãn nhỏ bên phải (vd "New") */
  tag?: string;
  children?: NavItem[];
}

export interface NavGroup {
  id: string;
  /** Tiêu đề nhóm — bỏ trống nếu nhóm không có tiêu đề */
  title?: string;
  items: NavItem[];
}

export interface User {
  id: string;
  name: string;
  role: string;
  /** Đơn vị / công ty / mã nhân viên hiển thị dòng 3 */
  org?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  status?: "online" | "busy" | "offline";
}

export interface Project {
  id: string;
  code: string;
  name: string;
  thumbnail?: string;
  budgetUsed: number;
  budgetTotal: number;
  progress: number;
  status: string;
  location?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  /** Dự án / bối cảnh */
  context: string;
  due: string;
  /** overdue | today | upcoming | done */
  state: "overdue" | "today" | "upcoming" | "done";
  priority?: "Ưu tiên cao" | "Ưu tiên trung bình" | "Ưu tiên thấp";
  tag?: string;
  done?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  context: string;
  description?: string;
  time: string;
  icon: string;
  tone: "info" | "success" | "warning" | "danger" | "neutral";
  unread?: boolean;
  important?: boolean;
  /** Nhóm hiển thị: HÔM NAY / HÔM QUA / 2 NGÀY TRƯỚC */
  group: string;
}

export interface ActivityItem {
  id: string;
  actor: string;
  avatar?: string;
  action: string;
  time: string;
  icon: string;
  tone: "info" | "success" | "warning" | "danger" | "ai" | "neutral";
}

export interface MeetingItem {
  id: string;
  from: string;
  to?: string;
  title: string;
  place: string;
  tone: "info" | "success" | "warning" | "danger";
  attendees?: { name: string; src?: string }[];
}

export interface DocumentItem {
  id: string;
  name: string;
  ext: string;
  size: string;
  meta: string;
  version?: string;
}

export interface GanttTask {
  id: string;
  name: string;
  /** 0 = nhóm cha, 1 = công việc con */
  level: 0 | 1;
  progress: number;
  /** Vị trí bắt đầu / độ dài theo cột lưới (đơn vị: ô) */
  start: number;
  span: number;
  tone: "done" | "doing" | "plan";
  /** Cột mốc (milestone) đặt ở cuối thanh */
  milestone?: boolean;
}
