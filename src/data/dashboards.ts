import type { User } from '../types'

/** Dữ liệu mẫu cho nhóm màn hình Dashboard (54–60) */

export const ceoUser: User = {
  id: 'u-ceo',
  name: 'Nguyễn Văn A',
  role: 'CEO',
  status: 'online',
}

export const cfoUser: User = { ...ceoUser, id: 'u-cfo', role: 'CFO' }
export const pmUser: User = { ...ceoUser, id: 'u-pm', role: 'Project Manager' }
export const analystUser: User = { ...ceoUser, id: 'u-da', role: 'Data Analyst' }
export const iotUser: User = { ...ceoUser, id: 'u-iot', role: 'IoT Manager' }
export const knowledgeUser: User = { ...ceoUser, id: 'u-km', role: 'Knowledge Manager' }

const MONTHS_12 = [
  'T6/23', 'T7/23', 'T8/23', 'T9/23', 'T10/23', 'T11/23',
  'T12/23', 'T1/24', 'T2/24', 'T3/24', 'T4/24', 'T5/24',
]

/* ================================================================
   54 · EXECUTIVE DASHBOARD
   ================================================================ */

export const executiveKpis = [
  {
    id: 'revenue',
    label: 'Doanh thu hợp nhất',
    value: '125.8',
    unit: 'Tỷ VND',
    icon: 'bar_chart',
    tone: 'info' as const,
    trend: { direction: 'up' as const, value: '18.6%', label: 'so với tháng trước' },
    spark: [78, 84, 80, 92, 88, 97, 94, 105, 101, 112, 118, 125.8],
  },
  {
    id: 'profit',
    label: 'Lợi nhuận trước thuế',
    value: '18.7',
    unit: 'Tỷ VND',
    icon: 'savings',
    tone: 'success' as const,
    trend: { direction: 'up' as const, value: '22.4%', label: 'so với tháng trước' },
    spark: [11, 12, 11.5, 13, 12.6, 14, 13.8, 15.4, 15, 16.8, 17.6, 18.7],
  },
  {
    id: 'margin',
    label: 'Biên lợi nhuận',
    value: '14.9%',
    icon: 'pie_chart',
    tone: 'ai' as const,
    trend: { direction: 'up' as const, value: '2.1%', label: 'so với tháng trước' },
    spark: [12.9, 13.2, 13, 13.6, 13.4, 14, 13.9, 14.3, 14.2, 14.6, 14.8, 14.9],
  },
  {
    id: 'cashflow',
    label: 'Dòng tiền thuần',
    value: '32.4',
    unit: 'Tỷ VND',
    icon: 'account_balance_wallet',
    tone: 'iot' as const,
    trend: { direction: 'up' as const, value: '15.3%', label: 'so với tháng trước' },
    spark: [19, 22, 20, 25, 23, 27, 26, 29, 28, 30, 31, 32.4],
  },
  {
    id: 'projects',
    label: 'Tổng dự án',
    value: '68',
    unit: 'Dự án',
    icon: 'domain',
    tone: 'warning' as const,
    trend: { direction: 'flat' as const, value: 'Đang triển khai: 37 dự án' },
    spark: [52, 55, 56, 58, 59, 60, 62, 63, 64, 66, 67, 68],
  },
  {
    id: 'headcount',
    label: 'Tổng nhân sự',
    value: '1,248',
    unit: 'Người',
    icon: 'groups',
    tone: 'info' as const,
    trend: { direction: 'up' as const, value: '5.2%', label: 'so với tháng trước' },
    spark: [1080, 1102, 1115, 1140, 1156, 1170, 1188, 1200, 1212, 1226, 1238, 1248],
  },
]

export const revenueByBu = [
  { label: 'Foodtek', value: 40.0, color: 'var(--info)', note: '40.0 Tỷ', extra: '31.8%' },
  { label: "Pizza Hip's", value: 25.3, color: 'var(--success)', note: '25.3 Tỷ', extra: '20.1%' },
  { label: 'BakeTek', value: 18.6, color: 'var(--danger)', note: '18.6 Tỷ', extra: '14.8%' },
  { label: 'Buildtek', value: 15.2, color: 'var(--slate-300)', note: '15.2 Tỷ', extra: '12.1%' },
  { label: 'LPC', value: 12.4, color: 'var(--automation)', note: '12.4 Tỷ', extra: '9.8%' },
  { label: 'ERPcons', value: 8.6, color: 'var(--warning)', note: '8.6 Tỷ', extra: '6.8%' },
  { label: 'Tekshot', value: 5.7, color: 'var(--ocr)', note: '5.7 Tỷ', extra: '4.6%' },
]

export const revenueProfit12m = {
  labels: MONTHS_12,
  revenue: [72, 78, 86, 74, 92, 96, 88, 110, 96, 104, 118, 126],
  profit: [8.4, 9.6, 11.2, 9.8, 13.4, 15.6, 12.8, 17.2, 14.6, 15.8, 17.4, 18.7],
}

export const projectStatusExec = [
  { label: 'Đang triển khai', value: 37, color: '#6366f1', note: '37', extra: '54%' },
  { label: 'Hoàn thành', value: 18, color: 'var(--success)', note: '18', extra: '26%' },
  { label: 'Tạm dừng', value: 8, color: 'var(--warning)', note: '8', extra: '12%' },
  { label: 'Chưa khởi công', value: 5, color: 'var(--slate-300)', note: '5', extra: '8%' },
]

