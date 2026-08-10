import Icon from './Icon'
import './Rating.css'

export interface RatingProps {
  /** Số sao đang chọn (0 – max) */
  value: number
  max?: number
  size?: 12 | 16 | 18 | 20
  /** Cho phép bấm để đổi giá trị */
  onChange?: (value: number) => void
  label?: string
  className?: string
}

/**
 * Mức độ ưu tiên / đánh giá tác vụ — dùng thang sao thay cho số trần
 * để đọc nhanh trên card (04.6 Attribute Types · Select).
 */
export default function Rating({
  value,
  max = 5,
  size = 16,
  onChange,
  label,
  className = '',
}: RatingProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1)
  const readOnly = !onChange

  return (
    <span
      className={`rating ${className}`.trim()}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={label ?? `Đánh giá ${value}/${max}`}
    >
      {stars.map((s) =>
        readOnly ? (
          <Icon
            key={s}
            name="star"
            size={size}
            filled={s <= value}
            className={s <= value ? 'rating__star is-on' : 'rating__star'}
          />
        ) : (
          <button
            key={s}
            type="button"
            className="rating__btn"
            aria-label={`${s} sao`}
            aria-pressed={s <= value}
            onClick={() => onChange(s === value ? 0 : s)}
          >
            <Icon
              name="star"
              size={size}
              filled={s <= value}
              className={s <= value ? 'rating__star is-on' : 'rating__star'}
            />
          </button>
        ),
      )}
    </span>
  )
}
