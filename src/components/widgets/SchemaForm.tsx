import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import Button from '../ui/Button'
import Field, { TextInput, TextArea } from '../ui/Field'
import Icon from '../ui/Icon'
import Rating from '../ui/Rating'
import Select from '../ui/Select'
import RichTextEditor from './RichTextEditor'
import {
  fetchReferenceOptions,
  type FormConfig,
  type FormField,
  type FormGroup,
  type FormOption,
} from '../../api/formConfig'
import './TaskModals.css'
import './SchemaFormLayout.css'

/**
 * Form tự dựng từ file mô tả của Drupal.
 *
 * Không biết gì về entity cụ thể: nhận `config` rồi vẽ theo `control` của từng
 * trường. Thêm trường trong file YAML → form tự có, không phải sửa React.
 *
 * Trường tham chiếu KHÔNG nhúng sẵn danh sách (có bundle tới 241 mục) mà tải
 * theo `reference.options_api` khi người dùng mở ô — xem ReferenceField.
 */

export interface SchemaFormProps {
  config: FormConfig
  /** Giá trị ban đầu (chế độ sửa), khoá theo tên trường. */
  value?: Record<string, unknown>
  onSubmit: (values: Record<string, unknown>) => void | Promise<void>
  onCancel?: () => void
  /** Lỗi theo từng trường do server trả về. */
  serverErrors?: Record<string, string>
  saving?: boolean
  submitLabel?: string
  /**
   * Bật nút Lưu dù file YAML khai `writable: false`.
   *
   * Dùng khi TRANG CHA tự lo việc lưu qua endpoint nghiệp vụ riêng — ví dụ tác
   * vụ phải đi qua /api/v1/tasks để hook kanban_change_status_alter còn chạy.
   */
  forceWritable?: boolean
}

const emptyFor = (f: FormField): unknown => {
  if (f.cardinality !== 1) return []
  if (f.control === 'checkbox') return false
  return ''
}

/** Chuẩn hoá giá trị vào form (reference có thể là {value,label}). */
const normalize = (f: FormField, raw: unknown): unknown => {
  if (raw === null || raw === undefined) return emptyFor(f)

  if (f.control === 'reference') {
    if (Array.isArray(raw)) return (raw as FormOption[]).map((r) => String(r.value ?? r))
    if (typeof raw === 'object') return String((raw as FormOption).value ?? '')
    return String(raw)
  }
  if (f.control === 'checkbox') return raw === true || raw === '1' || raw === 1
  if (f.control === 'datetime' && typeof raw === 'string') return raw.slice(0, 16)
  if (Array.isArray(raw)) return raw
  return String(raw)
}

