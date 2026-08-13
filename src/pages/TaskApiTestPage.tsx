import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { login, logout, me, type SessionUser } from '../api/client'
import {
  changeTaskState,
  createTask,
  deleteTask,
  fetchTask,
  fetchTaskOptions,
  fetchTasks,
  updateTask,
  type Option,
  type Task,
  type TaskOptions,
  type TaskPayload,
} from '../api/tasks'

/**
 * BÀN THỬ API TÁC VỤ — `#/test-api/tac-vu`
 *
 * Trang này CHỈ để kiểm chứng API `erp_task` trước khi ghép vào giao diện thật.
 * Nó cố ý KHÔNG dùng component dùng chung (Modal/Field/Select…) và không đọc
 * mock data, để khi có lỗi thì chắc chắn lỗi nằm ở API chứ không phải ở UI.
 *
 * Mọi request đều được ghi vào bảng nhật ký bên phải kèm payload và phản hồi
 * thô, nên nhìn là biết server nhận gì và trả gì.
 *
 * YÊU CẦU: chạy qua `npm run dev` để đi qua proxy trong vite.config.ts. Mở
 * thẳng bằng file:// hoặc trỏ sang cổng khác sẽ mất cookie phiên.
 */

interface LogEntry {
  id: number
  at: string
  label: string
  ok: boolean
  detail: unknown
}

const EMPTY_OPTIONS: TaskOptions = {
  projects: [],
  jobs: [],
  dplans: [],
  people: [],
  weights: [],
  states: [],
}

const EMPTY_FORM = {
  title: '',
  project: '' as number | '',
  job: '' as number | '',
  weight: '',
  dplan: '' as number | '',
  start: '',
  end: '',
  days: 0,
  hours: 2,
  minutes: 0,
  priority: 3,
  progress: 5,
  lead: '' as number | '',
  assignee: '' as number | '',
  supervisor: '' as number | '',
  content: '',
}

const opts = (list: Option[], placeholder: string) => (
  <>
    <option value="">{placeholder}</option>
    {list.map((o) => (
      <option key={String(o.value)} value={String(o.value)}>
        {o.label}
      </option>
    ))}
  </>
)

