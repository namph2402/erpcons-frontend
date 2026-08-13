# ERPCons — Thiết kế cấu trúc thư mục theo module chức năng

> Bản thiết kế kiến trúc giao diện: chuyển từ tổ chức **theo kỹ thuật** (`pages/`, `components/`)
> sang tổ chức **theo module nghiệp vụ** (`modules/crm`, `modules/ke-toan`…), mỗi module có
> một trang **Dashboard báo cáo sơ bộ** làm cửa vào.

---

## 1. Nguyên tắc thiết kế

| # | Nguyên tắc | Ý nghĩa |
|---|---|---|
| 1 | **Module là đơn vị đóng gói** | Một chức năng = một thư mục. Trang, widget, dữ liệu, kiểu dữ liệu của nó nằm cùng chỗ. Xoá module = xoá 1 thư mục. |
| 2 | **Mỗi module có 1 dashboard** | `/<module>` luôn là trang tổng quan báo cáo. Người dùng vào module là thấy "sức khoẻ" của module đó trước, rồi mới đi sâu vào danh sách. |
| 3 | **MỘT menu — MỘT header** (giữ nguyên quy tắc cũ) | Sidebar và Topbar **không** do module tự dựng. Module chỉ *khai báo* mục menu của mình; `appNav` được **sinh tự động** từ các khai báo đó. |
| 4 | **Shared chỉ đi một chiều** | `modules/*` được import `shared/*`. `shared/*` **tuyệt đối không** import ngược `modules/*`. Module A không import module B — muốn dùng chung thì nâng lên `shared/`. |
| 5 | **Dashboard module là một khuôn mẫu** | 13 dashboard dùng chung 1 blueprint bố cục (mục 6). Khác nhau ở dữ liệu, không khác nhau ở khung. |
| 6 | **Không hard-code màu** | Mọi màu qua **role token** trong `shared/styles/tokens.css` (hệ Graphite & Crimson). Viết đúng token thì màn hình chạy được cả Light lẫn Dark mà không cần thêm CSS — xem [DESIGN-TOKENS.md](DESIGN-TOKENS.md). |

---

## 2. Bản đồ module

13 module nghiệp vụ + 1 module nền tảng. Cột **Dashboard** là trang báo cáo sơ bộ bắt buộc của module.

| # | Mã module | Tên hiển thị | Icon | Route gốc (= dashboard) | Trang con chính |
|---|---|---|---|---|---|
| 0 | `dashboard` | Trung tâm điều hành | `space_dashboard` | `/dashboard` | executive · project · finance · construction · ai-insight · iot · knowledge-graph |
| 1 | `personal` | Cá nhân | `account_circle` | `/ca-nhan` | công việc (Kanban) · hồ sơ · chấm công · đơn từ · lương |
| 2 | `crm` | Khách hàng & Bán hàng | `handshake` | `/crm` | khách hàng · cơ hội · báo giá · hợp đồng bán · cổng khách hàng · chăm sóc |
| 3 | `projects` | Dự án & Thi công | `domain` | `/du-an` | danh sách dự án · workspace dự án · tiến độ (Gantt) · khối lượng · nhật ký thi công |
| 4 | `quality` | Chất lượng & An toàn | `verified` | `/chat-luong` | NCR · RFI · nghiệm thu · sự cố an toàn · checklist |
| 5 | `procurement` | Mua sắm & Nhà cung cấp | `local_shipping` | `/mua-sam` | yêu cầu mua · đơn mua hàng · nhà cung cấp · so sánh giá · hợp đồng mua |
| 6 | `inventory` | Kho & Vật tư | `inventory_2` | `/kho` | tồn kho · nhập kho · xuất kho · điều chuyển · kiểm kê · danh mục vật tư |
| 7 | `accounting` | Kế toán & Tài chính | `payments` | `/ke-toan` | hoá đơn · công nợ phải thu/trả · thu chi · ngân sách · sổ cái · báo cáo tài chính |
| 8 | `hr` | Nhân sự | `groups` | `/nhan-su` | hồ sơ nhân viên · tổ đội · chấm công · nghỉ phép · đào tạo · KPI |
| 9 | `assets` | Thiết bị & Tài sản | `precision_manufacturing` | `/thiet-bi` | thiết bị · tài sản · lịch bảo trì · nhật ký vận hành · IoT |
| 10 | `documents` | Tài liệu & Bản vẽ | `folder_open` | `/tai-lieu` | bản vẽ · hồ sơ · luồng phê duyệt · phiên bản |
| 11 | `analytics` | Phân tích & AI | `auto_awesome` | `/phan-tich` | báo cáo tự dựng · AI insight · đồ thị tri thức · kết quả OCR/AI |
| 12 | `admin` | Quản trị hệ thống | `settings` | `/quan-tri` | người dùng · vai trò & phân quyền · danh mục dùng chung · quy trình · nhật ký hệ thống · cấu hình |
| 13 | `mobile` | Ứng dụng hiện trường | `smartphone` | `/mobile` | trang chủ · đồng bộ offline · quét QR · camera AI · báo cáo hiện trường |

