/**
 * API tác vụ — ánh xạ sang module Drupal `erp_task`.
 *
 * Bảng ánh xạ trường (giữ đồng bộ với TaskWriter::FIELD_MAP phía Drupal):
 *
 *   title      → title                              (bắt buộc)
 *   project    → field_work_task_project            (bắt buộc, id node)
 *   job        → field_work_task_job                (chỉ công việc KPI của bạn)
 *   evaluation → field_work_task_evaluation         (small|medium|large|very_large)
 *   dplan      → field_reference_plan_report        (id node Dplan)
 *   startDate  → field_work_task_start_date_time
 *   endDate    → field_work_task_end_date_time
 *   duration   → field_task_duration                (ĐƠN VỊ PHÚT)
 *   priority   → field_work_task_priority           (1–5 sao)
 *   progress   → field_work_task_process_complete   (0–100)
 *   lead       → field_work_task_lead               (mảng uid)
 *   executors  → field_work_task_executor           (mảng uid)
 *   followers  → field_work_task_followers          (mảng uid)
 *   content    → field_work_task_content_2
 *   state      → field_work_task_state
 */
import { apiRequest } from './client'

export interface Option {
  value: number | string
  label: string
}

export interface TaskRef {
  id: number
  label: string
}

export interface Task {
  id: number
  uuid: string
  title: string
  state: string
  stateLabel: string
  progress: number
  priority: string | null
  evaluation: string | null
  evaluationLabel: string | null
  project: TaskRef | null
  executors: TaskRef[]
  startDate: string | null
  endDate: string | null
  isOverdue: boolean
  createdBy: TaskRef | null
  created: number
  changed: number
  /* chỉ có ở bản chi tiết */
  content?: string | null
  lead?: TaskRef[]
  followers?: TaskRef[]
  job?: TaskRef | null
  duration?: string | null
  permissions?: { canEdit: boolean; canDelete: boolean }
}

/** Payload gửi lên khi tạo / sửa. Chỉ gửi khoá nào thực sự muốn đổi. */
export interface TaskPayload {
  title?: string
  project?: number
  job?: number | null
  propose?: number | null
  public?: boolean | null
  evaluation?: string | null
  dplan?: number | null
  startDate?: string | null
  endDate?: string | null
  duration?: number | null
  priority?: string | number | null
  progress?: number
  lead?: number[]
  executors?: number[]
  followers?: number[]
  content?: string | null
  state?: string
}

export interface TaskOptions {
  projects: Option[]
  jobs: Option[]
  dplans: Option[]
  people: Option[]
  weights: Option[]
  states: Option[]
}

export interface TaskFilters {
  scope?: 'mine' | 'all'
  state?: string | string[]
  project?: number
  executor?: number
  q?: string
  from?: string
  to?: string
  overdue?: boolean
  page?: number
  limit?: number
}

const toQuery = (filters: TaskFilters = {}) => {
  const p = new URLSearchParams()
  Object.entries(filters).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return
    // `state` lặp lại được: ?state=list&state=processing
    if (Array.isArray(v)) v.forEach((item) => p.append(k, String(item)))
    else p.append(k, String(v))
  })
  const qs = p.toString()
  return qs ? `?${qs}` : ''
}

/** Nguồn dữ liệu cho các ô select của form. Gọi một lần khi mở màn hình. */
export const fetchTaskOptions = () =>
  apiRequest<{ ok: true } & TaskOptions>('/api/v1/tasks/options?limit=500')

export const fetchTasks = (filters?: TaskFilters) =>
  apiRequest<{
    items: Task[]
    pager: { total: number; page: number; limit: number; pages: number }
  }>(`/api/v1/tasks${toQuery(filters)}`)

export const fetchBoard = (filters?: TaskFilters) =>
  apiRequest<{ columns: { state: string; label: string; count: number }[] }>(
    `/api/v1/tasks/board${toQuery(filters)}`,
  )

export const fetchTask = (id: number) =>
  apiRequest<{ task: Task }>(`/api/v1/tasks/${id}`)

export const createTask = (payload: TaskPayload) =>
  apiRequest<{ task: Task }>('/api/v1/tasks', { method: 'POST', body: payload })

export const updateTask = (id: number, payload: TaskPayload) =>
  apiRequest<{ task: Task }>(`/api/v1/tasks/${id}`, { method: 'PATCH', body: payload })

/**
 * Kéo thẻ sang cột khác.
 *
 * PHẢI đi qua endpoint riêng này, đừng dùng updateTask({state}) từ chỗ khác:
 * đây là nơi Drupal gọi lại hook `kanban_change_status_alter` — thứ ép tiến độ
 * về 100% và đồng bộ tiến độ ngược lên Dplan/Gantt. Bỏ qua thì thẻ vẫn sang cột
 * "Hoàn thành" nhưng biểu đồ Dplan đứng yên.
 */
export const changeTaskState = (id: number, state: string) =>
  apiRequest<{ task: Task; previousState: string | null; unchanged: boolean }>(
    `/api/v1/tasks/${id}/state`,
    { method: 'PATCH', body: { state } },
  )

export const deleteTask = (id: number) =>
  apiRequest<{ deleted: boolean; id: number }>(`/api/v1/tasks/${id}`, { method: 'DELETE' })
