import { useMemo, useState } from 'react'
import Badge from '../ui/Badge'
import Icon from '../ui/Icon'
import Tabs from '../ui/Tabs'
import type { NotificationItem } from '../../types'
import './NotificationDrawer.css'

export interface NotificationDrawerProps {
  items: NotificationItem[]
  onClose?: () => void
  onMarkAllRead?: () => void
  onViewAll?: () => void
}

/** 02.8 · NOTIFICATION CENTER — panel thông báo dùng chung */
export default function NotificationDrawer({
  items,
  onClose,
  onMarkAllRead,
  onViewAll,
}: NotificationDrawerProps) {
  const [tab, setTab] = useState('all')
  const unreadCount = items.filter((i) => i.unread).length

  const filtered = useMemo(() => {
    switch (tab) {
      case 'unread':
        return items.filter((i) => i.unread)
      case 'important':
        return items.filter((i) => i.important)
      case 'mention':
        return items.filter((i) => i.description?.includes('@'))
      case 'system':
        return items.filter((i) => i.tone === 'neutral')
      default:
        return items
    }
  }, [items, tab])

  const groups = useMemo(() => {
    const map = new Map<string, NotificationItem[]>()
    filtered.forEach((item) => {
      const list = map.get(item.group) ?? []
      list.push(item)
      map.set(item.group, list)
    })
    return [...map.entries()]
  }, [filtered])

  return (
    <div className="notif">
      <header className="notif__header">
        <div className="notif__title-row">
          <h2 className="notif__title">Thông báo</h2>
          <Badge tone="info" size="md">
            {unreadCount}
          </Badge>
        </div>
        <div className="notif__header-actions">
          <button className="notif__icon-btn" type="button" aria-label="Cài đặt thông báo">
            <Icon name="settings" size={20} />
          </button>
          <button className="notif__mark" type="button" onClick={onMarkAllRead}>
            <Icon name="done_all" size={18} />
            Đánh dấu đã đọc
          </button>
          <button
            className="notif__icon-btn"
            type="button"
            onClick={onClose}
            aria-label="Đóng"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
      </header>

      <div className="notif__tabs">
        <Tabs
          variant="underline"
          size="sm"
          value={tab}
          onChange={setTab}
          items={[
            { id: 'all', label: 'Tất cả' },
            { id: 'unread', label: `Chưa đọc (${unreadCount})` },
            { id: 'important', label: 'Quan trọng' },
            { id: 'mention', label: '@ Đề cập' },
            { id: 'system', label: 'Hệ thống' },
          ]}
        />
      </div>

      <div className="notif__list">
        {groups.map(([group, list]) => (
          <section key={group}>
            <p className="notif__group">{group}</p>
            {list.map((item) => (
              <article
                key={item.id}
                className={`notif__item${item.unread ? ' is-unread' : ''}`}
              >
                {item.unread && <i className="notif__unread-dot" />}
                <span className={`notif__icon notif__icon--${item.tone}`}>
                  <Icon name={item.icon} size={18} />
                </span>
                <div className="notif__body">
                  <div className="notif__body-head">
                    <p className="notif__item-title">{item.title}</p>
                    <span className="notif__time">{item.time}</span>
                  </div>
                  <p className="notif__context">{item.context}</p>
                  {item.description && (
                    <p className="notif__desc">{item.description}</p>
                  )}
                  {item.important && (
                    <Badge tone="danger" className="notif__flag">
                      Quan trọng
                    </Badge>
                  )}
                </div>
              </article>
            ))}
          </section>
        ))}
      </div>

      <footer className="notif__footer">
        <button className="notif__view-all" type="button" onClick={onViewAll}>
          Xem tất cả thông báo
          <Icon name="chevron_right" size={18} />
        </button>
      </footer>
    </div>
  )
}