**Nhóm menu trên Sidebar** (thứ tự hiển thị, khai báo bằng `group` trong manifest):

```
Điều hành      → dashboard, projects
Kinh doanh     → crm, procurement
Vận hành       → quality, inventory, assets, documents
Tài chính      → accounting
Nguồn lực      → hr, personal
Phân tích      → analytics
Hệ thống       → admin, mobile
```

---

## 3. KPI của từng dashboard module

Thiết kế nội dung — mỗi dashboard mở đầu bằng **4 KPI card** (dải KPI), rồi tới biểu đồ.

| Module | 4 KPI đầu trang | Biểu đồ chính | Bảng Top-5 | Cảnh báo |
|---|---|---|---|---|
| `personal` | Việc hôm nay · Quá hạn · Đơn chờ duyệt · Công/tháng | Tiến độ việc 30 ngày (line) | Việc ưu tiên cao | Việc quá hạn, đơn bị từ chối |
| `crm` | Doanh số ký · Cơ hội mở · Tỷ lệ thắng · Công nợ khách | Phễu cơ hội (bar xếp chồng) | Khách hàng theo doanh số | Hợp đồng sắp hết hạn |
| `projects` | Dự án đang chạy · Tiến độ TB · Chậm tiến độ · Giá trị hợp đồng | Tiến độ kế hoạch vs thực tế (line) | Dự án chậm nhất | Mốc trễ hạn |
| `quality` | NCR mở · RFI chờ trả lời · Tỷ lệ đạt nghiệm thu · Sự cố an toàn | NCR theo tháng & mức độ (bar) | Hạng mục lỗi nhiều nhất | NCR quá hạn khắc phục |
| `procurement` | Yêu cầu chờ duyệt · Đơn mua đang mở · Giá trị mua kỳ này · Tỷ lệ giao đúng hạn | Chi mua theo nhóm vật tư (donut) | Nhà cung cấp theo giá trị | Đơn trễ giao |
| `inventory` | Giá trị tồn · SKU dưới định mức · Nhập/Xuất kỳ này · Vòng quay kho | Biến động tồn kho (line) | Vật tư xuất nhiều nhất | Dưới tồn tối thiểu, sắp hết hạn |
| `accounting` | Doanh thu · Chi phí · Lợi nhuận gộp · Dòng tiền thuần | Doanh thu – Chi phí 12 tháng (bar + line) | Công nợ quá hạn theo đối tác | Hoá đơn đến hạn, vượt ngân sách |
| `hr` | Tổng nhân sự · Có mặt hôm nay · Nghỉ phép · Biến động tháng | Cơ cấu nhân sự theo bộ phận (donut) | Tổ đội theo năng suất | Hợp đồng LĐ sắp hết hạn |
| `assets` | Thiết bị hoạt động · Đang bảo trì · Hỏng · Hiệu suất sử dụng | Giờ vận hành theo thiết bị (bar) | Thiết bị chi phí bảo trì cao | Quá hạn bảo trì, cảnh báo IoT |
| `documents` | Tài liệu mới · Chờ phê duyệt · Bản vẽ phiên bản mới · Quá hạn duyệt | Hồ sơ theo trạng thái (donut) | Tài liệu truy cập nhiều | Hồ sơ chờ duyệt quá hạn |
| `analytics` | Báo cáo đang chạy · Dự báo rủi ro · Độ chính xác mô hình · Tài liệu đã OCR | Dự báo chi phí (line + vùng tin cậy) | Insight nổi bật | Cảnh báo dự báo vượt ngưỡng |
| `admin` | Người dùng hoạt động · Phiên đăng nhập · Quy trình lỗi · Dung lượng | Truy cập theo ngày (line) | Người dùng hoạt động nhiều | Lỗi hệ thống, phân quyền bất thường |

