import type { ReactNode } from 'react'
import './DataTable.css'

export interface Column<T> {
  key: string
  header: ReactNode
  /** Render ô — mặc định lấy theo key */
  render?: (row: T, index: number) => ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T, index: number) => string
  onRowClick?: (row: T) => void
  /** Bảng gọn (dùng trong card dashboard) */
  dense?: boolean
  emptyText?: string
  className?: string
}

/** Bảng dữ liệu dùng chung — 03.10 View Modes · List View */
export default function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  rowKey,
  onRowClick,
  dense = false,
  emptyText = 'Chưa có dữ liệu',
  className = '',
}: DataTableProps<T>) {
  return (
    <div className={`table-wrap ${className}`.trim()}>
      <table className={`table${dense ? ' table--dense' : ''}`}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                style={{ width: c.width, textAlign: c.align ?? 'left' }}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="table__empty">
                {emptyText}
              </td>
            </tr>
          )}
          {rows.map((row, i) => (
            <tr
              key={rowKey(row, i)}
              className={onRowClick ? 'is-clickable' : undefined}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((c) => (
                <td key={c.key} style={{ textAlign: c.align ?? 'left' }}>
                  {c.render ? c.render(row, i) : (row[c.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
