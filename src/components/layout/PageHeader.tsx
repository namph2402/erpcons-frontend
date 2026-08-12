import type { ReactNode } from "react";
import Icon from "../ui/Icon";
import "./PageHeader.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  /** 02.5 · BREADCRUMB */
  breadcrumbs?: BreadcrumbItem[];
  title: ReactNode;
  /** Mã đối tượng hiển thị dưới tiêu đề (PRJ-2024-0001) */
  code?: string;
  subtitle?: ReactNode;
  /** Ảnh/biểu tượng đại diện đối tượng */
  thumbnail?: ReactNode;
  /** Badge trạng thái cạnh tiêu đề */
  status?: ReactNode;
  /** Thao tác bên phải */
  actions?: ReactNode;
  /** Dải tab bên dưới (03.4 Primary Navigation) */
  tabs?: ReactNode;
  className?: string;
}

/** 03.2 · WORKSPACE HEADER — header đối tượng dùng chung */
export default function PageHeader({
  breadcrumbs,
  title,
  code,
  subtitle,
  thumbnail,
  status,
  actions,
  tabs,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`page-header ${className}`.trim()}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="breadcrumb" aria-label="Đường dẫn">
          {breadcrumbs.map((b, i) => (
            <span key={b.label} className="breadcrumb__item">
              {i > 0 && (
                <Icon
                  name="chevron_right"
                  size={16}
                  className="breadcrumb__sep"
                />
              )}
              {b.href && i < breadcrumbs.length - 1 ? (
                <a href={b.href}>{b.label}</a>
              ) : (
                <span
                  className={i === breadcrumbs.length - 1 ? "is-current" : ""}
                >
                  {b.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      )}

      <div className="page-header__main">
        {thumbnail && <div className="page-header__thumb">{thumbnail}</div>}

        <div className="page-header__titles">
          <div className="page-header__title-row">
            <h1 className="page-header__title">{title}</h1>
            {status}
          </div>
          {(code || subtitle) && (
            <p className="page-header__meta">
              {code && <span className="page-header__code">{code}</span>}
              {code && subtitle && <span className="page-header__dot">•</span>}
              {subtitle}
            </p>
          )}
        </div>

        {actions && <div className="page-header__actions">{actions}</div>}
      </div>

      {tabs && <div className="page-header__tabs">{tabs}</div>}
    </div>
  );
}