---

## 4. Cây thư mục

```
src/
├─ main.tsx
│
├─ app/                            # Tầng khởi động — KHÔNG chứa nghiệp vụ
│  ├─ App.tsx                      # <Providers> + <AppRouter>
│  ├─ router.tsx                   # gom route từ tất cả manifest module
│  ├─ moduleRegistry.ts            # ⭐ danh sách module, nguồn duy nhất sinh menu + route
│  ├─ navigation.ts                # appNav = derive(moduleRegistry) — không viết tay nữa
│  └─ providers/                   # Theme, Auth, Query, I18n
│
├─ shared/                         # Dùng chung — không phụ thuộc module nào
│  ├─ ui/                          # Primitive: Button, Card, Badge, DataTable, Field, Modal…
│  ├─ charts/                      # LineChart, BarChart, DonutChart, GaugeChart, WordCloud
│  ├─ layout/                      # AppLayout, Sidebar, Topbar, PageHeader
│  ├─ mobile/                      # MobileShell, MobileHeader, MobileDrawer, MobileNavBar
│  ├─ widgets/                     # Khối dùng chung ≥2 module: ActivityFeed, AlertList,
│  │                               #   TaskList, DocumentList, MiniCalendar, AiCopilotPanel…
│  ├─ dashboard/                   # ⭐ Bộ khung dashboard dùng chung
│  │  ├─ ModuleDashboard.tsx       #   khung chuẩn: header + filter + slot KPI/chart/table/alert
│  │  ├─ KpiStrip.tsx              #   dải 4 KPI card
│  │  ├─ DashboardGrid.tsx         #   lưới 12 cột responsive
│  │  ├─ DashboardControls.tsx     #   kỳ báo cáo · so sánh · xuất · thêm widget
│  │  └─ types.ts                  #   KpiSpec, ChartSpec, AlertSpec, DashboardConfig
│  ├─ hooks/                       # useHashRoute, useMediaQuery, useFilters…
│  ├─ utils/                       # format tiền/ngày/số, name.ts
│  ├─ types/                       # NavItem, NavGroup, User, ModuleManifest…
│  ├─ theme/                       # ⭐ Light · Dark · System (xem DESIGN-TOKENS.md)
│  │  ├─ ThemeProvider.tsx         #   context + useTheme()
│  │  ├─ ThemeSwitch.tsx           #   công tắc trong User Menu + nút đảo nhanh
│  │  └─ theme.ts                  #   quy đổi lựa chọn → data-theme, lưu localStorage
│  └─ styles/                      # tokens.css (2 tầng: primitive → role), global.css
│
└─ modules/                        # ⭐ 14 module — mỗi thư mục một chức năng
   ├─ dashboard/
   ├─ personal/
   ├─ crm/
   ├─ projects/
   ├─ quality/
   ├─ procurement/
   ├─ inventory/
   ├─ accounting/
   ├─ hr/
   ├─ assets/
   ├─ documents/
   ├─ analytics/
   ├─ admin/
   └─ mobile/
```

### Cấu trúc bên trong MỘT module (đồng nhất cho cả 14)

Ví dụ `modules/inventory` (Kho & Vật tư):

```
modules/inventory/
├─ module.config.ts        # ⭐ Manifest: id, nhãn, icon, nhóm menu, route, quyền
├─ index.ts                # Barrel: export manifest (app/ chỉ import file này)
├─ pages/
│  ├─ InventoryDashboard.tsx    # ⭐ BẮT BUỘC — trang /kho
│  ├─ StockListPage.tsx         # /kho/ton-kho
│  ├─ GoodsReceiptPage.tsx      # /kho/nhap-kho
│  ├─ GoodsIssuePage.tsx        # /kho/xuat-kho
│  ├─ StocktakePage.tsx         # /kho/kiem-ke
│  └─ MaterialDetailPage.tsx    # /kho/vat-tu/:id
├─ components/             # Chỉ dùng trong module này
│  ├─ StockLevelBar.tsx
│  └─ WarehousePicker.tsx
├─ widgets/                # Khối riêng của dashboard module này
│  ├─ LowStockAlert.tsx
│  └─ StockMovementChart.tsx
├─ data/
│  ├─ inventory.mock.ts    # Dữ liệu mẫu — thay bằng service khi có API
│  └─ inventory.service.ts # Lớp gọi API (giai đoạn 2)
├─ types.ts                # Material, StockEntry, Warehouse…
└─ inventory.css           # Style riêng module (chỉ dùng token)
```

