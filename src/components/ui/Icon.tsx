import type { CSSProperties } from 'react'

/**
 * 04 · ICON SYSTEM — Material Symbols Rounded.
 * Chỉ dùng size 12 / 16 / 20 / 24 theo guideline, stroke 2px (weight 400 optical).
 */
export type IconSize = 12 | 16 | 18 | 20 | 24 | 28 | 32 | 40

export interface IconProps {
  /** Tên icon Material Symbols, ví dụ "home", "notifications" */
  name: string
  size?: IconSize
  color?: string
  /** Icon tô kín — chỉ dùng cho trạng thái active, guideline hạn chế dùng */
  filled?: boolean
  weight?: 300 | 400 | 500 | 600 | 700
  className?: string
  style?: CSSProperties
}

export default function Icon({
  name,
  size = 20,
  color,
  filled = false,
  weight = 400,
  className = '',
  style,
}: IconProps) {
  return (
    <span
      className={`material-symbols-rounded ${className}`.trim()}
      aria-hidden="true"
      style={{
        fontSize: size,
        width: size,
        height: size,
        color,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`,
        ...style,
      }}
    >
      {name}
    </span>
  )
}