export const execCashflow = {
  labels: MONTHS_12,
  in: [42, 46, 44, 50, 48, 54, 52, 56, 55, 58, 57, 60],
  out: [22, 24, 21, 26, 24, 27, 25, 28, 26, 29, 27, 30],
  net: [30, 32, 31, 34, 33, 36, 35, 38, 37, 40, 39, 42],
}

export const financialRatios = [
  { id: 'roe', label: 'ROE', value: '18.6', unit: '%', delta: '+2.3%', tone: 'up' as const },
  { id: 'roa', label: 'ROA', value: '11.2', unit: '%', delta: '+1.5%', tone: 'warn' as const },
  { id: 'debt', label: 'Nợ/Vốn CSH', value: '0.68', delta: '-0.05', tone: 'down' as const },
  { id: 'current', label: 'Hệ số thanh toán hiện hành', value: '1.42', delta: '+0.12', tone: 'up' as const },
  { id: 'inventory', label: 'Vòng quay hàng tồn kho', value: '6.3', unit: 'lần', delta: '+0.8', tone: 'up' as const },
  { id: 'receivable', label: 'Vòng quay khoản phải thu', value: '5.7', unit: 'lần', delta: '+0.6', tone: 'up' as const },
]

export const topProjectsByRevenue = [
  { id: 1, name: 'The Nexus Tower', revenue: '32.6', progress: 68 },
  { id: 2, name: 'Green City Villa', revenue: '18.9', progress: 45 },
  { id: 3, name: 'Sunrise Riverside', revenue: '15.4', progress: 72 },
  { id: 4, name: 'Ocean Central', revenue: '12.1', progress: 35 },
  { id: 5, name: 'Eco Village', revenue: '8.7', progress: 20 },
]

export const execAlerts = [
  { id: 'a1', label: 'Dự án vượt ngân sách', count: 6, tone: 'danger' as const, icon: 'error' },
  { id: 'a2', label: 'Hợp đồng sắp hết hạn', count: 9, tone: 'warning' as const, icon: 'warning' },
  { id: 'a3', label: 'Thanh toán quá hạn', count: 12, tone: 'warning' as const, icon: 'schedule' },
  { id: 'a4', label: 'Vấn đề cần xử lý', count: 7, tone: 'info' as const, icon: 'info' },
]

export const departmentKpis = [
  { id: 'sales', name: 'Kinh doanh', kpi: 92, trend: [70, 74, 78, 82, 86, 92], rating: 'Tốt' as const },
  { id: 'finance', name: 'Tài chính - Kế toán', kpi: 88, trend: [72, 76, 79, 82, 85, 88], rating: 'Tốt' as const },
  { id: 'ops', name: 'Vận hành dự án', kpi: 85, trend: [80, 78, 82, 79, 83, 85], rating: 'Khá' as const },
  { id: 'procurement', name: 'Mua hàng', kpi: 78, trend: [74, 76, 73, 75, 77, 78], rating: 'Khá' as const },
  { id: 'hr', name: 'Nhân sự', kpi: 90, trend: [82, 84, 86, 87, 89, 90], rating: 'Tốt' as const },
]

export const headcountByDept = [
  { label: 'Kinh doanh', value: 324, color: 'var(--info)', note: '324', extra: '25.9%' },
  { label: 'Vận hành dự án', value: 456, color: 'var(--success)', note: '456', extra: '36.5%' },
  { label: 'Tài chính - Kế toán', value: 156, color: 'var(--warning)', note: '156', extra: '12.5%' },
  { label: 'Mua hàng', value: 132, color: 'var(--danger)', note: '132', extra: '10.6%' },
  { label: 'Nhân sự & Hành chính', value: 120, color: 'var(--automation)', note: '120', extra: '9.6%' },
  { label: 'Khác', value: 60, color: 'var(--slate-300)', note: '60', extra: '4.9%' },
]

/* ================================================================
   55 · PROJECT DASHBOARD
   ================================================================ */

export const projectSCurve = {
  labels: ['T01/24', 'T02/24', 'T03/24', 'T04/24', 'T05/24', 'T06/24', 'T07/24', 'T08/24', 'T09/24'],
  planned: [8, 18, 30, 44, 62, 74, 84, 93, 100],
  actual: [10, 21, 33, 48, 68, 0, 0, 0, 0],
  forecast: [0, 0, 0, 0, 68, 76, 84, 92, 98],
}

export const projectBudgetSplit = [
  { label: 'Giá trị hợp đồng (GTHĐ)', value: 325.6, color: 'var(--info)', note: '325.6 Tỷ' },
  { label: 'Đã thanh toán', value: 158.2, color: 'var(--success)', note: '158.2 Tỷ', extra: '48.6%' },
  { label: 'Đã thực hiện (EV)', value: 221.5, color: 'var(--warning)', note: '221.5 Tỷ', extra: '68.0%' },
  { label: 'Chi phí thực tế (AC)', value: 198.7, color: 'var(--danger)', note: '198.7 Tỷ', extra: '61.0%' },
  { label: 'Còn lại (EAC - EV)', value: 104.1, color: 'var(--slate-300)', note: '104.1 Tỷ', extra: '32.0%' },
]

