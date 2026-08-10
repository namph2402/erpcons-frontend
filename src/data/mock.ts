import type {
  ActivityItem,
  DocumentItem,
  GanttTask,
  MeetingItem,
  NotificationItem,
  Project,
  TaskItem,
  User,
} from "../types";

/** Dữ liệu mẫu — thay bằng API thật khi tích hợp backend */

export const currentUser: User = {
  id: "u-001",
  name: "Nguyễn Văn A",
  role: "Project Director",
  org: "PI Holding",
  email: "nguyenvana@erpcons.ai",
  phone: "0901 234 567",
  status: "online",
};

export const personalUser: User = {
  ...currentUser,
  role: "Product Designer",
  org: "ID: EMP-000128",
};

export const enterpriseUser: User = {
  ...currentUser,
  role: "CEO / Project Manager",
  org: "LPC Construction",
};

/* ------------------------------------------------------------------ */
/* Dự án                                                               */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    id: "p1",
    code: "NT-2024-001",
    name: "The Nexus Tower",
    budgetUsed: 320.5,
    budgetTotal: 450,
    progress: 71,
    status: "Đang triển khai",
    location: "Quận 1, TP. HCM",
  },
  {
    id: "p2",
    code: "SR-2024-002",
    name: "Sunshine Riverside",
    budgetUsed: 210.3,
    budgetTotal: 280,
    progress: 58,
    status: "Chậm tiến độ",
    location: "Tây Hồ, Hà Nội",
  },
  {
    id: "p3",
    code: "GC-2024-003",
    name: "Green City Villa",
    budgetUsed: 98.6,
    budgetTotal: 120,
    progress: 82,
    status: "Đúng tiến độ",
    location: "Đà Nẵng",
  },
  {
    id: "p4",
    code: "AP-2024-004",
    name: "Factory An Phát",
    budgetUsed: 156.3,
    budgetTotal: 200,
    progress: 46,
    status: "Đang triển khai",
    location: "Bắc Ninh",
  },
  {
    id: "p5",
    code: "HV-2024-005",
    name: "Harbor View Hotel",
    budgetUsed: 310.2,
    budgetTotal: 400,
    progress: 65,
    status: "Chậm tiến độ",
    location: "Hải Phòng",
  },
];

/** Tiến độ theo dự án — dùng cho card "Tiến độ dự án" (view 01) */
export const projectProgress = [
  { id: "pp1", name: "LPC Tower – Hà Nội", progress: 78 },
  { id: "pp2", name: "The Nexus – HCM", progress: 65 },
  { id: "pp3", name: "An Phát – Bắc Ninh", progress: 54 },
  { id: "pp4", name: "GreenCity – Đà Nẵng", progress: 42 },
  { id: "pp5", name: "Marina Bay – Hải Phòng", progress: 38 },
];

/* ------------------------------------------------------------------ */
/* Công việc                                                           */
/* ------------------------------------------------------------------ */

export const myTasks: TaskItem[] = [
  {
    id: "t1",
    title: "Phê duyệt hồ sơ thanh toán đợt 3",
    context: "The Nexus Tower",
    due: "Quá hạn 2 ngày",
    state: "overdue",
  },
  {
    id: "t2",
    title: "RFI-045: Làm rõ chi tiết móng",
    context: "Sunshine Riverside",
    due: "Hôm nay",
    state: "today",
  },
  {
    id: "t3",
    title: "Kiểm tra chất lượng bê tông sàn tầng 12",
    context: "The Nexus Tower",
    due: "Hôm nay",
    state: "today",
  },
  {
    id: "t4",
    title: "Review hợp đồng NCC thép",
    context: "Green City Villa",
    due: "Mai 09:00",
    state: "upcoming",
  },
  {
    id: "t5",
    title: "Báo cáo tiến độ tuần 21",
    context: "Factory An Phát",
    due: "Mai 14:00",
    state: "upcoming",
  },
];

