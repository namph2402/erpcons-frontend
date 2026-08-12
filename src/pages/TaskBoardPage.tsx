import { useMemo, useState } from 'react'
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
  NotificationDrawer,
  TaskBoard,
  TaskDetailModal,
  TaskFormModal,
  type BoardTone,
  type TaskFormValue,
} from '../components/widgets'
import { appFooterNav, appNav } from '../data/navigation'
import { notifications, personalUser } from '../data/mock'
import {
  TASK_STATUS_LABEL,
  boardTasks,
  taskColumns,
  taskDplans,
  taskPeople,
  taskProjects,
  taskWeights,
  taskWorkTypes,
} from '../data/taskBoard'
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

const toneOf = (status: string): BoardTone =>
  taskColumns.find((c) => c.id === status)?.tone ?? 'neutral'

const toDisplayDate = (value: string) => {
  const d = value ? new Date(value) : new Date()
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('vi-VN')
}

const toDisplayDateTime = (value: string) => {
  const d = value ? new Date(value) : new Date()
  if (Number.isNaN(d.getTime())) return '—'
  return `${d.toLocaleDateString('vi-VN')} - ${d.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  })}`
}

/** Tác vụ cá nhân — 03.10 Board View, kế thừa nguyên khung menu + header chuẩn */
export default function TaskBoardPage() {
  const [tasks, setTasks] = useState<BoardTask[]>(boardTasks)
  const [view, setView] = useState<'board' | 'list'>('board')
  const [query, setQuery] = useState('')
  const [project, setProject] = useState('')
  const [assignee, setAssignee] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<BoardTask | null>(null)
  const [targetColumn, setTargetColumn] = useState('backlog')
  const [detail, setDetail] = useState<BoardTask | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tasks.filter(
      (t) =>
        (!q ||
          t.title.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q) ||
          t.assignee.toLowerCase().includes(q)) &&
        (!project || t.project === project) &&
        (!assignee || t.assignee === assignee),
    )
  }, [tasks, query, project, assignee])

  /* ---------------- Hành động ---------------- */

  const openCreate = (columnId = 'backlog') => {
    setEditing(null)
    setTargetColumn(columnId)
    setFormOpen(true)
  }

  const openEdit = (task: BoardTask) => {
    setEditing(task)
    setTargetColumn(task.status)
    setDetail(null)
    setFormOpen(true)
  }

  const submit = (value: TaskFormValue) => {
    const duration = [
      value.days ? `${value.days}d` : '',
      value.hours ? `${value.hours}h` : '',
      value.minutes ? `${value.minutes}m` : '',
    ]
      .filter(Boolean)
      .join(' ')

    const patch: Omit<BoardTask, 'id' | 'status'> = {
      title: value.title.trim(),
      project: value.project,
      work: value.work || undefined,
      weight: (value.weight || undefined) as BoardTask['weight'],
      owner: value.owner || undefined,
      supervisor: value.supervisor || undefined,
      assignee: value.assignee || personalUser.name,
      dplan: value.dplan || undefined,
      start: toDisplayDateTime(value.start),
      end: toDisplayDateTime(value.end),
      duration: duration || '—',
      progress: value.progress,
      rating: value.priority,
      date: toDisplayDate(value.start),
      content: value.content || undefined,
    }

    setTasks((prev) =>
      editing
        ? prev.map((t) => (t.id === editing.id ? { ...t, ...patch } : t))
        : [
            {
              ...patch,
              id: `TSK-2026-${String(1000 + prev.length + 1).slice(1)}`,
              status: targetColumn,
              comments: [],
              files: [],
            },
            ...prev,
          ],
    )
    setFormOpen(false)
    setEditing(null)
  }

  const move = (taskId: string, columnId: string) =>
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: columnId, progress: columnId === 'done' ? 100 : t.progress }
          : t,
      ),
    )

  const remove = (task: BoardTask) => {
    if (!window.confirm(`Xoá tác vụ "${task.title}"?`)) return
    setTasks((prev) => prev.filter((t) => t.id !== task.id))
  }

  const addComment = (task: BoardTask, body: string) => {
    const comment = {
      id: `c${Date.now()}`,
      author: personalUser.name,
      at: new Date().toLocaleString('vi-VN'),
      body,
    }
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, comments: [...(t.comments ?? []), comment] } : t,
      ),
    )
    setDetail((d) => (d && d.id === task.id ? { ...d, comments: [...(d.comments ?? []), comment] } : d))
  }

  /* ---------------- List view (03.10) ---------------- */

  const columns: Column<BoardTask & Record<string, unknown>>[] = [
    {
      key: 'title',
      header: 'Tác vụ',
      render: (t) => (
        <div className="tlist__title">
          <p className="tlist__name truncate">{t.title}</p>
          <p className="tlist__code num">{t.id}</p>
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
          {TASK_STATUS_LABEL[t.status]}
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
      user={personalUser}
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
        {/* Thanh tiêu đề gọn — nhường toàn bộ chiều cao còn lại cho bảng Kanban */}
        <header className="tboard-bar">
          <span className="tboard-bar__icon">
            <Icon name="view_kanban" size={20} />
          </span>
          <h1 className="tboard-bar__title">Tác vụ</h1>
          <span className="tboard-bar__count num">{tasks.length}</span>

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
            value={project}
            onChange={(e) => setProject(e.target.value)}
            options={[
              { value: '', label: 'Tất cả dự án' },
              ...taskProjects.map((p) => ({ value: p, label: p })),
            ]}
          />

          <Select
            size="sm"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            options={[
              { value: '', label: 'Tất cả người thực hiện' },
              ...taskPeople.map((p) => ({ value: p, label: p })),
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

        {view === 'board' ? (
          <TaskBoard
            columns={taskColumns}
            tasks={filtered}
            onOpen={setDetail}
            onEdit={openEdit}
            onDelete={remove}
            onMove={move}
            onAdd={openCreate}
          />
        ) : (
          <div className="tboard-list scroll-y">
            <Card flush>
              <DataTable
                columns={columns}
                rows={filtered as (BoardTask & Record<string, unknown>)[]}
                rowKey={(t) => t.id}
                onRowClick={(t) => setDetail(t)}
                emptyText="Không có tác vụ nào khớp bộ lọc"
              />
            </Card>
          </div>
        )}
      </div>

      {/* Mount lại theo key để form/tab luôn khởi tạo sạch mỗi lần mở */}
      {formOpen && (
        <TaskFormModal
          key={editing?.id ?? 'new'}
          open
          onClose={() => setFormOpen(false)}
          onSubmit={submit}
          task={editing}
          projects={taskProjects}
          workTypes={taskWorkTypes}
          weights={taskWeights}
          people={taskPeople}
          dplans={taskDplans}
        />
      )}

      {detail && (
        <TaskDetailModal
          key={detail.id}
          open
          onClose={() => setDetail(null)}
          task={detail}
          statusLabel={TASK_STATUS_LABEL[detail.status]}
          statusTone={STATUS_BADGE[toneOf(detail.status)]}
          onEdit={openEdit}
          onComment={addComment}
        />
      )}
    </AppLayout>
  )
}
