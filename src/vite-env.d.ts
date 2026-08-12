/// <reference types="vite/client" />

/**
 * Khai báo biến môi trường dùng trong mã nguồn.
 *
 * VITE_API_BASE: gốc của API Drupal. Để RỖNG khi chạy dev — vite.config.ts đã
 * proxy /api, /session, /user sang Drupal nên mọi request cùng origin và cookie
 * phiên hoạt động bình thường. Chỉ điền giá trị khi build cho môi trường mà
 * React và Drupal nằm khác origin (khi đó phải bật CORS + SameSite=None phía
 * Drupal).
 */
interface ImportMetaEnv {
  readonly VITE_API_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
