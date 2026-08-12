import type { NavGroup, NavItem } from "../types";
import { WORKSPACE_LIST } from "../data/workspaces";
import { Children } from "react";

export const appNav: NavGroup[] = [
  {
    id: "trang-chu-group",
    label: "Trang chủ",
    items: [
      {
        id: "home",
        label: "Trang chủ",
        icon: "home",
        path: "/",
        href: "#/",
        hash: "#/",
      },
    ],
  },
  {
    id: "ca-nhan",
    label: "Cá nhân",
    icon: "account_circle",
    items: [
      {
        id: "personal1",
        label: "Cá nhân",
        icon: "account_circle",
        path: "/1/ca-nhan",
        href: "#/1/ca-nhan",
        hash: "#/1/ca-nhan",
        children: [
          {
            id: "personal",
            label: "Trang cá nhân",
            icon: "account_circle",
            path: "/ca-nhan",
            href: "#/ca-nhan",
            hash: "#/ca-nhan",
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
    ],
  },
  {
    id: "du-an",
    label: "Dự án",
    items: [
      {
        id: "projectss",
        label: "Dự án",
        icon: "domain",
        path: "/ddu-an/NT-2024-001",
        href: "#/ddu-an/NT-2024-001",
        hash: "#/ddu-an/NT-2024-001",
        children: [
          {
            id: "projects",
            label: "Workspace dự án",
            icon: "domain",
            path: "/du-an/NT-2024-001",
            href: "#/du-an/NT-2024-001",
            hash: "#/du-an/NT-2024-001",
          },
          {
            id: "dashboard-project",
            label: "Tổng quan dự án",
            icon: "dashboard",
            path: "/dashboard/project",
            href: "#/dashboard/project",
            hash: "#/dashboard/project",
          },
          {
            id: "dashboard-construction",
            label: "Tổng quan thi công",
            icon: "engineering",
            href: "#/dashboard/construction",
            hash: "#/dashboard/construction",
          },
        ],
      },
    ],
  },

  {
    id: "crm",
    label: "CRM",
    items: [
      {
        id: "crm",
        label: "CRM",
        icon: "handshake",
        path: "",
        href: "",
        hash: "",
        children: [
          {
            id: "customers",
            label: "Khách hàng 360°",
            icon: "handshake",
            path: "/doi-tac/khach-hang",
            href: "#/doi-tac/khach-hang",
            hash: "#/doi-tac/khach-hang",
          },
          {
            id: "customer-portal",
            label: "Cổng khách hàng",
            icon: "account_circle",
            path: "/doi-tac/cong-khach-hang",
            href: "#/doi-tac/cong-khach-hang",
            hash: "#/doi-tac/cong-khach-hang",
          },
        ],
      },
    ],
  },
  {
    id: "nghiep-vu-khac",
    label: "Hành chính ",
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
    id: "nghiep-vu-khac",
    label: " Nhân sự",
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
    id: "ke-toan",
    label: "Kế toán",
    items: [
      {
        id: "ke_ toann",
        label: "Kế toán",
        icon: "payments",
        path: "",
        href: "",
        hash: "",
        children: [
          {
            id: "dashboard-finance",
            label: "Tổng quan tài chính",
            icon: "payments",
            path: "/dashboard/finance",
            href: "#/dashboard/finance",
            hash: "#/dashboard/finance",
          },
          {
            id: "contracts",
            label: "Hợp đồng",
            icon: "contract",
            path: "/lam-viec/hop-dong",
            href: "#/lam-viec/hop-dong",
            hash: "#/lam-viec/hop-dong",
          },
        ],
      },
    ],
  },
  {
    id: "cung-ung",
    label: "Cung ứng",
    items: [
      {
        id: "suppliers",
        label: "Cung ứng",
        icon: "local_shipping",
        path: "/doi-tac/nha-cung-cap",
        href: "#/doi-tac/nha-cung-cap",
        hash: "#/doi-tac/nha-cung-cap",
      },
    ],
  },
  {
    id: "tai-san",
    label: "Tài sản",
    items: [
      {
        id: "",
        label: "Tài sản",
        icon: "sensors",
        path: "",
        href: "",
        hash: "",
        children: [
          {
            id: "dashboard-iot",
            label: "Thiết bị IoT",
            icon: "sensors",
            path: "/dashboard/iot",
            href: "#/dashboard/iot",
            hash: "#/dashboard/iot",
          },
        ],
      },
    ],
  },
  {
    id: "tai-lieu-cde",
    label: "Tài liệu (CDE)",
    items: [
      {
        id: "dashboard-knowledge",
        label: "Tài liệu (CDE)",
        icon: "hub",
        path: "",
        href: "",
        hash: "",
        children: [
          {
            id: "dashboard-knowledge",
            label: "Đồ thị tri thức",
            icon: "hub",
            path: "/dashboard/knowledge-graph",
            href: "#/dashboard/knowledge-graph",
            hash: "#/dashboard/knowledge-graph",
          },
          {
            id: "mb-bao-cao",
            label: "Báo cáo hệ thống",
            icon: "description",
            path: "/mobile/bao-cao",
            hash: "#/mobile/bao-cao",
          },
        ],
      },
    ],
  },
  {
    id: "quan-ly",
    label: "Quản lí",
    items: [
      {
        id: "quanly",
        label: "Quản lý",
        icon: "",
        path: "",
        href: "",
        hash: "",
        children: [
          {
            id: "dashboard",
            label: "Bảng điều hành",
            icon: "space_dashboard",
            path: "/dashboard",
            href: "#/dashboard",
            hash: "#/dashboard",
          },
          {
            id: "dashboard-executive",
            label: "Điều hành tổng thể",
            icon: "insights",
            path: "/dashboard/executive",
            href: "#/dashboard/executive",
            hash: "#/dashboard/executive",
          },
          {
            id: "dashboard-ai",
            label: "Phân tích AI",
            icon: "auto_awesome",
            path: "/dashboard/ai-insight",
            href: "#/dashboard/ai-insight",
            hash: "#/dashboard/ai-insight",
          },
          {
            id: "mobile",
            label: "Hệ thống Mobile",
            icon: "smartphone",
            path: "/mobile",
            href: "#/mobile",
            hash: "#/mobile",
            children: [
              {
                id: "mb-home",
                label: "Trang chủ mobile",
                icon: "smartphone",
                path: "/mobile/trang-chu",
                href: "#/mobile/trang-chu",
                hash: "#/mobile/trang-chu",
              },
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
        ],
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

export const mainNav = appNav;
export const enterpriseNav = appNav;
export const personalNav = appNav;
export const personalFooterNav = appFooterNav;
