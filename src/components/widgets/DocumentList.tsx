import Icon from '../ui/Icon'
import type { DocumentItem } from '../../types'
import './DocumentList.css'

export interface DocumentListProps {
  items: DocumentItem[]
  /** list: dòng dọc trong card · card: lưới thẻ tài liệu */
  variant?: 'list' | 'card'
}

/** Màu + icon theo định dạng tệp (Tài liệu CDE) */
const EXT_STYLE: Record<string, { icon: string; color: string }> = {
  pdf: { icon: 'picture_as_pdf', color: 'var(--danger)' },
  docx: { icon: 'description', color: 'var(--info)' },
  doc: { icon: 'description', color: 'var(--info)' },
  xlsx: { icon: 'table_chart', color: 'var(--success)' },
  xls: { icon: 'table_chart', color: 'var(--success)' },
  sketch: { icon: 'draw', color: 'var(--warning)' },
  dwg: { icon: 'architecture', color: 'var(--automation)' },
  jpg: { icon: 'image', color: 'var(--ocr)' },
  png: { icon: 'image', color: 'var(--ocr)' },
}

export default function DocumentList({ items, variant = 'list' }: DocumentListProps) {
  return (
    <ul className={`doc-list doc-list--${variant}`}>
      {items.map((doc) => {
        const style = EXT_STYLE[doc.ext.toLowerCase()] ?? {
          icon: 'draft',
          color: 'var(--slate-500)',
        }
        return (
          <li key={doc.id} className="doc">
            <span className="doc__icon" style={{ color: style.color }}>
              <Icon name={style.icon} size={20} />
            </span>
            <div className="doc__body">
              <p className="doc__name truncate">
                {doc.name}
                <span className="doc__ext">.{doc.ext}</span>
              </p>
              <p className="doc__meta truncate">
                {doc.version && <span className="doc__version">{doc.version}</span>}
                {doc.version && ' • '}
                {doc.meta}
              </p>
            </div>
            <span className="doc__size num">{doc.size}</span>
          </li>
        )
      })}
    </ul>
  )
}