export const projectTaskStatus = [
  { label: 'Hoàn thành', value: 128, color: 'var(--success)', note: '128', extra: '45%' },
  { label: 'Đang thực hiện', value: 96, color: 'var(--info)', note: '96', extra: '34%' },
  { label: 'Chờ phản hồi', value: 28, color: 'var(--warning)', note: '28', extra: '10%' },
  { label: 'Chưa bắt đầu', value: 32, color: 'var(--slate-300)', note: '32', extra: '11%' },
]

export const projectMainTasks = [
  { id: 1, name: 'Thi công kết cấu tầng 15-20', progress: 72, status: 'Đang thực hiện', owner: 'Trần Văn B', due: '25/05/2024' },
  { id: 2, name: 'Lắp đặt hệ thống MEP tầng 5-10', progress: 65, status: 'Đang thực hiện', owner: 'Lê Minh C', due: '28/05/2024' },
  { id: 3, name: 'Thi công tường bao tầng 10-20', progress: 50, status: 'Đang thực hiện', owner: 'Nguyễn Hữu D', due: '30/05/2024' },
  { id: 4, name: 'Hoàn thiện thô tầng 1-5', progress: 30, status: 'Chờ phản hồi', owner: 'Phạm Văn E', due: '05/06/2024' },
  { id: 5, name: 'Mua sắm thiết bị PCCC', progress: 0, status: 'Chưa bắt đầu', owner: 'Hoàng Văn F', due: '15/06/2024' },
]

export const projectIssues = [
  { id: 'i1', label: 'Vấn đề nghiêm trọng', count: 3, tone: 'danger' as const },
  { id: 'i2', label: 'Vấn đề trung bình', count: 5, tone: 'warning' as const },
  { id: 'i3', label: 'Vấn đề thấp', count: 2, tone: 'info' as const },
]

export const projectRisks = [
  { id: 'r1', label: 'Rủi ro cao', count: 4, tone: 'danger' as const },
  { id: 'r2', label: 'Rủi ro trung bình', count: 6, tone: 'warning' as const },
  { id: 'r3', label: 'Rủi ro thấp', count: 3, tone: 'info' as const },
]

export const projectMilestones = [
  { id: 'm1', label: 'Hoàn thành kết cấu tầng 20', date: '25/05/2024', remain: 'Còn 2 ngày' },
  { id: 'm2', label: 'Nghiệm thu phần thô', date: '10/06/2024', remain: 'Còn 18 ngày' },
  { id: 'm3', label: 'Bàn giao MEP tầng 1-10', date: '20/06/2024', remain: 'Còn 28 ngày' },
  { id: 'm4', label: 'Nghiệm thu PCCC', date: '05/07/2024', remain: 'Còn 43 ngày' },
  { id: 'm5', label: 'Bàn giao dự án', date: '30/09/2024', remain: 'Còn 122 ngày' },
]

export const projectCashflow = {
  labels: ['T01/24', 'T02/24', 'T03/24', 'T04/24', 'T05/24', 'T06/24', 'T07/24', 'T08/24', 'T09/24', 'T10/24'],
  planned: [8, 12, 16, 22, 28, 34, 30, 26, 20, 14],
  actual: [7, 11, 15, 24, 30, 0, 0, 0, 0, 0],
  forecast: [0, 0, 0, 0, 30, 36, 40, 44, 46, 45],
}

/* ================================================================
   56 · FINANCE DASHBOARD
   ================================================================ */

export const financeKpis = [
  { id: 'net-revenue', label: 'Doanh thu thuần', value: '125.8', unit: 'Tỷ VND', icon: 'bar_chart', tone: 'info' as const, trend: '18.6%', spark: [82, 88, 84, 95, 92, 101, 98, 108, 105, 116, 120, 125.8] },
  { id: 'gross-profit', label: 'Lợi nhuận gộp', value: '32.4', unit: 'Tỷ VND', icon: 'savings', tone: 'success' as const, trend: '16.3%', spark: [20, 22, 21, 24, 23, 26, 25, 28, 27, 30, 31, 32.4] },
  { id: 'ebt', label: 'Lợi nhuận trước thuế', value: '18.7', unit: 'Tỷ VND', icon: 'pie_chart', tone: 'ai' as const, trend: '22.4%', spark: [11, 12, 11.6, 13.2, 12.8, 14.4, 14, 15.8, 15.2, 17, 17.8, 18.7] },
  { id: 'eat', label: 'Lợi nhuận sau thuế', value: '14.9', unit: 'Tỷ VND', icon: 'account_balance_wallet', tone: 'iot' as const, trend: '21.1%', spark: [8.8, 9.6, 9.2, 10.5, 10.2, 11.5, 11.2, 12.6, 12.1, 13.6, 14.2, 14.9] },
  { id: 'net-cash', label: 'Dòng tiền thuần', value: '32.4', unit: 'Tỷ VND', icon: 'sync_alt', tone: 'warning' as const, trend: '15.3%', spark: [19, 22, 20, 25, 23, 27, 26, 29, 28, 30, 31, 32.4] },
  { id: 'assets', label: 'Tổng tài sản', value: '568.7', unit: 'Tỷ VND', icon: 'account_balance', tone: 'info' as const, trend: '5.8%', spark: [498, 508, 514, 522, 528, 536, 542, 548, 554, 560, 565, 568.7] },
]

