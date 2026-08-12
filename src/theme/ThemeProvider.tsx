import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  applyTheme,
  readStoredTheme,
  systemTheme,
  THEME_STORAGE_KEY,
  watchSystemTheme,
  type ResolvedTheme,
  type ThemeChoice,
} from './theme';

interface ThemeContextValue {
  /** Lựa chọn của người dùng: light · dark · system */
  choice: ThemeChoice;
  /** Giá trị đang hiển thị thật sự: light · dark */
  resolved: ResolvedTheme;
  setTheme: (choice: ThemeChoice) => void;
  /** Đảo nhanh Sáng ↔ Tối (dùng cho nút một chạm) */
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Bọc quanh toàn ứng dụng (xem src/main.tsx).
 * Giá trị khởi tạo đã được script inline trong index.html áp lên <html>
 * từ trước khi React chạy, nên không có hiện tượng nháy trắng.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<ThemeChoice>(readStoredTheme);
  const [sysTheme, setSysTheme] = useState<ResolvedTheme>(systemTheme);

  /* Giá trị thật = dẫn xuất, không phải state riêng → luôn nhất quán với choice */
  const resolved: ResolvedTheme = choice === 'system' ? sysTheme : choice;

  /* Theo dõi hệ điều hành; chỉ có tác dụng khi đang chọn "system" */
  useEffect(() => watchSystemTheme(setSysTheme), []);

  /* Áp lên <html> và ghi nhớ lựa chọn */
  useEffect(() => {
    applyTheme(resolved);
    localStorage.setItem(THEME_STORAGE_KEY, choice);
  }, [choice, resolved]);

  /* Đồng bộ giữa nhiều tab đang mở */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY) setChoice(readStoredTheme());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleTheme = useCallback(
    () => setChoice(resolved === 'dark' ? 'light' : 'dark'),
    [resolved]
  );

  const value = useMemo(
    () => ({ choice, resolved, setTheme: setChoice, toggleTheme }),
    [choice, resolved, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme phải nằm trong <ThemeProvider>');
  return ctx;
}
