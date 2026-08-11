import { useState } from 'react'
import WorkspaceShell from './WorkspaceShell'
import {
  Badge,
  BarChart,
  Button,
  Card,
  DonutChart,
  Icon,
  ProgressBar,
  STATUS_TONE,
  Select,
} from '../../components/ui'
import type { BadgeTone } from '../../components/ui'
import type { WorkspaceConfig, WsAnalytics, WsColumn, WsDetail } from '../../types/workspace'
import './workspaces.css'

/** Suy ra tone của badge từ nội dung trạng thái tiếng Việt */
function toneOf(value: string): BadgeTone {
  if (STATUS_TONE[value]) return STATUS_TONE[value]
  const v = value.toLowerCase()
  if (/(quá hạn|lỗi|hết hàng|cao|từ chối|hủy|chưa xử lý|đã lỗi thời)/.test(v)) return 'danger'
  if (/(cảnh báo|chờ|sắp|bảo trì|trung bình|một phần|đang giao)/.test(v)) return 'warning'
  if (/(hoàn thành|đã duyệt|đủ hàng|đã thanh toán|online|đang sử dụng|đã phát hành|tốt|đã đóng|đã giải quyết|đã ký|đã áp dụng)/.test(v))
    return 'success'
  if (/(đang|mở|mới|nháp)/.test(v)) return 'info'
  return 'default'
}

function Cell({ column, row }: { column: WsColumn; row: Record<string, string | number> }) {
  const raw = row[column.key]
  const value = raw === undefined || raw === null ? '' : String(raw)

  switch (column.type) {
    case 'code':
      return <span style={{ fontFamily: 'var(--font-mono)' }}>{value}</span>
    case 'badge':
      return <Badge tone={toneOf(value)}>{value}</Badge>
    case 'progress':
      return <ProgressBar value={Number(raw) || 0} size="sm" showValue />
    case 'money':
      return <span className="num">{value}</span>
    case 'muted':
      return <span className="text-muted">{value}</span>
    case 'avatar':
      return (
        <span className="row">
          <span className="cell-object__thumb" style={{ width: 26, height: 26 }}>
            <Icon name="person" size={16} />
          </span>
          <span className="truncate">{value}</span>
        </span>
      )
    case 'object':
      return (
        <div className="cell-object">
          <span className="cell-object__thumb">
            <Icon name="inventory_2" size={20} />
          </span>
          <div className="truncate">
            <p className="cell-object__name truncate">{value}</p>
            {row[`${column.key}Sub`] && (
              <p className="cell-object__code">{String(row[`${column.key}Sub`])}</p>
            )}
          </div>
        </div>
      )
    default:
      return <span>{value}</span>
  }
}