export default function SchemaForm({
  config,
  value,
  onSubmit,
  onCancel,
  serverErrors,
  saving = false,
  submitLabel = 'Lưu',
  forceWritable = false,
}: SchemaFormProps) {
  const [form, setForm] = useState<Record<string, unknown>>(() => {
    const init: Record<string, unknown> = {}
    config.fields.forEach((f) => {
      init[f.key] = normalize(f, value?.[f.key])
    })
    return init
  })
  const [touched, setTouched] = useState(false)

  const set = (key: string, v: unknown) => setForm((prev) => ({ ...prev, [key]: v }))

  /* ---- Cây bố cục ------------------------------------------------------
     Drupal xếp form bằng field_group: nhóm lồng nhóm, mỗi nhóm có kiểu
     (bootstrap_grid = lưới N cột, html_element = thẻ bọc) và thứ tự children
     do người dựng form quyết định. Đổ phẳng theo weight như trước là mất hết
     bố cục ngang — đó là lý do form trước đây rơi xuống một cột.            */
  const byId = useMemo(() => {
    const m = new Map<string, FormGroup>()
    config.groups.forEach((g) => m.set(g.id, g))
    return m
  }, [config.groups])

  const fieldById = useMemo(() => {
    const m = new Map<string, FormField>()
    config.fields.forEach((f) => m.set(f.key, f))
    return m
  }, [config.fields])

  /* Nhóm bị giấu (classes có 'd-none') và mọi thứ bên trong nó — Drupal cố ý
     không cho người dùng thấy. task.work_task giấu group_none như vậy. */
  const hiddenKeys = useMemo(() => {
    const s = new Set<string>()
    const walk = (g: FormGroup) => {
      g.children.forEach((c) => {
        s.add(c)
        const child = byId.get(c)
        if (child) walk(child)
      })
    }
    config.groups.filter((g) => g.hidden).forEach(walk)
    return s
  }, [config.groups, byId])

  /* Khoá đã được một nhóm nào đó nhận — phần còn lại là trường "rời". */
  const claimed = useMemo(() => {
    const s = new Set<string>()
    config.groups.forEach((g) => g.children.forEach((c) => s.add(c)))
    return s
  }, [config.groups])

  const visible = useMemo(
    () => config.fields.filter((f) => !hiddenKeys.has(f.key)),
    [config.fields, hiddenKeys],
  )

  /* Cấp gốc: nhóm không có cha + trường không thuộc nhóm nào, trộn theo weight. */
  const rootItems = useMemo(() => {
    const items: { key: string; weight: number; group?: FormGroup; field?: FormField }[] = []

    config.groups
      .filter((g) => !g.parent && !g.hidden)
      .forEach((g) => items.push({ key: g.id, weight: g.weight, group: g }))

    config.fields
      .filter((f) => !claimed.has(f.key) && !hiddenKeys.has(f.key))
      .forEach((f) => items.push({ key: f.key, weight: f.weight, field: f }))

    return items.sort((a, b) => a.weight - b.weight)
  }, [config.groups, config.fields, claimed, hiddenKeys])

  const missing = visible.filter((f) => {
    if (!f.required) return false
    const v = form[f.key]
    return v === '' || v === null || v === undefined || (Array.isArray(v) && !v.length)
  })

  /**
   * Chuẩn hoá giá trị TRƯỚC khi gửi lên Drupal.
   *
   * datetime: `<input type="datetime-local">` trả `2026-08-12T17:25` — KHÔNG có
   * giây. Trường `datetime` của Drupal đòi đúng `Y-m-d\TH:i:s` và trả lỗi
   * "The datetime value ... is invalid for the format" nếu thiếu. Phải thêm
   * `:00` ở đây chứ không phải ở từng trang, vì mọi biểu mẫu tự dựng đều dính.
   */
  const toWire = (values: Record<string, unknown>): Record<string, unknown> => {
    const out: Record<string, unknown> = {}

    config.fields.forEach((f) => {
      let v = values[f.key]

      if (f.control === 'datetime' && typeof v === 'string' && v !== '') {
        // Chấp nhận cả 'YYYY-MM-DDTHH:mm' lẫn 'YYYY-MM-DDTHH:mm:ss'.
        v = v.length === 16 ? `${v}:00` : v
      }

      out[f.key] = v
    })

    return out
  }

  const submit = () => {
    setTouched(true)
    if (missing.length || saving) return
    void onSubmit(toWire(form))
  }

  const err = (f: FormField) => {
    if (serverErrors?.[f.key]) return serverErrors[f.key]
    if (touched && missing.some((m) => m.key === f.key)) {
      return `Vui lòng nhập ${f.label.toLowerCase()}`
    }
    return undefined
  }

  /** Một trường + nhãn + lỗi. */
  const renderField = (f: FormField) => (
    <Field
      key={f.key}
      label={
        <>
          {f.label}
          {f.new && (
            <span className="sform-new" title="Generator vừa thêm — rà lại file YAML">
              mới
            </span>
          )}
        </>
      }
      required={f.required}
      hint={f.hint ?? f.description}
      error={err(f)}
    >
      <Control field={f} value={form[f.key]} onChange={(v) => set(f.key, v)} />
    </Field>
  )

  /**
   * Một nhóm, đệ quy xuống nhóm con.
   *
   * `children` của field_group đã đúng THỨ TỰ hiển thị nên đi thẳng theo mảng
   * đó, không sắp lại theo weight. Phần tử trong đó có thể là tên trường hoặc
   * id một nhóm con.
   */
  const renderGroup = (g: FormGroup): ReactNode => {
    if (g.hidden) return null

    const inner = g.children.map((childKey) => {
      const childGroup = byId.get(childKey)
      if (childGroup) return renderGroup(childGroup)
      const field = fieldById.get(childKey)
      return field && !hiddenKeys.has(childKey) ? renderField(field) : null
    })

    // bootstrap_grid → lưới N cột (`columns` = format_settings.width).
    // html_element → thẻ bọc, giữ nguyên lớp CSS gốc của Drupal.
    const isGrid = g.format === 'bootstrap_grid'
    const className = [isGrid ? 'sform-grid' : 'sform-el', g.classes].filter(Boolean).join(' ')

    return (
      <div
        key={g.id}
        className={className}
        style={isGrid ? ({ '--cols': g.columns ?? 1 } as CSSProperties) : undefined}
      >
        {g.show_label && g.label && <p className="sform-group__label">{g.label}</p>}
        {inner}
      </div>
    )
  }

  return (
    <div className="sform">
      {rootItems.map((item) =>
        item.group ? renderGroup(item.group) : item.field ? renderField(item.field) : null,
      )}

      <div className="sform-actions">
        {onCancel && (
          <Button variant="ghost" onClick={onCancel} disabled={saving}>
            Huỷ
          </Button>
        )}
        <Button variant="primary" onClick={submit} disabled={saving || !(config.writable || forceWritable)}>
          {saving ? 'Đang lưu…' : submitLabel}
        </Button>
      </div>

      {!config.writable && !forceWritable && (
        <p className="sform-note">
          <Icon name="info" size={16} /> File YAML khai <code>writable: false</code> — biểu mẫu chỉ
          để hiển thị. Việc lưu đi qua endpoint nghiệp vụ riêng của module.
        </p>
      )}
    </div>
  )
}

