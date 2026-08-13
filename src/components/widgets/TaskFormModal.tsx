import { useState, type CSSProperties } from 'react'
import Button from '../ui/Button'
import Field, { TextInput } from '../ui/Field'
import Icon from '../ui/Icon'
import Modal from '../ui/Modal'
import Rating from '../ui/Rating'
import Select from '../ui/Select'
import RichTextEditor from './RichTextEditor'
import type { Option, Task, TaskOptions, TaskPayload } from '../../api/tasks'
import './TaskModals.css'

/**
 * Giá trị nội bộ của form.
 *
 * Các trường tham chiếu giữ ID (number), KHÔNG giữ tên. Drupal lưu bằng id, và
 * tên thì trùng lặp được — riêng danh sách dự án đã có 241 mục. Bản dùng mock
 * trước đây giữ tên nên không lưu ngược lên server được.
 */
export interface TaskFormValue {
  title: string
  job: number | ''
  weight: string
  project: number | ''
  dplan: number | ''
  start: string
  end: string
  days: number
  hours: number
  minutes: number
  priority: number
  progress: number
  lead: number | ''
  assignee: number | ''
  supervisor: number | ''
  content: string
}

export interface TaskFormModalProps {
  open: boolean
  onClose: () => void
  /** Nhận payload đã sẵn sàng gửi thẳng lên /api/v1/tasks. */
  onSubmit: (payload: TaskPayload) => void | Promise<void>
  /** Có giá trị = chế độ sửa, bỏ trống = thêm mới. */
  task?: Task | null
  /** Danh sách lựa chọn từ /api/v1/tasks/options. */
  options: TaskOptions
  /** Lỗi theo từng trường do server trả về (ApiError.errors). */
  serverErrors?: Record<string, string>
  saving?: boolean
}

const EMPTY: TaskFormValue = {
  title: '',
  job: '',
  weight: '',
  project: '',
  dplan: '',
  start: '',
  end: '',
  days: 0,
  hours: 2,
  minutes: 0,
  priority: 3,
  progress: 5,
  lead: '',
  assignee: '',
  supervisor: '',
  content: '',
}

/** Thêm dòng trống đầu danh sách; Select của bộ UI nhận value là chuỗi. */
const withPlaceholder = (list: Option[], placeholder = '- Không -') => [
  { value: '', label: placeholder },
  ...list.map((o) => ({ value: String(o.value), label: o.label })),
]

/**
 * `datetime-local` chỉ chấp nhận đúng dạng `YYYY-MM-DDTHH:mm`.
 * Drupal trả `2025-08-05T01:44:00` (có giây) — không cắt thì ô input hiện rỗng
 * mà chẳng báo lỗi gì.
 */
const toLocalInput = (value?: string | null) => (value ? value.slice(0, 16) : '')

/** Chiều ngược lại: input local → chuỗi Drupal nhận (thêm giây). */
const toDrupalDate = (value: string) => (value ? `${value}:00` : null)

const initialValue = (task?: Task | null): TaskFormValue => {
  if (!task) return EMPTY

  // field_task_duration lưu bằng PHÚT — xác nhận từ js/date-range-duration.js
  // (duration_unit = 'minute'). Tách y hệt cách widget Drupal đang tách.
  const total = Number(task.duration ?? 0) || 0

  return {
    ...EMPTY,
    title: task.title,
    job: task.job?.id ?? '',
    weight: task.evaluation ?? '',
    project: task.project?.id ?? '',
    dplan: '',
    start: toLocalInput(task.startDate),
    end: toLocalInput(task.endDate),
    days: Math.floor(total / 1440),
    hours: Math.floor((total % 1440) / 60),
    minutes: total % 60,
    priority: Number(task.priority ?? 3) || 3,
    progress: task.progress,
    lead: task.lead?.[0]?.id ?? '',
    assignee: task.executors?.[0]?.id ?? '',
    supervisor: task.followers?.[0]?.id ?? '',
    content: task.content ?? '',
  }
}

