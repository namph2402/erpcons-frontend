import Icon from '../ui/Icon'
import './AiCopilotPanel.css'

export interface AiSuggestion {
  id: string
  label: string
  icon: string
}

export interface AiCopilotPanelProps {
  greeting?: string
  placeholder?: string
  suggestions: AiSuggestion[]
  online?: boolean
  onSend?: (text: string) => void
}

/** ERPCons AI Copilot — khối trợ lý AI dùng chung (màu AI #6366F1) */
export default function AiCopilotPanel({
  greeting = 'Xin chào! Tôi có thể hỗ trợ gì cho bạn?',
  placeholder = 'Đặt câu hỏi về dự án, chi phí, tiến độ...',
  suggestions,
  online = true,
  onSend,
}: AiCopilotPanelProps) {
  return (
    <section className="copilot">
      <header className="copilot__header">
        <span className="copilot__brand">
          <span className="copilot__spark">
            <Icon name="auto_awesome" size={18} filled />
          </span>
          ERPCons AI Copilot
        </span>
        {online && (
          <span className="copilot__status">
            <i />
            Trực tuyến
          </span>
        )}
      </header>

      <p className="copilot__greeting">{greeting}</p>

      <form
        className="copilot__input"
        onSubmit={(e) => {
          e.preventDefault()
          const input = e.currentTarget.elements.namedItem('q') as HTMLInputElement
          if (input.value.trim()) {
            onSend?.(input.value.trim())
            input.value = ''
          }
        }}
      >
        <input name="q" placeholder={placeholder} aria-label="Câu hỏi cho AI Copilot" />
        <button type="submit" aria-label="Gửi">
          <Icon name="send" size={18} />
        </button>
      </form>

      <ul className="copilot__suggestions">
        {suggestions.map((s) => (
          <li key={s.id}>
            <button type="button" onClick={() => onSend?.(s.label)}>
              <Icon name={s.icon} size={18} />
              <span className="truncate">{s.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
