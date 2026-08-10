import { avatarColorOf, initialsOf } from '../../utils/name'
import './Avatar.css'

export interface AvatarProps {
  name: string
  src?: string
  size?: 24 | 28 | 32 | 36 | 40 | 48 | 56 | 72 | 96
  /** Chấm trạng thái online ở góc */
  status?: 'online' | 'busy' | 'offline'
  className?: string
  title?: string
}

export default function Avatar({
  name,
  src,
  size = 32,
  status,
  className = '',
  title,
}: AvatarProps) {
  return (
    <span
      className={`avatar ${className}`.trim()}
      style={{ width: size, height: size }}
      title={title ?? name}
    >
      {src ? (
        <img className="avatar__img" src={src} alt={name} />
      ) : (
        <span
          className="avatar__initials"
          style={{
            background: avatarColorOf(name),
            fontSize: Math.round(size * 0.36),
          }}
        >
          {initialsOf(name)}
        </span>
      )}
      {status && <i className={`avatar__status avatar__status--${status}`} />}
    </span>
  )
}
