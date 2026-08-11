import type { NavGroup, NavItem } from "../types";
import { WORKSPACE_LIST } from "../data/workspaces";

export const appNav: NavGroup[] = [
  {
    id: "dieu-hanh",
    label: "Điều hành",
    items: [
      {
        id: "home",
        label: "Trang chủ",
        icon: "home",
        path: "/",
        href: "#/",
        hash: "#/",
      },
      {
        id: "dashboard",
        label: "Bảng điều hành",
        icon: "space_dashboard",
        path: "/dashboard",
        href: "#/dashboard",
        hash: "#/dashboard",
        children: [
          {
            id: "db-notification",
            label: "Thông báo hệ thống",
            icon: "notifications",
            path: "/dashboard/thong-bao",
            hash: "#/dashboard/thong-bao",
          },
          {
            id: "db-executive",
            label: "Điều hành tổng thể",
            icon: "insights",
            path: "/dashboard/executive",
            hash: "#/dashboard/executive",
          },
          {
            id: "db-project",
            label: "Tổng quan dự án",
            icon: "dashboard",
            path: "/dashboard/project",
            hash: "#/dashboard/project",
          },
          {
            id: "db-finance",
            label: "Tổng quan tài chính",
            icon: "payments",
            path: "/dashboard/finance",
            hash: "#/dashboard/finance",
          },
          {
            id: "db-construction",
            label: "Tổng quan thi công",
            icon: "engineering",
            path: "/dashboard/construction",
            hash: "#/dashboard/construction",
          },
          {
            id: "db-ai",
            label: "Phân tích AI",
            icon: "auto_awesome",
            path: "/dashboard/ai-insight",
            hash: "#/dashboard/ai-insight",
          },
          {
            id: "db-iot",
            label: "Thiết bị IoT",
            icon: "sensors",
            path: "/dashboard/iot",
            hash: "#/dashboard/iot",
          },
          {
            id: "db-knowledge",
            label: "Đồ thị tri thức",
            icon: "hub",
            path: "/dashboard/knowledge-graph",
            hash: "#/dashboard/knowledge-graph",
          },
        ],
      },
      {
        id: "projects",
        label: "Workspace dự án",
        icon: "domain",
        path: "/du-an/NT-2024-001",
        href: "#/du-an/NT-2024-001",
        hash: "#/du-an/NT-2024-001",
      },
      {
        id: "collaboration",
        label: "Cộng tác",
        icon: "forum",
        path: "/cong-tac",
        href: "#/cong-tac",
        hash: "#/cong-tac",
      },
    ],
  },
  {
    id: "doi-tac-va-hop-dong",
    label: "Đối tác & Hợp đồng",
    items: [
      {
        id: "contracts",
        label: "Hợp đồng",
        icon: "contract",
        path: "/lam-viec/hop-dong",
        href: "#/lam-viec/hop-dong",
        hash: "#/lam-viec/hop-dong",
      },
      {
        id: "suppliers",
        label: "Cổng nhà cung cấp",
        icon: "local_shipping",
        path: "/doi-tac/nha-cung-cap",
        href: "#/doi-tac/nha-cung-cap",
        hash: "#/doi-tac/nha-cung-cap",
      },
      {
        id: "customers",
        label: "Khách hàng 360°",
        icon: "handshake",
        path: "/doi-tac/khach-hang",
        href: "#/doi-tac/khach-hang",
        hash: "#/doi-tac/khach-hang",
      },
    ],
  },
  {
    id: "nghiep-vu",
    label: "Danh mục nghiệp vụ",
    items: WORKSPACE_LIST.map((w) => ({
      id: w.id,
      label: w.title,
      icon: "table_view",
      path: w.route,
      href: `#${w.route}`,
      hash: `#${w.route}`,
    })),
  },
  {
    id: "thong-minh",
    label: "Hệ thống & Mobile",
    items: [
      {
        id: "mobile",
        label: "Ứng dụng mobile",
        icon: "smartphone",
        path: "/mobile",
        href: "#/mobile",
        hash: "#/mobile",
        children: [
          {
            id: "mb-sync",
            label: "Đồng bộ offline",
            icon: "cloud_sync",
            path: "/mobile/dong-bo",
            hash: "#/mobile/dong-bo",
          },
          {
            id: "mb-qr",
            label: "Quét QR Code",
            icon: "qr_code_scanner",
            path: "/mobile/qr",
            hash: "#/mobile/qr",
          },
        ],
      },
      {
        id: "personal",
        label: "Trang cá nhân",
        icon: "account_circle",
        path: "/ca-nhan",
        href: "#/ca-nhan",
        hash: "#/ca-nhan",
      },
    ],
  },
];

export const appFooterNav: NavItem[] = [
  {
    id: "help",
    label: "Trợ giúp",
    icon: "help",
    path: "/tro-giup",
    href: "#/tro-giup",
    hash: "#/tro-giup",
  },
  {
    id: "logout",
    label: "Đăng xuất",
    icon: "logout",
    path: "/dang-xuat",
    href: "#/dang-xuat",
    hash: "#/dang-xuat",
  },
];

export const projectTabs = [
  { id: "overview", label: "Tổng quan" },
  { id: "plan", label: "Kế hoạch" },
];

// Export đầy đủ các alias để không bị lỗi PersonalHome.tsx
export const mainNav = appNav;
export const enterpriseNav = appNav;
export const personalNav = appNav;
export const personalFooterNav = appFooterNav;
