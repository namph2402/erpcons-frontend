import './Tabs.css'

export interface TabItem {
  id: string
  label: string
  /** Số đếm hiển thị cạnh nhãn */
  count?: number
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  value: string
  onChange: (id: string) => void
  /** underline: tab chính của workspace · pill: bộ lọc trong card */
  variant?: 'underline' | 'pill'
  size?: 'sm' | 'md'
  className?: string
}

/** 02.6 · TABS NAVIGATION — tối đa 7 tab trực tiếp, phần dư gom vào "More" */
export default function Tabs({
  items,
  value,
  onChange,
  variant = 'underline',
  size = 'md',
  className = '',
}: TabsProps) {
  return (
    <div
      className={`tabs tabs--${variant} tabs--${size} ${className}`.trim()}
      role="tablist"
    >
      {items.map((item) => (
        <button
          key={item.id}
          role="tab"
          type="button"
          aria-selected={item.id === value}
          disabled={item.disabled}
          className={`tabs__item${item.id === value ? ' is-active' : ''}`}
          onClick={() => onChange(item.id)}
        >
          {item.label}
          {typeof item.count === 'number' && (
            <span className="tabs__count num">{item.count}</span>
          )}
        </button>
      ))}
    </div>
  )
}