**Quy tắc trú ngụ** — quyết định file đặt ở đâu:

| Câu hỏi | Đặt ở |
|---|---|
| Dùng ở ≥2 module? | `shared/` |
| Chỉ 1 module, là khối dashboard? | `modules/<m>/widgets/` |
| Chỉ 1 module, là thành phần form/bảng? | `modules/<m>/components/` |
| Là một màn hình có route? | `modules/<m>/pages/` |

---

## 5. Manifest module — nguồn duy nhất sinh menu + route

Giữ đúng quy tắc "MỘT menu — MỘT header": không module nào tự dựng Sidebar.

```ts
// shared/types/module.ts
import type { ComponentType } from 'react'

export interface ModuleRoute {
  path: string                       // '/kho/ton-kho'
  component: ComponentType           // lazy() được
  label: string                      // hiện trên breadcrumb + menu con
  icon?: string
  hidden?: boolean                   // trang chi tiết :id — không lên menu
  permission?: string                // 'inventory.stock.view'
}

export interface ModuleManifest {
  id: string                         // 'inventory'
  label: string                      // 'Kho & Vật tư'
  icon: string                       // 'inventory_2'
  group: NavGroupId                  // 'van-hanh' → nhóm trên Sidebar
  order: number                      // thứ tự trong nhóm
  basePath: string                   // '/kho'
  dashboard: ComponentType           // ⭐ trang tại basePath
  routes: ModuleRoute[]              // các trang con
  permission?: string                // quyền vào module
}
```

```ts
// modules/inventory/module.config.ts
import { lazy } from 'react'
import type { ModuleManifest } from '../../shared/types/module'

export const inventoryModule: ModuleManifest = {
  id: 'inventory',
  label: 'Kho & Vật tư',
  icon: 'inventory_2',
  group: 'van-hanh',
  order: 2,
  basePath: '/kho',
  dashboard: lazy(() => import('./pages/InventoryDashboard')),
  permission: 'inventory.view',
  routes: [
    { path: '/kho/ton-kho',   label: 'Tồn kho',      icon: 'inventory',    component: lazy(() => import('./pages/StockListPage')) },
    { path: '/kho/nhap-kho',  label: 'Nhập kho',     icon: 'input',        component: lazy(() => import('./pages/GoodsReceiptPage')) },
    { path: '/kho/xuat-kho',  label: 'Xuất kho',     icon: 'output',       component: lazy(() => import('./pages/GoodsIssuePage')) },
    { path: '/kho/kiem-ke',   label: 'Kiểm kê',      icon: 'fact_check',   component: lazy(() => import('./pages/StocktakePage')) },
    { path: '/kho/vat-tu/:id', label: 'Chi tiết vật tư', hidden: true,     component: lazy(() => import('./pages/MaterialDetailPage')) },
  ],
}
```

```ts
// app/moduleRegistry.ts — nơi DUY NHẤT liệt kê module
import { dashboardModule } from '../modules/dashboard'
import { personalModule }  from '../modules/personal'
import { crmModule }       from '../modules/crm'
/* … 14 module … */

export const MODULES: ModuleManifest[] = [
  dashboardModule, projectsModule,          // Điều hành
  crmModule, procurementModule,             // Kinh doanh
  qualityModule, inventoryModule, assetsModule, documentsModule,  // Vận hành
  accountingModule,                         // Tài chính
  hrModule, personalModule,                 // Nguồn lực
  analyticsModule,                          // Phân tích
  adminModule, mobileModule,                // Hệ thống
]
```

