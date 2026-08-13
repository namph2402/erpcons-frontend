/**
 * Mô tả biểu mẫu — đọc từ file `config/custom/{entity}_form_{bundle}.yml` của Drupal.
 *
 * Drupal đọc `core.entity_form_display` MỘT LẦN rồi sinh ra file YAML; API chỉ
 * đọc file đó. Muốn sửa form thì sửa file, không phải sửa React và cũng không
 * phải sửa Drupal.
 *
 * ============================ CHỐNG GỌI LẶP ============================
 * Ba tầng, từ rẻ tới đắt:
 *  1. inFlight   — hai component cùng hỏi một biểu mẫu chỉ tạo MỘT request.
 *  2. HTTP cache — server trả `private, max-age=600` + ETag; trong 10 phút
 *                  trình duyệt tự trả lời, hết hạn thì chỉ tốn một 304 rỗng
 *                  (đo thật: 0 byte thay vì 7 KB).
 *  3. Đệm server — file chỉ đọc lại khi bạn sinh lại hoặc sửa tay.
 * =======================================================================
 */
import { apiRequest } from './client'

export interface FormOption {
  value: string | number
  label: string
}

export interface FormReference {
  target_type: string | null
  target_bundles: string[]
  /** Đường dẫn riêng của trường này — ghi trong YAML, sửa được. */
  options_api: string
}

export interface FormField {
  /** Khoá máy, do client gán từ khoá của map (YAML không lặp lại nó). */
  key: string
  label: string
  description?: string
  /** text · textarea · richtext · number · slider · rating · duration ·
   *  datetime · daterange · select · radios · checkbox · reference · file ·
   *  image · email · tel · link · address · paragraphs · datatable */
  control: string
  field_type: string
  widget: string
  required: boolean
  /** -1 = không giới hạn */
  cardinality: number
  weight: number
  /** Id nhóm chứa trường này (nếu có) */
  group?: string
  /** Có sẵn khi control là select/radios */
  options?: FormOption[]
  reference?: FormReference
  /** Trường lồng (paragraph, data_field) — chưa dựng tự động được */
  unsupported?: boolean
  /** Generator vừa thêm ở lần sinh gần nhất — nhắc bạn rà lại file YAML */
  new?: boolean
  /** Sửa tay được trong YAML */
  hint?: string
  disabled?: boolean
}

export interface FormGroup {
  id: string
  label: string
  parent: string | null
  /** bootstrap_grid = lưới N cột · html_element = thẻ bọc */
  format: string | null
  weight: number
  /** ĐÃ đúng thứ tự hiển thị; phần tử là tên trường HOẶC id nhóm con */
  children: string[]
  /** Số cột, lấy từ format_settings.width của Drupal */
  columns: number | null
  /** Lớp CSS gốc (d-flex, justify-content-between…) */
  classes: string
  /** Thẻ bọc cho html_element (div/section…) */
  element: string | null
  show_label: boolean
  /** classes có 'd-none' — Drupal cố ý giấu nhóm này */
  hidden: boolean
}

export interface FormSubmitRoute {
  method: 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  /** `{id}` được thay bằng id bản ghi khi sửa/xoá */
  path: string
}

/**
 * Nơi gửi dữ liệu, khai trong file YAML.
 *
 * Khai ở file thay vì hard-code trong React: đổi endpoint hay đổi tên khoá chỉ
 * cần sửa YAML. `map` là tên trường Drupal → khoá payload mà endpoint đó nhận;
 * bỏ trống thì gửi nguyên tên trường Drupal.
 */
export interface FormSubmit {
  create?: FormSubmitRoute
  update?: FormSubmitRoute
  delete?: FormSubmitRoute
  map?: Record<string, string>
}

export interface FormConfig {
  entityType: string
  bundle: string
  formMode: string
  label: string
  writable: boolean
  /** null = biểu mẫu chỉ để hiển thị, trang cha tự lo việc lưu */
  submit: FormSubmit | null
  groups: FormGroup[]
  /** Đã sắp theo weight và gán sẵn `key` */
  fields: FormField[]
}

