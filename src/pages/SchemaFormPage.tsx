import { useEffect, useState } from 'react'
import { AppLayout } from '../components/layout'
import { Card, Icon, Select } from '../components/ui'
import { SchemaForm } from '../components/widgets'
import { appFooterNav, appNav } from '../data/navigation'
import { personalUser } from '../data/mock'
import LogoutButton from '../auth/LogoutButton'
import { useUiUser } from '../auth/useUiUser'
import {
  fetchFormConfig,
  fetchFormIndex,
  type FormConfig,
  type FormIndexItem,
} from '../api/formConfig'
import './pages.css'

/**
 * Biểu mẫu tự dựng — `#/bieu-mau` hoặc `#/bieu-mau/{entityType}/{bundle}`
 *
 * Form KHÔNG viết tay: đọc file `config/custom/{entity}_form_{bundle}.yml` của
 * Drupal qua /api/v1/form rồi vẽ theo. Muốn thêm biểu mẫu thì sinh file ở
 * /admin/config/erpcons/erp-api/form-config, không phải sửa React.
 *
 * Ví dụ: #/bieu-mau/task/work_task
 */

const parseHash = (): { entityType: string; bundle: string } | null => {
  const parts = window.location.hash.replace(/^#\//, '').split('/')
  // ['bieu-mau', entityType, bundle]
  return parts[1] && parts[2] ? { entityType: parts[1], bundle: parts[2] } : null
}

export default function SchemaFormPage() {
  const sessionUser = useUiUser()

  const [index, setIndex] = useState<FormIndexItem[]>([])
  const [target, setTarget] = useState(() => parseHash())
  const [config, setConfig] = useState<FormConfig | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('')

  /* Danh mục — gọi MỘT lần. */
  useEffect(() => {
    fetchFormIndex()
      .then((res) => setIndex(res.items))
      .catch((e: Error) => setError(e.message))
  }, [])

  useEffect(() => {
    const onHash = () => setTarget(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  /* Nạp mô tả. fetchFormConfig tự lo ba tầng đệm nên đổi qua lại giữa các biểu
     mẫu đã xem không tạo thêm request nào. */
  useEffect(() => {
    if (!target) {
      setConfig(null)
      return
    }
    setLoading(true)
    setError(null)
    fetchFormConfig(target.entityType, target.bundle)
      .then(setConfig)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [target])

  const go = (key: string) => {
    window.location.hash = key ? `#/bieu-mau/${key.replace(':', '/')}` : '#/bieu-mau'
  }

  const shown = filter
    ? index.filter(
        (i) =>
          i.label.toLowerCase().includes(filter.toLowerCase()) ||
          i.key.toLowerCase().includes(filter.toLowerCase()),
      )
    : index

  return (
    <AppLayout
      navGroups={appNav}
      sidebarFooterItems={appFooterNav}
      activeId="tasks"
      user={sessionUser ?? personalUser}
      topbarActions={<LogoutButton />}
      notificationCount={0}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
        <Card>
          <h2 style={{ margin: '0 0 4px', fontSize: 18 }}>Biểu mẫu tự dựng</h2>
          <p style={{ margin: '0 0 16px', color: 'var(--text-tertiary)', fontSize: 13 }}>
            Vẽ theo file <code>config/custom/{'{entity}'}_form_{'{bundle}'}.yml</code> của Drupal.
            Thiếu hay sai thì sửa thẳng file — không phải sửa React.{' '}
            <strong>{index.length}</strong> biểu mẫu khả dụng.
          </p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Lọc theo tên</label>
              <input
                className="input"
                value={filter}
                placeholder="vd: tác vụ, decision, propose…"
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <div style={{ flex: '2 1 320px' }}>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Chọn biểu mẫu ({shown.length})
              </label>
              <Select
                value={target ? `${target.entityType}:${target.bundle}` : ''}
                onChange={(e) => go(e.target.value)}
                options={[
                  { value: '', label: '- Chọn -' },
                  ...shown.map((i) => ({
                    value: i.key,
                    label: `${i.label} — ${i.key} (${i.fields} trường)`,
                  })),
                ]}
              />
            </div>
          </div>

          {error && (
            <p style={{ color: 'var(--danger)', fontSize: 13, marginTop: 12 }}>
              <Icon name="error" size={16} /> {error}
            </p>
          )}
        </Card>

        {loading && (
          <p style={{ color: 'var(--text-tertiary)', marginTop: 16 }}>Đang tải mô tả biểu mẫu…</p>
        )}

        {config && (
          <div style={{ marginTop: 16 }}>
            <Card>
              <h3 style={{ margin: '0 0 4px', fontSize: 16 }}>{config.label}</h3>
              <p style={{ margin: '0 0 16px', color: 'var(--text-tertiary)', fontSize: 12 }}>
                {config.entityType}:{config.bundle} · {config.fields.length} trường ·{' '}
                {config.groups.length} nhóm ·{' '}
                {config.fields.filter((f) => f.unsupported).length} trường lồng chưa hỗ trợ
              </p>

              <SchemaForm
                key={`${config.entityType}/${config.bundle}`}
                config={config}
                onSubmit={(v) => {
                  // writable:false thì nút Lưu bị khoá; ở đây chỉ in payload để
                  // đối chiếu trước khi nối vào endpoint nghiệp vụ.
                  // eslint-disable-next-line no-console
                  console.log('Giá trị form:', v)
                  window.alert('Xem payload trong Console (F12).')
                }}
              />
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
