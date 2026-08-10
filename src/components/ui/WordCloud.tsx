import './WordCloud.css'

export interface CloudWord {
  text: string
  /** Trọng số 1–10, quyết định cỡ chữ */
  weight: number
  color?: string
}

export interface WordCloudProps {
  words: CloudWord[]
  minSize?: number
  maxSize?: number
  onSelect?: (word: CloudWord) => void
}

/** Word cloud chủ đề nổi bật (AI Insight · Knowledge Graph) */
export default function WordCloud({
  words,
  minSize = 13,
  maxSize = 38,
  onSelect,
}: WordCloudProps) {
  const maxWeight = Math.max(...words.map((w) => w.weight), 1)
  const minWeight = Math.min(...words.map((w) => w.weight), 0)
  const range = maxWeight - minWeight || 1

  return (
    <ul className="wordcloud">
      {words.map((w) => {
        const size = minSize + ((w.weight - minWeight) / range) * (maxSize - minSize)
        return (
          <li key={w.text}>
            <button
              type="button"
              className="wordcloud__word"
              style={{
                fontSize: Math.round(size),
                color: w.color ?? 'var(--slate-500)',
                fontWeight: size > 26 ? 700 : size > 18 ? 600 : 500,
              }}
              onClick={() => onSelect?.(w)}
            >
              {w.text}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
