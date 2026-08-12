import Icon from '../components/ui/Icon';
import { useTheme } from './ThemeProvider';
import { THEME_OPTIONS } from './theme';
import './ThemeSwitch.css';

/**
 * 02.9 · USER MENU — hàng "Giao diện" với 3 lựa chọn Sáng / Tối / Theo hệ thống.
 * Dùng vai trò radiogroup để đọc màn hình hiểu đây là một nhóm lựa chọn.
 */
export function ThemeSegmented({ className = '' }: { className?: string }) {
  const { choice, setTheme } = useTheme();

  return (
    <div className={`theme-seg ${className}`.trim()}>
      <span className="theme-seg__label">Giao diện</span>
      <div className="theme-seg__group" role="radiogroup" aria-label="Giao diện">
        {THEME_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={choice === opt.value}
            title={opt.label}
            className={`theme-seg__btn ${choice === opt.value ? 'is-active' : ''}`}
            onClick={() => setTheme(opt.value)}
          >
            <Icon name={opt.icon} size={18} />
            <span className="theme-seg__text">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Nút một chạm Sáng ↔ Tối cho Topbar / MobileHeader.
 * Icon hiển thị theme SẼ chuyển sang, đúng quy ước quen thuộc của người dùng.
 */
export function ThemeToggleButton({ className = '' }: { className?: string }) {
  const { resolved, toggleTheme } = useTheme();
  const next = resolved === 'dark' ? 'Sáng' : 'Tối';

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={`Chuyển sang giao diện ${next}`}
      title={`Chuyển sang giao diện ${next}`}
    >
      <Icon name={resolved === 'dark' ? 'light_mode' : 'dark_mode'} size={20} />
    </button>
  );
}
