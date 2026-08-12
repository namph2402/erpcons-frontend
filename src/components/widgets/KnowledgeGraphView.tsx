import Icon from '../ui/Icon'
import './KnowledgeGraphView.css'

export interface GraphNode {
  id: string
  label: string
  sub?: string
  icon: string
  color: string
  /** Nhãn cạnh nối tới nút trung tâm */
  edgeLabel?: string
}

export interface KnowledgeGraphViewProps {
  center: { label: string; sub?: string; icon: string; color?: string }
  nodes: GraphNode[]
  size?: number
  onSelect?: (node: GraphNode) => void
}

/**
 * Đồ thị tri thức dạng hình sao — nút trung tâm + các thực thể liên quan.
 * Vẽ bằng SVG, không phụ thuộc thư viện graph bên ngoài.
 */
export default function KnowledgeGraphView({
  center,
  nodes,
  size = 520,
  onSelect,
}: KnowledgeGraphViewProps) {
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.36
  const nodeR = 26

  const positions = nodes.map((_, i) => {
    /** Bắt đầu từ đỉnh trên, chia đều quanh vòng tròn */
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / nodes.length
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) }
  })

  return (
    <div className="kgraph">
      <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Đồ thị tri thức">
        {/* cạnh nối */}
        {positions.map((p, i) => {
          const mx = (cx + p.x) / 2
          const my = (cy + p.y) / 2
          return (
            <g key={`edge-${nodes[i].id}`}>
              <line
                x1={cx}
                y1={cy}
                x2={p.x}
                y2={p.y}
                stroke="var(--chart-grid)"
                strokeWidth="1.5"
              />
              {nodes[i].edgeLabel && (
                <text x={mx} y={my - 4} textAnchor="middle" className="kgraph__edge-label">
                  {nodes[i].edgeLabel}
                </text>
              )}
            </g>
          )
        })}

        {/* nút vệ tinh */}
        {positions.map((p, i) => {
          const node = nodes[i]
          return (
            <g
              key={node.id}
              className="kgraph__node"
              onClick={() => onSelect?.(node)}
              role="button"
            >
              <circle cx={p.x} cy={p.y} r={nodeR} fill={`${node.color}1A`} stroke={node.color} strokeWidth="1.5" />
              <text x={p.x} y={p.y + 6} textAnchor="middle" className="kgraph__node-icon" fill={node.color}>
                ●
              </text>
              <text x={p.x} y={p.y + nodeR + 16} textAnchor="middle" className="kgraph__node-label">
                {node.label}
              </text>
              {node.sub && (
                <text x={p.x} y={p.y + nodeR + 29} textAnchor="middle" className="kgraph__node-sub">
                  {node.sub}
                </text>
              )}
            </g>
          )
        })}

        {/* nút trung tâm */}
        <circle
          cx={cx}
          cy={cy}
          r={nodeR + 8}
          fill={`${center.color ?? 'var(--automation)'}`}
          opacity="0.12"
        />
        <circle
          cx={cx}
          cy={cy}
          r={nodeR + 2}
          fill="var(--bg-surface)"
          stroke={center.color ?? 'var(--automation)'}
          strokeWidth="2"
        />
        <text x={cx} y={cy + 6} textAnchor="middle" className="kgraph__node-icon" fill={center.color ?? 'var(--automation)'}>
          ◆
        </text>
        <text x={cx} y={cy + nodeR + 22} textAnchor="middle" className="kgraph__center-label">
          {center.label}
        </text>
        {center.sub && (
          <text x={cx} y={cy + nodeR + 36} textAnchor="middle" className="kgraph__node-sub">
            {center.sub}
          </text>
        )}
      </svg>

      <div className="kgraph__tools">
        <button type="button" aria-label="Toàn màn hình">
          <Icon name="fullscreen" size={18} />
        </button>
        <button type="button" aria-label="Phóng to">
          <Icon name="add" size={18} />
        </button>
        <button type="button" aria-label="Thu nhỏ">
          <Icon name="remove" size={18} />
        </button>
        <button type="button" aria-label="Căn giữa">
          <Icon name="my_location" size={18} />
        </button>
      </div>
    </div>
  )
}
