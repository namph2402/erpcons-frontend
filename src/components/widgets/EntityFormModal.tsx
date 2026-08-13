import { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import Icon from '../ui/Icon'
import SchemaForm from './SchemaForm'
import {
  fetchFormConfig,
  fetchFormValues,
  submitEntityForm,
  unmapErrors,
  type FormConfig,
} from '../../api/formConfig'
import './TaskModals.css'

/**
 * Popup Thêm / Sửa dùng biểu mẫu tự dựng từ Drupal.
 *
 * Không biết gì về entity cụ thể: đưa `entityType` + `bundle` là nó tự tải mô tả
 * biểu mẫu (`/api/v1/form/...`) và giá trị bản ghi (`.../values/{id}`) rồi vẽ.
 * Màn hình nào cần form Thêm/Sửa cũng dùng lại được component này.
 *
 * VIỆC LƯU KHÔNG NẰM Ở ĐÂY. Component chỉ trả về giá trị theo tên trường Drupal
 * qua `onSubmit`; trang cha quyết định gửi đi đâu. Với tác vụ thì bắt buộc phải
 * qua /api/v1/tasks để hook kanban_change_status_alter còn chạy — xem
 * TaskBoardPage.
 */

export interface EntityFormModalProps {
  open: boolean
  onClose: () => void
  entityType: string
  bundle: string
  /** Có id = chế độ sửa, bỏ trống = thêm mới. */
  recordId?: number | null
  /**
   * Giá trị đặt sẵn khi THÊM MỚI, khoá theo tên trường Drupal.
   *
   * Ví dụ bấm "+" trên cột Kanban thì đặt sẵn trạng thái của cột đó.
   * Ở chế độ sửa, giá trị thật của bản ghi luôn thắng.
   */
  initialValues?: Record<string, unknown>
  /**
   * Tự lo việc lưu.
   *
   * Bỏ trống thì modal TỰ GỬI theo khai báo `submit` trong file YAML và gọi
   * `onSaved` với phản hồi — trang cha không phải nối tay endpoint nữa.
   */
  onSubmit?: (values: Record<string, unknown>) => void | Promise<void>
  /** Gọi sau khi modal tự lưu thành công. Nhận nguyên phản hồi của endpoint. */
  onSaved?: (result: unknown) => void
  serverErrors?: Record<string, string>
  saving?: boolean
  title?: string
  /** Bật nút Lưu dù YAML khai writable:false — khi trang cha tự lo việc lưu. */
  forceWritable?: boolean
}

export default function EntityFormModal({
  open,
  onClose,
  entityType,
  bundle,
  recordId,
  initialValues,
  onSubmit,
  onSaved,
  serverErrors,
  saving = false,
  title,
  forceWritable = false,
}: EntityFormModalProps) {
  const [config, setConfig] = useState<FormConfig | null>(null)
  const [values, setValues] = useState<Record<string, unknown> | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [ownErrors, setOwnErrors] = useState<Record<string, string>>({})

  /**
   * Gửi biểu mẫu.
   *
   * Ưu tiên `onSubmit` của trang cha; không có thì tự gửi theo `submit` khai
   * trong YAML. Nhờ vậy màn hình mới chỉ cần render modal là có đủ Thêm/Sửa.
   */
  const handleSubmit = async (v: Record<string, unknown>) => {
    if (onSubmit) {
      await onSubmit(v)
      return
    }
    if (!config) return

    setBusy(true)
    setOwnErrors({})
    setError(null)
    try {
      const result = await submitEntityForm(config, v, recordId)
      onSaved?.(result)
      onClose()
    } catch (e) {
      const err = e as Error & { errors?: Record<string, string> }
      // Lỗi server trả theo khoá payload; đổi ngược về tên trường để hiện đúng
      // dưới ô tương ứng.
      if (err.errors) setOwnErrors(unmapErrors(err.errors, config.submit?.map))
      else setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError(null)

    // Mô tả biểu mẫu và giá trị tải SONG SONG — chờ tuần tự thì popup mở chậm
    // gấp đôi ở chế độ sửa.
    Promise.all([
      fetchFormConfig(entityType, bundle),
      recordId ? fetchFormValues(entityType, bundle, recordId) : Promise.resolve(null),
    ])
      .then(([cfg, vals]) => {
        if (!alive) return
        setConfig(cfg)
        // Thêm mới: dùng initialValues. Sửa: giá trị thật của bản ghi thắng.
        setValues(vals?.values ? { ...initialValues, ...vals.values } : initialValues)
      })
      .catch((e: Error) => alive && setError(e.message))
      .finally(() => alive && setLoading(false))

    return () => {
      alive = false
    }
  }, [entityType, bundle, recordId])

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      className="task-form-modal"
      title={title ?? (recordId ? 'Sửa nội dung' : 'Thêm nội dung')}
      subtitle={config ? `${config.label} · trường có dấu * là bắt buộc` : undefined}
    >
      {loading && <p style={{ color: 'var(--text-tertiary)' }}>Đang tải biểu mẫu…</p>}

      {error && (
        <p style={{ color: 'var(--danger)', display: 'flex', gap: 6, alignItems: 'center' }}>
          <Icon name="error" size={18} /> {error}
        </p>
      )}

      {config && !loading && (
        <SchemaForm
          // Mount lại khi đổi bản ghi để state không dính giá trị cũ.
          key={`${entityType}/${bundle}/${recordId ?? 'new'}`}
          config={config}
          value={values}
          onSubmit={handleSubmit}
          onCancel={onClose}
          serverErrors={serverErrors ?? ownErrors}
          saving={saving || busy}
          forceWritable={forceWritable}
          submitLabel={recordId ? 'Cập nhật' : 'Tạo mới'}
        />
      )}
    </Modal>
  )
}
