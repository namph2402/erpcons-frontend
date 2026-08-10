import type { SelectHTMLAttributes } from 'react'
import Icon from './Icon'
import './Select.css'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[]
  size?: 'sm' | 'md'
  /** Kiểu nhẹ, không viền — dùng trong header card */
  variant?: 'outline' | 'soft'
}

/** 05.4 · INPUT TYPES — Select / Dropdown */
export default function Select({
  options,
  size = 'md',
  variant = 'outline',
  className = '',
  ...rest
}: SelectProps) {
  return (
    <span className={`select select--${size} select--${variant} ${className}`.trim()}>
      <select {...rest}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Icon name="expand_more" size={18} className="select__caret" />
    </span>
  )
}
