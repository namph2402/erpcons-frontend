import type { BoardTask } from '../types'
import type { BoardColumn } from '../components/widgets/TaskBoard'

/**
 * Dữ liệu mẫu màn hình "Tác vụ cá nhân" (03.10 · Board View).
 * Thay bằng service gọi API khi tích hợp backend — giữ nguyên kiểu BoardTask.
 */

/** Trạng thái tác vụ ánh xạ theo 03.8 · STATUS SYSTEM */
export const taskColumns: BoardColumn[] = [
  { id: 'backlog', label: 'Danh sách', tone: 'neutral' },
  { id: 'todo', label: 'Cần thực hiện', tone: 'warning' },
  { id: 'doing', label: 'Đang thực hiện', tone: 'info' },
  { id: 'done', label: 'Hoàn thành', tone: 'success' },
]

export const TASK_STATUS_LABEL: Record<string, string> = {
  backlog: 'Danh sách',
  todo: 'Cần thực hiện',
  doing: 'Đang thực hiện',
  done: 'Hoàn thành',
}

export const boardTasks: BoardTask[] = [
  {
    id: 'TSK-2026-0044',
    title: '[ERPCons] Dựng giao diện React ERPCons',
    status: 'backlog',
    project: 'ERPCons',
    work: 'Sửa giao diện',
    weight: 'Lớn',
    supervisor: 'Trần Sỹ Danh',
    assignee: 'Phan Hoài Nam',
    remaining: '11 ngày 22 giờ',
    progress: 5,
    date: '10/08/2026',
    rating: 4,
    dplan: '2026 - Dplan | PARISTechno - IT',
    start: 'T2, 10/08/2026 - 08:00',
    end: 'T6, 21/08/2026 - 17:30',
    duration: '11d 22h',
    content:
      'Dựng lại toàn bộ giao diện ERPCons bằng React + TypeScript theo bộ chuẩn Design System 2026: tái sử dụng AppLayout, Sidebar, Topbar; chỉ dựng mới phần nội dung của từng màn hình.',
  },
  {
    id: 'TSK-2026-0043',
    title: '[ERPCons] Tích hợp API VNPost',
    status: 'todo',
    project: 'ERPCons',
    work: 'Tích hợp API',
    weight: 'Trung bình',
    supervisor: 'Trần Sỹ Danh',
    assignee: 'Phan Hoài Nam',
    spent: '54h:37m',
    remaining: '9 ngày 5 giờ',
    progress: 10,
    date: '27/07/2026',
    rating: 3,
    dplan: '2026 - Dplan | PARISTechno - IT',
    start: 'T2, 27/07/2026 - 09:00',
    end: 'T4, 19/08/2026 - 17:00',
    duration: '9d 5h',
    content: 'Kết nối API tra cứu và tạo vận đơn VNPost, chuẩn hoá lỗi trả về và ghi log tích hợp.',
  },
  {
    id: 'TSK-2026-0042',
    title: 'Làm giao diện (ERPCons)',
    status: 'doing',
    project: 'ERPCons',
    weight: 'Trung bình',
    owner: 'Phan Hoài Nam',
    supervisor: 'Trần Sỹ Danh',
    assignee: 'Trần Quốc Bảo',
    remaining: '6 ngày 22 giờ',
    progress: 5,
    date: '10/08/2026',
    rating: 3,
    dplan: '2026 - Dplan | PARISTechno - IT',
    start: 'T2, 10/08/2026 - 08:29',
    end: 'T2, 17/08/2026 - 10:29',
    duration: '5d 2h',
    content:
      'Dựng giao diện các màn hình còn lại của ERPCons theo ảnh thiết kế, dùng đúng token màu – chữ – khoảng cách của Design System 2026.',
    files: [
      { id: 'f1', name: 'ERPCons_UI_v2.fig', size: '18.4 MB', by: 'Trần Sỹ Danh', at: '09/08/2026 16:20' },
      { id: 'f2', name: 'Design_Guideline_2026.pdf', size: '6.1 MB', by: 'Phan Hoài Nam', at: '08/08/2026 09:12' },
    ],
    comments: [
      {
        id: 'c1',
        author: 'Trần Sỹ Danh',
        at: '10/08/2026 09:05',
        body: 'Ưu tiên dựng xong bảng Kanban tác vụ trước, phần báo cáo làm sau.',
      },
      {
        id: 'c2',
        author: 'Trần Quốc Bảo',
        at: '10/08/2026 10:31',
        body: 'Đã nhận việc, dự kiến xong khung bảng trong hôm nay.',
      },
    ],
  },
  {
    id: 'TSK-2026-0041',
    title: '[ERPCons] Sửa backend Tekshot',
    status: 'doing',
    project: 'ERPCons',
    weight: 'Trung bình',
    supervisor: 'Phan Hoài Nam',
    assignee: 'Nguyễn Văn Thành',
    spent: '83h:32m',
    overdue: '3 ngày 1 giờ',
    progress: 5,
    date: '05/08/2026',
    rating: 3,
    start: 'T4, 05/08/2026 - 08:00',
    end: 'T5, 07/08/2026 - 17:00',
    duration: '3d',
    content: 'Rà soát và sửa các lỗi API Tekshot: sai định dạng ngày, thiếu phân trang, timeout khi tải ảnh.',
  },
  {
    id: 'TSK-2026-0040',
    title: '[ERPCons] Chuẩn hoá bộ token giao diện',
    status: 'doing',
    project: 'ERPCons',
    work: 'Sửa giao diện',
    weight: 'Nhỏ',
    supervisor: 'Trần Sỹ Danh',
    assignee: 'Phan Hoài Nam',
    spent: '6h:15m',
    remaining: '2 ngày 4 giờ',
    progress: 45,
    date: '08/08/2026',
    rating: 2,
    duration: '2d 4h',
    content: 'Đưa toàn bộ màu, chữ, radius, shadow về biến trong tokens.css — không hard-code màu trong component.',
  },
  {
    id: 'TSK-2026-0039',
    title: 'Deploy dự án LPC Food',
    status: 'done',
    project: 'LPC Food',
    weight: 'Lớn',
    owner: 'Trần Sỹ Danh',
    supervisor: 'Phan Hoài Nam',
    assignee: 'Nguyễn Phú Trọng',
    spent: '15h:10m',
    progress: 100,
    date: '17/07/2026',
    rating: 4,
    duration: '2d 6h',
    content: 'Triển khai bản chính thức LPC Food lên máy chủ production, cấu hình domain và chứng chỉ SSL.',
  },
  {
    id: 'TSK-2026-0038',
    title: 'Nghiên cứu mã nguồn dự án của công ty',
    status: 'done',
    project: 'ERPCons',
    weight: 'Lớn',
    owner: 'Phan Hoài Nam',
    supervisor: 'Trần Sỹ Danh',
    assignee: 'Nguyễn Phú Trọng',
    spent: '10h:27m',
    progress: 100,
    date: '09/07/2026',
    rating: 4,
    duration: '1d 3h',
    content: 'Đọc hiểu kiến trúc mã nguồn hiện tại, lập sơ đồ module và danh sách điểm cần refactor.',
  },
  {
    id: 'TSK-2026-0037',
    title: '[ERPCons] Làm API hoá đơn Tekshot',
    status: 'done',
    project: 'ERPCons',
    work: 'Tích hợp API',
    weight: 'Trung bình',
    supervisor: 'Phan Hoài Nam',
    assignee: 'Nguyễn Văn Thành',
    spent: '28h:04m',
    progress: 100,
    date: '02/07/2026',
    rating: 4,
    duration: '4d',
    content: 'Xây dựng API phát hành và tra cứu hoá đơn cho Tekshot, có kiểm tra chữ ký số.',
  },
  {
    id: 'TSK-2026-0036',
    title: 'Tổng hợp số liệu tuần, báo cáo ban giám đốc',
    status: 'done',
    project: 'PARISTechno - IT',
    weight: 'Nhỏ',
    owner: 'Trần Sỹ Danh',
    supervisor: 'Trần Sỹ Danh',
    assignee: 'Phan Hoài Nam',
    spent: '3h:45m',
    progress: 100,
    date: '28/06/2026',
    rating: 3,
    duration: '4h',
    content: 'Tổng hợp tiến độ, chi phí và rủi ro của các dự án IT trong tuần, gửi báo cáo cho ban giám đốc.',
  },
]

/** Danh sách dùng cho các ô chọn trong form nhập liệu */
export const taskProjects = ['ERPCons', 'LPC Food', 'PARISTechno - IT', 'Vinhomes Ocean Park 2']

export const taskWorkTypes = ['Sửa giao diện', 'Tích hợp API', 'Kiểm thử', 'Triển khai', 'Nghiên cứu']

export const taskWeights = ['Lớn', 'Trung bình', 'Nhỏ']

export const taskPeople = [
  'Phan Hoài Nam',
  'Trần Sỹ Danh',
  'Trần Quốc Bảo',
  'Nguyễn Văn Thành',
  'Nguyễn Phú Trọng',
]

export const taskDplans = [
  '2026 - Dplan | PARISTechno - IT',
  '2026 - Dplan | ERPCons - Giai đoạn 1',
  '2026 - Dplan | LPC Food',
]
