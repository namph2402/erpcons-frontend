# ERPCons Frontend — Construction OS

Giao diện React + TypeScript + Vite dựng theo bộ ảnh trong `Erpcons/`:

- `Erpcons/Custorm/` → **quy chuẩn** (Design Guideline 2026, Theme 01 Foundation, Theme 02 Navigation, Theme 03 Workspace, Theme 05 Data Entry, Theme 06 Timeline) — được mã hoá thành design token + component.
- `Erpcons/view/` → **màn hình cần dựng** — mỗi ảnh tương ứng một page.

## Chạy dự án

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint
```

Nút tròn đỏ góc dưới phải là **ScreenSwitcher** để chuyển nhanh giữa 5 màn hình mẫu
(`src/dev/ScreenSwitcher.tsx` — xoá khi lên production).

> Thư mục ảnh nguồn hiện tại: `Erpcons/Custom/` (quy chuẩn) và `Erpcons/erpcons UI/` (39 ảnh giao diện).

## Kiến trúc thư mục

```
src/
├─ styles/
│  ├─ tokens.css          # Toàn bộ design token (màu, chữ, spacing, radius, shadow, motion)
│  └─ global.css          # Reset + typography + utility class
├─ types/index.ts         # Kiểu dữ liệu dùng chung (NavItem, User, Project, TaskItem...)
├─ utils/name.ts          # Tiện ích tên/avatar
├─ data/
│  ├─ navigation.ts       # Cấu hình menu cho từng ngữ cảnh
│  └─ mock.ts             # Dữ liệu mẫu (thay bằng API sau)
├─ components/
│  ├─ brand/Logo.tsx      # Logo bất biến (2 phiên bản: ngang · dọc · mark)
│  ├─ ui/                 # Primitive kế thừa được
│  ├─ layout/             # Khung ứng dụng kế thừa được
│  └─ widgets/            # Khối nghiệp vụ dùng lại giữa các màn hình
├─ pages/                 # 4 page tương ứng ảnh trong Erpcons/view
└─ dev/ScreenSwitcher.tsx # Chỉ dùng khi review giao diện
```

## Quy tắc bất biến: MỘT menu — MỘT header

Toàn bộ màn hình (desktop · dashboard · workspace · đối tác · mobile) dùng **đúng một**
bộ menu tiếng Việt và **đúng một** header:

- Menu: [`appNav`](src/data/navigation.ts) — 5 nhóm (Điều hành · Thi công & Chất lượng ·
  Tài chính & Mua sắm · Nguồn lực · Phân tích & Hệ thống). Không màn hình nào được
  định nghĩa menu riêng; `mainNav` / `enterpriseNav` / `personalNav` và các menu dashboard
  chỉ còn là **bí danh trỏ về `appNav`** để import cũ không vỡ.
- Header: [`Topbar`](src/components/layout/Topbar.tsx) — global search, ngôn ngữ, chuông,
  tin nhắn, trợ giúp, user menu.
- Phần điều khiển riêng của từng trang (khoảng thời gian, kỳ so sánh, "Thêm widget",
  "Tạo mới"…) nằm trong `actions` của [`PageHeader`](src/components/layout/PageHeader.tsx),
  **không** tạo thanh header thứ hai.

Kiểm tra nhanh: `grep -rn "navGroups={" src/pages/ | grep -v appNav` phải không trả về kết quả.

## Tầng kế thừa

### 1. Layout (`components/layout`)

| Component | Vai trò |
|---|---|
| `AppLayout` | Khung tổng: Sidebar + Topbar + Content + Drawer phải. **Page không tự dựng lại menu/header.** |
| `Sidebar` | 02.4 Navigation — nhận `groups`, `activeId`, `user`, `footerItems`, `extra`; hỗ trợ thu gọn, menu con, badge đếm |
| `Topbar` | 02.2 Layout Overview — search toàn cục, ngôn ngữ, chuông thông báo, tin nhắn, trợ giúp, user menu |
| `PageHeader` | 03.2 Workspace Header — breadcrumb, thumbnail, tiêu đề, mã, badge trạng thái, actions, tabs |

Đổi màn hình chỉ cần đổi **dữ liệu menu**, không sửa component:

```tsx
<AppLayout navGroups={mainNav} activeId="projects" user={currentUser}>
  {/* nội dung trang */}