export default function TaskApiTestPage() {
  /* --------------------------------- phiên -------------------------------- */
  const [user, setUser] = useState<SessionUser | null>(null)
  const [creds, setCreds] = useState({ name: '', pass: '' })

  /* -------------------------------- dữ liệu ------------------------------- */
  const [options, setOptions] = useState<TaskOptions>(EMPTY_OPTIONS)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState<number | ''>('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)

  /* -------------------------------- nhật ký ------------------------------- */
  const [log, setLog] = useState<LogEntry[]>([])
  const seq = useRef(0)

  const push = (label: string, ok: boolean, detail: unknown) =>
    setLog((prev) => [
      { id: ++seq.current, at: new Date().toLocaleTimeString('vi-VN'), label, ok, detail },
      ...prev,
    ])

  /** Bọc mọi lời gọi API: ghi nhật ký + gom lỗi theo trường. */
  const run = async <T,>(label: string, fn: () => Promise<T>): Promise<T | null> => {
    setBusy(true)
    setFieldErrors({})
    try {
      const res = await fn()
      push(label, true, res)
      return res
    } catch (e) {
      const err = e as Error & { status?: number; errors?: Record<string, string> }
      push(`${label} — LỖI ${err.status ?? ''}`, false, {
        message: err.message,
        errors: err.errors,
      })
      if (err.errors) setFieldErrors(err.errors)
      return null
    } finally {
      setBusy(false)
    }
  }

  /* Khôi phục phiên sau khi F5 — cookie là HttpOnly nên phải hỏi server. */
  useEffect(() => {
    void run('GET /api/v1/me', me).then((u) => u && setUser(u))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadOptions = () =>
    run('GET /api/v1/tasks/options', fetchTaskOptions).then((data) => {
      if (!data) return
      setOptions({
        projects: data.projects ?? [],
        jobs: data.jobs ?? [],
        dplans: data.dplans ?? [],
        people: data.people ?? [],
        weights: data.weights ?? [],
        states: data.states ?? [],
      })
    })

  const loadTasks = () =>
    run('GET /api/v1/tasks?scope=mine&limit=10', () =>
      fetchTasks({ scope: 'mine', limit: 10 }),
    ).then((res) => res && setTasks(res.items))

  /* ------------------------------- payload -------------------------------- */

  /** Đúng thứ mà form thật sẽ gửi — hiển thị luôn để bạn đối chiếu. */
  const buildPayload = (): TaskPayload => ({
    title: form.title.trim(),
    project: form.project === '' ? undefined : Number(form.project),
    job: form.job === '' ? null : Number(form.job),
    evaluation: form.weight || null,
    dplan: form.dplan === '' ? null : Number(form.dplan),
    startDate: form.start ? `${form.start}:00` : null,
    endDate: form.end ? `${form.end}:00` : null,
    // field_task_duration lưu bằng PHÚT.
    duration: form.days * 1440 + form.hours * 60 + form.minutes,
    priority: String(form.priority),
    progress: form.progress,
    lead: form.lead === '' ? [] : [Number(form.lead)],
    executors: form.assignee === '' ? [] : [Number(form.assignee)],
    followers: form.supervisor === '' ? [] : [Number(form.supervisor)],
    content: form.content || null,
  })

  const payload = buildPayload()

  const onSave = async () => {
    const body = buildPayload()
    const res =
      editingId === ''
        ? await run('POST /api/v1/tasks', () => createTask(body))
        : await run(`PATCH /api/v1/tasks/${editingId}`, () => updateTask(Number(editingId), body))
    if (res) {
      setEditingId(res.task.id)
      void loadTasks()
    }
  }

  const doLogin = async () => {
    const u = await run('POST /api/v1/login', () => login(creds.name, creds.pass))
    if (u) {
      setUser(u)
      void loadOptions()
      void loadTasks()
    }
  }

  const onLoadTask = async (id: number) => {
    const res = await run(`GET /api/v1/tasks/${id}`, () => fetchTask(id))
    if (!res) return
    const t = res.task
    const total = Number(t.duration ?? 0) || 0
    setEditingId(t.id)
    setForm({
      title: t.title,
      project: t.project?.id ?? '',
      job: t.job?.id ?? '',
      weight: t.evaluation ?? '',
      dplan: '',
      start: t.startDate ? t.startDate.slice(0, 16) : '',
      end: t.endDate ? t.endDate.slice(0, 16) : '',
      days: Math.floor(total / 1440),
      hours: Math.floor((total % 1440) / 60),
      minutes: total % 60,
      priority: Number(t.priority ?? 3) || 3,
      progress: t.progress,
      lead: t.lead?.[0]?.id ?? '',
      assignee: t.executors?.[0]?.id ?? '',
      supervisor: t.followers?.[0]?.id ?? '',
      content: t.content ?? '',
    })
  }

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }))

  const err = (k: string) =>
    fieldErrors[k] ? <em style={S.err}>{fieldErrors[k]}</em> : null

  /* --------------------------------- render ------------------------------- */

  if (!user) {
    return (
      <div style={S.page}>
        <div style={{ ...S.card, maxWidth: 380, margin: '80px auto' }}>
          <h2 style={S.h2}>Đăng nhập để thử API</h2>
          <p style={S.muted}>
            API dùng cookie phiên. Trang này phải chạy qua <code>npm run dev</code> để đi
            đúng proxy, nếu không cookie sẽ không được gửi.
          </p>
          <label style={S.label}>Tên đăng nhập</label>
          <input
            style={S.input}
            value={creds.name}
            onChange={(e) => setCreds({ ...creds, name: e.target.value })}
          />
          <label style={S.label}>Mật khẩu</label>
          <input
            style={S.input}
            type="password"
            value={creds.pass}
            onChange={(e) => setCreds({ ...creds, pass: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && void doLogin()}
          />
          <button style={S.primary} disabled={busy} onClick={() => void doLogin()}>
            {busy ? 'Đang gửi…' : 'Đăng nhập'}
          </button>
          {log[0] && !log[0].ok && (
            <pre style={S.pre}>{JSON.stringify(log[0].detail, null, 2)}</pre>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={S.page}>
      <header style={S.bar}>
        <strong>Bàn thử API Tác vụ</strong>
        <span style={S.muted}>
          {user.name} · uid {user.id} · {user.roles.join(', ')}
        </span>
        <span style={{ flex: 1 }} />
        <button style={S.ghost} disabled={busy} onClick={() => void loadOptions()}>
          Tải lại options
        </button>
        <button style={S.ghost} disabled={busy} onClick={() => void loadTasks()}>
          Tải danh sách
        </button>
        <button
          style={S.ghost}
          onClick={() => void run('POST /api/v1/logout', logout).then(() => setUser(null))}
        >
          Đăng xuất
        </button>
      </header>

      <div style={S.grid}>
        {/* ---------------------------- FORM ---------------------------- */}
        <section style={S.card}>
          <h2 style={S.h2}>
            {editingId === '' ? 'Tạo tác vụ mới' : `Sửa tác vụ #${editingId}`}
            {editingId !== '' && (
              <button
                style={{ ...S.ghost, marginLeft: 8 }}
                onClick={() => {
                  setEditingId('')
                  setForm(EMPTY_FORM)
                }}
              >
                Thoát chế độ sửa
              </button>
            )}
          </h2>

          <label style={S.label}>Tiêu đề *</label>
          <input style={S.input} value={form.title} onChange={(e) => set('title', e.target.value)} />
          {err('title')}

          <label style={S.label}>Dự án * ({options.projects.length} lựa chọn)</label>
          <select
            style={S.input}
            value={String(form.project)}
            onChange={(e) => set('project', e.target.value === '' ? '' : Number(e.target.value))}
          >
            {opts(options.projects, '- Chọn dự án -')}
          </select>
          {err('project')}

          <label style={S.label}>
            Công việc ({options.jobs.length})
            {options.jobs.length === 0 && ' — bạn chưa được gán công việc KPI nào'}
          </label>
          <select
            style={S.input}
            value={String(form.job)}
            disabled={!options.jobs.length}
            onChange={(e) => set('job', e.target.value === '' ? '' : Number(e.target.value))}
          >
            {opts(options.jobs, '- Không -')}
          </select>

          <label style={S.label}>Đánh giá tác vụ</label>
          <select style={S.input} value={form.weight} onChange={(e) => set('weight', e.target.value)}>
            {opts(options.weights, '- Không -')}
          </select>

          <label style={S.label}>Liên kết Dplan ({options.dplans.length})</label>
          <select
            style={S.input}
            value={String(form.dplan)}
            onChange={(e) => set('dplan', e.target.value === '' ? '' : Number(e.target.value))}
          >
            {opts(options.dplans, '- Không -')}
          </select>

          <div style={S.row}>
            <div style={{ flex: 1 }}>
              <label style={S.label}>Bắt đầu</label>
              <input
                style={S.input}
                type="datetime-local"
                value={form.start}
                onChange={(e) => set('start', e.target.value)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={S.label}>Kết thúc</label>
              <input
                style={S.input}
                type="datetime-local"
                value={form.end}
                onChange={(e) => set('end', e.target.value)}
              />
            </div>
          </div>

          <label style={S.label}>
            Thời lượng — gửi lên {form.days * 1440 + form.hours * 60 + form.minutes} phút
          </label>
          <div style={S.row}>
            {(['days', 'hours', 'minutes'] as const).map((k) => (
              <span key={k} style={{ flex: 1 }}>
                <input
                  style={S.input}
                  type="number"
                  min={0}
                  value={form[k]}
                  onChange={(e) => set(k, Number(e.target.value))}
                />
                <small style={S.muted}>{{ days: 'ngày', hours: 'giờ', minutes: 'phút' }[k]}</small>
              </span>
            ))}
          </div>

          <div style={S.row}>
            <div style={{ flex: 1 }}>
              <label style={S.label}>Ưu tiên (1–5)</label>
              <input
                style={S.input}
                type="number"
                min={1}
                max={5}
                value={form.priority}
                onChange={(e) => set('priority', Number(e.target.value))}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={S.label}>Tiến độ {form.progress}%</label>
              <input
                style={{ ...S.input, padding: 0 }}
                type="range"
                min={0}
                max={100}
                step={5}
                value={form.progress}
                onChange={(e) => set('progress', Number(e.target.value))}
              />
            </div>
          </div>

          {(
            [
              ['lead', 'Người phụ trách'],
              ['assignee', 'Người thực hiện'],
              ['supervisor', 'Người giám sát'],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label style={S.label}>
                {label} ({options.people.length})
              </label>
              <select
                style={S.input}
                value={String(form[key])}
                onChange={(e) => set(key, e.target.value === '' ? '' : Number(e.target.value))}
              >
                {opts(options.people, '- Chọn người -')}
              </select>
            </div>
          ))}

          <label style={S.label}>Nội dung</label>
          <textarea
            style={{ ...S.input, minHeight: 90 }}
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
          />

          <button style={S.primary} disabled={busy} onClick={() => void onSave()}>
            {busy ? 'Đang gửi…' : editingId === '' ? 'POST tạo mới' : `PATCH cập nhật #${editingId}`}
          </button>

          <details style={{ marginTop: 12 }}>
            <summary style={S.muted}>Payload sẽ gửi lên</summary>
            <pre style={S.pre}>{JSON.stringify(payload, null, 2)}</pre>
          </details>
        </section>

        {/* -------------------------- DANH SÁCH -------------------------- */}
        <section style={S.card}>
          <h2 style={S.h2}>Tác vụ của tôi ({tasks.length})</h2>
          {!tasks.length && <p style={S.muted}>Bấm “Tải danh sách” ở thanh trên.</p>}
          {tasks.map((t) => (
            <div key={t.id} style={S.item}>
              <div>
                <strong>#{t.id}</strong> {t.title}
                <div style={S.muted}>
                  {t.stateLabel} · {t.progress}% · {t.project?.label ?? '—'}
                </div>
              </div>
              <div style={S.row}>
                <select
                  style={{ ...S.input, margin: 0, width: 150 }}
                  value={t.state}
                  onChange={(e) =>
                    void run(`PATCH /api/v1/tasks/${t.id}/state`, () =>
                      changeTaskState(t.id, e.target.value),
                    ).then((r) => r && loadTasks())
                  }
                >
                  {opts(options.states, '—')}
                </select>
                <button style={S.ghost} onClick={() => void onLoadTask(t.id)}>
                  Sửa
                </button>
                <button
                  style={S.danger}
                  onClick={() => {
                    if (!window.confirm(`Xoá tác vụ #${t.id} "${t.title}"?`)) return
                    void run(`DELETE /api/v1/tasks/${t.id}`, () => deleteTask(t.id)).then(
                      () => loadTasks(),
                    )
                  }}
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* --------------------------- NHẬT KÝ --------------------------- */}
        <section style={S.card}>
          <h2 style={S.h2}>
            Nhật ký request
            <button style={{ ...S.ghost, marginLeft: 8 }} onClick={() => setLog([])}>
              Xoá
            </button>
          </h2>
          {!log.length && <p style={S.muted}>Chưa có request nào.</p>}
          {log.map((e) => (
            <details key={e.id} style={{ ...S.item, display: 'block' }}>
              <summary>
                <span style={{ color: e.ok ? '#16a34a' : '#dc2626' }}>{e.ok ? '✓' : '✕'}</span>{' '}
                <code>{e.label}</code> <span style={S.muted}>{e.at}</span>
              </summary>
              <pre style={S.pre}>{JSON.stringify(e.detail, null, 2)}</pre>
            </details>
          ))}
        </section>
      </div>
    </div>
  )
}

/* Style nội tuyến — cố ý không dùng CSS dùng chung để trang test độc lập hoàn toàn. */
const S: Record<string, CSSProperties> = {
  page: { font: '14px/1.5 system-ui, sans-serif', background: '#f6f7f9', minHeight: '100vh', padding: 16 },
  bar: { display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' },
  grid: { display: 'grid', gridTemplateColumns: 'minmax(320px,1fr) minmax(320px,1fr) minmax(320px,1fr)', gap: 16, alignItems: 'start' },
  card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16 },
  h2: { fontSize: 15, margin: '0 0 12px', display: 'flex', alignItems: 'center' },
  label: { display: 'block', fontSize: 12, color: '#374151', marginTop: 10, marginBottom: 4 },
  input: { width: '100%', padding: '7px 9px', border: '1px solid #d1d5db', borderRadius: 6, font: 'inherit', boxSizing: 'border-box' },
  row: { display: 'flex', gap: 8, alignItems: 'center' },
  primary: { marginTop: 14, width: '100%', padding: '9px 12px', border: 0, borderRadius: 6, background: '#2563eb', color: '#fff', font: 'inherit', cursor: 'pointer' },
  ghost: { padding: '5px 10px', border: '1px solid #d1d5db', borderRadius: 6, background: '#fff', font: 'inherit', cursor: 'pointer' },
  danger: { padding: '5px 10px', border: '1px solid #fecaca', borderRadius: 6, background: '#fef2f2', color: '#b91c1c', font: 'inherit', cursor: 'pointer' },
  muted: { color: '#6b7280', fontSize: 12 },
  err: { color: '#dc2626', fontSize: 12, display: 'block', marginTop: 4 },
  pre: { background: '#0f172a', color: '#e2e8f0', padding: 10, borderRadius: 6, fontSize: 11, overflow: 'auto', maxHeight: 260 },
  item: { display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center', padding: '8px 0', borderTop: '1px solid #f1f5f9' },
}
