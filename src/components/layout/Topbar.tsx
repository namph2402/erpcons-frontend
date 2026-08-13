import { type ReactNode, useState } from "react";
import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";
import SearchInput from "../ui/SearchInput";
import type { User } from "../../types";
import { ThemeSegmented, ThemeToggleButton } from "../../theme";
import "./Topbar.css";

export interface TopbarProps {
  user: User;
  /** Số thông báo chưa đọc hiển thị trên chuông */
  notificationCount?: number;
  onOpenNotifications?: () => void;
  onToggleSidebar?: () => void;
  /** Vùng bên trái (context switcher, tiêu đề trang...) */
  leading?: ReactNode;
  /** Vùng bên phải trước cụm icon (nút Tạo mới...) */
  actions?: ReactNode;
  searchPlaceholder?: string;
  /** Hiển thị tên người dùng cạnh avatar (chỉ ở màn rộng) */
  showUserName?: boolean;
  language?: string;
  className?: string;
}

/**
 * 02.2 · LAYOUT OVERVIEW — thanh header dùng chung.
 * Thứ tự chuẩn: Logo/Leading · Global Search · Quick Action ·
 * Notification · Message · Help · User Menu.
 */
export default function Topbar({
  user,
  notificationCount = 0,
  onOpenNotifications,
  onToggleSidebar,
  leading,
  actions,
  searchPlaceholder,
  showUserName = true,
  language = "VI",
  className = "",
}: TopbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const navigate = useNavigate();
  return (
    <header className={`topbar ${className}`.trim()}>
      <div className="topbar__left">
        <button
          className="topbar__burger"
          type="button"
          onClick={onToggleSidebar}
          aria-label="Mở / đóng menu"
        >
          <Icon name="menu" size={24} />
        </button>
        {leading}
      </div>

      <div className="topbar__search">
        <SearchInput
          placeholder={searchPlaceholder}
          aria-label="Tìm kiếm toàn hệ thống"
        />
      </div>

      <div className="topbar__right">
        {actions}

        <button
          className="topbar__icon-btn"
          type="button"
          aria-label="Ngôn ngữ"
        >
          <Icon name="language" size={20} />
          <span className="topbar__lang">{language}</span>
          <Icon name="expand_more" size={16} />
        </button>

        <button
          className="topbar__icon-btn"
          type="button"
          aria-label={`Thông báo (${notificationCount} chưa đọc)`}
          onClick={onOpenNotifications}
        >
          <Icon name="notifications" size={24} />
          {notificationCount > 0 && (
            <span className="topbar__badge num">{notificationCount}</span>
          )}
        </button>

        <button
          className="topbar__icon-btn"
          type="button"
          aria-label="Tin nhắn"
        >
          <Icon name="chat_bubble" size={20} />
        </button>

        <button
          className="topbar__icon-btn"
          type="button"
          aria-label="Trợ giúp"
        >
          <Icon name="help" size={20} />
        </button>

        <ThemeToggleButton className="topbar__icon-btn" />

        <div
          className="topbar__user-container"
          style={{ position: "relative" }}
        >
          <button
            className="topbar__user"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Avatar
              name={user.name}
              src={user.avatar}
              size={32}
              status={user.status}
            />
            {showUserName && (
              <span className="topbar__user-name">{user.name}</span>
            )}
            <Icon
              name="expand_more"
              size={18}
              className={`topbar__user-caret ${isMenuOpen ? "is-open" : ""}`}
            />
          </button>

          {/* Khối Menu thả xuống */}
          {isMenuOpen && (
            <>
              <div className="topbar__dropdown-menu">
                <div
                  className="topbar__dropdown-item"
                  onClick={() => {
                    window.location.href = "/PersonalHome#/ca-nhan"; // Chuyển trang kiểu truyền thống
                    setIsMenuOpen(false);
                  }}
                >
                  <Icon name="manage_accounts" size={20} />
                  <span>Quản lý tài khoản của bạn</span>
                </div>

                <div
                  className="topbar__dropdown-item"
                  onClick={() => {
                    window.location.href = "/PersonalHome#/dashboard/thong-bao"; // Chuyển trang kiểu truyền thống
                    setIsMenuOpen(false);
                  }}
                >
                  <Icon name="dashboard" size={20} />
                  <span>Trang dashboard</span>
                </div>
                <hr className="topbar__dropdown-divider" />
                {/* 02.9 · User Menu — Theme: Light / Dark / System */}
                <ThemeSegmented />
                <hr className="topbar__dropdown-divider" />
                <div
                  className="topbar__dropdown-item logout"
                  onClick={() => {
                    /* Logic logout */ setIsMenuOpen(false);
                  }}
                >
                  <Icon name="logout" size={20} />
                  <span>Đăng xuất</span>
                </div>
              </div>
              {/* Lớp phủ để click ra ngoài thì đóng menu */}
              <div
                className="topbar__menu-overlay"
                onClick={() => setIsMenuOpen(false)}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