```ts
// app/navigation.ts — appNav sinh tự động, KHÔNG viết tay
export const appNav: NavGroup[] = NAV_GROUPS.map((g) => ({
  id: g.id,
  label: g.label,
  items: MODULES
    .filter((m) => m.group === g.id)
    .sort((a, b) => a.order - b.order)
    .map((m) => ({
      id: m.id,
      label: m.label,
      icon: m.icon,
      path: m.basePath,
      hash: `#${m.basePath}`,
      children: m.routes
        .filter((r) => !r.hidden)
        .map((r) => ({ id: `${m.id}-${r.path}`, label: r.label, icon: r.icon ?? 'chevron_right', path: r.path, hash: `#${r.path}` })),
    })),
}))
```

**Thêm một module mới = 3 bước**: tạo thư mục theo khuôn → viết `module.config.ts` →
thêm 1 dòng vào `MODULES`. Menu và route tự có.

---

## 6. Blueprint trang Dashboard module

Cả 13 dashboard dùng chung bố cục này để hệ thống nhìn nhất quán.

```
┌──────────────────────────────────────────────────────────────────┐
│ PageHeader — Breadcrumb · Tên module · [Kỳ ▾] [So sánh ▾] [Xuất] │
├──────────────────────────────────────────────────────────────────┤
│ ① DẢI KPI            4 × StatCard (xu hướng + sparkline)         │
│    Desktop 4 cột · Laptop 2 cột · Mobile 1 cột                    │
├────────────────────────────────────┬─────────────────────────────┤
│ ② BIỂU ĐỒ CHÍNH  (8/12 cột)        │ ③ PHÂN BỔ (4/12)            │
│    xu hướng theo thời gian         │    Donut + chú thích         │
├────────────────────────────────────┼─────────────────────────────┤
│ ④ BẢNG TOP-5     (7/12 cột)        │ ⑤ CẢNH BÁO & VIỆC CẦN LÀM   │
│    DataTable rút gọn + "Xem tất cả"│    AlertList (5/12)          │
├────────────────────────────────────┴─────────────────────────────┤
│ ⑥ HOẠT ĐỘNG GẦN ĐÂY / TIMELINE  (12 cột)   — tuỳ module          │
└──────────────────────────────────────────────────────────────────┘
```

Quy ước thị giác:
- KPI: nền `--bg-surface`, radius 16, viền `--border`; số dùng JetBrains Mono; xu hướng ↑ `--success` / ↓ `--danger`.
- Chuỗi dữ liệu phân loại dùng `--chart-1…5` (Digital · Intelligence · ESG · Construction · Other); chỉ dùng semantic khi chuỗi thật sự mang nghĩa trạng thái.
- `--erp-red` (Crimson `#C8102E`) chỉ dành cho logo và CTA thương hiệu — không quá 4% diện tích, **không** dùng cho trạng thái hay màu biểu đồ.
- Mỗi khối đều có tiêu đề + link "Xem tất cả" trỏ về trang danh sách tương ứng.
- Trạng thái rỗng dùng `EmptyState`, trạng thái tải dùng skeleton — không để khối trắng trơn.

Cách viết một dashboard module:

```tsx
// modules/inventory/pages/InventoryDashboard.tsx
import { ModuleDashboard } from '../../../shared/dashboard'
import { inventoryDashboardData as d } from '../data/inventory.mock'

export default function InventoryDashboard() {
  return (
    <ModuleDashboard
      moduleId="inventory"
      title="Tổng quan Kho & Vật tư"
      subtitle="Tồn kho, luân chuyển và cảnh báo định mức"
      kpis={d.kpis}                 // ① 4 KPI
      mainChart={d.stockTrend}      // ② line
      breakdown={d.byCategory}      // ③ donut
      topTable={d.topMaterials}     // ④ Top-5 + link /kho/ton-kho
      alerts={d.lowStockAlerts}     // ⑤ cảnh báo
      activity={d.recentMovements}  // ⑥ tuỳ chọn
    />
  )
}
```

Dashboard nào cần khối đặc thù (bản đồ thiết bị IoT, đồ thị tri thức) thì truyền thêm
`extra={<DeviceMap … />}` — khung vẫn giữ nguyên.

---

## 7. Quy ước route

| Mẫu | Ý nghĩa | Ví dụ |
|---|---|---|
| `/<module>` | Dashboard module | `/kho`, `/crm`, `/ke-toan` |
| `/<module>/<đối-tượng>` | Danh sách | `/kho/ton-kho`, `/crm/co-hoi` |
| `/<module>/<đối-tượng>/:id` | Chi tiết | `/kho/vat-tu/VT-001` |
| `/<module>/<đối-tượng>/:id/<tab>` | Tab trong chi tiết | `/du-an/NT-2024-001/tien-do` |

Slug tiếng Việt không dấu, nối bằng `-` (giữ nguyên phong cách route hiện tại).

---

## 8. Kế hoạch di trú từ cấu trúc hiện tại

