/** Kiểu dữ liệu dùng chung toàn hệ thống ERPCons */
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href?: string; // Dùng cho thẻ <a>
  path?: string; // Dùng cho Router navigate
  hash?: string; // Dùng cho HashRouter
  count?: number;
  tag?: string;
  children?: NavItem[];
  [key: string]: any; // Cho phép các thuộc tính bổ sung khác
}

export interface NavGroup {
  id: string;
  label: string;
  title?: string;
  items: NavItem[];
  path?: string;
  hash?: string;
  [key: string]: any;
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

/** Tệp đính kèm của tác vụ — 05.8 Attachment */
export interface TaskFile {
  id: string;
  name: string;
  size: string;
  by: string;
  at: string;
}

/** Bình luận trong tác vụ — 06.5 Comment & Discussion */
export interface TaskComment {
  id: string;
  author: string;
  avatar?: string;
  at: string;
  body: string;
}

/**
 * Tác vụ trên bảng Kanban (03.10 · Board View).
 * Một đối tượng = một nguồn dữ liệu duy nhất — mọi màn hình dùng chung kiểu này.
 */
export interface BoardTask {
  id: string;
  title: string;
  /** id cột trạng thái: backlog | todo | doing | done */
  status: string;
  /** Dự án */
  project: string;
  /** Công việc (nhóm KPI) */
  work?: string;
  /** Đánh giá tác vụ: Lớn / Trung bình / Nhỏ */
  weight?: "Lớn" | "Trung bình" | "Nhỏ";
  /** Người phụ trách */
  owner?: string;
  /** Người giám sát */
  supervisor?: string;
  /** Người thực hiện */
  assignee: string;
  assigneeAvatar?: string;
  /** Thời gian đã ghi nhận, vd "15h:10m" */
  spent?: string;
  /** Thời gian còn lại, vd "11 ngày 22 giờ" */
  remaining?: string;
  /** Thời gian quá hạn, vd "3 ngày 1 giờ" — có giá trị thì hiển thị màu danger */
  overdue?: string;
  /** Khối lượng hoàn thành (%) */
  progress: number;
  /** Ngày hiển thị trên card */
  date: string;
  /** Độ ưu tiên theo thang sao 1–5 */
  rating: number;
  /** Liên kết với Dplan */
  dplan?: string;
  start?: string;
  end?: string;
  /** Thời lượng, vd "5d 2h" */
  duration?: string;
  content?: string;
  files?: TaskFile[];
  comments?: TaskComment[];
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
