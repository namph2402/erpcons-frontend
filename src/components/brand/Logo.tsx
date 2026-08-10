import './Logo.css'

export interface LogoProps {
  /** 01 · LOGO BẤT BIẾN — chỉ 2 phiên bản: ngang & dọc */
  variant?: 'horizontal' | 'vertical' | 'mark'
  /** invert = đặt trên nền tối (sidebar) */
  onDark?: boolean
  size?: number
  className?: string
}

/**
 * Logo ERPCons — vẽ bằng SVG để giữ đúng tỷ lệ ở mọi kích thước.
 * NGHIÊM CẤM: đổi màu, xoay, thêm viền/hiệu ứng, bóp méo tỷ lệ.
 */
export default function Logo({
  variant = 'horizontal',
  onDark = false,
  size = 36,
  className = '',
}: LogoProps) {
  const mark = (
    <svg
      className="logo__mark"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M31 4c-9.4 0-17 7-17 15.6 0 3.6 1.2 6.5 3.4 9.2 1.2 1.5 1.6 2.6 1.6 4.3V44h6.4v-6.6c0-2.4-.7-4.3-2.4-6.4-1.7-2-2.6-4.2-2.6-6.9C20.4 17 25 12.6 31 12.6h13V4H31Z"
        fill="var(--erp-red)"
      />
      <rect x="4" y="10" width="12" height="3.6" rx="1.8" fill="var(--erp-red)" />
      <rect x="4" y="18" width="9" height="3.6" rx="1.8" fill="var(--erp-red)" />
      <rect x="4" y="26" width="12" height="3.6" rx="1.8" fill="var(--erp-red)" />
      <path
        d="m34 16 3 3 6-6"
        stroke="var(--erp-red)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m34 26 3 3 6-6"
        stroke="var(--erp-red)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  if (variant === 'mark') {
    return <span className={`logo logo--mark ${className}`.trim()}>{mark}</span>
  }

  return (
    <span
      className={[
        'logo',
        `logo--${variant}`,
        onDark ? 'logo--on-dark' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {mark}
      <span className="logo__word">
        <span className="logo__name">
          <strong>ERP</strong>
          <em>CONS</em>
        </span>
        <span className="logo__tagline">Construction OS</span>
      </span>
    </span>
  )
}
