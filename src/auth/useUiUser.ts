import { useMemo } from 'react'
import { useAuth } from './AuthContext'
import type { User } from '../types'

/**
 * Chuyển tài khoản từ API (`SessionUser`) sang kiểu `User` mà AppLayout dùng.
 *
 * Hai kiểu này KHÔNG khớp nhau, nên phải quyết định vài chỗ:
 *
 *   API trả `roles` là MẢNG mã máy (['authenticated','directorate','hr',…]),
 *   còn UI cần `role` là MỘT chuỗi để hiển thị. Ưu tiên `workPosition`
 *   (field_user_work_position — chức danh do HR nhập, đúng thứ nên hiện cho
 *   người dùng); không có thì mới suy ra từ role có ý nghĩa nhất.
 *
 *   `org` lấy từ tên tổ chức; nếu có phòng ban thì ghép "Tổ chức · Phòng ban".
 *
 * Trả `null` khi chưa đăng nhập, để nơi gọi tự quyết định fallback — thường là
 * giữ mock cũ trong lúc chuyển dần từng trang.
 */

/** Mã role → nhãn tiếng Việt. Xếp theo độ "cấp cao" giảm dần. */
const ROLE_LABEL: [string, string][] = [
  ['directorate', 'Ban giám đốc'],
  ['administrator', 'Quản trị hệ thống'],
  ['manager', 'Quản lý'],
  ['financial_accountant', 'Kế toán'],
  ['hr', 'Nhân sự'],
  ['administrative', 'Hành chính'],
  ['treasurer', 'Thủ quỹ'],
  ['warehouse', 'Kho'],
  ['supply', 'Cung ứng'],
  ['sale', 'Kinh doanh'],
  ['employee', 'Nhân viên'],
]

const roleLabel = (roles: string[]): string => {
  const hit = ROLE_LABEL.find(([code]) => roles.includes(code))
  return hit ? hit[1] : 'Người dùng'
}

export function useUiUser(): User | null {
  const { user } = useAuth()

  return useMemo(() => {
    if (!user) return null

    const org = [user.company?.label, user.department?.label].filter(Boolean).join(' · ')

    return {
      id: String(user.id),
      name: user.name,
      role: user.workPosition?.trim() || roleLabel(user.roles),
      org: org || undefined,
      email: user.email,
      status: 'online',
    }
  }, [user])
}
