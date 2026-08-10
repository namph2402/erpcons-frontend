/** Tiện ích xử lý tên người dùng (hỗ trợ tên tiếng Việt có dấu) */

/** "Nguyễn Văn A" → "NA" · "Admin" → "AD" */
export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const PALETTE = [
  'var(--info)',
  'var(--ai)',
  'var(--ocr)',
  'var(--automation)',
  'var(--success)',
  'var(--erp-red)',
  'var(--warning)',
]

/** Màu nền avatar ổn định theo tên (cùng tên → cùng màu ở mọi màn hình) */
export function avatarColorOf(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) % 9973
  }
  return PALETTE[hash % PALETTE.length]
}