/* ----------------------------- Từng loại control -------------------------- */

function Control({
  field,
  value,
  onChange,
}: {
  field: FormField
  value: unknown
  onChange: (v: unknown) => void
}) {
  if (field.unsupported) {
    return (
      <p style={S.unsupported}>
        <Icon name="warning" size={16} /> Trường lồng ({field.field_type}) — cần màn hình riêng, chưa
        dựng tự động được.
      </p>
    )
  }

  const str = typeof value === 'string' ? value : ''

  switch (field.control) {
    case 'textarea':
      return <TextArea value={str} rows={4} onChange={(e) => onChange(e.target.value)} />

    case 'richtext':
      return <RichTextEditor value={str} onChange={onChange} minHeight={140} />

    case 'checkbox':
      return (
        <label style={S.check}>
          <input type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} />
          <span>{field.description || 'Có'}</span>
        </label>
      )

    case 'select':
    case 'radios':
      return (
        <Select
          disabled={field.disabled}
          value={str}
          onChange={(e) => onChange(e.target.value)}
          options={[
            { value: '', label: '- Không -' },
            ...(field.options ?? []).map((o) => ({ value: String(o.value), label: o.label })),
          ]}
        />
      )

    case 'datetime':
      return <TextInput type="datetime-local" value={str} onChange={(e) => onChange(e.target.value)} />

    case 'number':
      return <TextInput type="number" value={str} onChange={(e) => onChange(e.target.value)} />

    case 'email':
      return <TextInput type="email" value={str} onChange={(e) => onChange(e.target.value)} />

    case 'tel':
      return <TextInput type="tel" value={str} onChange={(e) => onChange(e.target.value)} />

    case 'rating':
      return <Rating value={Number(value) || 0} size={20} onChange={(v) => onChange(String(v))} />

    case 'slider':
      return (
        <>
          <input
            className="slider"
            type="range"
            min={0}
            max={100}
            step={5}
            value={Number(value) || 0}
            onChange={(e) => onChange(e.target.value)}
            style={{ '--pct': `${Number(value) || 0}%` } as CSSProperties}
          />
          <small style={S.muted}>{Number(value) || 0}%</small>
        </>
      )

    case 'duration':
      return <DurationField value={Number(value) || 0} onChange={(v) => onChange(String(v))} />

    case 'reference':
      return <ReferenceField field={field} value={value} onChange={onChange} />

    case 'file':
    case 'image':
      return <p style={S.muted}>Tải tệp chưa được hỗ trợ trong biểu mẫu tự dựng.</p>

    default:
      return <TextInput value={str} onChange={(e) => onChange(e.target.value)} />
  }
}

