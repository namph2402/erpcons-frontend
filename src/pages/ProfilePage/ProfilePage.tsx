import { useState } from "react";
import Avatar from "../../components/ui/Avatar";
import Icon from "../../components/ui/Icon";
import type { User } from "../../types";
import "./ProfilePage.css";

interface ProfilePageProps {
  user: User;
}

type TabType = "account" | "work" | "bank" | "contract";

export default function ProfilePage({ user }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<TabType>("account");

  return (
    <div className="profile-container">
      {/* Breadcrumbs */}
      <nav className="profile-breadcrumbs">
        <span>Trang chủ</span>
        <Icon name="chevron_right" size={16} />
        <span>Hồ sơ cá nhân</span>
        <Icon name="chevron_right" size={16} />
        <span className="current">Thông tin tài khoản</span>
      </nav>

      <div className="profile-layout">
        {/* SIDEBAR TRÁI */}
        <aside className="profile-sidebar">
          <div className="profile-sidebar__identity">
            <div className="profile-sidebar__avatar-group">
              <Avatar src={user.avatar} name={user.name} size={96} />
              <button className="profile-sidebar__avatar-edit">
                <Icon name="photo_camera" size={16} />
              </button>
            </div>
            <h2 className="profile-sidebar__name">{user.name}</h2>
            <p className="profile-sidebar__role">{user.role || "Nhân viên"}</p>

            <div className="profile-sidebar__contact">
              <div className="contact-item">
                <Icon name="call" size={18} />
                <span>{user.phone || "Chưa cập nhật"}</span>
              </div>
              <div className="contact-item">
                <Icon name="mail" size={18} />
                <span>{user.email}</span>
              </div>
              <div className="contact-item">
                <Icon name="calendar_today" size={18} />
                <span>10/05/2021</span> {/* Thay bằng user.joinDate nếu có */}
              </div>
              <div className="contact-item">
                <Icon name="badge" size={18} />
                <span>036204000829</span>
              </div>
              <div className="contact-item">
                <Icon name="location_on" size={18} />
                <span>Việt Nam</span>
              </div>
              <div className="contact-item">
                <Icon name="account_balance" size={18} />
                <span className="text-sm">
                  Cục trưởng cục cảnh sát quản lý hành chính về trật tự xã hội
                </span>
              </div>
            </div>

            <div className="profile-sidebar__footer">
              <p>
                Ngày tạo tài khoản: <span>10/05/2021</span>
              </p>
              <p>
                Cập nhật lần cuối: <span>08/08/2024 10:30</span>
              </p>
            </div>
          </div>

          <nav className="profile-sidebar__menu">
            <button className="menu-btn active">
              <Icon name="person" size={20} /> Hồ sơ cá nhân
            </button>
            <button className="menu-btn">
              <Icon name="lock" size={20} /> Đổi mật khẩu
            </button>
            <button className="menu-btn">
              <Icon name="history" size={20} /> Lịch sử đăng nhập
            </button>
          </nav>
        </aside>

        {/* NỘI DUNG PHẢI */}
        <main className="profile-main">
          <header className="profile-main__tabs">
            <button
              className={`tab-btn ${activeTab === "account" ? "active" : ""}`}
              onClick={() => setActiveTab("account")}
            >
              Thông tin tài khoản
            </button>
            <button
              className={`tab-btn ${activeTab === "work" ? "active" : ""}`}
              onClick={() => setActiveTab("work")}
            >
              Thông tin công việc
            </button>
            <button
              className={`tab-btn ${activeTab === "bank" ? "active" : ""}`}
              onClick={() => setActiveTab("bank")}
            >
              Thông tin ngân hàng
            </button>
            <button
              className={`tab-btn ${activeTab === "contract" ? "active" : ""}`}
              onClick={() => setActiveTab("contract")}
            >
              Thông tin hợp đồng
            </button>
          </header>

          <div className="profile-main__content">
            {activeTab === "account" && (
              <div className="profile-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Mã số thuế</label>
                    <input type="text" placeholder="Nhập mã số thuế" />
                  </div>
                  <div className="form-group">
                    <label>Số bảo hiểm</label>
                    <input type="text" placeholder="Nhập số bảo hiểm" />
                  </div>
                  <div className="form-group">
                    <label>Trình độ học vấn</label>
                    <select>
                      <option>Đại học</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Giới tính</label>
                    <select>
                      <option>Nam</option>
                      <option>Nữ</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Ngày sinh</label>
                    <input type="date" defaultValue="2004-08-08" />
                  </div>
                  <div className="form-group">
                    <label>Quốc tịch</label>
                    <select>
                      <option>Việt Nam</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Ngày cấp căn cước</label>
                    <input type="date" defaultValue="2021-05-10" />
                  </div>
                  <div className="form-group">
                    <label>Số căn cước</label>
                    <input type="text" defaultValue="036204000829" />
                  </div>
                  <div className="form-group">
                    <label>Nơi cấp căn cước</label>
                    <select>
                      <option>Việt Nam</option>
                    </select>
                  </div>
                  <div className="form-group span-2">
                    <label>&nbsp;</label>
                    <div className="input-with-icon">
                      <input
                        type="text"
                        defaultValue="Cục trưởng cục cảnh sát quản lý hành chính về trật tự xã hội"
                      />
                      <Icon name="cancel" size={16} className="clear-icon" />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button className="btn-save">Lưu thay đổi</button>
                </div>

                <div className="profile-alert">
                  <Icon name="info" size={20} />
                  <span>
                    Lưu ý: Thông tin tài khoản sẽ được sử dụng để xác thực và
                    bảo mật. Vui lòng cập nhật đầy đủ và chính xác.
                  </span>
                </div>
              </div>
            )}

            {activeTab === "work" && (
              <div className="profile-form">
                <h3 className="section-title">
                  <Icon name="work_outline" size={20} /> THÔNG TIN CÔNG VIỆC
                </h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Chức vụ</label>
                    <input type="text" defaultValue="TTS Công nghệ thông tin" />
                  </div>
                  <div className="form-group">
                    <label>Điện thoại tổ chức</label>
                    <input type="text" defaultValue={user.phone} />
                  </div>
                  <div className="form-group">
                    <label>Email tổ chức</label>
                    <input type="text" defaultValue={user.email} />
                  </div>
                  <div className="form-group">
                    <label>Hình thức làm việc</label>
                    <select>
                      <option>Linh hoạt</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Chính sách phép</label>
                    <select>
                      <option>Không</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Chính sách công</label>
                    <select>
                      <option>Có</option>
                    </select>
                  </div>
                  <div className="form-group span-full">
                    <label>Thỏa thuận</label>
                    <textarea
                      placeholder="Nhập nội dung thỏa thuận"
                      rows={4}
                    ></textarea>
                    <span className="char-count">0/1000</span>
                  </div>
                </div>
                <div className="form-actions">
                  <button className="btn-save">
                    <Icon name="save" size={18} /> Lưu thay đổi
                  </button>
                </div>
              </div>
            )}

            {/* TAB THÔNG TIN NGÂN HÀNG */}
            {activeTab === "bank" && (
              <div className="profile-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Hình thức trả lương</label>
                    <select>
                      <option>Ngân hàng</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Kỳ trả</label>
                    <select>
                      <option>Hàng tháng</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Lương vận hành</label>
                    <div className="input-group">
                      <input type="number" defaultValue="0" />
                      <span className="unit">VND</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Thưởng</label>
                    <div className="input-group">
                      <input type="number" defaultValue="0" />
                      <span className="unit">VND</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Lương ngày</label>
                    <div className="input-group">
                      <input type="number" defaultValue="0" />
                      <span className="unit">VND</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Lương giờ</label>
                    <div className="input-group">
                      <input type="number" defaultValue="0" />
                      <span className="unit">VND</span>
                    </div>
                  </div>
                  <div className="form-group span-2">
                    <label>Khoản trừ</label>
                    <textarea
                      placeholder="Nhập khoản trừ (nếu có)"
                      rows={3}
                    ></textarea>
                  </div>
                  <div className="form-group span-1">
                    <label>Ghi chú</label>
                    <textarea
                      placeholder="Nhập ghi chú (nếu có)"
                      rows={3}
                    ></textarea>
                    <span className="char-count">0/200</span>
                  </div>
                </div>
                <div className="form-actions">
                  <button className="btn-add-row">
                    <Icon name="add" size={18} /> Thêm dòng
                  </button>
                </div>
              </div>
            )}

            {/* TAB THÔNG TIN HỢP ĐỒNG */}
            {activeTab === "contract" && (
              <div className="profile-form">
                <h3 className="section-title">
                  <Icon name="description" size={20} /> THÔNG TIN HỢP ĐỒNG
                </h3>
                <p className="sub-section-title">Thông tin hợp đồng hiện tại</p>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Loại hợp đồng</label>
                    <select>
                      <option>Hợp đồng không xác định thời hạn</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Số hợp đồng</label>
                    <input type="text" defaultValue="HD2024-00123" />
                  </div>
                  <div className="form-group">
                    <label>Ngày ký hợp đồng</label>
                    <input type="date" defaultValue="2024-06-01" />
                  </div>
                  <div className="form-group">
                    <label>Ngày bắt đầu hiệu lực</label>
                    <input type="date" defaultValue="2024-06-01" />
                  </div>
                  <div className="form-group">
                    <label>Ngày hết hạn</label>
                    <input type="text" placeholder="Không thời hạn" disabled />
                  </div>
                  <div className="form-group">
                    <label>Thời gian thử việc</label>
                    <input type="text" defaultValue="02 tháng" />
                  </div>
                  <div className="form-group">
                    <label>Vị trí công việc</label>
                    <input
                      type="text"
                      defaultValue="Chuyên viên Công nghệ thông tin"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phòng ban</label>
                    <input
                      type="text"
                      defaultValue="Phòng Công nghệ thông tin"
                    />
                  </div>
                  <div className="form-group">
                    <label>Quản lý trực tiếp</label>
                    <select>
                      <option>Nguyễn Văn Minh</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Địa điểm làm việc</label>
                    <input type="text" defaultValue="Hà Nội" />
                  </div>
                  <div className="form-group">
                    <label>Hình thức làm việc</label>
                    <select>
                      <option>Toàn thời gian</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tình trạng hợp đồng</label>
                    <span className="badge-status success">Đang hiệu lực</span>
                  </div>
                </div>

                <div className="attachment-section">
                  <p className="sub-section-title">Phụ lục hợp đồng</p>
                  <div className="file-item">
                    <Icon
                      name="picture_as_pdf"
                      size={24}
                      className="pdf-icon"
                    />
                    <div className="file-info">
                      <p className="file-name">
                        Phu_luc_hop_dong_HD2024-00123.pdf
                      </p>
                      <p className="file-size">512 KB</p>
                    </div>
                    <div className="file-actions">
                      <Icon name="download" size={20} />
                      <Icon name="visibility" size={20} />
                    </div>
                  </div>
                  <button className="btn-outline-add">
                    <Icon name="add" size={16} /> Thêm phụ lục
                  </button>
                </div>

                <div className="form-actions">
                  <button className="btn-save">
                    <Icon name="save" size={18} /> Lưu thay đổi
                  </button>
                </div>

                <div className="profile-alert info">
                  <Icon name="info" size={20} />
                  <span>
                    Lưu ý: Thông tin hợp đồng chỉ có thể được cập nhật bởi phòng
                    nhân sự.
                  </span>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
