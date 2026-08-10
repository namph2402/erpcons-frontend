import Badge from '../ui/Badge'
import Icon from '../ui/Icon'
import './InsightStrip.css'

export interface InsightItem {
  id: string
  title: string
  description: string
  icon: string
  tone: 'info' | 'success' | 'warning' | 'danger' | 'ai'
  linkLabel?: string
  onClick?: () => void
}

export interface InsightStripProps {
  title?: string
  tag?: string
  items: InsightItem[]
}

/** Dải AI Insights ở chân trang chủ */
export default function InsightStrip({
  title = 'AI Insights',
  tag = 'Beta',
  items,
}: InsightStripProps) {
  return (
    <section className="insight">
      <header className="insight__header">
        <h2 className="insight__title">{title}</h2>
        {tag && <Badge tone="ai">{tag}</Badge>}
      </header>

      <ul className="insight__list">
        {items.map((item) => (
          <li key={item.id} className="insight__item">
            <span className={`insight__icon insight__icon--${item.tone}`}>
              <Icon name={item.icon} size={20} />
            </span>
            <div className="insight__body">
              <p className="insight__item-title">{item.title}</p>
              <p className="insight__desc">
                {item.description}
                {item.linkLabel && (
                  <button type="button" className="insight__link" onClick={item.onClick}>
                    {item.linkLabel}
                    <Icon name="chevron_right" size={16} />
                  </button>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