/** Công việc hôm nay (view 01) — có chip module + giờ */
export const todayTasks: TaskItem[] = [
  {
    id: "tt1",
    title: "Nghiệm thu tầng 12 – LPC Tower",
    context: "",
    tag: "Construction",
    due: "09:00 AM",
    state: "today",
    done: true,
  },
  {
    id: "tt2",
    title: "Cập nhật hồ sơ an toàn – HCM",
    context: "",
    tag: "HSE",
    due: "10:30 AM",
    state: "today",
  },
  {
    id: "tt3",
    title: "Duyệt PO vật tư thép – An Phát",
    context: "",
    tag: "Finance",
    due: "02:00 PM",
    state: "today",
  },
  {
    id: "tt4",
    title: "Rà soát NCR – GreenCity",
    context: "",
    tag: "Quality",
    due: "04:00 PM",
    state: "today",
  },
];

/** Công việc cá nhân (view 05) — có nhãn ưu tiên */
export const personalTasks: TaskItem[] = [
  {
    id: "pt1",
    title: "Thiết kế giao diện Trang chủ ERPCons",
    context: "Dự án ERPCons Platform",
    tag: "Thiết kế",
    due: "Hạn: 24/05/2024",
    state: "overdue",
    priority: "Ưu tiên cao",
  },
  {
    id: "pt2",
    title: "Xây dựng Design System v2.0",
    context: "Dự án ERPCons Platform",
    tag: "Design System",
    due: "Hạn: 27/05/2024",
    state: "today",
    priority: "Ưu tiên cao",
  },
  {
    id: "pt3",
    title: "Review UI Module: Project Workspace",
    context: "Dự án ERPCons Platform",
    tag: "Review",
    due: "Hạn: 28/05/2024",
    state: "upcoming",
    priority: "Ưu tiên cao",
  },
  {
    id: "pt4",
    title: "Thiết kế biểu đồ Dashboard",
    context: "Dự án ERPCons Analytics",
    tag: "Dashboard",
    due: "Hạn: 30/05/2024",
    state: "upcoming",
    priority: "Ưu tiên trung bình",
  },
  {
    id: "pt5",
    title: "Họp trao đổi yêu cầu với BA",
    context: "Dự án ERPCons Platform",
    tag: "Meeting",
    due: "Hạn: 31/05/2024",
    state: "upcoming",
    priority: "Ưu tiên thấp",
  },
];

/* ------------------------------------------------------------------ */
/* Lịch & cuộc họp                                                     */
/* ------------------------------------------------------------------ */

export const meetings: MeetingItem[] = [
  {
    id: "m1",
    from: "09:00",
    to: "10:00",
    title: "Họp giao ban dự án The Nexus Tower",
    place: "Phòng họp A – Tầng 12",
    tone: "info",
  },
  {
    id: "m2",
    from: "10:30",
    to: "11:30",
    title: "Review tiến độ & ngân sách",
    place: "Sunshine Riverside",
    tone: "success",
  },
  {
    id: "m3",
    from: "14:00",
    to: "15:00",
    title: "Làm việc với NCC bê tông",
    place: "Online Meeting",
    tone: "warning",
  },
  {
    id: "m4",
    from: "15:30",
    to: "16:30",
    title: "Báo cáo tuần cho Ban TGĐ",
    place: "Phòng họp A – Tầng 12",
    tone: "danger",
  },
];