Làm theo 5 đợt, mỗi đợt build xanh mới sang đợt sau.

**Đợt 1 — Dựng `shared/` (đổi chỗ, không đổi code)**

| Hiện tại | Đích |
|---|---|
| `src/components/ui/*` | `src/shared/ui/*` |
| `src/components/ui/{Line,Bar,Donut,Gauge}Chart, WordCloud` | `src/shared/charts/*` |
| `src/components/layout/*` | `src/shared/layout/*` |
| `src/components/mobile/*` | `src/shared/mobile/*` |
| `src/components/widgets/*` (khối dùng chung) | `src/shared/widgets/*` |
| `src/components/brand/Logo` | `src/shared/ui/Logo` |
| `src/types/*`, `src/utils/*`, `src/styles/*` | `src/shared/{types,utils,styles}/*` |

**Đợt 2 — Dựng `app/` + manifest rỗng**
`App.tsx` → `app/App.tsx` + `app/router.tsx`; tạo `app/moduleRegistry.ts` với 2 module trước
(`dashboard`, `personal`) để chạy thử cơ chế sinh menu.

**Đợt 3 — Chuyển page hiện có vào module**

| Hiện tại | Đích |
|---|---|
| `pages/dashboards/*` (7 file) | `modules/dashboard/pages/*` |
| `pages/dashboards/DashboardShell.tsx` | `shared/dashboard/ModuleDashboard.tsx` (tổng quát hoá) |
| `pages/PersonalHome, TaskBoardPage, ProfilePage/` | `modules/personal/pages/*` |
| `pages/ProjectWorkspace, HomeEnterprise` | `modules/projects/pages/*` |
| `pages/partners/{CustomerDetail,CustomerPortal,Collaboration}` | `modules/crm/pages/*` |
| `pages/partners/{SupplierPortal,ContractDetail}` | `modules/procurement/pages/*` |
| `pages/mobile/*` | `modules/mobile/pages/*` |
| `data/mock.ts` | tách theo module → `modules/<m>/data/<m>.mock.ts` |

**Đợt 4 — Phân rã 15 Object Workspace về đúng module**
`WorkspacePage` + `WorkspaceShell` là tài sản tốt, giữ lại ở `shared/workspace/`.
Mỗi `WorkspaceConfig` chuyển về module sở hữu nó:

| Workspace | Module |
|---|---|
| Công việc, Cuộc họp | `projects` |
| Vấn đề, NCR, RFI | `quality` |
| Bản vẽ, Tài liệu | `documents` |
| Ngân sách, Chi phí, Hoá đơn | `accounting` |
| Đơn mua hàng | `procurement` |
| Vật tư | `inventory` |
| Tài sản, Thiết bị | `assets` |
| Kết quả AI | `analytics` |

**Đợt 5 — Bổ sung module mới**
`inventory`, `accounting`, `hr`, `admin`, `analytics` — mỗi module bắt đầu bằng
**dashboard + 1 trang danh sách**, rồi mở rộng dần.

Trong lúc di trú, tạo alias tạm ở vị trí cũ để tránh vỡ import hàng loạt:
```ts
// src/components/ui/index.ts  (xoá sau đợt 3)
export * from '../../shared/ui'
```

Thêm alias đường dẫn để import gọn (`vite.config.ts` + `tsconfig.app.json`):
```ts
resolve: { alias: { '@shared': '/src/shared', '@modules': '/src/modules', '@app': '/src/app' } }
```

---

## 9. Checklist thêm một module mới

- [ ] Tạo `modules/<id>/` theo khuôn ở mục 4
- [ ] `pages/<Ten>Dashboard.tsx` — đủ 4 KPI + 1 biểu đồ chính + 1 bảng Top-5 + 1 khối cảnh báo
- [ ] `data/<id>.mock.ts` — dữ liệu mẫu đúng kiểu, tiếng Việt, số liệu hợp lý
- [ ] `module.config.ts` — id, nhãn, icon Material Symbols, nhóm menu, `basePath`, routes
- [ ] `index.ts` export manifest
- [ ] Thêm 1 dòng vào `app/moduleRegistry.ts`
- [ ] Kiểm tra: menu hiện đúng nhóm · route `/…` mở đúng dashboard · responsive 1440/1024/768/390
- [ ] Không hard-code màu, không tự dựng Sidebar/Topbar
