import Icon from '../ui/Icon'
import './RichTextEditor.css'

export interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  /** Chiều cao tối thiểu vùng soạn thảo */
  minHeight?: number
  /** Bộ nút rút gọn cho ô bình luận */
  compact?: boolean
  className?: string
}

/** Nhóm nút định dạng — chỉ dựng giao diện, gắn lệnh thật khi tích hợp editor */
const GROUPS: { id: string; tools: { icon: string; label: string; compact?: boolean }[] }[] = [
  {
    id: 'text',
    tools: [
      { icon: 'format_bold', label: 'Đậm', compact: true },
      { icon: 'format_italic', label: 'Nghiêng', compact: true },
      { icon: 'strikethrough_s', label: 'Gạch ngang', compact: true },
      { icon: 'superscript', label: 'Chỉ số trên', compact: true },
      { icon: 'subscript', label: 'Chỉ số dưới', compact: true },
      { icon: 'format_clear', label: 'Xoá định dạng', compact: true },
    ],
  },
  {
    id: 'insert',
    tools: [
      { icon: 'link', label: 'Chèn liên kết', compact: true },
      { icon: 'format_list_numbered', label: 'Danh sách số', compact: true },
      { icon: 'format_list_bulleted', label: 'Danh sách chấm', compact: true },
      { icon: 'format_quote', label: 'Trích dẫn' },
      { icon: 'image', label: 'Chèn ảnh', compact: true },
      { icon: 'table', label: 'Chèn bảng' },
      { icon: 'horizontal_rule', label: 'Đường kẻ ngang' },
    ],
  },
  {
    id: 'media',
    tools: [
      { icon: 'photo_camera', label: 'Chụp ảnh' },
      { icon: 'calendar_month', label: 'Chèn ngày' },
      { icon: 'more_vert', label: 'Thêm', compact: true },
    ],
  },
]

/**
 * 05.4 · INPUT TYPES — Textarea có thanh công cụ định dạng.
 * Dùng cho "Nội dung công việc" và ô "Comment" (06.5 Comment & Discussion).
 */
export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Nhập nội dung...',
  minHeight = 140,
  compact = false,
  className = '',
}: RichTextEditorProps) {
  return (
    <div className={`rte ${className}`.trim()}>
      <div className="rte__toolbar" role="toolbar" aria-label="Định dạng nội dung">
        {GROUPS.map((g, i) => {
          const tools = compact ? g.tools.filter((t) => t.compact) : g.tools
          if (tools.length === 0) return null
          return (
            <div className="rte__group" key={g.id}>
              {i > 0 && <span className="rte__sep" aria-hidden="true" />}
              {tools.map((t) => (
                <button
                  key={t.icon}
                  type="button"
                  className="rte__tool"
                  title={t.label}
                  aria-label={t.label}
                >
                  <Icon name={t.icon} size={18} />
                </button>
              ))}
            </div>
          )
        })}
      </div>

      <textarea
        className="rte__area"
        style={{ minHeight }}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
