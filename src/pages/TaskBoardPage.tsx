import { useCallback, useEffect, useMemo, useState } from 'react'
import { AppLayout } from '../components/layout'
import {
  Avatar,
  Badge,
  Button,
  Card,
  DataTable,
  Icon,
  ProgressBar,
  Rating,
  SearchInput,
  Select,
  type Column,
} from '../components/ui'
import {
  EntityFormModal,
  NotificationDrawer,
  TaskBoard,
  TaskDetailModal,
  type BoardTone,
} from '../components/widgets'
import type { BoardColumn } from '../components/widgets/TaskBoard'
import { appFooterNav, appNav } from '../data/navigation'
import { notifications, personalUser } from '../data/mock'
import LogoutButton from '../auth/LogoutButton'
import { useUiUser } from '../auth/useUiUser'
import {
  changeTaskState,
  deleteTask,
  fetchTaskOptions,
  fetchTasks,
  type Task,
  type TaskOptions,
} from '../api/tasks'
import type { BoardTask } from '../types'
import './pages.css'
import './taskBoard.css'

const STATUS_BADGE: Record<BoardTone, 'neutral' | 'info' | 'success' | 'warning' | 'danger'> = {
  neutral: 'neutral',
  warning: 'warning',
  info: 'info',
  success: 'success',
  danger: 'danger',
}

/**
 * Màu cột theo mã trạng thái của Drupal.
 *
 * Cột được dựng từ /api/v1/tasks/options (trường field_work_task_state), KHÔNG
 * hard-code như bản mock — nhờ vậy thêm một trạng thái ở Drupal là giao diện tự
 * có cột mới. Bản mock trước đây chỉ có 4 cột và THIẾU HẲN cột "Thất bại".
 */
const STATE_TONE: Record<string, BoardTone> = {
  list: 'neutral',
  need_to_done: 'warning',
  processing: 'info',
  completed: 'success',
  failure: 'danger',
}

const EMPTY_OPTIONS: TaskOptions = {
  projects: [],
  jobs: [],
  dplans: [],
  people: [],
  weights: [],
  states: [],
}

const fmtDate = (value?: string | null) => {
  if (!value) return '—'
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString('vi-VN')
}

const fmtDateTime = (value?: string | null) => {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return `${d.toLocaleDateString('vi-VN')} - ${d.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  })}`
}

/** field_task_duration (phút) → "2d 3h 15m". */
const fmtDuration = (minutes?: string | null) => {
  const total = Number(minutes ?? 0) || 0
  if (!total) return undefined
  const d = Math.floor(total / 1440)
  const h = Math.floor((total % 1440) / 60)
  const m = total % 60
  return [d && `${d}d`, h && `${h}h`, m && `${m}m`].filter(Boolean).join(' ')
}

/** BoardTask.weight là union hẹp — "Rất lớn" của Drupal không có chỗ, bỏ qua. */
const toWeight = (label?: string | null): BoardTask['weight'] =>
  label === 'Lớn' || label === 'Trung bình' || label === 'Nhỏ' ? label : undefined

/**
 * Task (API) → BoardTask (kiểu của giao diện).
 *
 * Giữ lớp chuyển đổi này để TaskBoard / DataTable / TaskDetailModal không phải
 * sửa gì. `id` đổi sang chuỗi vì BoardTask khai `id: string`, nhưng mọi lời gọi
 * API đều dùng lại số — xem `Number(task.id)` ở các handler bên dưới.
 */
const toBoardTask = (t: Task): BoardTask => ({
  id: String(t.id),
  title: t.title,
  status: t.state,
  project: t.project?.label ?? '—',
  work: t.job?.label,
  weight: toWeight(t.evaluationLabel),
  owner: t.lead?.[0]?.label,
  supervisor: t.followers?.[0]?.label,
  assignee: t.executors?.[0]?.label ?? '—',
  progress: t.progress,
  date: fmtDate(t.endDate),
  rating: Number(t.priority ?? 0) || 0,
  start: fmtDateTime(t.startDate),
  end: fmtDateTime(t.endDate),
  duration: fmtDuration(t.duration),
  overdue: t.isOverdue ? 'Quá hạn' : undefined,
  content: t.content ?? undefined,
  comments: [],
  files: [],
})

