import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Đích Drupal khi chạy dev. Đổi bằng biến môi trường nếu máy bạn khác:
 *   VITE_DRUPAL_ORIGIN=http://erp.local npm run dev
 */
const DRUPAL = process.env.VITE_DRUPAL_ORIGIN ?? 'https://lpc.vn/erpcons'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    /**
     * Proxy để React và Drupal CÙNG ORIGIN khi dev.
     *
     * VÌ SAO CẦN: API xác thực bằng cookie phiên. Nếu trình duyệt gọi thẳng
     * http://erpcons.localhost từ http://localhost:5173 thì đó là cross-site —
     * cookie chỉ đi kèm khi Drupal đặt SameSite=None; Secure (bắt buộc HTTPS cả
     * hai đầu) và bật CORS supportsCredentials. Đi qua proxy thì trình duyệt
     * thấy mọi thứ đều ở localhost:5173, cookie hoạt động bình thường và KHÔNG
     * cần cấu hình CORS nào cả.
     *
     * Ba tiền tố phải proxy:
     *   /api      — toàn bộ REST API của ERP
     *   /session  — /session/token, nơi lấy CSRF token
     *   /user     — /user/login, /user/logout dạng JSON của core
     */
    proxy: {
      '/api': {
        target: DRUPAL,
        changeOrigin: true,
        // Drupal đặt cookie host-only cho erpcons.localhost; viết lại domain để
        // trình duyệt ở localhost chấp nhận.
        cookieDomainRewrite: 'localhost',
      },
      '/session': {
        target: DRUPAL,
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
      },
      '/user': {
        target: DRUPAL,
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
      },
    },
  },
})
