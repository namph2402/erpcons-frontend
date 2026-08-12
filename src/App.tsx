import { useEffect, useState, type ReactElement } from 'react'
import Dashboard from './pages/Dashboard'
import HomeEnterprise from './pages/HomeEnterprise'
import PersonalHome from './pages/PersonalHome'
import ProjectWorkspace from './pages/ProjectWorkspace'
import LoginPage, { AuthSplash } from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import TaskBoardPage from './pages/TaskBoardPage'
import AiInsightDashboard from './pages/dashboards/AiInsightDashboard'
import ConstructionDashboard from './pages/dashboards/ConstructionDashboard'
import ExecutiveDashboard from './pages/dashboards/ExecutiveDashboard'
import FinanceDashboard from './pages/dashboards/FinanceDashboard'
import IotDashboard from './pages/dashboards/IotDashboard'
import KnowledgeGraphDashboard from './pages/dashboards/KnowledgeGraphDashboard'
import ProjectDashboard from './pages/dashboards/ProjectDashboard'
import WorkspacePage from './pages/workspaces/WorkspacePage'
import Collaboration from './pages/partners/Collaboration'
import ContractDetail from './pages/partners/ContractDetail'
import CustomerDetail from './pages/partners/CustomerDetail'
import CustomerPortal from './pages/partners/CustomerPortal'
import SupplierPortal from './pages/partners/SupplierPortal'
import CameraAi from './pages/mobile/CameraAi'
import FieldReport from './pages/mobile/FieldReport'
import MobileHome from './pages/mobile/MobileHome'
import OfflineSync from './pages/mobile/OfflineSync'
import QrScanner from './pages/mobile/QrScanner'
import ScreenSwitcher from './dev/ScreenSwitcher'
import { AuthProvider, useAuth } from './auth/AuthContext'
import { currentUser } from './data/mock'
import { WORKSPACE_LIST } from './data/workspaces'

/**
 * Router tối giản dựa trên hash — đủ cho giai đoạn dựng giao diện.
 * Khi tích hợp backend có thể thay bằng react-router mà không đụng
 * tới AppLayout / Sidebar / Topbar / DashboardShell / WorkspaceShell.
 */
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/')

  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash || '#/')
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return hash
}

interface Route {
  match: (path: string) => boolean
  render: () => ReactElement
}

/** 15 Object Workspace sinh tự động từ cấu hình */
const workspaceRoutes: Route[] = WORKSPACE_LIST.map((config) => ({
  match: (p) => p.startsWith(config.route),
  render: () => <WorkspacePage config={config} />,
}))

/**
 * Bảng định tuyến — khớp theo THỨ TỰ, từ cụ thể đến tổng quát.
 *
 * Quy tắc: route con phải đứng TRƯỚC route cha. Ví dụ `/ca-nhan/cong-viec` và
 * `/ca-nhan/ho-so` phải nằm trên `/ca-nhan`, nếu không `/ca-nhan` sẽ nuốt hết
 * vì nó dùng startsWith.
 *
 * Bàn thử API (`/test-api/*`) cố ý ĐỂ TẮT — chỉ dùng khi cần kiểm chứng API,
 * không thuộc luồng người dùng. File vẫn nằm trong src/pages; muốn bật lại thì
 * bỏ chú thích 2 dòng cuối bảng và import lại LoginTestPage / TaskApiTestPage.
 */