/** Dạng thô server trả về (fields/groups là map, không phải mảng). */
interface RawForm {
  entity_type: string
  bundle: string
  form_mode: string
  label: string
  writable: boolean
  submit: FormSubmit | null
  groups: Record<string, Omit<FormGroup, 'id'>>
  fields: Record<string, Omit<FormField, 'key'>>
}

/**
 * Map → mảng, và sắp theo weight.
 *
 * YAML dùng map để bạn sửa tay cho dễ (tìm theo tên trường); React thì cần
 * mảng có thứ tự. Chuyển ở đây một lần thay vì rải khắp component.
 */
const normalize = (raw: RawForm): FormConfig => ({
  entityType: raw.entity_type,
  bundle: raw.bundle,
  formMode: raw.form_mode,
  label: raw.label,
  writable: Boolean(raw.writable),
  submit: raw.submit ?? null,
  groups: Object.entries(raw.groups ?? {})
    .map(([id, g]) => ({ ...g, id }))
    .sort((a, b) => a.weight - b.weight),
  fields: Object.entries(raw.fields ?? {})
    .map(([key, f]) => ({ ...f, key }))
    .sort((a, b) => a.weight - b.weight),
})

/* ------------------------------- Bộ nhớ đệm ------------------------------ */

/**
 * CỐ Ý CHỈ ĐỆM TRONG BỘ NHỚ, KHÔNG DÙNG sessionStorage.
 *
 * Bản trước có thêm tầng sessionStorage và nó đã gây lỗi thật: khi file YAML
 * thêm khối `submit`, trình duyệt vẫn phục vụ bản cache CŨ (không có `submit`)
 * qua cả F5 — form báo "chưa khai submit" trong khi API trả đủ. sessionStorage
 * không có cách nào biết cấu trúc file đã đổi.
 *
 * Không mất gì khi bỏ, vì HTTP cache đã làm đúng việc đó và làm tốt hơn:
 * server trả `Cache-Control: private, max-age=600` nên trong 10 phút trình
 * duyệt tự trả lời không chạm mạng, hết hạn thì `ETag` khiến lần hỏi lại chỉ
 * tốn một 304 rỗng (đo thật: 0 byte thay vì 7 KB). Khác biệt then chốt: HTTP
 * cache CÓ xác thực lại, sessionStorage thì không.
 *
 * Hai tầng còn lại vẫn giữ vì chúng giải quyết việc khác:
 *   MEM       — tránh dựng lại object trong một phiên xem trang.
 *   IN_FLIGHT — hai component cùng hỏi một biểu mẫu chỉ tạo MỘT request.
 */
const MEM = new Map<string, FormConfig>()
const IN_FLIGHT = new Map<string, Promise<FormConfig>>()

/** Xoá đệm — gọi sau khi bạn sinh lại hoặc sửa file YAML. */
export function clearFormCache(entityType?: string, bundle?: string) {
  if (entityType && bundle) {
    MEM.delete(`${entityType}/${bundle}`)
    return
  }
  MEM.clear()
}

/* --------------------------------- Gọi API -------------------------------- */

export interface FormIndexItem {
  key: string
  entityType: string
  bundle: string
  label: string
  writable: boolean
  fields: number
}

/** Danh mục biểu mẫu đã có file và tài khoản này được phép dùng. */
export const fetchFormIndex = () => apiRequest<{ items: FormIndexItem[] }>('/api/v1/form')

/** Lấy mô tả một biểu mẫu, đi qua cả ba tầng đệm phía client. */
export async function fetchFormConfig(entityType: string, bundle: string): Promise<FormConfig> {
  const key = `${entityType}/${bundle}`

  const mem = MEM.get(key)
  if (mem) return mem

  const flying = IN_FLIGHT.get(key)
  if (flying) return flying

  const promise = apiRequest<{ form: RawForm }>(`/api/v1/form/${entityType}/${bundle}`)
    .then((res) => {
      const form = normalize(res.form)
      MEM.set(key, form)
      return form
    })
    .finally(() => IN_FLIGHT.delete(key))

  IN_FLIGHT.set(key, promise)
  return promise
}

/**
 * Giá trị hiện tại của một bản ghi, khoá theo đúng tên trường trong YAML.
 *
 * KHÔNG đệm: dữ liệu nghiệp vụ đổi liên tục, chỉ mô tả biểu mẫu mới đáng đệm.
 */