</AppLayout>
```

Ba bộ menu có sẵn trong `data/navigation.ts`: `enterpriseNav`, `mainNav`, `personalNav`.

### 2. UI primitives (`components/ui`)

`Icon` (Material Symbols Rounded) · `Button` (primary/brand/secondary/ghost/danger × sm/md/lg) ·
`Card` · `Badge` + `STATUS_TONE` · `StatCard` · `ProgressBar` · `Avatar` / `AvatarGroup` ·
`Tabs` (underline/pill) · `DataTable` (generic theo `Column<T>`) · `SearchInput` · `Select` ·
`Checkbox` · `DonutChart` · `LineChart` · `EmptyState` · `Modal` (dialog chuẩn, Esc để đóng) ·
`Field` + `TextInput` / `TextArea` (05.3 Data Entry Form) · `Rating` (thang sao ưu tiên).

Tất cả import gọn qua barrel:

```tsx
import { Card, StatCard, Badge, DataTable } from '../components/ui'
```

### 3. Widgets nghiệp vụ (`components/widgets`)

`WelcomeBanner` · `TaskList` · `ActivityFeed` · `NotificationDrawer` · `ScheduleTimeline` ·
`MiniCalendar` · `AiCopilotPanel` · `QuickAccess` · `InsightStrip` · `GanttChart` ·
`DocumentList` · `AlertList` · `ProfileCard` · `TaskBoard` (Kanban, kéo thả) ·
`TaskFormModal` · `TaskDetailModal` · `RichTextEditor`.

Màn hình **Tác vụ cá nhân** chỉ dựng phần nội dung: menu (`personalNav`) và header (`Topbar`)
kế thừa nguyên `AppLayout`. Trạng thái cột ánh xạ theo 03.8 Status System —
Danh sách (Slate) · Cần thực hiện (Warning) · Đang thực hiện (Info) · Hoàn thành (Success);
hai chế độ xem Bảng / Danh sách theo 03.10 View Modes.

Ví dụ `TaskList` được dùng lại ở cả 4 màn hình qua prop `variant`:
`default` (dashboard) · `schedule` (công việc hôm nay) · `detailed` (có nhãn ưu tiên).

### 4. Pages (`src/pages`)

**Nhóm vận hành**

| Route | Page | Ảnh nguồn |
|---|---|---|
| `#/` | `HomeEnterprise` | Trang chủ Enterprise (banner chào + tổng quan công ty) |
| `#/dashboard` | `Dashboard` | Trang chủ điều hành |
| `#/dashboard/thong-bao` | `Dashboard` (drawer mở) | Dashboard + Notification Center |
| `#/du-an/:code` | `ProjectWorkspace` | Workspace chi tiết dự án + Gantt |
| `#/ca-nhan` | `PersonalHome` | Trang chủ cá nhân (Employee Self-Service) |
| `#/ca-nhan/cong-viec` · `#/tac-vu` | `TaskBoardPage` | Tác vụ cá nhân — bảng Kanban + popup thêm/sửa + popup chi tiết |

**Nhóm Dashboard 54–60** (`src/pages/dashboards`)

| Route | Page | Ảnh nguồn |
|---|---|---|
| `#/dashboard/executive` | `ExecutiveDashboard` | 54 · Tổng quan toàn doanh nghiệp |
| `#/dashboard/project` | `ProjectDashboard` | 55 · Tổng quan dự án theo thời gian thực |
| `#/dashboard/finance` | `FinanceDashboard` | 56 · Tổng quan tài chính |
| `#/dashboard/construction` | `ConstructionDashboard` | 57 · Tổng quan dự án xây dựng |
| `#/dashboard/ai-insight` | `AiInsightDashboard` | 58 · Tổng quan thông minh & dự báo |
| `#/dashboard/iot` | `IotDashboard` | 59 · Hệ thống thiết bị & cảm biến |
| `#/dashboard/knowledge-graph` | `KnowledgeGraphDashboard` | 60 · Trực quan hoá quan hệ dữ liệu |

