import Icon from '../ui/Icon'
import './DeviceMap.css'

export interface MapMarker {
  id: string
  /** Vị trí theo % khung bản đồ */
  x: number
  y: number
  label: string
  /** Số hiển thị trong marker (số thiết bị / dự án) */
  count?: number | string
  tone: 'info' | 'success' | 'warning' | 'danger' | 'neutral'
  icon?: string
  sub?: string
}

export interface DeviceMapProps {
  markers: MapMarker[]
  height?: number
  /** Bộ lọc dạng chip phía trên bản đồ */
  filters?: { id: string; label: string }[]
  activeFilter?: string
  onFilterChange?: (id: string) => void
  /** Nhãn hiển thị góc trên bên trái */
  caption?: string
}

/**
 * Bản đồ vị trí (thiết bị IoT / dự án) — nền sơ đồ hoá,
 * không gọi dịch vụ bản đồ bên ngoài nên chạy được offline.
 */
export default function DeviceMap({
  markers,
  height = 260,
  filters,
  activeFilter,
  onFilterChange,
  caption,
}: DeviceMapProps) {
  return (
    <div className="device-map">
      {(filters || caption) && (
        <div className="device-map__bar">
          {caption && <span className="device-map__caption">{caption}</span>}
          {filters && (
            <div className="device-map__filters">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={f.id === activeFilter ? 'is-active' : ''}
                  onClick={() => onFilterChange?.(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="device-map__canvas" style={{ height }}>
        <div className="device-map__grid" aria-hidden="true" />

        {markers.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`device-map__marker device-map__marker--${m.tone}`}
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
            title={`${m.label}${m.sub ? ` — ${m.sub}` : ''}`}
          >
            {m.icon ? <Icon name={m.icon} size={16} /> : <span className="num">{m.count}</span>}
          </button>
        ))}

        <div className="device-map__zoom">
          <button type="button" aria-label="Phóng to">
            <Icon name="add" size={18} />
          </button>
          <button type="button" aria-label="Thu nhỏ">
            <Icon name="remove" size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
