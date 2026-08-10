import Button from './Button'
import Icon from './Icon'
import './EmptyState.css'

export interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  action?: { label: string; icon?: string; onClick?: () => void }
}

/** 03.11 · EMPTY STATE */
export default function EmptyState({
  icon = 'inbox',
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="empty">
      <span className="empty__icon">
        <Icon name={icon} size={32} />
      </span>
      <p className="empty__title">{title}</p>
      {description && <p className="empty__desc">{description}</p>}
      {action && (
        <Button variant="primary" size="sm" icon={action.icon ?? 'add'} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
