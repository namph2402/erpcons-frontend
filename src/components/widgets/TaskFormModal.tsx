import { useState, type CSSProperties } from 'react'
import Button from '../ui/Button'
import Field, { TextInput } from '../ui/Field'
import Icon from '../ui/Icon'
import Modal from '../ui/Modal'
import Rating from '../ui/Rating'
import Select from '../ui/Select'
import RichTextEditor from './RichTextEditor'
import type { BoardTask } from '../../types'
import './TaskModals.css'

export interface TaskFormValue {
  title: string
  work: string
  weight: string
  project: string
  dplan: string
  start: string
  end: string
  days: number
  hours: number
  minutes: number
  priority: number
  progress: number
  owner: string
  assignee: string
  supervisor: string
  content: string
}

export interface TaskFormModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (value: TaskFormValue) => void
  /** Có giá trị = chế độ sửa, bỏ trống = thêm mới */
  task?: BoardTask | null
  projects: string[]
  workTypes: string[]
  weights: string[]
  people: string[]
  dplans: string[]
}

const EMPTY: TaskFormValue = {
  title: '',
  work: '',
  weight: '',
  project: '',
  dplan: '',
  start: '2026-08-10T12:00',
  end: '2026-08-10T14:00',
  days: 0,
  hours: 2,
  minutes: 0,
  priority: 3,
  progress: 5,
  owner: '',
  assignee: '',
  supervisor: '',
  content: '',
}

const toOptions = (list: string[], placeholder = '- Không -') => [
  { value: '', label: placeholder },
  ...list.map((v) => ({ value: v, label: v })),
]

/**
 * 05.3 · DATA ENTRY FORM — "Thêm nội dung Tác vụ".
 * Bố cục label trên · control dưới, nhóm theo khối thông tin, action bar cuối form.
 * Trang cha chỉ mount component khi mở popup (kèm `key`) nên state luôn khởi tạo sạch.
 */
const initialValue = (task?: BoardTask | null): TaskFormValue =>
  task
    ? {
        ...EMPTY,
        title: task.title,
        work: task.work ?? '',
        weight: task.weight ?? '',
        project: task.project,
        dplan: task.dplan ?? '',
        priority: task.rating,
        progress: task.progress,
        owner: task.owner ?? '',
        assignee: task.assignee,
        supervisor: task.supervisor ?? '',
        content: task.content ?? '',
      }
    : EMPTY

export default function TaskFormModal({
  open,
  onClose,
  onSubmit,
  task,
  projects,
  workTypes,
  weights,
  people,
  dplans,
}: TaskFormModalProps) {
  const [form, setForm] = useState<TaskFormValue>(() => initialValue(task))
  const [touched, setTouched] = useState(false)

  const set = <K extends keyof TaskFormValue>(key: K, value: TaskFormValue[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const stepDuration = (delta: number) => {
    const total = Math.max(0, form.days * 1440 + form.hours * 60 + form.minutes + delta * 60)
    set('days', Math.floor(total / 1440))
    set('hours', Math.floor((total % 1440) / 60))
    set('minutes', total % 60)
  }

  const invalid = !form.title.trim() || !form.project

  const submit = () => {
    setTouched(true)
    if (invalid) return
    onSubmit(form)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      className="task-form-modal"
      title={task ? 'Sửa nội dung Tác vụ' : 'Thêm nội dung Tác vụ'}
      subtitle="Trường có dấu * là bắt buộc"
      footer={
        <Button variant="primary" onClick={submit}>
          Lưu
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
          error={touched && !form.title.trim() ? 'Vui lòng nhập tiêu đề tác vụ' : undefined}
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
          hint="Chỉ hiển thị công việc đã được gán cho bạn trong cấu hình KPI."
        >
          <Select
            options={toOptions(workTypes)}
            value={form.work}
            onChange={(e) => set('work', e.target.value)}
          />
        </Field>

        <Field label="Đánh giá tác vụ">
          <Select
            options={toOptions(weights)}
            value={form.weight}
            onChange={(e) => set('weight', e.target.value)}
          />
        </Field>

        <Field
          className="form-grid__full"
          label="Dự án"
          required
          error={touched && !form.project ? 'Vui lòng chọn dự án' : undefined}
        >
          <Select
            options={toOptions(projects, '- Chọn dự án -')}
            value={form.project}
            onChange={(e) => set('project', e.target.value)}
          />
        </Field>

        <Field className="form-grid__full" label="Liên kết với Dplan">
          <Select
            options={toOptions(dplans)}
            value={form.dplan}
            onChange={(e) => set('dplan', e.target.value)}
          />
        </Field>

        <Field label="Thời gian bắt đầu">
          <TextInput
            type="datetime-local"
            value={form.start}
            onChange={(e) => set('start', e.target.value)}
          />
        </Field>

        <Field label="Thời lượng">
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

        <Field label="Thời gian kết thúc">
          <TextInput
            type="datetime-local"
            value={form.end}
            onChange={(e) => set('end', e.target.value)}
          />
        </Field>

        <Field label="Độ ưu tiên" hint="Thang 1–5 sao, hiển thị trực tiếp trên card.">
          <Rating value={form.priority} size={20} onChange={(v) => set('priority', v)} />
        </Field>

        <Field
          className="form-grid__full"
          label={
            <>
              Khối lượng hoàn thành <span className="num">{form.progress}%</span>
            </>
          }
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

        <Field className="form-grid__full" label="Người phụ trách">
          <Select
            options={toOptions(people, '- Chọn người -')}
            value={form.owner}
            onChange={(e) => set('owner', e.target.value)}
          />
        </Field>

        <Field className="form-grid__full" label="Người thực hiện">
          <Select
            options={toOptions(people, '- Chọn người -')}
            value={form.assignee}
            onChange={(e) => set('assignee', e.target.value)}
          />
        </Field>

        <Field className="form-grid__full" label="Người giám sát">
          <Select
            options={toOptions(people, '- Chọn người -')}
            value={form.supervisor}
            onChange={(e) => set('supervisor', e.target.value)}
          />
        </Field>

        <Field className="form-grid__full" label="Nội dung công việc">
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
