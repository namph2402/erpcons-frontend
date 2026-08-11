import { useEffect, useState, type ReactElement } from "react";
import Dashboard from "./pages/Dashboard";
import HomeEnterprise from "./pages/HomeEnterprise";
import PersonalHome from "./pages/PersonalHome";
import ProjectWorkspace from "./pages/ProjectWorkspace";
import AiInsightDashboard from "./pages/dashboards/AiInsightDashboard";
import ConstructionDashboard from "./pages/dashboards/ConstructionDashboard";
import ExecutiveDashboard from "./pages/dashboards/ExecutiveDashboard";
import FinanceDashboard from "./pages/dashboards/FinanceDashboard";
import IotDashboard from "./pages/dashboards/IotDashboard";
import KnowledgeGraphDashboard from "./pages/dashboards/KnowledgeGraphDashboard";
import ProjectDashboard from "./pages/dashboards/ProjectDashboard";
import CameraAi from "./pages/mobile/CameraAi";
import FieldReport from "./pages/mobile/FieldReport";
import MobileHome from "./pages/mobile/MobileHome";
import OfflineSync from "./pages/mobile/OfflineSync";
import QrScanner from "./pages/mobile/QrScanner";
import ScreenSwitcher from "./dev/ScreenSwitcher";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { currentUser } from "./data/mock";
import { WORKSPACE_LIST } from "./data/workspaces";
import WorkspacePage from "./pages/workspaces/WorkspacePage";
import ContractDetail from "./pages/partners/ContractDetail";
import SupplierPortal from "./pages/partners/SupplierPortal";
import CustomerPortal from "./pages/partners/CustomerPortal";
import CustomerDetail from "./pages/partners/CustomerDetail";
import Collaboration from "./pages/partners/Collaboration";

/**
 * Router tối giản dựa trên hash — đủ cho giai đoạn dựng giao diện.
 * Khi tích hợp backend có thể thay bằng react-router mà không đụng
 * tới AppLayout / Sidebar / Topbar / DashboardShell / WorkspaceShell.
 */
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#/");

  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash || "#/");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return hash;
}

interface Route {
  match: (path: string) => boolean;
  render: () => ReactElement;
}

/** 15 Object Workspace sinh tự động từ cấu hình */
const workspaceRoutes: Route[] = WORKSPACE_LIST.map((config) => ({
  match: (p) => p.startsWith(config.route),
  render: () => <WorkspacePage config={config} />,
}));

/** Bảng định tuyến — thứ tự khớp từ cụ thể đến tổng quát */
const ROUTES: {
  match: (p: string) => boolean;
  render: () => React.ReactElement;
}[] = [
  {
    match: (p) => p.startsWith("/dashboard/executive"),
    render: () => <ExecutiveDashboard />,
  },
  {
    match: (p) => p.startsWith("/dashboard/project"),
    render: () => <ProjectDashboard />,
  },
  {
    match: (p) => p.startsWith("/dashboard/finance"),
    render: () => <FinanceDashboard />,
  },
  {
    match: (p) => p.startsWith("/dashboard/construction"),
    render: () => <ConstructionDashboard />,
  },
  {
    match: (p) => p.startsWith("/dashboard/ai-insight"),
    render: () => <AiInsightDashboard />,
  },
  {
    match: (p) => p.startsWith("/dashboard/iot"),
    render: () => <IotDashboard />,
  },
  {
    match: (p) => p.startsWith("/dashboard/knowledge-graph"),
    render: () => <KnowledgeGraphDashboard />,
  },
  {
    match: (p) => p.startsWith("/dashboard/executive"),
    render: () => <ExecutiveDashboard />,
  },
  {
    match: (p) => p.startsWith("/dashboard/project"),
    render: () => <ProjectDashboard />,
  },
  {
    match: (p) => p.startsWith("/dashboard/finance"),
    render: () => <FinanceDashboard />,
  },
  {
    match: (p) => p.startsWith("/dashboard/construction"),
    render: () => <ConstructionDashboard />,
  },
  {
    match: (p) => p.startsWith("/dashboard/ai-insight"),
    render: () => <AiInsightDashboard />,
  },
  {
    match: (p) => p.startsWith("/dashboard/iot"),
    render: () => <IotDashboard />,
  },
  {
    match: (p) => p.startsWith("/dashboard/knowledge-graph"),
    render: () => <KnowledgeGraphDashboard />,
  },
  {
    match: (p) => p.startsWith("/dashboard"),
    render: () => (
      <Dashboard
        initialDrawerOpen={window.location.hash.includes("thong-bao")}
      />
    ),
  },
  {
    match: (p) => p.startsWith("/mobile/dong-bo"),
    render: () => <OfflineSync />,
  },
  { match: (p) => p.startsWith("/mobile/qr"), render: () => <QrScanner /> },
  {
    match: (p) => p.startsWith("/mobile/camera-ai"),
    render: () => <CameraAi />,
  },
  {
    match: (p) => p.startsWith("/mobile/bao-cao"),
    render: () => <FieldReport />,
  },
  { match: (p) => p.startsWith("/mobile"), render: () => <MobileHome /> },
  { match: (p) => p.startsWith("/du-an"), render: () => <ProjectWorkspace /> },
  {
    match: (p) => p.startsWith("/ca-nhan/ho-so"),
    render: () => <ProfilePage user={currentUser} />,
  },
  { match: (p) => p.startsWith("/ca-nhan"), render: () => <PersonalHome /> },
  {
    match: (p) => p.startsWith("/lam-viec/hop-dong"),
    render: () => <ContractDetail />,
  },
  {
    match: (p) => p.startsWith("/doi-tac/nha-cung-cap"),
    render: () => <SupplierPortal />,
  },
  {
    match: (p) => p.startsWith("/doi-tac/cong-khach-hang"),
    render: () => <CustomerPortal />,
  },
  {
    match: (p) => p.startsWith("/doi-tac/khach-hang"),
    render: () => <CustomerDetail />,
  },
  { match: (p) => p.startsWith("/cong-tac"), render: () => <Collaboration /> },
  ...workspaceRoutes,
  {
    match: (p) => p.startsWith("/mobile/dong-bo"),
    render: () => <OfflineSync />,
  },
  { match: (p) => p.startsWith("/mobile/qr"), render: () => <QrScanner /> },
  {
    match: (p) => p.startsWith("/mobile/camera-ai"),
    render: () => <CameraAi />,
  },
  {
    match: (p) => p.startsWith("/mobile/bao-cao"),
    render: () => <FieldReport />,
  },
  { match: (p) => p.startsWith("/mobile"), render: () => <MobileHome /> },
  { match: (p) => p.startsWith("/du-an"), render: () => <ProjectWorkspace /> },
  { match: (p) => p.startsWith("/ca-nhan"), render: () => <PersonalHome /> },
];

export default function App() {
  const hash = useHashRoute();
  const path = hash.replace(/^#/, "");

  const route = ROUTES.find((r) => r.match(path));

  return (
    <>
      {route ? route.render() : <HomeEnterprise />}
      <ScreenSwitcher current={path} />
    </>
  );
}