/** Tác vụ cá nhân — 03.10 Board View, dữ liệu lấy từ module Drupal erp_task */
export default function TaskBoardPage() {
  const sessionUser = useUiUser()

  const [tasks, setTasks] = useState<Task[]>([])
  const [options, setOptions] = useState<TaskOptions>(EMPTY_OPTIONS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [view, setView] = useState<'board' | 'list'>('board')
  const [query, setQuery] = useState('')
  const [project, setProject] = useState('')
  const [assignee, setAssignee] = useState('')
  const [scope, setScope] = useState<'mine' | 'all'>('mine')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [targetColumn, setTargetColumn] = useState('list')
  const [detail, setDetail] = useState<Task | null>(null)

  /* ------------------------------ Nạp dữ liệu ----------------------------- */

  const loadTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchTasks({
        scope,
        project: project ? Number(project) : undefined,
        executor: assignee ? Number(assignee) : undefined,
        q: query.trim() || undefined,
        // Bảng Kanban hiển thị tất cả cột nên lấy trần một lần; khi dữ liệu lớn
        // hơn thì chuyển sang tải theo từng cột (API đã hỗ trợ lọc ?state=).
        limit: 100,
      })
      setTasks(res.items)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [scope, project, assignee, query])

  /* Options chỉ đổi khi cấu hình Drupal đổi — nạp một lần cho cả trang, KHÔNG
     đặt trong modal vì modal được mount lại kèm `key` mỗi lần mở. */
  useEffect(() => {
    fetchTaskOptions()
      .then((data) =>
        setOptions({
          projects: data.projects ?? [],
          jobs: data.jobs ?? [],
          dplans: data.dplans ?? [],
          people: data.people ?? [],
          weights: data.weights ?? [],
          states: data.states ?? [],
        }),
      )
      .catch((e: Error) => setError(e.message))
  }, [])

  /* Gõ vào ô tìm kiếm thì hoãn 350ms rồi mới gọi API, tránh bắn một request mỗi
     ký tự. Các bộ lọc khác đổi thì gọi ngay. */
  useEffect(() => {
    const t = setTimeout(() => void loadTasks(), 350)
    return () => clearTimeout(t)
  }, [loadTasks])

  /* -------------------------------- Dẫn xuất ------------------------------ */

  const columns: BoardColumn[] = useMemo(
    () =>
      options.states.map((s) => ({
        id: String(s.value),
        label: s.label,
        tone: STATE_TONE[String(s.value)] ?? 'neutral',
      })),
    [options.states],
  )

  const statusLabel = useMemo(() => {
    const map: Record<string, string> = {}
    options.states.forEach((s) => (map[String(s.value)] = s.label))
    return map
  }, [options.states])

  const boardTasks = useMemo(() => tasks.map(toBoardTask), [tasks])

  const toneOf = useCallback(
    (status: string): BoardTone => columns.find((c) => c.id === status)?.tone ?? 'neutral',
    [columns],
  )

  /* ------------------------------- Hành động ------------------------------ */

  const openCreate = (columnId = 'list') => {
    setEditingId(null)
    setTargetColumn(columnId)
    setFormOpen(true)
  }

  /**
   * Mở form sửa.
   *
   * Không cần gọi /api/v1/tasks/{id} nữa: EntityFormModal tự lấy giá trị qua
   * /api/v1/form/task/work_task/values/{id}, đúng khoá mà biểu mẫu dùng.
   */
  const openEdit = (t: BoardTask) => {
    setDetail(null)
    setEditingId(Number(t.id))
    setFormOpen(true)
  }

  /**
   * Sau khi modal lưu xong — ghép kết quả vào danh sách TẠI CHỖ.
   *
   * Không gọi lại loadTasks(): endpoint đã trả về bản ghi vừa lưu, tải lại toàn
   * bộ danh sách chỉ tốn thêm một vòng mạng và làm bảng nháy. Tạo mới thì chèn
   * lên đầu, sửa thì thay đúng phần tử.
   */
  const onSaved = (result: unknown) => {
    const saved = (result as { task?: Task })?.task
    if (!saved) return

    setTasks((prev) => {
      const exists = prev.some((t) => t.id === saved.id)
      return exists ? prev.map((t) => (t.id === saved.id ? saved : t)) : [saved, ...prev]
    })
    setEditingId(null)
  }

  /**
   * Kéo thẻ sang cột khác.
   *
   * PHẢI đi qua changeTaskState (endpoint /state) chứ không phải updateTask:
   * chỉ đường đó mới kích hoạt lại hook `kanban_change_status_alter` của Drupal
   * — thứ ép tiến độ về 100% và đồng bộ tiến độ ngược lên Dplan/Gantt.
   */
  const move = async (taskId: string, columnId: string) => {
    const id = Number(taskId)
    const before = tasks

    // Cập nhật lạc quan để thẻ nhảy cột ngay, không chờ mạng.
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, state: columnId } : t)))

    try {
      const res = await changeTaskState(id, columnId)
      // Lấy lại bản server trả về: hook có thể đã sửa thêm (tiến độ = 100%).
      setTasks((prev) => prev.map((t) => (t.id === id ? res.task : t)))
    } catch (e) {
      setTasks(before) // hoàn tác
      setError((e as Error).message)
    }
  }

  const remove = async (t: BoardTask) => {
    if (!window.confirm(`Xoá tác vụ "${t.title}"?`)) return
    try {
      await deleteTask(Number(t.id))
      setTasks((prev) => prev.filter((x) => x.id !== Number(t.id)))
      setDetail(null)
    } catch (e) {
      setError((e as Error).message)
    }
  }

  /* ---------------------------- List view (03.10) -------------------------- */

  const tableColumns: Column<BoardTask & Record<string, unknown>>[] = [
    {
      key: 'title',
      header: 'Tác vụ',
      render: (t) => (
        <div className="tlist__title">
          <p className="tlist__name truncate">{t.title}</p>
          <p className="tlist__code num">#{t.id}</p>
        </div>
      ),
    },
    { key: 'project', header: 'Dự án', width: '150px' },
    {
      key: 'assignee',
      header: 'Người thực hiện',
      width: '190px',
      render: (t) => (
        <span className="tlist__person">
          <Avatar name={t.assignee} size={24} />
          {t.assignee}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Trạng thái',
      width: '150px',
      render: (t) => (
        <Badge tone={STATUS_BADGE[toneOf(t.status)]} dot>
          {statusLabel[t.status] ?? t.status}
        </Badge>
      ),
    },
    {
      key: 'progress',
      header: 'Tiến độ',
      width: '160px',
      render: (t) => (
        <ProgressBar
          value={t.progress}
          tone={t.progress === 100 ? 'success' : 'info'}
          size="sm"
          showValue
        />
      ),
    },
    {
      key: 'rating',
      header: 'Ưu tiên',
      width: '110px',
      render: (t) => <Rating value={t.rating} size={16} />,
    },
    { key: 'date', header: 'Hạn', width: '110px', align: 'right' },
  ]

  return (
    <AppLayout
      navGroups={appNav}
      sidebarFooterItems={appFooterNav}
      activeId="tasks"
      user={sessionUser ?? personalUser}
      topbarActions={<LogoutButton />}
      contained={false}
      notificationCount={12}
      searchPlaceholder="Tìm kiếm (Công việc, tài liệu, đồng nghiệp...)"
      drawerOpen={drawerOpen}
      onOpenDrawer={() => setDrawerOpen(true)}
      onCloseDrawer={() => setDrawerOpen(false)}
      drawer={<NotificationDrawer items={notifications} onClose={() => setDrawerOpen(false)} />}
      mobileNavActiveId="tasks"
      mobileFab={{ icon: 'add', label: 'Thêm tác vụ', onClick: () => openCreate() }}
    >
      <div className="tboard-page">
        <header className="tboard-bar">
          <span className="tboard-bar__icon">
            <Icon name="view_kanban" size={20} />
          </span>
          <h1 className="tboard-bar__title">Tác vụ</h1>
          <span className="tboard-bar__count num">{loading ? '…' : tasks.length}</span>

          <Button variant="primary" size="sm" icon="add" onClick={() => openCreate()}>
            Thêm mới
          </Button>

          <span className="spacer" />

          <SearchInput
            size="md"
            shortcut=""
            placeholder="Tìm kiếm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="tboard-bar__search"
          />

          <Select
            size="sm"
            value={scope}
            onChange={(e) => setScope(e.target.value as 'mine' | 'all')}
            options={[
              { value: 'mine', label: 'Tác vụ của tôi' },
              { value: 'all', label: 'Toàn bộ' },
            ]}
          />

          <Select
            size="sm"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            options={[
              { value: '', label: 'Tất cả dự án' },
              ...options.projects.map((p) => ({ value: String(p.value), label: p.label })),
            ]}
          />

          <Select
            size="sm"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            options={[
              { value: '', label: 'Tất cả người thực hiện' },
              ...options.people.map((p) => ({ value: String(p.value), label: p.label })),
            ]}
          />

          <div className="viewswitch" role="group" aria-label="Chế độ xem">
            <button
              type="button"
              className={view === 'board' ? 'is-active' : ''}
              aria-label="Xem dạng bảng Kanban"
              onClick={() => setView('board')}
            >
              <Icon name="view_kanban" size={18} />
            </button>
            <button
              type="button"
              className={view === 'list' ? 'is-active' : ''}
              aria-label="Xem dạng danh sách"
              onClick={() => setView('list')}
            >
              <Icon name="format_list_bulleted" size={18} />
            </button>
          </div>
        </header>

        {error && (
          <div className="tboard-error" role="alert">
            <Icon name="error" size={18} />
            <span>{error}</span>
            <Button size="sm" variant="ghost" onClick={() => void loadTasks()}>
              Thử lại
            </Button>
          </div>
        )}

        {view === 'board' ? (
          <TaskBoard
            columns={columns}
            tasks={boardTasks}
            onOpen={(t) => {
              const found = tasks.find((x) => x.id === Number(t.id))
              if (found) setDetail(found)
            }}
            onEdit={(t) => void openEdit(t)}
            onDelete={(t) => void remove(t)}
            onMove={(id, col) => void move(id, col)}
            onAdd={openCreate}
          />
        ) : (
          <div className="tboard-list scroll-y">
            <Card flush>
              <DataTable
                columns={tableColumns}
                rows={boardTasks as (BoardTask & Record<string, unknown>)[]}
                rowKey={(t) => t.id}
                onRowClick={(t) => {
                  const found = tasks.find((x) => x.id === Number(t.id))
                  if (found) setDetail(found)
                }}
                emptyText={loading ? 'Đang tải…' : 'Không có tác vụ nào khớp bộ lọc'}
              />
            </Card>
          </div>
        )}
      </div>

      {/* Form dựng từ file YAML của Drupal
          (erp_api/config/custom/task_form_work_task.yml).

          forceWritable: file khai `writable: false` vì tác vụ phải lưu qua
          /api/v1/tasks để hook kanban_change_status_alter còn chạy (đồng bộ
          tiến độ lên Dplan). Trang này tự lo việc đó nên bật nút Lưu. */}
      {formOpen && (
        <EntityFormModal
          open
          onClose={() => setFormOpen(false)}
          entityType="task"
          bundle="work_task"
          recordId={editingId}
          // Bấm "+" trên một cột thì tác vụ mới rơi đúng vào cột đó.
          initialValues={{ field_work_task_state: targetColumn }}
          // KHÔNG truyền onSubmit: modal tự gửi theo khối `submit` khai trong
          // file YAML (create/update/delete + bảng map). Trang này chỉ nhận kết
          // quả và ghép vào danh sách.
          onSaved={onSaved}
          forceWritable
          title={editingId ? 'Sửa nội dung Tác vụ' : 'Thêm nội dung Tác vụ'}
        />
      )}

      {detail && (
        <TaskDetailModal
          key={detail.id}
          open
          onClose={() => setDetail(null)}
          task={toBoardTask(detail)}
          statusLabel={statusLabel[detail.state] ?? detail.state}
          statusTone={STATUS_BADGE[toneOf(detail.state)]}
          onEdit={(t) => void openEdit(t)}
          // Bình luận chưa có endpoint — Drupal dùng comment_task, sẽ bổ sung sau.
          onComment={undefined}
        />
      )}
    </AppLayout>
  )
}