/**
 * 05.3 · DATA ENTRY FORM — "Thêm nội dung Tác vụ".
 *
 * Dữ liệu vào từ /api/v1/tasks/options, lưu về /api/v1/tasks (POST) hoặc
 * /api/v1/tasks/{id} (PATCH). Trang cha mount kèm `key` nên state luôn sạch.
 */
export default function TaskFormModal({
  open,
  onClose,
  onSubmit,
  task,
  options,
  serverErrors,
  saving = false,
}: TaskFormModalProps) {
  const [form, setForm] = useState<TaskFormValue>(() => initialValue(task))
  const [touched, setTouched] = useState(false)

  const set = <K extends keyof TaskFormValue>(key: K, value: TaskFormValue[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const stepDuration = (delta: number) => {
    const total = Math.max(0, form.days * 1440 + form.hours * 60 + form.minutes + delta * 60)
    // Gộp một lần setState: gọi set() ba lần liên tiếp sẽ đọc `form` cũ ở cả ba
    // lần và chỉ lần cuối có tác dụng.
    setForm((prev) => ({
      ...prev,
      days: Math.floor(total / 1440),
      hours: Math.floor((total % 1440) / 60),
      minutes: total % 60,
    }))
  }

  const invalid = !form.title.trim() || !form.project

  const submit = () => {
    setTouched(true)
    if (invalid || saving) return

    const payload: TaskPayload = {
      title: form.title.trim(),
      project: Number(form.project),
      job: form.job === '' ? null : Number(form.job),
      evaluation: form.weight || null,
      dplan: form.dplan === '' ? null : Number(form.dplan),
      startDate: toDrupalDate(form.start),
      endDate: toDrupalDate(form.end),
      duration: form.days * 1440 + form.hours * 60 + form.minutes,
      priority: String(form.priority),
      progress: form.progress,
      // Ba trường này cardinality -1 ở Drupal nên gửi mảng. Form hiện cho chọn
      // một người; đổi sang multi-select thì chỉ cần bỏ lớp bọc mảng.
      lead: form.lead === '' ? [] : [Number(form.lead)],
      executors: form.assignee === '' ? [] : [Number(form.assignee)],
      followers: form.supervisor === '' ? [] : [Number(form.supervisor)],
      content: form.content || null,
    }

    void onSubmit(payload)
  }

  const err = (key: string, local?: string) => serverErrors?.[key] ?? local

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      className="task-form-modal"
      title={task ? 'Sửa nội dung Tác vụ' : 'Thêm nội dung Tác vụ'}
      subtitle="Trường có dấu * là bắt buộc"
      footer={
        <Button variant="primary" onClick={submit} disabled={saving}>
          {saving ? 'Đang lưu…' : 'Lưu'}
        </Button>
      }
    >
      <div className="form-grid">
        <Field
          className="form-grid__full"
          label="Tiêu đề"
          required
          htmlFor="task-title"
          hint="Tên hiển thị của tác vụ trên bảng công việc."
          error={err('title', touched && !form.title.trim() ? 'Vui lòng nhập tiêu đề tác vụ' : undefined)}
        >
          <TextInput
            id="task-title"
            value={form.title}
            placeholder="Ví dụ: [ERPCons] Dựng giao diện React"
            onChange={(e) => set('title', e.target.value)}
          />
        </Field>

        <Field
          label="Công việc"
          hint={
            options.jobs.length
              ? 'Chỉ hiển thị công việc đã được gán cho bạn trong cấu hình KPI.'
              : 'Bạn chưa được gán công việc nào trong cấu hình KPI.'
          }
          error={err('job')}
        >
          <Select
            options={withPlaceholder(options.jobs)}
            value={String(form.job)}
            disabled={!options.jobs.length}
            onChange={(e) => set('job', e.target.value === '' ? '' : Number(e.target.value))}
          />
        </Field>

        <Field label="Đánh giá tác vụ" error={err('evaluation')}>
          <Select
            options={withPlaceholder(options.weights)}
            value={form.weight}
            onChange={(e) => set('weight', e.target.value)}
          />
        </Field>

        <Field
          className="form-grid__full"
          label={`Dự án${options.projects.length ? ` (${options.projects.length})` : ''}`}
          required
          error={err('project', touched && !form.project ? 'Vui lòng chọn dự án' : undefined)}
        >
          <Select
            options={withPlaceholder(options.projects, '- Chọn dự án -')}
            value={String(form.project)}
            onChange={(e) => set('project', e.target.value === '' ? '' : Number(e.target.value))}
          />
        </Field>

        <Field className="form-grid__full" label="Liên kết với Dplan" error={err('dplan')}>
          <Select
            options={withPlaceholder(options.dplans)}
            value={String(form.dplan)}
            onChange={(e) => set('dplan', e.target.value === '' ? '' : Number(e.target.value))}
          />
        </Field>

        <Field label="Thời gian bắt đầu" error={err('startDate')}>
          <TextInput
            type="datetime-local"
            value={form.start}
            onChange={(e) => set('start', e.target.value)}
          />
        </Field>

        <Field label="Thời gian kết thúc" error={err('endDate')}>
          <TextInput
            type="datetime-local"
            value={form.end}
            onChange={(e) => set('end', e.target.value)}
          />
        </Field>

        {/* Chiếm trọn hàng: ba ô số + hai nút không đủ chỗ trong một nửa lưới,
            chữ "ngày/giờ/phút" sẽ đè lên số. */}
        <Field
          className="form-grid__full"
          label="Thời lượng"
          hint="Quy đổi ra phút khi lưu về Drupal."
          error={err('duration')}
        >
          <div className="duration">
            <button
              className="duration__step"
              type="button"
              aria-label="Giảm 1 giờ"
              onClick={() => stepDuration(-1)}
            >
              <Icon name="remove" size={16} />
            </button>
            <span className="duration__unit">
              <input
                className="duration__num num"
                type="number"
                min={0}
                value={form.days}
                onChange={(e) => set('days', Number(e.target.value))}
                aria-label="Số ngày"
              />
              ngày
            </span>
            <span className="duration__unit">
              <input
                className="duration__num num"
                type="number"
                min={0}
                max={23}
                value={form.hours}
                onChange={(e) => set('hours', Number(e.target.value))}
                aria-label="Số giờ"
              />
              giờ
            </span>
            <span className="duration__unit">
              <input
                className="duration__num num"
                type="number"
                min={0}
                max={59}
                value={form.minutes}
                onChange={(e) => set('minutes', Number(e.target.value))}
                aria-label="Số phút"
              />
              phút
            </span>
            <button
              className="duration__step"
              type="button"
              aria-label="Tăng 1 giờ"
              onClick={() => stepDuration(1)}
            >
              <Icon name="add" size={16} />
            </button>
          </div>
        </Field>

        <Field label="Độ ưu tiên" hint="Thang 1–5 sao, hiển thị trực tiếp trên card.">
          <Rating value={form.priority} size={20} onChange={(v) => set('priority', v)} />
        </Field>

        <Field
          label={
            <>
              Khối lượng hoàn thành <span className="num">{form.progress}%</span>
            </>
          }
          hint="Chuyển sang cột Hoàn thành/Thất bại sẽ tự đặt 100%."
        >
          <input
            className="slider"
            type="range"
            min={0}
            max={100}
            step={5}
            value={form.progress}
            onChange={(e) => set('progress', Number(e.target.value))}
            style={{ '--pct': `${form.progress}%` } as CSSProperties}
          />
        </Field>

        {(
          [
            ['lead', 'Người phụ trách'],
            ['assignee', 'Người thực hiện'],
            ['supervisor', 'Người giám sát'],
          ] as const
        ).map(([key, label]) => (
          <Field key={key} className="form-grid__full" label={label} error={err(key)}>
            <Select
              options={withPlaceholder(options.people, '- Chọn người -')}
              value={String(form[key])}
              onChange={(e) => set(key, e.target.value === '' ? '' : Number(e.target.value))}
            />
          </Field>
        ))}

        <Field className="form-grid__full" label="Nội dung công việc" error={err('content')}>
          <RichTextEditor
            value={form.content}
            onChange={(v) => set('content', v)}
            placeholder="Mô tả chi tiết yêu cầu, phạm vi và tiêu chí nghiệm thu..."
            minHeight={160}
          />
        </Field>
      </div>
    </Modal>
  )
}
