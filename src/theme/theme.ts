/**
 * Theme system — Light · Dark · System
 * Quy định gốc: Theme 02 · Navigation — 02.9 User Menu.
 *
 * "system" là LỰA CHỌN của người dùng, không phải giá trị áp lên DOM.
 * Nó luôn được quy đổi (resolve) về "light" | "dark" rồi mới ghi vào
 * <html data-theme="…">, nhờ vậy CSS chỉ cần MỘT khối token tối duy nhất.
 */

/** Lựa chọn người dùng thấy trong menu */
export type ThemeChoice = 'light' | 'dark' | 'system';
/** Giá trị thật sự áp lên <html data-theme> */
export type ResolvedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'erpcons.theme';

export const THEME_OPTIONS: {
  value: ThemeChoice;
  label: string;
  icon: string;
}[] = [
  { value: 'light', label: 'Sáng', icon: 'light_mode' },
  { value: 'dark', label: 'Tối', icon: 'dark_mode' },
  { value: 'system', label: 'Theo hệ thống', icon: 'computer' },
];

const DARK_QUERY = '(prefers-color-scheme: dark)';

/** Đọc lựa chọn đã lưu; mặc định "system" */
export function readStoredTheme(): ThemeChoice {
  if (typeof localStorage === 'undefined') return 'system';
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved === 'light' || saved === 'dark' || saved === 'system'
    ? saved
    : 'system';
}

/** Hệ điều hành đang để chế độ nào */
export function systemTheme(): ResolvedTheme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

/** Quy đổi lựa chọn → giá trị thật */
export function resolveTheme(choice: ThemeChoice): ResolvedTheme {
  return choice === 'system' ? systemTheme() : choice;
}

/** Theo dõi hệ thống đổi chế độ (chỉ có tác dụng khi đang chọn "system") */
export function watchSystemTheme(
  onChange: (theme: ResolvedTheme) => void
): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const mql = window.matchMedia(DARK_QUERY);
  const handler = (e: MediaQueryListEvent) =>
    onChange(e.matches ? 'dark' : 'light');
  mql.addEventListener('change', handler);
  return () => mql.removeEventListener('change', handler);
}

/**
 * Ghi theme lên <html>. Bật cờ `data-theme-switching` trong ~250ms để
 * tokens.css chạy transition mượt, rồi gỡ ra để không ảnh hưởng hiệu năng.
 */
let switchTimer: ReturnType<typeof setTimeout> | undefined;

export function applyTheme(theme: ResolvedTheme, animate = true): void {
  const root = document.documentElement;
  if (root.dataset.theme === theme) return;

  if (animate) {
    root.setAttribute('data-theme-switching', '');
    clearTimeout(switchTimer);
    switchTimer = setTimeout(
      () => root.removeAttribute('data-theme-switching'),
      250
    );
  }
  root.dataset.theme = theme;

  /* Đồng bộ màu thanh trạng thái trình duyệt trên mobile */
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#081220' : '#f5f7f9');
}
