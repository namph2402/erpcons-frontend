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
`Checkbox` · `DonutChart` · `LineChart` · `EmptyState`.

Tất cả import gọn qua barrel:

```tsx
import { Card, StatCard, Badge, DataTable } from '../components/ui'
```

### 3. Widgets nghiệp vụ (`components/widgets`)

`WelcomeBanner` · `TaskList` · `ActivityFeed` · `NotificationDrawer` · `ScheduleTimeline` ·
`MiniCalendar` · `AiCopilotPanel` · `QuickAccess` · `InsightStrip` · `GanttChart` ·
`DocumentList` · `AlertList` · `ProfileCard`.

Ví dụ `TaskList` được dùng lại ở cả 4 màn hình qua prop `variant`:
`default` (dashboard) · `schedule` (công việc hôm nay) · `detailed` (có nhãn ưu tiên).

### 4. Pages (`src/pages`)

| Route | Page | Ảnh nguồn |
|---|---|---|
| `#/` | `HomeEnterprise` | Trang chủ Enterprise (banner chào + tổng quan công ty) |
| `#/dashboard` | `Dashboard` | Trang chủ điều hành |
| `#/dashboard/thong-bao` | `Dashboard` (drawer mở) | Dashboard + Notification Center |
| `#/du-an/:code` | `ProjectWorkspace` | Workspace chi tiết dự án + Gantt |
| `#/ca-nhan` | `PersonalHome` | Trang chủ cá nhân (Employee Self-Service) |

## Design token (bắt buộc dùng, không hard-code màu)

| Nhóm | Token |
|---|---|
| Brand | `--erp-red #D62839` — chỉ cho logo & CTA thương hiệu |
| Semantic | `--success #12B76A` `--warning #F59E0B` `--danger #DC2626` `--info #2563EB` `--disabled #64748B` |
| Technology | `--ai #6366F1` `--ocr #0EA5A4` `--iot #06B6D4` `--automation #7C3AED` `--analytics #2563EB` |
| Neutral | `--slate-50 … --slate-900` |
| Typography | Inter (Display 48/40/36 · Heading 32/28/24/20 · Title 18/16 · Body 16/15/14 · Caption 13/12), số dùng JetBrains Mono cho mã |
| Radius | Card 16 · Input/Button 12 · Chip 999 |
| Spacing | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 |
| Breakpoint | Desktop ≥1440 · Laptop 1024–1439 · Tablet 768–1023 · Mobile ≤767 |

## Bước tiếp theo khi tích hợp backend

1. Thay `data/mock.ts` bằng lớp service gọi API, giữ nguyên kiểu trong `types/index.ts`.
2. Thay hash router trong `App.tsx` bằng `react-router-dom` — `AppLayout` không cần sửa.
3. Bổ sung các page còn lại (Công việc, Tài chính, Hợp đồng...) bằng cách tái dùng
   `AppLayout` + `PageHeader` + widget có sẵn.
