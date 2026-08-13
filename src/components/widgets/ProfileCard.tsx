import Avatar from "../ui/Avatar";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import type { User } from "../../types";
import "./ProfileCard.css";
// import { useNavigate } from "react-router-dom";

export interface ProfileStat {
  id: string;
  label: string;
  value: string;
  /** Giá trị tham chiếu hiển thị mờ phía sau, vd "/ 22" */
  total?: string;
  caption?: string;
  icon: string;
  tone?: "info" | "success" | "warning" | "danger" | "ai";
}

export interface ProfileCardProps {
  user: User;
  /** Nhãn chức danh dạng chip cạnh tên */
  tag?: string;
  department?: string;
  stats: ProfileStat[];
  onViewProfile?: () => void;
}

/** Thẻ hồ sơ nhân sự + chỉ số cá nhân (Trang chủ cá nhân) */
export default function ProfileCard({
  user,
  tag,
  department,
  stats,
  onViewProfile,
}: ProfileCardProps) {
  return (
    <section className="profile">
      <div className="profile__identity">
        <Avatar
          name={user.name}
          src={user.avatar}
          size={96}
          status={user.status}
        />
        <div className="profile__info">
          <div className="profile__name-row">
            <h2 className="profile__name">{user.name}</h2>
            {tag && (
              <Badge tone="info" size="md">
                {tag}
              </Badge>
            )}
          </div>
          {department && <p className="profile__dept">{department}</p>}
          <p className="profile__contact">
            {user.email && (
              <span>
                <Icon name="mail" size={16} /> {user.email}
              </span>
            )}
            {user.phone && (
              <span>
                <Icon name="call" size={16} /> {user.phone}
              </span>
            )}
          </p>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              if (onViewProfile) {
                onViewProfile();
              } else {
                window.location.hash = "#/ca-nhan/ho-so";
              }
            }}
          >
            Xem hồ sơ
          </Button>
        </div>
      </div>

      <ul className="profile__stats">
        {stats.map((s) => (
          <li key={s.id} className="profile__stat">
            <span
              className={`profile__stat-icon profile__stat-icon--${s.tone ?? "info"}`}
            >
              <Icon name={s.icon} size={18} />
            </span>
            <div>
              <p className="profile__stat-label">{s.label}</p>
              <p className="profile__stat-value num">
                {s.value}
                {s.total && (
                  <span className="profile__stat-total">/ {s.total}</span>
                )}
              </p>
              {s.caption && (
                <p className="profile__stat-caption">{s.caption}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