export const revenueStructure = [
  { label: 'Xây lắp', value: 56.2, color: 'var(--info)', note: '56.2', extra: '(44.7%)' },
  { label: 'Tư vấn thiết kế', value: 22.3, color: 'var(--success)', note: '22.3', extra: '(17.7%)' },
  { label: 'Cung cấp vật tư', value: 18.7, color: 'var(--warning)', note: '18.7', extra: '(14.9%)' },
  { label: 'Dịch vụ khác', value: 16.6, color: 'var(--automation)', note: '16.6', extra: '(13.2%)' },
  { label: 'Bất động sản', value: 12.0, color: 'var(--danger)', note: '12.0', extra: '(9.5%)' },
]

export const budgetExecution = [
  { id: 'rev', label: 'Doanh thu', actual: 125.8, budget: 150.0, rate: 83.9, tone: 'info' as const },
  { id: 'cost', label: 'Chi phí', actual: 107.1, budget: 130.0, rate: 82.4, tone: 'success' as const },
  { id: 'profit', label: 'Lợi nhuận sau thuế', actual: 14.9, budget: 20.0, rate: 74.5, tone: 'ai' as const },
]

export const topCosts = [
  { id: 1, name: 'Chi phí nhân công', value: '28.7', rate: '26.8%' },
  { id: 2, name: 'Chi phí vật liệu', value: '24.1', rate: '22.5%' },
  { id: 3, name: 'Chi phí máy thi công', value: '15.6', rate: '14.6%' },
  { id: 4, name: 'Chi phí thuê ngoài', value: '12.4', rate: '11.6%' },
  { id: 5, name: 'Chi phí quản lý dự án', value: '9.8', rate: '9.2%' },
]

export const bankBalances = [
  { id: 'vcb', name: 'Vietcombank', account: '0011001234567', balance: '28.7', color: 'var(--success)' },
  { id: 'tcb', name: 'Techcombank', account: '1903123456789', balance: '18.4', color: 'var(--danger)' },
  { id: 'bidv', name: 'BIDV', account: '12310001234567', balance: '15.9', color: 'var(--info)' },
  { id: 'mb', name: 'MB Bank', account: '8888012345678', balance: '9.6', color: 'var(--automation)' },
]

export const financeAlerts = [
  { id: 'f1', label: 'Dư nợ quá hạn > 30 ngày', count: '12.6 Tỷ VND', tone: 'danger' as const, icon: 'error' },
  { id: 'f2', label: 'Dòng tiền kinh doanh giảm 18%', count: '18%', tone: 'warning' as const, icon: 'warning' },
  { id: 'f3', label: 'Tỷ lệ nợ trên vốn chủ sở hữu cao', count: '1.62 lần', tone: 'warning' as const, icon: 'balance' },
  { id: 'f4', label: 'Chi phí vượt 82.4% ngân sách', count: '82.4%', tone: 'info' as const, icon: 'info' },
]

/* ================================================================
   57 · CONSTRUCTION DASHBOARD
   ================================================================ */

export const constructionCostSplit = [
  { label: 'Phần móng', value: 45.6, color: 'var(--info)', note: '45.6', extra: '(23.0%)' },
  { label: 'Phần thân', value: 67.8, color: 'var(--success)', note: '67.8', extra: '(34.1%)' },
  { label: 'Hoàn thiện', value: 38.7, color: 'var(--warning)', note: '38.7', extra: '(19.5%)' },
  { label: 'MEP', value: 27.9, color: 'var(--automation)', note: '27.9', extra: '(14.0%)' },
  { label: 'Khác', value: 18.7, color: 'var(--slate-300)', note: '18.7', extra: '(9.4%)' },
]

export const siteStatus = [
  { id: 's1', label: 'Số ngày an toàn', value: '125', unit: 'ngày', icon: 'verified_user', tone: 'success' as const },
  { id: 's2', label: 'Số vụ tai nạn', value: '0', unit: 'vụ', icon: 'error', tone: 'danger' as const },
  { id: 's3', label: 'Số lượng nhân sự', value: '142', unit: 'người', icon: 'groups', tone: 'info' as const },
  { id: 's4', label: 'Số thiết bị thi công', value: '32', unit: 'thiết bị', icon: 'precision_manufacturing', tone: 'warning' as const },
  { id: 's5', label: 'Thời tiết hôm nay', value: '28°C', unit: 'Nhiều mây', icon: 'cloud', tone: 'neutral' as const },
]

export const constructionTasks = [
  { id: 1, name: 'Thi công cọc khoan nhồi', progress: 100, status: 'Hoàn thành', owner: 'Trần Văn B', due: '15/04/2024' },
  { id: 2, name: 'Thi công móng', progress: 85, status: 'Đang thực hiện', owner: 'Lê Minh C', due: '05/06/2024' },
  { id: 3, name: 'Thi công tầng hầm B1-B2', progress: 60, status: 'Đang thực hiện', owner: 'Nguyễn Hữu D', due: '20/06/2024' },
  { id: 4, name: 'Thi công kết cấu thân', progress: 40, status: 'Đang thực hiện', owner: 'Phạm Văn E', due: '30/07/2024' },
  { id: 5, name: 'Thi công MEP tầng 1-5', progress: 20, status: 'Chờ bắt đầu', owner: 'Hoàng Văn F', due: '15/07/2024' },
]

