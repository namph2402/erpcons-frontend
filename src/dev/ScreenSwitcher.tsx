import { useState } from "react";
import Icon from "../components/ui/Icon";
import { WORKSPACE_LIST } from "../data/workspaces";
import "./ScreenSwitcher.css";

interface Screen {
  path: string;
  label: string;
  icon: string;
  hash: string;
}

interface ScreenGroup {
  title: string;
  screens: Screen[];
}

const GROUPS: ScreenGroup[] = [
  {
    title: "Điều hành",
    screens: [
      { path: "/", label: "Trang chủ", icon: "home", hash: "#/" },
      {
        path: "/dashboard/thong-bao",
        label: "Bảng điều hành + Thông báo",
        icon: "notifications",
        hash: "#/dashboard/thong-bao",
      },
      {
        path: "/dashboard",
        label: "Bảng điều hành",
        icon: "space_dashboard",
        hash: "#/dashboard",
      },
      {
        path: "/du-an",
        label: "Workspace dự án",
        icon: "domain",
        hash: "#/du-an/NT-2024-001",
      },
      {
        path: "/ca-nhan",
        label: "Trang cá nhân",
        icon: "account_circle",
        hash: "#/ca-nhan",
      },
      {
        path: "/lam-viec/cong-viec",
        label: "Công việc (Kanban)",
        icon: "view_kanban",
        hash: "#/lam-viec/cong-viec",
      },
    ],
  },
  {
    title: "Dashboard chuyên sâu",
    screens: [
      {
        path: "/dashboard/executive",
        label: "Điều hành tổng thể",
        icon: "insights",
        hash: "#/dashboard/executive",
      },
      {
        path: "/dashboard/project",
        label: "Tổng quan dự án",
        icon: "dashboard",
        hash: "#/dashboard/project",
      },
      {
        path: "/dashboard/finance",
        label: "Tổng quan tài chính",
        icon: "payments",
        hash: "#/dashboard/finance",
      },
      {
        path: "/dashboard/construction",
        label: "Tổng quan thi công",
        icon: "engineering",
        hash: "#/dashboard/construction",
      },
      {
        path: "/dashboard/ai-insight",
        label: "Phân tích AI",
        icon: "auto_awesome",
        hash: "#/dashboard/ai-insight",
      },
      {
        path: "/dashboard/iot",
        label: "Thiết bị IoT",
        icon: "sensors",
        hash: "#/dashboard/iot",
      },
      {
        path: "/dashboard/knowledge-graph",
        label: "Đồ thị tri thức",
        icon: "hub",
        hash: "#/dashboard/knowledge-graph",
      },
    ],
  },
  {
    title: "Đối tác & Cộng tác",
    screens: [
      {
        path: "/lam-viec/hop-dong",
        label: "Hợp đồng",
        icon: "contract",
        hash: "#/lam-viec/hop-dong",
      },
      {
        path: "/doi-tac/nha-cung-cap",
        label: "Cổng nhà cung cấp",
        icon: "local_shipping",
        hash: "#/doi-tac/nha-cung-cap",
      },
      {
        path: "/doi-tac/khach-hang",
        label: "Khách hàng 360°",
        icon: "handshake",
        hash: "#/doi-tac/khach-hang",
      },
      {
        path: "/doi-tac/cong-khach-hang",
        label: "Cổng khách hàng",
        icon: "storefront",
        hash: "#/doi-tac/cong-khach-hang",
      },
      {
        path: "/cong-tac",
        label: "Cộng tác",
        icon: "forum",
        hash: "#/cong-tac",
      },
    ],
  },
  {
    title: "Object Workspace",
    screens: WORKSPACE_LIST.map((w) => ({
      path: w.route,
      label: w.title,
      icon: "table_view",
      hash: `#${w.route}`,
    })),
  },
  {
    title: "Mobile",
    screens: [
      {
        path: "/mobile",
        label: "Trang chủ mobile",
        icon: "smartphone",
        hash: "#/mobile",
      },
      {
        path: "/mobile/dong-bo",
        label: "Đồng bộ offline",
        icon: "cloud_sync",
        hash: "#/mobile/dong-bo",
      },
      {
        path: "/mobile/qr",
        label: "Quét QR",
        icon: "qr_code_scanner",
        hash: "#/mobile/qr",
      },
      {
        path: "/mobile/camera-ai",
        label: "Camera AI",
        icon: "videocam",
        hash: "#/mobile/camera-ai",
      },
      {
        path: "/mobile/bao-cao",
        label: "Báo cáo hiện trường",
        icon: "edit_note",
        hash: "#/mobile/bao-cao",
      },
    ],
  },
];

/**
 * Bảng chuyển màn hình — chỉ phục vụ giai đoạn review giao diện.
 * Xoá component này (và lời gọi trong App.tsx) khi lên production.
 */
export default function ScreenSwitcher({ current }: { current: string }) {
  const [open, setOpen] = useState(false);

  /** Route là tiền tố của route khác → chỉ active khi khớp tuyệt đối */
  const EXACT = ["/", "/dashboard", "/mobile"];

  const isActive = (path: string) => {
    if (path === "/") return current === "/" || current === "";
    if (EXACT.includes(path)) return current === path;
    return current.startsWith(path);
  };

  return (
    <div className={`screen-switcher${open ? " is-open" : ""}`}>
      {open && (
        <div className="screen-switcher__panel scroll-y">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <p className="screen-switcher__title">{g.title}</p>
              <ul>
                {g.screens.map((s) => (
                  <li key={s.path}>
                    <a
                      href={s.hash}
                      className={isActive(s.path) ? "is-active" : ""}
                      onClick={() => setOpen(false)}
                    >
                      <Icon name={s.icon} size={18} />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <button
        className="screen-switcher__fab"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Chuyển màn hình mẫu"
      >
        <Icon name={open ? "close" : "grid_view"} size={20} />
      </button>
    </div>
  );
}
