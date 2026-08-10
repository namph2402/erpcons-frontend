import logoImg from '../../assets/logo.png'
import './Logo.css'

export interface LogoProps {
  /** Biến thể logo: 'horizontal' (đầy đủ), 'vertical', hoặc 'mark' (chỉ icon) */
  variant?: 'horizontal' | 'vertical' | 'mark'
  /** Đặt trên nền tối (như sidebar, mobile drawer) */
  onDark?: boolean
  /** Kích thước chiều cao hoặc chiều rộng (px hoặc chuỗi CSS như '100%') */
  size?: number | string
  /** Chiều rộng cụ thể (nếu muốn set theo width, ví dụ '100%' hoặc số px) */
  width?: number | string
  /** Chiều cao cụ thể (nếu muốn set theo height) */
  height?: number | string
  className?: string
  alt?: string
}

/**
 * Logo ERPCons — Sử dụng logo chuẩn từ assets/logo.png
 */
export default function Logo({
  variant = 'horizontal',
  onDark = false,
  size,
  width,
  height,
  className = '',
  alt = 'ERPCons - Construction OS',
}: LogoProps) {
  if (variant === 'mark') {
    const markSize = size ?? width ?? height ?? 44
    const markSizeStr = typeof markSize === 'number' ? `${markSize}px` : markSize
    return (
      <span
        className={[
          'logo',
          'logo--mark',
          onDark ? 'logo--on-dark' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ width: markSizeStr, height: markSizeStr }}
      >
        <img
          src={logoImg}
          alt={alt}
          className="logo__img logo__img--mark"
        />
      </span>
    )
  }

  const customStyle: React.CSSProperties = {}
  if (width !== undefined) {
    customStyle.width = typeof width === 'number' ? `${width}px` : width
  }
  if (height !== undefined) {
    customStyle.height = typeof height === 'number' ? `${height}px` : height
  } else if (size !== undefined && width === undefined) {
    customStyle.height = typeof size === 'number' ? `${size}px` : size
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
      style={Object.keys(customStyle).length > 0 ? customStyle : undefined}
    >
      <img
        src={logoImg}
        alt={alt}
        className="logo__img"
        style={Object.keys(customStyle).length > 0 ? customStyle : undefined}
      />
    </span>
  )
}