export const workforceSplit = [
  { label: 'Kỹ sư', value: 18, color: 'var(--info)', note: '18', extra: '(12.7%)' },
  { label: 'Công nhân', value: 89, color: 'var(--success)', note: '89', extra: '(62.7%)' },
  { label: 'Nhà thầu phụ', value: 25, color: 'var(--warning)', note: '25', extra: '(17.6%)' },
  { label: 'Khác', value: 10, color: 'var(--slate-300)', note: '10', extra: '(7.0%)' },
]

export const equipmentSplit = [
  { label: 'Đang hoạt động', value: 28, color: 'var(--success)', note: '28', extra: '(87.5%)' },
  { label: 'Bảo trì', value: 3, color: 'var(--warning)', note: '3', extra: '(9.4%)' },
  { label: 'Dừng hoạt động', value: 1, color: 'var(--danger)', note: '1', extra: '(3.1%)' },
]

export const weatherForecast7d = [
  { day: 'T5', date: '23/05', icon: 'sunny', high: '28°C', low: '24°C', rain: '20%' },
  { day: 'T6', date: '24/05', icon: 'rainy', high: '27°C', low: '23°C', rain: '60%' },
  { day: 'T7', date: '25/05', icon: 'partly_cloudy_day', high: '29°C', low: '24°C', rain: '30%' },
  { day: 'CN', date: '26/05', icon: 'sunny', high: '30°C', low: '25°C', rain: '10%' },
  { day: 'T2', date: '27/05', icon: 'sunny', high: '31°C', low: '25°C', rain: '10%' },
  { day: 'T3', date: '28/05', icon: 'rainy', high: '28°C', low: '24°C', rain: '70%' },
  { day: 'T4', date: '29/05', icon: 'partly_cloudy_day', high: '27°C', low: '23°C', rain: '50%' },
]

export const constructionDocs = [
  { id: 'cd1', name: 'Bản vẽ kết cấu tầng 15-20_rev03.pdf', ext: 'pdf', size: '20/05/2024', meta: 'Shopdrawing' },
  { id: 'cd2', name: 'Biên bản họp tuần 20_20052024.docx', ext: 'docx', size: '20/05/2024', meta: 'Biên bản' },
  { id: 'cd3', name: 'Kế hoạch cung ứng vật tư T06.2024.xlsx', ext: 'xlsx', size: '19/05/2024', meta: 'Kế hoạch' },
  { id: 'cd4', name: 'Quy trình an toàn thi công sàn.pdf', ext: 'pdf', size: '18/05/2024', meta: 'An toàn' },
  { id: 'cd5', name: 'Nghiệm thu cốt thép móng_Block A.docx', ext: 'docx', size: '18/05/2024', meta: 'Nghiệm thu' },
]

/* ================================================================
   58 · AI INSIGHT DASHBOARD
   ================================================================ */

export const aiForecast = {
  labels: ['12/23', '01/24', '02/24', '03/24', '04/24', '05/24', '06/24', '07/24', '08/24', '09/24', '10/24', '11/24'],
  actual: [62, 71, 78, 86, 94, 103, 0, 0, 0, 0, 0, 0],
  forecast: [0, 0, 0, 0, 0, 103, 110, 116, 121, 127, 132, 136.8],
}

export const aiFactors = [
  { id: 'schedule', label: 'Tiến độ thi công', impact: 42, level: 'Cao', tone: 'success' as const },
  { id: 'material', label: 'Giá vật liệu', impact: -28, level: 'Cao', tone: 'danger' as const },
  { id: 'weather', label: 'Thời tiết', impact: -16, level: 'Trung bình', tone: 'warning' as const },
  { id: 'labor', label: 'Nhân lực', impact: 14, level: 'Trung bình', tone: 'success' as const },
  { id: 'design', label: 'Thiết kế thay đổi', impact: -9, level: 'Thấp', tone: 'danger' as const },
  { id: 'disburse', label: 'Giải ngân', impact: 7, level: 'Thấp', tone: 'success' as const },
]

export const aiRiskSplit = [
  { label: 'Rủi ro rất cao', value: 2, color: 'var(--danger)', note: '2', extra: 'Rất cao' },
  { label: 'Rủi ro cao', value: 5, color: '#f97316', note: '5', extra: 'Cao' },
  { label: 'Rủi ro trung bình', value: 6, color: 'var(--warning)', note: '6', extra: 'Trung bình' },
  { label: 'Rủi ro thấp', value: 3, color: 'var(--success)', note: '3', extra: 'Thấp' },
]

export const aiTopRisks = [
  { id: 'tr1', label: 'Biến động giá thép có thể làm tăng chi phí 8-12%', level: 'Rất cao', tone: 'danger' as const },
  { id: 'tr2', label: 'Tiến độ gói thầu MEP chậm 7 ngày', level: 'Cao', tone: 'warning' as const },
  { id: 'tr3', label: 'Khả năng mưa kéo dài tại công trường', level: 'Trung bình', tone: 'info' as const },
]