export const personalMeetings: MeetingItem[] = [
  {
    id: "pm1",
    from: "08:30",
    title: "Daily Stand-up",
    place: "Phòng họp Online",
    tone: "info",
    attendees: [
      { name: "Trần Minh Đức" },
      { name: "Lê Hải Đăng" },
      { name: "Phạm Quang Huy" },
      { name: "Vũ Thị Hương" },
    ],
  },
  {
    id: "pm2",
    from: "10:00",
    title: "Review UI – Project Workspace",
    place: "Phòng họp A",
    tone: "info",
    attendees: [
      { name: "Nguyễn Hoàng Nam" },
      { name: "Lê Hải Đăng" },
      { name: "Trần Minh Đức" },
    ],
  },
  {
    id: "pm3",
    from: "11:30",
    title: "Trao đổi với BA",
    place: "Phòng họp B",
    tone: "info",
    attendees: [{ name: "Vũ Thị Hương" }, { name: "Phạm Quang Huy" }],
  },
  {
    id: "pm4",
    from: "13:30",
    title: "Làm việc cá nhân",
    place: "",
    tone: "success",
  },
  {
    id: "pm5",
    from: "15:30",
    title: "Training: Design System",
    place: "Phòng họp Online",
    tone: "info",
    attendees: [
      { name: "Trần Minh Đức" },
      { name: "Nguyễn Hoàng Nam" },
      { name: "Lê Hải Đăng" },
      { name: "Vũ Thị Hương" },
      { name: "Phạm Quang Huy" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Thông báo & hoạt động                                               */
/* ------------------------------------------------------------------ */

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Phê duyệt hồ sơ thanh toán đợt 3",
    context: "The Nexus Tower",
    description:
      "Trần Minh Đức đã gửi hồ sơ thanh toán đợt 3 chờ bạn phê duyệt.",
    time: "08:45",
    icon: "description",
    tone: "info",
    unread: true,
    important: true,
    group: "Hôm nay",
  },
  {
    id: "n2",
    title: "RFI-045: Làm rõ chi tiết móng",
    context: "Sunshine Riverside",
    description: "Bạn được giao xử lý RFI-045 từ Nguyễn Hữu Phúc.",
    time: "08:20",
    icon: "help_center",
    tone: "info",
    unread: true,
    group: "Hôm nay",
  },
  {
    id: "n3",
    title: "Cập nhật tiến độ dự án",
    context: "Green City Villa",
    description: "Tiến độ dự án đã được cập nhật: 82% (+5%).",
    time: "07:50",
    icon: "update",
    tone: "success",
    unread: true,
    group: "Hôm nay",
  },
  {
    id: "n4",
    title: "Báo cáo tuần đã sẵn sàng",
    context: "Báo cáo tuần 21/05 - 27/05/2024 đã được tạo.",
    time: "07:30",
    icon: "summarize",
    tone: "neutral",
    group: "Hôm nay",
  },
  {
    id: "n5",
    title: "Nhắc việc: Kiểm tra chất lượng bê tông",
    context: "The Nexus Tower",
    description: "Nhắc nhở công việc sắp đến hạn.",
    time: "Hôm qua, 17:00",
    icon: "notifications_active",
    tone: "warning",
    group: "Hôm qua",
  },
  {
    id: "n6",
    title: "Hợp đồng đã được ký",
    context: "HĐ-2024-031 - Cung cấp thép xây dựng",
    description: "Hợp đồng đã được Lê Quang Huy ký.",
    time: "Hôm qua, 15:40",
    icon: "task_alt",
    tone: "success",
    group: "Hôm qua",
  },
  {
    id: "n7",
    title: "Hóa đơn đến hạn thanh toán",
    context: "INV-2024-078",
    description: "Hóa đơn đến hạn thanh toán vào 25/05/2024.",
    time: "Hôm qua, 11:20",
    icon: "receipt_long",
    tone: "danger",
    group: "Hôm qua",
  },
  {
    id: "n8",
    title: "Dự án mới được tạo",
    context: "Khu đô thị Eco Park 2",
    description: "Dự án mới đã được tạo bởi Admin.",
    time: "20/05/2024, 10:15",
    icon: "domain_add",
    tone: "neutral",
    group: "2 ngày trước",
  },
];

export const projectActivities: ActivityItem[] = [
  {
    id: "a1",
    actor: "Trần Minh Đức",
    action: "Phê duyệt RFI-045: Làm rõ chi tiết móng",
    time: "2 giờ trước",
    icon: "check_circle",
    tone: "success",
  },
  {
    id: "a2",
    actor: "Lê Hải Đăng",
    action: "Upload bản vẽ kết cấu tầng 12",
    time: "3 giờ trước",
    icon: "upload_file",
    tone: "info",
  },
  {
    id: "a3",
    actor: "Phạm Quang Huy",
    action: "Cập nhật tiến độ: Thi công tầng hầm B2",
    time: "5 giờ trước",
    icon: "update",
    tone: "info",
  },
  {
    id: "a4",
    actor: "Nguyễn Hoàng Nam",
    action: "Nghiệm thu công việc: Cọc khoan nhồi",
    time: "1 ngày trước",
    icon: "verified",
    tone: "success",
  },
  {
    id: "a5",
    actor: "Vũ Thị Hương",
    action: "Tạo yêu cầu thay đổi #CR-012",
    time: "1 ngày trước",
    icon: "edit_document",
    tone: "warning",
  },
];

/* ------------------------------------------------------------------ */
/* Tài liệu                                                            */
/* ------------------------------------------------------------------ */

export const projectDocuments: DocumentItem[] = [
  {
    id: "d1",
    name: "Bản vẽ kết cấu tầng 12",
    ext: "pdf",
    size: "12.4 MB",
    meta: "Lê Hải Đăng • 2 giờ trước",
    version: "V2",
  },
  {
    id: "d2",
    name: "Biện pháp thi công tường vây",
    ext: "docx",
    size: "2.1 MB",
    meta: "Phạm Quang Huy • 5 giờ trước",
    version: "V1",
  },
  {
    id: "d3",
    name: "Báo cáo tiến độ tuần 20",
    ext: "xlsx",
    size: "856 KB",
    meta: "Nguyễn Hoàng Nam • 1 ngày trước",
    version: "V3",
  },
  {
    id: "d4",
    name: "Nghiệm thu cọc khoan nhồi",
    ext: "pdf",
    size: "3.7 MB",
    meta: "Trần Minh Đức • 1 ngày trước",
    version: "V1",
  },
];

export const personalDocuments: DocumentItem[] = [
  {
    id: "pd1",
    name: "Design System v2.0",
    ext: "pdf",
    size: "12.4 MB",
    meta: "Cập nhật 2 giờ trước",
  },
  {
    id: "pd2",
    name: "Brand Guideline 2024",
    ext: "pdf",
    size: "8.7 MB",
    meta: "Cập nhật 1 ngày trước",
  },
  {
    id: "pd3",
    name: "UI Components",
    ext: "sketch",
    size: "45.2 MB",
    meta: "Cập nhật 2 ngày trước",
  },
  {
    id: "pd4",
    name: "Project Brief - ERPCons",
    ext: "docx",
    size: "1.2 MB",
    meta: "Cập nhật 3 ngày trước",
  },
];

/* ------------------------------------------------------------------ */
/* Gantt — tiến độ dự án                                               */
/* ------------------------------------------------------------------ */

export const ganttColumns = [
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
  "CN",
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
  "CN",
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
  "CN",
];

export const ganttTasks: GanttTask[] = [
  {
    id: "g1",
    name: "1. Công tác chuẩn bị",
    level: 0,
    progress: 100,
    start: 0,
    span: 6,
    tone: "done",
  },
  {
    id: "g1-1",
    name: "1.1. Giải phóng mặt bằng",
    level: 1,
    progress: 100,
    start: 0,
    span: 4,
    tone: "done",
  },
  {
    id: "g1-2",
    name: "1.2. Thi công hàng rào, lán trại",
    level: 1,
    progress: 100,
    start: 1,
    span: 4,
    tone: "done",
  },
  {
    id: "g1-3",
    name: "1.3. Định vị, cọc mốc",
    level: 1,
    progress: 100,
    start: 4,
    span: 3,
    tone: "done",
  },
  {
    id: "g2",
    name: "2. Thi công phần ngầm",
    level: 0,
    progress: 85,
    start: 3,
    span: 8,
    tone: "doing",
  },
  {
    id: "g2-1",
    name: "2.1. Đào đất, vận chuyển",
    level: 1,
    progress: 100,
    start: 3,
    span: 4,
    tone: "doing",
  },
  {
    id: "g2-2",
    name: "2.2. Thi công tường vây",
    level: 1,
    progress: 90,
    start: 5,
    span: 5,
    tone: "doing",
  },
  {
    id: "g2-3",
    name: "2.3. Thi công cọc khoan nhồi",
    level: 1,
    progress: 80,
    start: 7,
    span: 5,
    tone: "doing",
  },
  {
    id: "g2-4",
    name: "2.4. Thi công tầng hầm",
    level: 1,
    progress: 70,
    start: 10,
    span: 5,
    tone: "doing",
  },
  {
    id: "g3",
    name: "3. Thi công phần thân",
    level: 0,
    progress: 48,
    start: 12,
    span: 8,
    tone: "doing",
    milestone: true,
  },
  {
    id: "g3-1",
    name: "3.1. Thi công kết cấu đến tầng 20",
    level: 1,
    progress: 48,
    start: 12,
    span: 5,
    tone: "doing",
  },
  {
    id: "g3-2",
    name: "3.2. Thi công kết cấu còn lại",
    level: 1,
    progress: 0,
    start: 15,
    span: 6,
    tone: "plan",
  },
];
