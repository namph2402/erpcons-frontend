import { useState } from "react";
import Logo from "../brand/Logo";
import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";
import type { NavGroup, NavItem, User } from "../../types";
import "./Sidebar.css";

export interface SidebarProps {
  groups: NavGroup[];
  /** id của mục đang active */
  activeId: string;
  onNavigate?: (item: NavItem) => void;
  user?: User;
  /** Nhóm mục cố định dưới đáy (Cài đặt, Đăng xuất...) */
  footerItems?: NavItem[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  /** Hiện nút "Thu gọn" dưới chân sidebar */
  collapsible?: boolean;
  /** Nội dung phụ chèn cuối vùng cuộn (vd: danh sách dự án gần đây) */
  extra?: React.ReactNode;
}

/**
 * 02.4 · SIDEBAR NAVIGATION
 * Component điều hướng dùng chung cho mọi màn hình — chỉ thay `groups`.
 */
export default function Sidebar({
  groups,
  activeId,
  onNavigate,
  user,
  footerItems,
  collapsed = false,
  onToggleCollapse,
  collapsible = true,
  extra,
}: SidebarProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const renderItem = (item: NavItem) => {
    const isActive = item.id === activeId;
    const hasChildren = Boolean(item.children?.length);
    const isOpen = openId === item.id;

    return (
      <li key={item.id}>
        <a
          className={`sidenav__item${isActive ? " is-active" : ""}`}
          href={item.href ?? "#"}
          title={collapsed ? item.label : undefined}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              setOpenId(isOpen ? null : item.id);
              return;
            }
            if (onNavigate) {
              e.preventDefault();
              onNavigate(item);
            }
          }}
        >
          <Icon name={item.icon} size={20} filled={isActive} />
          {!collapsed && (
            <>
              <span className="sidenav__label truncate">{item.label}</span>
              {item.tag && <span className="sidenav__tag">{item.tag}</span>}
              {typeof item.count === "number" && (
                <span className="sidenav__count num">{item.count}</span>
              )}
              {hasChildren && (
                <Icon
                  name="expand_more"
                  size={18}
                  className={`sidenav__caret${isOpen ? " is-open" : ""}`}
                />
              )}
            </>
          )}
        </a>

        {hasChildren && isOpen && !collapsed && (
          <ul className="sidenav__sub">
            {item.children!.map((c) => (
              <li key={c.id}>
                <a
                  className={`sidenav__subitem${c.id === activeId ? " is-active" : ""}`}
                  href={c.href ?? "#"}
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate(c);
                    }
                  }}
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside className={`sidebar${collapsed ? " sidebar--collapsed" : ""}`}>
      <div className="sidebar__brand">
        {collapsed ? (
          <Logo variant="mark" size={32} />
        ) : (
          <Logo variant="horizontal" onDark size={34} />
        )}
      </div>

      <nav className="sidebar__nav scroll-y" aria-label="Điều hướng chính">
        {groups.map((group) => (
          <div className="sidenav__group" key={group.id}>
            {group.title && !collapsed && (
              <p className="sidenav__group-title">{group.title}</p>
            )}
            <ul>{group.items.map(renderItem)}</ul>
          </div>
        ))}
        {!collapsed && extra}
      </nav>

      {footerItems && footerItems.length > 0 && (
        <ul className="sidebar__footer-nav">{footerItems.map(renderItem)}</ul>
      )}

      {user && (
        <div className="sidebar__user">
          <Avatar
            name={user.name}
            src={user.avatar}
            size={40}
            status={user.status}
          />
          {!collapsed && (
            <>
              <div className="sidebar__user-info">
                <p className="sidebar__user-name truncate">{user.name}</p>
                <p className="sidebar__user-role truncate">{user.role}</p>
                {user.org && (
                  <p className="sidebar__user-org truncate">{user.org}</p>
                )}
              </div>
              <Icon
                name="expand_more"
                size={18}
                className="sidebar__user-caret"
              />
            </>
          )}
        </div>
      )}

      {collapsible && (
        <button
          className="sidebar__collapse"
          type="button"
          onClick={onToggleCollapse}
        >
          <Icon name={collapsed ? "chevron_right" : "chevron_left"} size={18} />
          {!collapsed && <span>Thu gọn</span>}
        </button>
      )}
    </aside>
  );
}