export const anomalies = [
  { id: 'an1', metric: 'Chi phí vật liệu', current: '28.7 tỷ', previous: '24.1 tỷ', delta: '+19.1%', verdict: 'Bất thường' },
  { id: 'an2', metric: 'Năng suất nhân công', current: '82%', previous: '74%', delta: '+10.8%', verdict: 'Bất thường' },
  { id: 'an3', metric: 'Tiêu hao nhiên liệu', current: '1,250 lít', previous: '980 lít', delta: '+27.6%', verdict: 'Bất thường' },
  { id: 'an4', metric: 'Thời gian máy chờ', current: '18.5 giờ', previous: '11.2 giờ', delta: '+65.2%', verdict: 'Bất thường' },
  { id: 'an5', metric: 'Tỷ lệ tái công', current: '3.2%', previous: '1.8%', delta: '+77.8%', verdict: 'Cảnh báo' },
]

export const aiRecommendations = [
  { id: 'rc1', label: 'Tăng cường 15% nhân lực cho gói thầu MEP', sub: 'Giúp cải thiện tiến độ 5-7 ngày', priority: 'Ưu tiên cao', icon: 'trending_down', tone: 'success' as const },
  { id: 'rc2', label: 'Đàm phán mua thép trước 15/06', sub: 'Tiết kiệm 2.3 - 3.1 tỷ VND', priority: 'Ưu tiên cao', icon: 'payments', tone: 'success' as const },
  { id: 'rc3', label: 'Chuẩn bị phương án thi công khi mưa lớn', sub: 'Giảm thiểu rủi ro gián đoạn', priority: 'Ưu tiên trung bình', icon: 'rainy', tone: 'warning' as const },
  { id: 'rc4', label: 'Tối ưu lịch giao vật liệu', sub: 'Giảm tồn kho 12-15%', priority: 'Ưu tiên thấp', icon: 'inventory_2', tone: 'info' as const },
]

export const sentimentSources = [
  { id: 'sd1', label: 'Nhật ký công trường', value: '1,248' },
  { id: 'sd2', label: 'Báo cáo giám sát', value: '856' },
  { id: 'sd3', label: 'Phản hồi nhà thầu', value: '623' },
  { id: 'sd4', label: 'Tin nhắn & Email', value: '342' },
]

export const aiWords = [
  { text: 'tiến độ', weight: 10, color: 'var(--info)' },
  { text: 'vật liệu', weight: 9, color: 'var(--automation)' },
  { text: 'chất lượng', weight: 8, color: 'var(--warning)' },
  { text: 'chi phí', weight: 7, color: 'var(--danger)' },
  { text: 'nhân lực', weight: 6, color: 'var(--success)' },
  { text: 'thời tiết', weight: 6, color: 'var(--ocr)' },
  { text: 'phê duyệt', weight: 5, color: 'var(--slate-500)' },
  { text: 'bản vẽ', weight: 5, color: 'var(--info)' },
  { text: 'nhà thầu', weight: 4, color: 'var(--slate-500)' },
  { text: 'giải ngân', weight: 4, color: 'var(--success)' },
  { text: 'ghi thầu', weight: 3, color: 'var(--slate-400)' },
  { text: 'thanh toán', weight: 3, color: 'var(--slate-400)' },
  { text: 'thay đổi', weight: 3, color: 'var(--slate-400)' },
  { text: 'thanh chính', weight: 2, color: 'var(--slate-400)' },
]

/* ================================================================
   59 · IOT DASHBOARD
   ================================================================ */

export const iotDeviceStatus = [
  { label: 'Online', value: 1067, color: 'var(--success)', note: '1,067', extra: '(85.6%)' },
  { label: 'Cảnh báo', value: 28, color: 'var(--warning)', note: '28', extra: '(2.2%)' },
  { label: 'Lỗi', value: 15, color: 'var(--danger)', note: '15', extra: '(1.2%)' },
  { label: 'Offline', value: 138, color: 'var(--slate-300)', note: '138', extra: '(11.0%)' },
]

export const iotDeviceTypes = [
  { label: 'Cảm biến môi trường', value: 548, color: 'var(--info)', note: '548', extra: '(43.9%)' },
  { label: 'Camera AI', value: 256, color: 'var(--automation)', note: '256', extra: '(20.5%)' },
  { label: 'Thiết bị năng lượng', value: 198, color: 'var(--warning)', note: '198', extra: '(15.9%)' },
  { label: 'Thiết bị an toàn', value: 126, color: 'var(--success)', note: '126', extra: '(10.1%)' },
  { label: 'Khác', value: 120, color: 'var(--slate-300)', note: '120', extra: '(9.6%)' },
]

export const iotSensorSeries = [22, 24, 27, 30, 32, 33, 32.5, 31, 30, 29, 30, 32]
export const iotSensorLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']

export const iotTopAlarms = [
  { id: 'TEMP-003', name: 'Nhiệt độ cao', value: '36.8 °C', time: '2 phút trước', icon: 'device_thermostat', tone: 'danger' as const },
  { id: 'VIB-021', name: 'Rung động bất thường', value: '7.2 mm/s', time: '5 phút trước', icon: 'vibration', tone: 'warning' as const },
  { id: 'PUMP-07', name: 'Áp suất thấp', value: '1.2 bar', time: '8 phút trước', icon: 'compress', tone: 'warning' as const },
  { id: 'CAM-15', name: 'Mất kết nối', value: 'Offline', time: '15 phút trước', icon: 'videocam_off', tone: 'neutral' as const },
  { id: 'ENERGY-04', name: 'Tiêu thụ cao', value: '125 kWh', time: '20 phút trước', icon: 'bolt', tone: 'warning' as const },
]

