import type { BadgeTone, BarSeries, DonutSlice, StatTone, TrendDirection } from '../components/ui'
import type { QuickAction } from '../components/widgets'

/** Kiểu ô của bảng workspace — quyết định cách render */
export type WsCellType =
  | 'text'
  | 'code'
  | 'badge'
  | 'progress'
  | 'money'
  | 'object'
  | 'avatar'
  | 'muted'

export interface WsColumn {
  key: string
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  type?: WsCellType
}

export interface WsKpi {
  id: string
  label: string
  value: string
  unit?: string
  icon: string
  tone: StatTone
  trend?: { direction: TrendDirection; value: string; label?: string }
  hint?: string
}

export interface WsFilter {
  id: string
  label: string
  options: { value: string; label: string }[]
}

/** Widget phân tích cuối trang workspace */
export interface WsAnalytics {
  id: string
  title: string
  link?: string
  kind: 'donut' | 'bar' | 'rank' | 'metric' | 'list'
  donut?: { data: DonutSlice[]; center?: string; centerLabel?: string }
  bar?: { labels: string[]; series: BarSeries[]; height?: number }
  rank?: { rows: { id: string; label: string; value: string; rate: number }[] }
  metric?: { value: string; unit?: string; caption?: string; sub?: string; tone?: StatTone }
  list?: { rows: { id: string; label: string; sub?: string; value?: string; tone?: BadgeTone }[] }
}

/** Panel chi tiết bên phải bảng */
export interface WsDetail {
  code: string
  title: string
  badges?: { label: string; tone: BadgeTone }[]
  tabs?: string[]
  props: { label: string; value: string; icon?: string; tone?: BadgeTone }[]
  description?: { label: string; text: string }
  /** Số ô ảnh hiện trường hiển thị */
  photos?: number
  actions?: { label: string; icon?: string; primary?: boolean }[]
}

export interface WorkspaceConfig {
  /** id mục trong menu chung */
  id: string
  /** Đường dẫn hash */
  route: string
  title: string
  subtitle: string
  createLabel: string
  searchPlaceholder: string
  kpis: WsKpi[]
  filters?: WsFilter[]
  tabs?: { id: string; label: string; count?: number }[]
  table: {
    title: string
    total: string
    columns: WsColumn[]
    rows: Record<string, string | number>[]
    /** Tổng số trang hiển thị ở phân trang */
    pages?: number
    rangeLabel?: string
  }
  analytics: WsAnalytics[]
  quickActions: QuickAction[]
  detail?: WsDetail
}