Cả 7 dashboard dùng chung [`DashboardShell`](src/pages/dashboards/DashboardShell.tsx) — kế thừa
nguyên vẹn `AppLayout` + `Sidebar` của nhóm vận hành, chỉ thay Topbar nghiệp vụ (global search)
bằng [`DashboardHeader`](src/components/widgets/DashboardHeader.tsx) (tiêu đề đánh số + bộ lọc
thời gian + kỳ so sánh + "Thêm widget"). Menu riêng của từng dashboard nằm trong
[`data/dashboardNav.ts`](src/data/dashboardNav.ts), dữ liệu trong
[`data/dashboards.ts`](src/data/dashboards.ts).

```tsx
<DashboardShell
  navGroups={financeNav} activeId="finance" user={cfoUser}
  index="56." title="Finance Dashboard" subtitle="Tổng quan tài chính doanh nghiệp"
  dateRange="01/05/2024 - 31/05/2024" updatedAt="31/05/2024 10:30:45"
>
  {/* chỉ còn phần widget của riêng dashboard */}
</DashboardShell>
```

**Nhóm Object Workspace** (`src/pages/workspaces`) — 15 màn hình từ `Erpcons/page`

Cả 15 workspace (Công việc, Vấn đề, NCR, RFI, Bản vẽ, Cuộc họp, Tài liệu, Ngân sách,
Chi phí, Hóa đơn, Đơn mua hàng, Tài sản, Thiết bị, Vật tư, Kết quả AI) dùng **chung một
component** [`WorkspacePage`](src/pages/workspaces/WorkspacePage.tsx) +
[`WorkspaceShell`](src/pages/workspaces/WorkspaceShell.tsx); mỗi màn hình chỉ là một
`WorkspaceConfig` trong [`data/workspaces.ts`](src/data/workspaces.ts) gồm KPI, bộ lọc,
tab, cột bảng, dữ liệu, widget phân tích, panel chi tiết và thao tác nhanh. Thêm workspace
mới = thêm một object, route tự sinh trong `App.tsx`.

**Nhóm Đối tác & Cộng tác** (`src/pages/partners`)

| Route | Page | Ảnh nguồn |
|---|---|---|
| `#/lam-viec/hop-dong` | `ContractDetail` | Hợp đồng.jpg |
| `#/doi-tac/nha-cung-cap` | `SupplierPortal` | nhà cung cấp.jpg |
| `#/doi-tac/khach-hang` | `CustomerDetail` | khách hàng.jpg |
| `#/doi-tac/cong-khach-hang` | `CustomerPortal` | dashboard-khách hàng.jpg |
| `#/cong-tac` | `Collaboration` | level5.jpg |

**Nhóm Mobile 61–65** (`src/pages/mobile`)

| Route | Page | Ảnh nguồn |
|---|---|---|
| `#/mobile` | `MobileHome` | 61 · Trang chủ mobile |
| `#/mobile/dong-bo` | `OfflineSync` | 62 · Đồng bộ dữ liệu offline/online |
| `#/mobile/qr` | `QrScanner` | 63 · Quét QR code |
| `#/mobile/camera-ai` | `CameraAi` | 64 · Nhận diện AI từ camera |
| `#/mobile/bao-cao` | `FieldReport` | 65 · Báo cáo hiện trường |

Cấu trúc mobile gồm **3 tầng điều hướng**, đặt tại `src/components/mobile`:

| Component | Vai trò |
|---|---|
| `MobileShell` | Khung app mobile: header + nội dung + nav đáy + drawer. Trên desktop tự bọc trong khung điện thoại 390×844 để review |
| `MobileHeader` | `variant="home"` (hamburger + logo + tìm kiếm + chuông) · `variant="page"` (quay lại + tiêu đề + hành động) |
| `MobileDrawer` | "Menu thu gọn" trượt từ trái — **dùng lại đúng `NavGroup`/`NavItem` của Sidebar desktop** |
| `MobileNavBar` | Thanh điều hướng đáy 4 mục + FAB nổi ở giữa, có badge số đếm |

`AppLayout` cũng nhận `MobileNavBar` nên **mọi màn hình desktop đều có thanh đáy khi thu nhỏ
dưới 768px**; tắt bằng `hideMobileNav`, đổi mục bằng `mobileNavItems` / `mobileNavActiveId` / `mobileFab`.

