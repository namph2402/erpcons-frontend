import Icon from '../ui/Icon'
import './WelcomeBanner.css'

export interface WelcomeBannerProps {
  name: string
  /** Dòng phụ dưới lời chào */
  subtitle?: string
  /** Emoji/biểu tượng cạnh lời chào */
  emoji?: string
  weather?: {
    temperature: string
    condition: string
    location: string
    icon?: string
  }
  date?: {
    weekday: string
    full: string
    time: string
  }
  /** Ảnh nền công trường */
  image?: string
}

/** Banner chào mừng đầu trang chủ (view 01) */
export default function WelcomeBanner({
  name,
  subtitle = 'Chào mừng bạn trở lại ERPCons Construction OS',
  emoji = '👋',
  weather,
  date,
  image,
}: WelcomeBannerProps) {
  return (
    <section
      className="welcome"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className="welcome__overlay" />
      <div className="welcome__content">
        <span className="welcome__emoji" aria-hidden="true">
          {emoji}
        </span>
        <div>
          <h1 className="welcome__title">Xin chào, {name}</h1>
          <p className="welcome__subtitle">{subtitle}</p>
        </div>
      </div>

      {(weather || date) && (
        <div className="welcome__aside">
          {weather && (
            <div className="welcome__weather">
              <Icon name={weather.icon ?? 'sunny'} size={28} filled />
              <div>
                <p className="welcome__temp num">{weather.temperature}</p>
                <p className="welcome__weather-meta">{weather.location}</p>
              </div>
            </div>
          )}
          {weather && date && <span className="welcome__divider" />}
          {date && (
            <div className="welcome__date">
              <p className="welcome__weekday">
                {date.weekday}, {date.full}
              </p>
              <p className="welcome__time num">{date.time}</p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
