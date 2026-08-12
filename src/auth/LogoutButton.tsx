import { useState } from 'react'
import Button from '../components/ui/Button'
import { useAuth } from './AuthContext'

/**
 * Nút đăng xuất.
 *
 * Đặt vào `topbarActions` của AppLayout — seam có sẵn, nên KHÔNG phải sửa
 * Topbar/AppLayout (component dùng chung cho toàn bộ 20 màn hình).
 *
 * Sau khi `signOut()` chạy, AuthProvider đổi status sang 'anon' và App tự vẽ
 * lại trang đăng nhập; không cần điều hướng thủ công ở đây.
 */
export default function LogoutButton() {
  const { signOut } = useAuth()
  const [busy, setBusy] = useState(false)

  const onClick = async () => {
    if (busy) return
    setBusy(true)
    try {
      await signOut()
    } finally {
      // signOut đã tự xử lý lỗi và luôn đưa về trạng thái chưa đăng nhập, nên
      // ở đây chỉ cần mở khoá nút phòng khi component còn sống.
      setBusy(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      icon="logout"
      disabled={busy}
      onClick={() => void onClick()}
    >
      {busy ? 'Đang thoát…' : 'Đăng xuất'}
    </Button>
  )
}