const ROUTES: Route[] = [
  /* ---- Dashboard ---- */
  { match: (p) => p.startsWith('/dashboard/executive'), render: () => <ExecutiveDashboard /> },
  { match: (p) => p.startsWith('/dashboard/project'), render: () => <ProjectDashboard /> },
  { match: (p) => p.startsWith('/dashboard/finance'), render: () => <FinanceDashboard /> },
  { match: (p) => p.startsWith('/dashboard/construction'), render: () => <ConstructionDashboard /> },
  { match: (p) => p.startsWith('/dashboard/ai-insight'), render: () => <AiInsightDashboard /> },
  { match: (p) => p.startsWith('/dashboard/iot'), render: () => <IotDashboard /> },
  {
    match: (p) => p.startsWith('/dashboard/knowledge-graph'),
    render: () => <KnowledgeGraphDashboard />,
  },
  {
    match: (p) => p.startsWith('/dashboard'),
    render: () => <Dashboard initialDrawerOpen={window.location.hash.includes('thong-bao')} />,
  },

  /* ---- Tác vụ (bảng Kanban) ----
     Ba đường dẫn cùng trỏ về một màn hình vì menu ở các khu vực khác nhau đang
     dùng tên khác nhau. Đặt TRƯỚC workspaceRoutes để không bị route chung nuốt. */
  { match: (p) => p.startsWith('/lam-viec/cong-viec'), render: () => <TaskBoardPage /> },
  { match: (p) => p.startsWith('/ca-nhan/cong-viec'), render: () => <TaskBoardPage /> },
  { match: (p) => p.startsWith('/tac-vu'), render: () => <TaskBoardPage /> },

  /* ---- Làm việc / Đối tác ---- */
  { match: (p) => p.startsWith('/lam-viec/hop-dong'), render: () => <ContractDetail /> },
  { match: (p) => p.startsWith('/doi-tac/nha-cung-cap'), render: () => <SupplierPortal /> },
  { match: (p) => p.startsWith('/doi-tac/cong-khach-hang'), render: () => <CustomerPortal /> },
  { match: (p) => p.startsWith('/doi-tac/khach-hang'), render: () => <CustomerDetail /> },
  { match: (p) => p.startsWith('/cong-tac'), render: () => <Collaboration /> },

  ...workspaceRoutes,

  /* ---- Mobile ---- */
  { match: (p) => p.startsWith('/mobile/dong-bo'), render: () => <OfflineSync /> },
  { match: (p) => p.startsWith('/mobile/qr'), render: () => <QrScanner /> },
  { match: (p) => p.startsWith('/mobile/camera-ai'), render: () => <CameraAi /> },
  { match: (p) => p.startsWith('/mobile/bao-cao'), render: () => <FieldReport /> },
  { match: (p) => p.startsWith('/mobile'), render: () => <MobileHome /> },

  /* ---- Dự án / Cá nhân ---- */
  { match: (p) => p.startsWith('/du-an'), render: () => <ProjectWorkspace /> },
  // TODO: ProfilePage đang nhận `currentUser` (mock). Đổi sang useUiUser() để
  // hiện đúng người đang đăng nhập — xem src/auth/useUiUser.ts.
  { match: (p) => p.startsWith('/ca-nhan/ho-so'), render: () => <ProfilePage user={currentUser} /> },
  { match: (p) => p.startsWith('/ca-nhan'), render: () => <PersonalHome /> },

  /* ---- Bàn thử API — ĐANG TẮT (xem docblock trên) ----
  { match: (p) => p.startsWith('/test-api/dang-nhap'), render: () => <LoginTestPage /> },
  { match: (p) => p.startsWith('/test-api/tac-vu'), render: () => <TaskApiTestPage /> },
  */
]

/**
 * Chặn truy cập khi chưa đăng nhập.
 *
 * Ba trạng thái, và thứ tự xử lý quan trọng:
 *   checking — đang gọi /api/v1/me. PHẢI hiện splash chứ không phải form đăng
 *              nhập, nếu không người đã đăng nhập sẽ thấy form nhấp nháy mỗi
 *              lần F5.
 *   anon     — hiện LoginPage, KHÔNG đổi hash. Nhờ vậy sau khi đăng nhập xong
 *              đúng trang đang cần mở lại hiện ra, không cần nhớ "trang định
 *              vào" ở đâu cả.
 *   authed   — dựng bảng route như bình thường.
 */
function AuthedApp() {
  const { status } = useAuth()
  const hash = useHashRoute()
  const path = hash.replace(/^#/, '')

  /* Dọn hash cũ trỏ vào bàn thử (route đã tắt) để thanh địa chỉ khớp với thứ
     đang hiển thị, thay vì giữ #/test-api/... mà lại vẽ HomeEnterprise. */
  useEffect(() => {
    if (status === 'authed' && path.startsWith('/test-api')) {
      window.location.hash = '#/'
    }
  }, [status, path])

  if (status === 'checking') return <AuthSplash />
  if (status === 'anon') return <LoginPage />

  const route = ROUTES.find((r) => r.match(path))

  return (
    <>
      {route ? route.render() : <HomeEnterprise />}
      <ScreenSwitcher current={path} />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AuthedApp />
    </AuthProvider>
  )
}
