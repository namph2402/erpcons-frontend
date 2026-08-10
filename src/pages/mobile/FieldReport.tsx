import { useState } from 'react'
import { MobileShell } from '../../components/mobile'
import { Button, Icon, Select } from '../../components/ui'
import { currentUser } from '../../data/mock'
import { appFooterNav, appNav } from '../../data/navigation'
import './mobile.css'

/** Biên độ sóng cố định để lần render nào cũng như nhau */
const WAVE = [
  6, 12, 20, 14, 22, 9, 16, 24, 11, 18, 8, 15, 21, 13, 19, 10, 23, 7, 17, 12,
  20, 9, 14, 22, 11, 16, 8, 18, 13, 6,
]

/** 65 · Field Report — báo cáo hiện trường nhanh */
export default function FieldReport() {
  const [photos, setPhotos] = useState(['p1', 'p2', 'p3'])

  return (
    <MobileShell
      user={currentUser}
      navGroups={appNav}
      drawerFooterItems={appFooterNav}
      navActiveId="more"
      hideNavBar
      header={{
        variant: 'page',
        title: 'Báo cáo hiện trường',
        onBack: () => window.history.back(),
        actions: (
          <button className="mheader__icon-btn" type="button" aria-label="Gửi báo cáo">
            <Icon name="send" size={24} color="var(--info)" />
          </button>
        ),
      }}
    >
      <form className="m-card" onSubmit={(e) => e.preventDefault()}>
        <div className="m-field">
          <label className="m-field__label" htmlFor="fr-project">
            Dự án<span className="req">*</span>
          </label>
          <Select
            id="fr-project"
            options={[
              { value: 'nexus', label: 'The Nexus Tower' },
              { value: 'sunshine', label: 'Sunshine Residence' },
              { value: 'factory', label: 'Factory Expansion' },
            ]}
          />
        </div>

        <div className="m-field">
          <label className="m-field__label" htmlFor="fr-item">
            Hạng mục<span className="req">*</span>
          </label>
          <Select
            id="fr-item"
            options={[
              { value: 'structure', label: 'Thi công kết cấu' },
              { value: 'mep', label: 'Thi công MEP' },
              { value: 'finish', label: 'Hoàn thiện' },
            ]}
          />
        </div>

        <div className="m-field">
          <label className="m-field__label" htmlFor="fr-location">
            Vị trí
          </label>
          <Select
            id="fr-location"
            options={[
              { value: 'f12b', label: 'Tầng 12 - Khu B' },
              { value: 'f10a', label: 'Tầng 10 - Khu A' },
              { value: 'b1', label: 'Tầng hầm B1' },
            ]}
          />
        </div>

        <div className="m-field">
          <label className="m-field__label" htmlFor="fr-time">
            Thời gian<span className="req">*</span>
          </label>
          <input
            id="fr-time"
            className="m-field__control"
            type="datetime-local"
            defaultValue="2024-05-31T09:41"
          />
        </div>

        <div className="m-field">
          <label className="m-field__label" htmlFor="fr-content">
            Nội dung<span className="req">*</span>
          </label>
          <textarea
            id="fr-content"
            defaultValue={
              'Tiến hành đổ bê tông dầm D12.\nThời tiết nắng, nhiệt độ 32°C.\nCông tác an toàn đảm bảo.'
            }
          />
        </div>
      </form>

      <section className="m-card">
        <div className="m-card__head">
          <h2 className="m-card__title">Hình ảnh ({photos.length}/10)</h2>
          <button className="m-card__link" type="button">
            Xem tất cả
          </button>
        </div>
        <div className="m-photos">
          {photos.map((p) => (
            <div className="m-photo" key={p}>
              <Icon name="image" size={24} />
              <button
                className="m-photo__remove"
                type="button"
                aria-label="Xoá ảnh"
                onClick={() => setPhotos((prev) => prev.filter((x) => x !== p))}
              >
                <Icon name="close" size={12} />
              </button>
            </div>
          ))}
          <button
            className="m-photo m-photo--add"
            type="button"
            aria-label="Thêm ảnh"
            onClick={() => setPhotos((prev) => [...prev, `p${Date.now()}`])}
          >
            <Icon name="add" size={24} />
          </button>
        </div>
      </section>

      <section className="m-card">
        <div className="m-card__head">
          <h2 className="m-card__title">Ghi chú thoại (00:18)</h2>
        </div>
        <div className="m-voice">
          <button className="m-voice__play" type="button" aria-label="Phát ghi âm">
            <Icon name="play_arrow" size={20} filled />
          </button>
          <span className="m-voice__wave" aria-hidden="true">
            {WAVE.map((h, i) => (
              <i key={i} style={{ height: h }} />
            ))}
          </span>
          <button className="m-voice__delete" type="button" aria-label="Xoá ghi âm">
            <Icon name="delete" size={20} />
          </button>
        </div>
      </section>

      <section className="m-card">
        <div className="m-card__head">
          <h2 className="m-card__title">Tài liệu đính kèm (1)</h2>
        </div>
        <div className="m-attach">
          <span className="m-attach__icon">
            <Icon name="picture_as_pdf" size={18} />
          </span>
          <div className="m-attach__body">
            <p className="m-attach__name truncate">Kế hoạch thi công tầng 12.pdf</p>
            <p className="m-attach__size">2.4 MB</p>
          </div>
          <button type="button" aria-label="Gỡ tệp" style={{ color: 'var(--slate-400)' }}>
            <Icon name="close" size={18} />
          </button>
        </div>
      </section>

      <section className="m-card">
        <div className="m-field" style={{ marginBottom: 0 }}>
          <label className="m-field__label" htmlFor="fr-receiver">
            Người nhận
          </label>
          <Select
            id="fr-receiver"
            options={[
              { value: 'tvb', label: 'Trần Văn B (Chỉ huy trưởng)' },
              { value: 'lmc', label: 'Lê Minh C (Giám sát)' },
              { value: 'nvа', label: 'Nguyễn Văn A (Project Manager)' },
            ]}
          />
        </div>
      </section>

      <div className="m-actionbar">
        <Button variant="secondary" size="lg">
          Lưu nháp
        </Button>
        <Button variant="primary" size="lg">
          Gửi báo cáo
        </Button>
      </div>
    </MobileShell>
  )
}