function AnalyticsCard({ item }: { item: WsAnalytics }) {
  return (
    <Card title={item.title} link={item.link ? { label: item.link } : undefined}>
      {item.kind === 'donut' && item.donut && (
        <DonutChart
          data={item.donut.data}
          size={140}
          thickness={24}
          centerValue={item.donut.center}
          centerLabel={item.donut.centerLabel}
          showPercent={false}
        />
      )}

      {item.kind === 'bar' && item.bar && (
        <BarChart
          labels={item.bar.labels}
          series={item.bar.series}
          height={item.bar.height ?? 190}
        />
      )}

      {item.kind === 'rank' && item.rank && (
        <div>
          {item.rank.rows.map((r) => (
            <div className="ws-rank" key={r.id}>
              <span className="truncate">{r.label}</span>
              <ProgressBar value={r.rate} size="sm" />
              <span className="ws-rank__value num">{r.value}</span>
            </div>
          ))}
        </div>
      )}

      {item.kind === 'metric' && item.metric && (
        <div>
          <p className="stat-card__value num" style={{ fontSize: 'var(--fs-heading-1)' }}>
            {item.metric.value}
            {item.metric.unit && <span className="stat-card__unit">{item.metric.unit}</span>}
          </p>
          {item.metric.caption && <p className="text-caption">{item.metric.caption}</p>}
          {item.metric.sub && (
            <p className="metric-tile__delta metric-tile__delta--up">{item.metric.sub}</p>
          )}
        </div>
      )}

      {item.kind === 'list' && item.list && (
        <ul className="count-rows">
          {item.list.rows.map((r) => (
            <li key={r.id}>
              <div className="count-row">
                <span className="count-row__body">
                  <span className="count-row__label truncate">{r.label}</span>
                  {r.sub && <span className="count-row__sub truncate">{r.sub}</span>}
                </span>
                {r.value &&
                  (r.tone ? (
                    <Badge tone={r.tone}>{r.value}</Badge>
                  ) : (
                    <span className="count-row__value num">{r.value}</span>
                  ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

function DetailPanel({ detail }: { detail: WsDetail }) {
  const [tab, setTab] = useState(0)

  return (
    <Card>
      <div className="ws-detail__head">
        <div>
          <p className="ws-detail__code">{detail.code}</p>
        </div>
        <Button iconOnly icon="close" size="sm" aria-label="Đóng chi tiết" />
      </div>

      {detail.badges && detail.badges.length > 0 && (
        <div className="ws-detail__badges">
          {detail.badges.map((b) => (
            <Badge key={b.label} tone={b.tone} size="md">
              {b.label}
            </Badge>
          ))}
        </div>
      )}

      <p className="ws-detail__title">{detail.title}</p>

      {detail.tabs && detail.tabs.length > 0 && (
        <div className="tabs tabs--underline tabs--sm" role="tablist">
          {detail.tabs.map((t, i) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={i === tab}
              className={`tabs__item${i === tab ? ' is-active' : ''}`}
              onClick={() => setTab(i)}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <div className="ws-detail__section">
        <div className="ws-props">
          {detail.props.map((p) => (
            <div key={p.label}>
              <p className="ws-prop__label">
                {p.icon && <Icon name={p.icon} size={16} />}
                {p.label}
              </p>
              {p.tone ? (
                <Badge tone={p.tone}>{p.value}</Badge>
              ) : (
                <p className="ws-prop__value">{p.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {detail.description && (
        <div className="ws-detail__section">
          <p className="ws-detail__section-title">{detail.description.label}</p>
          <p className="text-caption" style={{ lineHeight: 1.55 }}>
            {detail.description.text}
          </p>
        </div>
      )}

      {detail.photos && detail.photos > 0 && (
        <div className="ws-detail__section">
          <p className="ws-detail__section-title">Ảnh hiện trường</p>
          <div className="ws-thumbs">
            {Array.from({ length: detail.photos }, (_, i) => (
              <div className="ws-thumb" key={i}>
                <Icon name="image" size={20} />
              </div>
            ))}
            <button className="ws-thumb ws-thumb--add" type="button" aria-label="Thêm ảnh">
              <Icon name="add" size={20} />
            </button>
          </div>
        </div>
      )}

      {detail.actions && detail.actions.length > 0 && (
        <div className="ws-detail__actions">
          {detail.actions.map((a) => (
            <Button
              key={a.label}
              variant={a.primary ? 'primary' : 'secondary'}
              icon={a.icon}
            >
              {a.label}
            </Button>
          ))}
        </div>
      )}
    </Card>
  )
}

/**
 * Trang Object Workspace — toàn bộ 15 workspace dùng chung component này,
 * chỉ khác nhau ở `config`. Xem `src/data/workspaces.ts`.
 */
export default function WorkspacePage({ config }: { config: WorkspaceConfig }) {
  const [tab, setTab] = useState(config.tabs?.[0]?.id ?? '')
  const [page, setPage] = useState(1)

  const pages = config.table.pages ?? 5

  return (
    <WorkspaceShell
      activeId={config.id}
      title={config.title}
      subtitle={config.subtitle}
      createLabel={config.createLabel}
      searchPlaceholder={config.searchPlaceholder}
      kpis={config.kpis}
      filters={config.filters}
      tabs={config.tabs}
      activeTab={tab}
      onTabChange={setTab}
      quickActions={config.quickActions}
      detail={config.detail ? <DetailPanel detail={config.detail} /> : undefined}
    >
      <Card
        title={`${config.table.title} (${config.table.total})`}
        flush
        action={
          <div className="row">
            <Button icon="download" size="sm">
              Xuất Excel
            </Button>
            <Button iconOnly icon="settings" size="sm" aria-label="Cấu hình cột" />
          </div>
        }
      >
        <div className="table-wrap">
          <table className="table table--dense">
            <thead>
              <tr>
                <th style={{ width: 36 }}>
                  <input type="checkbox" aria-label="Chọn tất cả" />
                </th>
                {config.table.columns.map((c) => (
                  <th key={c.key} style={{ width: c.width, textAlign: c.align ?? 'left' }}>
                    {c.header}
                  </th>
                ))}
                <th style={{ width: 48 }} />
              </tr>
            </thead>
            <tbody>
              {config.table.rows.map((row, i) => (
                <tr key={String(row.id ?? i)}>
                  <td>
                    <input type="checkbox" aria-label="Chọn dòng" />
                  </td>
                  {config.table.columns.map((c) => (
                    <td key={c.key} style={{ textAlign: c.align ?? 'left' }}>
                      <Cell column={c} row={row} />
                    </td>
                  ))}
                  <td style={{ textAlign: 'center' }}>
                    <Button iconOnly icon="more_horiz" size="sm" aria-label="Thao tác" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ws-pagination">
          <div className="ws-pagination__left">
            <span>Hiển thị</span>
            <Select
              size="sm"
              defaultValue="10"
              aria-label="Số dòng mỗi trang"
              options={[
                { value: '10', label: '10' },
                { value: '20', label: '20' },
                { value: '50', label: '50' },
              ]}
            />
            <span>{config.table.rangeLabel ?? `1 – 10 của ${config.table.total}`}</span>
          </div>

          <div className="ws-pagination__pages">
            <button type="button" aria-label="Trang trước" onClick={() => setPage((p) => Math.max(1, p - 1))}>
              <Icon name="chevron_left" size={16} />
            </button>
            {Array.from({ length: Math.min(5, pages) }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={n === page ? 'is-active' : ''}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
            {pages > 5 && (
              <>
                <span>…</span>
                <button type="button" onClick={() => setPage(pages)}>
                  {pages}
                </button>
              </>
            )}
            <button type="button" aria-label="Trang sau" onClick={() => setPage((p) => Math.min(pages, p + 1))}>
              <Icon name="chevron_right" size={16} />
            </button>
          </div>
        </div>
      </Card>

      <div className="ws-analytics">
        {config.analytics.map((a) => (
          <AnalyticsCard key={a.id} item={a} />
        ))}
      </div>
    </WorkspaceShell>
  )
}
