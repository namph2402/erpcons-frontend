import { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard'
import HomeEnterprise from './pages/HomeEnterprise'
import PersonalHome from './pages/PersonalHome'
import ProjectWorkspace from './pages/ProjectWorkspace'
import ScreenSwitcher from './dev/ScreenSwitcher'

/**
 * Router tối giản dựa trên hash — đủ cho giai đoạn dựng giao diện.
 * Khi tích hợp backend có thể thay bằng react-router mà không đụng
 * tới AppLayout / Sidebar / Topbar.
 */
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/')

  useEffect(() => {
    const onChange = () => setHash(window.location.hash || '#/')
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return hash
}

export default function App() {
  const hash = useHashRoute()
  const path = hash.replace(/^#/, '')

  let page = <HomeEnterprise />
  if (path.startsWith('/dashboard')) {
    page = <Dashboard initialDrawerOpen={path.includes('thong-bao')} />
  } else if (path.startsWith('/du-an')) {
    page = <ProjectWorkspace />
  } else if (path.startsWith('/ca-nhan')) {
    page = <PersonalHome />
  }

  return (
    <>
      {page}
      <ScreenSwitcher current={path} />
    </>
  )
}
