import type { InputHTMLAttributes } from 'react'
import Icon from './Icon'
import './SearchInput.css'

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Gợi ý phím tắt hiển thị bên phải, vd "⌘ K" */
  shortcut?: string
  size?: 'md' | 'lg'
}

/** 02.3 · GLOBAL SEARCH */
export default function SearchInput({
  shortcut = '⌘ K',
  size = 'md',
  className = '',
  placeholder = 'Tìm kiếm mọi thứ trong ERPCons...',
  ...rest
}: SearchInputProps) {
  return (
    <label className={`search search--${size} ${className}`.trim()}>
      <Icon name="search" size={20} className="search__icon" />
      <input className="search__input" placeholder={placeholder} {...rest} />
      {shortcut && <kbd className="search__kbd">{shortcut}</kbd>}
    </label>
  )
}