export const iotDevices = [
  { id: 'TEMP-001', type: 'Nhiệt độ', status: 'Online', location: 'Tầng 5 - Khu A', battery: 76 },
  { id: 'HUM-002', type: 'Độ ẩm', status: 'Online', location: 'Tầng 5 - Khu A', battery: 65 },
  { id: 'VIB-021', type: 'Rung động', status: 'Cảnh báo', location: 'Tầng 3 - Kết cấu', battery: 53 },
  { id: 'PUMP-07', type: 'Áp suất', status: 'Cảnh báo', location: 'Tầng hầm - Bơm', battery: 42 },
  { id: 'CAM-15', type: 'Camera AI', status: 'Lỗi', location: 'Cổng chính', battery: 8 },
  { id: 'ENERGY-04', type: 'Điện năng', status: 'Online', location: 'Trạm điện chính', battery: 88 },
  { id: 'AIR-009', type: 'Chất lượng không khí', status: 'Online', location: 'Văn phòng', battery: 91 },
  { id: 'GATEWAY-02', type: 'Gateway', status: 'Online', location: 'Tầng 5 - Khu A', battery: 100 },
]

export const iotRealtimeValues = [
  { id: 'TEMP-001', label: 'Nhiệt độ', value: '32.5', unit: '°C', icon: 'device_thermostat', delta: '+2.1°C', up: true, spark: [30, 31, 30.5, 31.5, 32, 32.4, 32.5] },
  { id: 'HUM-002', label: 'Độ ẩm', value: '62.4', unit: '%', icon: 'humidity_percentage', delta: '-1.3%', up: false, spark: [66, 65, 64.5, 64, 63.5, 63, 62.4] },
  { id: 'AIR-009', label: 'CO2', value: '423', unit: 'ppm', icon: 'co2', delta: '+15 ppm', up: true, spark: [400, 405, 410, 408, 415, 420, 423] },
  { id: 'PUMP-07', label: 'Áp suất', value: '1.8', unit: 'bar', icon: 'compress', delta: '-0.2 bar', up: false, spark: [2.2, 2.1, 2.0, 2.0, 1.9, 1.85, 1.8] },
  { id: 'ENERGY-04', label: 'Điện năng', value: '12.4', unit: 'kW', icon: 'bolt', delta: '+1.6 kW', up: true, spark: [10, 10.5, 11, 11.4, 11.8, 12.1, 12.4] },
]

export const iotAlarmHistory = [
  { id: 'ah1', time: '31/05/2024 10:28', device: 'TEMP-003', type: 'Nhiệt độ cao', level: 'Cao', status: 'Chưa xử lý' },
  { id: 'ah2', time: '31/05/2024 10:23', device: 'VIB-021', type: 'Rung động bất thường', level: 'Trung bình', status: 'Đang xử lý' },
  { id: 'ah3', time: '31/05/2024 10:15', device: 'PUMP-07', type: 'Áp suất thấp', level: 'Trung bình', status: 'Đã xác nhận' },
  { id: 'ah4', time: '31/05/2024 09:48', device: 'CAM-15', type: 'Mất kết nối', level: 'Cao', status: 'Chưa xử lý' },
  { id: 'ah5', time: '31/05/2024 09:20', device: 'ENERGY-04', type: 'Tiêu thụ cao', level: 'Trung bình', status: 'Đã xác nhận' },
]

export const gateways = [
  { id: 'GW-01', location: 'Tầng 5 - Khu A', status: 'Online', uptime: '99.9%', signal: 5 },
  { id: 'GW-02', location: 'Tầng 3 - Khu B', status: 'Online', uptime: '99.8%', signal: 4 },
  { id: 'GW-03', location: 'Tầng hầm', status: 'Cảnh báo', uptime: '97.5%', signal: 3 },
  { id: 'GW-04', location: 'Cổng chính', status: 'Online', uptime: '99.7%', signal: 5 },
  { id: 'GW-05', location: 'Nhà xe', status: 'Lỗi', uptime: '82.1%', signal: 1 },
]

/* ================================================================
   60 · KNOWLEDGE GRAPH
   ================================================================ */

export const graphNodes = [
  { id: 'g1', label: 'Khách hàng', sub: 'PI Holding', icon: 'groups', color: '#12b76a', edgeLabel: 'Thuộc về' },
  { id: 'g2', label: 'Nhà thầu chính', sub: 'LPC Construction', icon: 'engineering', color: '#2563eb', edgeLabel: 'Thi công' },
  { id: 'g3', label: 'Hạng mục', sub: 'Kết cấu', icon: 'foundation', color: '#dc2626', edgeLabel: 'Bao gồm' },
  { id: 'g4', label: 'Vật liệu', sub: 'Bê tông M300', icon: 'inventory_2', color: '#f59e0b', edgeLabel: 'Sử dụng' },
  { id: 'g5', label: 'Nhân sự', sub: 'Trần Văn B', icon: 'badge', color: '#12b76a', edgeLabel: 'Phụ trách' },
  { id: 'g6', label: 'Thiết bị', sub: 'Cẩu tháp TC-01', icon: 'precision_manufacturing', color: '#2563eb', edgeLabel: 'Sử dụng' },
  { id: 'g7', label: 'Chứng từ', sub: 'CT-2024-0587', icon: 'receipt_long', color: '#f59e0b', edgeLabel: 'Liên quan' },
  { id: 'g8', label: 'Nhà cung cấp', sub: 'An Phát JSC', icon: 'local_shipping', color: '#12b76a', edgeLabel: 'Cung cấp' },
  { id: 'g9', label: 'Thanh toán', sub: 'TT-2024-0056', icon: 'payments', color: '#f59e0b', edgeLabel: 'Thanh toán' },
  { id: 'g10', label: 'Hợp đồng', sub: 'HD-2024-001', icon: 'contract', color: '#2563eb', edgeLabel: 'Ký kết' },
]

