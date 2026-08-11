import { useState } from 'react'
import { MobileShell } from '../../components/mobile'
import { Icon } from '../../components/ui'
import { mainNav, personalFooterNav } from '../../data/navigation'
import { currentUser } from '../../data/mock'
import './mobile.css'

/** Ô vuông QR mô phỏng — vẽ bằng lưới để không cần ảnh ngoài */
function QrPattern() {
  const CELLS = 21
  /** Mẫu tất định để lần render nào cũng giống nhau */
  const filled = (r: number, c: number) => {
    const inFinder =
      (r < 7 && c < 7) || (r < 7 && c >= CELLS - 7) || (r >= CELLS - 7 && c < 7)
    if (inFinder) {
      const rr = r < 7 ? r : r - (CELLS - 7)
      const cc = c < 7 ? c : c - (CELLS - 7)
      const ring = rr === 0 || rr === 6 || cc === 0 || cc === 6
      const core = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4
      return ring || core
    }
    return (r * 7 + c * 13 + ((r * c) % 5)) % 3 === 0
  }

  return (
    <svg viewBox={`0 0 ${CELLS} ${CELLS}`} className="m-qr" aria-hidden="true">
      {Array.from({ length: CELLS }, (_, r) =>
        Array.from({ length: CELLS }, (_, c) =>
          filled(r, c) ? (
            <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#0f172a" />
          ) : null,
        ),
      )}
    </svg>
  )
}

/** 63 · QR Scanner — quét QR code nhanh chóng */
export default function QrScanner() {
  const [mode, setMode] = useState<'scan' | 'history'>('scan')

  return (
    <MobileShell
      user={currentUser}
      navGroups={mainNav}
      drawerFooterItems={personalFooterNav}
      navActiveId="more"
      hideNavBar
      fullBleed
      header={{
        variant: 'page',
        title: 'Quét QR Code',
        onBack: () => window.history.back(),
        actions: (
          <button className="mheader__icon-btn" type="button" aria-label="Bật đèn flash">
            <Icon name="flash_on" size={24} />
          </button>
        ),
      }}
    >
      <div className="m-scanner">
        <div className="m-scanner__frame">
          <span className="m-scanner__corner m-scanner__corner--tl" />
          <span className="m-scanner__corner m-scanner__corner--tr" />
          <span className="m-scanner__corner m-scanner__corner--bl" />
          <span className="m-scanner__corner m-scanner__corner--br" />
          <span className="m-scanner__laser" />
          <QrPattern />
          <span className="m-scanner__code">PRJ-TNT-000123</span>
        </div>
        <p className="m-scanner__hint">Đưa mã QR vào khung hình để quét</p>
      </div>

      <div className="m-segment">
        <button
          type="button"
          className={mode === 'scan' ? 'is-active' : ''}
          onClick={() => setMode('scan')}
        >
          <Icon name="qr_code_scanner" size={24} />
          Quét mã
        </button>
        <button
          type="button"
          className={mode === 'history' ? 'is-active' : ''}
          onClick={() => setMode('history')}
        >
          <Icon name="history" size={24} />
          Lịch sử
        </button>
      </div>

      <div style={{ padding: 'var(--sp-3)', background: 'var(--bg-app)' }}>
        <section className="m-card">
          <div className="m-card__head">
            <h2 className="m-card__title">Kết quả quét</h2>
          </div>
          <div className="m-project">
            <span className="m-project__thumb">
              <Icon name="apartment" size={20} />
            </span>
            <div className="m-project__body">
              <p className="m-project__name">The Nexus Tower</p>
              <p className="m-project__label">Mã: PRJ-TNT-000123</p>
              <p className="m-project__label">Loại: Dự án</p>
            </div>
          </div>
          <a
            className="m-card__link row-between"
            href="#/du-an/NT-2024-001"
            style={{ marginTop: 'var(--sp-2)' }}
          >
            Xem chi tiết
            <Icon name="chevron_right" size={18} />
          </a>
        </section>
      </div>
    </MobileShell>
  )
}