/** Thời lượng — Drupal lưu bằng PHÚT (duration_unit = 'minute'). */
function DurationField({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const d = Math.floor(value / 1440)
  const h = Math.floor((value % 1440) / 60)
  const m = value % 60
  const emit = (nd: number, nh: number, nm: number) => onChange(nd * 1440 + nh * 60 + nm)

  return (
    <div className="duration">
      <button className="duration__step" type="button" aria-label="Giảm 1 giờ"
        onClick={() => onChange(Math.max(0, value - 60))}>
        <Icon name="remove" size={16} />
      </button>
      <span className="duration__unit">
        <input className="duration__num num" type="number" min={0} value={d} aria-label="Số ngày"
          onChange={(e) => emit(Number(e.target.value), h, m)} />
        ngày
      </span>
      <span className="duration__unit">
        <input className="duration__num num" type="number" min={0} max={23} value={h} aria-label="Số giờ"
          onChange={(e) => emit(d, Number(e.target.value), m)} />
        giờ
      </span>
      <span className="duration__unit">
        <input className="duration__num num" type="number" min={0} max={59} value={m} aria-label="Số phút"
          onChange={(e) => emit(d, h, Number(e.target.value))} />
        phút
      </span>
      <button className="duration__step" type="button" aria-label="Tăng 1 giờ"
        onClick={() => onChange(value + 60)}>
        <Icon name="add" size={16} />
      </button>
    </div>
  )
}

/**
 * Trường tham chiếu — tải LƯỜI.
 *
 * Chỉ gọi API khi người dùng thật sự mở ô. Một biểu mẫu có 6 trường tham chiếu
 * mà tải hết lúc mở là 6 request cho thứ có thể không ai đụng tới.
 */
function ReferenceField({
  field,
  value,
  onChange,
}: {
  field: FormField
  value: unknown
  onChange: (v: unknown) => void
}) {
  const [options, setOptions] = useState<FormOption[]>(field.options ?? [])
  const [loaded, setLoaded] = useState(Boolean(field.options?.length))
  const [loading, setLoading] = useState(false)

  const api = field.reference?.options_api

  const load = () => {
    if (loaded || loading || !api) return
    setLoading(true)
    fetchReferenceOptions(api, '', 100)
      .then(setOptions)
      .catch(() => setOptions([]))
      .finally(() => {
        setLoaded(true)
        setLoading(false)
      })
  }

  // Chế độ sửa: đã có giá trị thì phải tải ngay, nếu không ô hiện rỗng dù dữ
  // liệu vẫn còn trên server.
  useEffect(() => {
    const has = Array.isArray(value) ? value.length > 0 : Boolean(value)
    if (has) load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (field.cardinality !== 1) {
    const selected = Array.isArray(value) ? (value as string[]) : []
    return (
      <select
        multiple
        className="input"
        style={S.multi}
        value={selected}
        onFocus={load}
        onChange={(e) => onChange(Array.from(e.target.selectedOptions).map((o) => o.value))}
      >
        {loading && <option disabled>Đang tải…</option>}
        {options.map((o) => (
          <option key={String(o.value)} value={String(o.value)}>
            {o.label}
          </option>
        ))}
      </select>
    )
  }

  return (
    <Select
      disabled={field.disabled}
      onFocus={load}
      value={typeof value === 'string' ? value : ''}
      onChange={(e) => onChange(e.target.value)}
      options={[
        { value: '', label: loading ? 'Đang tải…' : '- Không -' },
        ...options.map((o) => ({ value: String(o.value), label: o.label })),
      ]}
    />
  )
}

const S: Record<string, CSSProperties> = {
  actions: { display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 },
  check: { display: 'inline-flex', alignItems: 'center', gap: 8 },
  muted: { color: 'var(--text-tertiary)', fontSize: 12 },
  badge: {
    marginLeft: 6, padding: '0 6px', borderRadius: 4, fontSize: 10,
    background: 'var(--warning-soft)', color: 'var(--warning-strong)',
  },
  unsupported: {
    display: 'flex', alignItems: 'center', gap: 6,
    color: 'var(--warning-strong)', fontSize: 13, margin: 0,
  },
  note: {
    display: 'flex', alignItems: 'center', gap: 6,
    color: 'var(--text-tertiary)', fontSize: 12, margin: 0,
  },
  multi: { minHeight: 120 },
}