Component bổ sung phục vụ nhóm dashboard: `BarChart` (cột nhóm/xếp chồng, hỗ trợ giá trị âm + đường phủ),
`GaugeChart` (cung 180° và vòng tròn), `WordCloud`, `CountRowList`, `KnowledgeGraphView`, `DeviceMap`;
`StatCard` được mở rộng thêm `layout="stacked"` + `sparkline` + `ring` để dùng làm KPI card chuẩn
của dashboard mà không phá biến thể `inline` đang dùng ở các màn hình trước.

## Design token (bắt buộc dùng, không hard-code màu)

Tầng màu theo **COLOR GUIDELINE 2026–2036 · "Graphite & Crimson"**, có đủ **Light
và Dark mode**. Chi tiết đầy đủ: [docs/DESIGN-TOKENS.md](docs/DESIGN-TOKENS.md).

| Nhóm | Token |
|---|---|
| Brand | `--erp-red #C8102E` (Crimson Identity) — logo & CTA chính, giới hạn ~4% diện tích. Làm chữ thì dùng `--brand-text` |
| Semantic | `--success #168A5A` `--warning #B7791F` `--danger #C4320A` `--info #2E5AAC` `--disabled #667085` — chỉ cho **trạng thái**, không cho nhận diện |
| Accent | `--digital #2E5AAC` (dữ liệu · CDE · BIM) · `--intelligence #147D78` (AI · IoT) · `--esg #2F7D55` (bền vững) · `--construction #A86F3D` (vật tư · thi công) |
| Neutral | Carbon `#081220` · Graphite `#242A32` · Steel `#475467` · Concrete `#D9DEE5` · Mist `#F5F7F9` · White |
| Bề mặt / chữ | Dùng **role token** (`--bg-app` `--bg-surface` `--bg-elevated` `--text-primary` `--border`…) — chúng tự đổi giá trị theo theme |
| Biểu đồ | `--chart-1 … --chart-5` (Digital · Intelligence · ESG · Construction · Other) |
| Typography | Inter (Display 48/40/36 · Heading 32/28/24/20 · Title 18/16 · Body 16/15/14 · Caption 13/12), số dùng JetBrains Mono cho mã |
| Radius | Card 16 · Input/Button 12 · Chip 999 |
| Spacing | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 |
| Breakpoint | Desktop ≥1440 · Laptop 1024–1439 · Tablet 768–1023 · Mobile ≤767 |

Tỷ lệ dùng màu (mục 04): **72% Neutral/Surface · 24% Structure/Secondary · 4% Brand/Accent**,
Semantic chỉ khi cần. Tiếp cận (mục 07): WCAG 2.2 AA — chữ thường ≥ 4.5:1, chữ lớn ≥ 3:1, UI ≥ 3:1.

## Light & Dark mode

Công tắc **Sáng / Tối / Theo hệ thống** nằm trong User Menu trên Topbar (đúng 02.9),
kèm nút đảo nhanh cạnh chuông thông báo. Lựa chọn lưu ở `localStorage` và đồng bộ giữa các tab.

```tsx
import { useTheme } from './theme'

const { choice, resolved, setTheme, toggleTheme } = useTheme()
// choice   : 'light' | 'dark' | 'system'  — lựa chọn của người dùng
// resolved : 'light' | 'dark'             — giá trị đang hiển thị thật sự
```

Quy tắc khi viết component mới: **chỉ dùng role token**, không dùng primitive
(`--carbon`, `--mist`, `--crimson-500`…) và không hard-code màu — làm vậy thì màn hình
tự chạy đúng ở cả hai theme mà không phải viết thêm CSS nào cho dark.

## Bước tiếp theo khi tích hợp backend

1. Thay `data/mock.ts` bằng lớp service gọi API, giữ nguyên kiểu trong `types/index.ts`.
2. Thay hash router trong `App.tsx` bằng `react-router-dom` — `AppLayout` không cần sửa.
3. Bổ sung các page còn lại (Công việc, Tài chính, Hợp đồng...) bằng cách tái dùng
   `AppLayout` + `PageHeader` + widget có sẵn.
