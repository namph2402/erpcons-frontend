import Avatar, { type AvatarProps } from './Avatar'
import './Avatar.css'

export interface AvatarGroupProps {
  people: { name: string; src?: string }[]
  /** Số avatar hiển thị tối đa, phần còn lại gộp thành "+N" */
  max?: number
  size?: AvatarProps['size']
  className?: string
}

export default function AvatarGroup({
  people,
  max = 3,
  size = 28,
  className = '',
}: AvatarGroupProps) {
  const shown = people.slice(0, max)
  const rest = people.length - shown.length
  return (
    <div className={`avatar-group ${className}`.trim()}>
      {shown.map((p) => (
        <Avatar key={p.name} name={p.name} src={p.src} size={size} />
      ))}
      {rest > 0 && (
        <span
          className="avatar-group__more"
          style={{ width: size, height: size }}
        >
          +{rest}
        </span>
      )}
    </div>
  )
}