export const fetchFormValues = (entityType: string, bundle: string, id: number | string) =>
  apiRequest<{ values: Record<string, unknown> }>(
    `/api/v1/form/${entityType}/${bundle}/values/${id}`,
  )

/**
 * Danh sách cho một trường tham chiếu.
 *
 * Đường dẫn lấy từ chính `field.reference.options_api` trong YAML — muốn một
 * trường lấy dữ liệu đã lọc theo nghiệp vụ thì sửa đường dẫn đó trong file, chứ
 * không sửa ở đây.
 *
 * Đệm 60 giây theo (đường dẫn + từ khoá): người dùng gõ rồi xoá rồi gõ lại cùng
 * một chữ là chuyện thường.
 */
const OPT_CACHE = new Map<string, { at: number; rows: FormOption[] }>()
const OPT_TTL = 60_000

export async function fetchReferenceOptions(
  optionsApi: string,
  q = '',
  limit = 50,
): Promise<FormOption[]> {
  const url = `${optionsApi}?q=${encodeURIComponent(q)}&limit=${limit}`

  const hit = OPT_CACHE.get(url)
  if (hit && Date.now() - hit.at < OPT_TTL) return hit.rows

  const res = await apiRequest<{ options: FormOption[] }>(url)
  OPT_CACHE.set(url, { at: Date.now(), rows: res.options })
  return res.options
}

/* --------------------------------- Gửi đi --------------------------------- */

/**
 * Áp bảng `submit.map` của YAML: tên trường Drupal → khoá payload.
 *
 * Không có `map` thì gửi nguyên tên trường Drupal — đúng cho endpoint ghi tổng
 * quát. Trường KHÔNG có trong `map` bị bỏ qua có chủ đích: endpoint nghiệp vụ
 * thường chỉ nhận một tập khoá nhất định, gửi thừa chỉ tổ 422.
 */
export function applySubmitMap(
  values: Record<string, unknown>,
  map?: Record<string, string>,
): Record<string, unknown> {
  if (!map) return values

  const out: Record<string, unknown> = {}
  Object.entries(values).forEach(([fieldName, v]) => {
    const key = map[fieldName]
    if (key) out[key] = v
  })
  return out
}

/** Đổi lỗi server (khoá payload) ngược về tên trường, để hiện đúng dưới ô. */
export function unmapErrors(
  errors: Record<string, string>,
  map?: Record<string, string>,
): Record<string, string> {
  if (!map) return errors

  const reverse = new Map(Object.entries(map).map(([field, key]) => [key, field]))
  const out: Record<string, string> = {}
  Object.entries(errors).forEach(([key, message]) => {
    out[reverse.get(key) ?? key] = message
  })
  return out
}

/**
 * Gửi biểu mẫu theo đúng khai báo `submit` trong YAML.
 *
 * Trả về nguyên phản hồi của endpoint để trang cha cập nhật trạng thái tại chỗ,
 * khỏi phải tải lại danh sách.
 */
export async function submitEntityForm(
  config: FormConfig,
  values: Record<string, unknown>,
  recordId?: number | null,
): Promise<unknown> {
  const submit = config.submit
  if (!submit) {
    throw new Error('Biểu mẫu này chưa khai `submit` trong file YAML.')
  }

  const route = recordId ? submit.update : submit.create
  if (!route) {
    throw new Error(
      recordId ? 'Biểu mẫu chưa khai `submit.update`.' : 'Biểu mẫu chưa khai `submit.create`.',
    )
  }

  return apiRequest(route.path.replace('{id}', String(recordId ?? '')), {
    method: route.method as 'POST' | 'PATCH' | 'DELETE',
    body: applySubmitMap(values, submit.map),
  })
}

/** Xoá một bản ghi theo khai báo `submit.delete`. */
export async function deleteEntityRecord(config: FormConfig, recordId: number): Promise<unknown> {
  const route = config.submit?.delete
  if (!route) throw new Error('Biểu mẫu chưa khai `submit.delete`.')

  return apiRequest(route.path.replace('{id}', String(recordId)), {
    method: route.method as 'DELETE',
  })
}