export const graphRelations = [
  { id: 'gr1', entity: 'PI Holding', type: 'Thuộc về', confidence: 100 },
  { id: 'gr2', entity: 'LPC Construction', type: 'Thi công', confidence: 98 },
  { id: 'gr3', entity: 'HD-2024-001', type: 'Ký kết', confidence: 95 },
  { id: 'gr4', entity: 'Hạng mục: Kết cấu', type: 'Bao gồm', confidence: 95 },
  { id: 'gr5', entity: 'Bê tông M300', type: 'Sử dụng', confidence: 93 },
  { id: 'gr6', entity: 'Trần Văn B', type: 'Phụ trách', confidence: 90 },
  { id: 'gr7', entity: 'Cẩu tháp TC-01', type: 'Sử dụng', confidence: 88 },
  { id: 'gr8', entity: 'CT-2024-0587', type: 'Liên quan', confidence: 87 },
  { id: 'gr9', entity: 'An Phát JSC', type: 'Cung cấp', confidence: 86 },
  { id: 'gr10', entity: 'TT-2024-0056', type: 'Thanh toán', confidence: 85 },
]

export const entityTypes = [
  { label: 'Tổ chức', value: 5428, color: 'var(--success)', note: '5,428', extra: '(22.3%)' },
  { label: 'Dự án', value: 3156, color: 'var(--info)', note: '3,156', extra: '(13.0%)' },
  { label: 'Hợp đồng', value: 4892, color: 'var(--automation)', note: '4,892', extra: '(20.1%)' },
  { label: 'Hạng mục', value: 3985, color: 'var(--danger)', note: '3,985', extra: '(16.4%)' },
  { label: 'Tài nguyên', value: 4215, color: 'var(--ocr)', note: '4,215', extra: '(17.3%)' },
  { label: 'Chứng từ', value: 682, color: 'var(--warning)', note: '682', extra: '(2.8%)' },
]

export const graphSources = [
  { id: 'gs1', name: 'ERPcons Database', value: '18,742', rate: 43.2 },
  { id: 'gs2', name: 'Document OCR', value: '12,456', rate: 28.7 },
  { id: 'gs3', name: 'IoT Sensors', value: '5,286', rate: 12.2 },
  { id: 'gs4', name: 'External APIs', value: '3,214', rate: 7.4 },
  { id: 'gs5', name: 'Manual Input', value: '1,120', rate: 2.6 },
  { id: 'gs6', name: 'Khác', value: '540', rate: 1.9 },
]

export const graphActivity = {
  labels: ['25/05', '26/05', '27/05', '28/05', '29/05', '30/05', '31/05'],
  entities: [180, 320, 260, 640, 240, 560, 420],
  relations: [90, 180, 150, 380, 140, 842, 300],
}

export const graphWords = [
  { text: 'dự án', weight: 10, color: 'var(--automation)' },
  { text: 'hợp đồng', weight: 9, color: 'var(--danger)' },
  { text: 'khách hàng', weight: 8, color: 'var(--info)' },
  { text: 'nhà thầu', weight: 7, color: 'var(--success)' },
  { text: 'vật liệu', weight: 7, color: 'var(--ocr)' },
  { text: 'thiết bị', weight: 6, color: 'var(--slate-500)' },
  { text: 'hạng mục', weight: 6, color: 'var(--warning)' },
  { text: 'chứng từ', weight: 5, color: 'var(--warning)' },
  { text: 'báo cáo', weight: 5, color: 'var(--slate-500)' },
  { text: 'đơn hàng', weight: 4, color: 'var(--info)' },
  { text: 'công hàng', weight: 4, color: 'var(--slate-400)' },
  { text: 'nghiệm thu', weight: 3, color: 'var(--slate-400)' },
  { text: 'đơn giá', weight: 3, color: 'var(--slate-400)' },
  { text: 'chi phí', weight: 3, color: 'var(--slate-400)' },
  { text: 'biên bản', weight: 2, color: 'var(--slate-400)' },
]

export const graphSuggestions = [
  { id: 'gsg1', label: 'Phát hiện 128 thực thể có thể liên quan đến dự án The Nexus Tower', sub: '(dựa trên ngữ nghĩa & mối quan hệ)', icon: 'hub' },
  { id: 'gsg2', label: 'Gợi ý kết nối 316 mối quan hệ tiềm năng chưa được xác lập', icon: 'share' },
  { id: 'gsg3', label: 'Phát hiện 23 tài liệu chưa được phân loại vào đồ thị', icon: 'folder_open' },
  { id: 'gsg4', label: 'Có 5 thực thể trùng lặp với độ tương đồng > 90%', icon: 'content_copy' },
]
