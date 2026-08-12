# ERPCons — Hệ màu & Theme (Light · Dark)

> Mã hoá của **COLOR GUIDELINE 2026–2036 · "GRAPHITE & CRIMSON"** thành design token.
> File duy nhất giữ giá trị màu: [`src/styles/tokens.css`](../src/styles/tokens.css).
> Cơ chế đổi theme: [`src/theme/`](../src/theme/).

---

## 1. Kiến trúc 2 tầng

```
TẦNG 1 · PRIMITIVE    --crimson-500  --carbon  --steel  --digital-600  --success-600 …
                      Bảng màu gốc. GIỐNG NHAU ở Light và Dark. Không dùng trực tiếp.
        ↓
TẦNG 2 · ROLE         --bg-surface  --text-primary  --border  --success  --chart-1 …
                      Vai trò giao diện. ĐỔI GIÁ TRỊ theo <html data-theme>.
        ↓
COMPONENT             chỉ được dùng token tầng 2
```

Nhờ tách tầng, **một component viết một lần chạy đúng ở cả hai theme** — không cần
viết thêm bất kỳ khối CSS `dark:` nào.

Quy tắc bất biến:

- ❌ Không hard-code màu (`#fff`, `rgba(…)`) trong component.
- ❌ Không dùng primitive trong component (`--carbon`, `--mist`, `--crimson-500`).
- ✅ Chỉ dùng role token. Thiếu vai trò nào thì **thêm role mới vào cả 2 khối theme**,
  không mượn tạm primitive.

Ngoại lệ duy nhất đã ghi chú tại chỗ: mã QR mô phỏng (`.m-qr`) cố tình dùng
`--white` / `--ink` vì mã QR phải luôn là ô tối trên nền sáng mới quét được.

---

## 2. Bảng màu (mục 02 · 03 của quy chuẩn)

### Brand — chỉ nhận diện, giới hạn ~4% diện tích

| Vai trò | Mã | Ghi chú |
|---|---|---|
| Crimson Identity | `#C8102E` | logo, CTA chính. Token: `--erp-red` |
| Chữ thương hiệu | `#C8102E` (light) · `#FF6B7F` (dark) | `--brand-text` — bản gốc không đủ tương phản trên nền tối |

**Crimson không bao giờ dùng cho trạng thái** (Success/Warning/Danger) — mục 05.

### Enterprise Foundation — nền tảng giao diện

| Tên | Mã | Dùng cho |
|---|---|---|
| Carbon | `#081220` | nền ứng dụng (dark), thanh điều hướng |
| Graphite | `#242A32` | cấu trúc, khối đặc |
| Steel | `#475467` | đường viền, phân tách, chữ phụ (light) |
| Concrete | `#D9DEE5` | viền trên nền sáng |
| Mist | `#F5F7F9` | nền ứng dụng (light) |
| White | `#FFFFFF` | bề mặt chính, nội dung |

### Accent — 4 họ theo ngữ cảnh nghiệp vụ

| Họ | Mã (light) | Mã (dark) | Ngữ cảnh |
|---|---|---|---|
| `--digital` | `#2E5AAC` | `#6C97E0` | thông tin, dữ liệu, CDE, BIM, tích hợp, báo cáo |
| `--intelligence` | `#147D78` | `#3FB3AC` | AI, camera, IoT, cảm biến, tự động hoá, phân tích |
| `--esg` | `#2F7D55` | `#57B583` | carbon, năng lượng, nước, rác thải, vật liệu xanh |
| `--construction` | `#A86F3D` | `#D09A63` | vật liệu, thiết bị, khối lượng, chi phí, thi công |

Bí danh cho code cũ vẫn chạy: `--ai` `--ocr` `--iot` → Intelligence · `--automation`
`--analytics` → Digital · `--digital-twin` → Carbon.

### Semantic — chỉ cho trạng thái

| Token | Light | Dark | Ý nghĩa |
|---|---|---|---|
| `--success` | `#168A5A` | `#3EBE8A` | hoàn thành, đạt mục tiêu |
| `--warning` | `#B7791F` | `#E0A73F` | cảnh báo, risk trung bình |
| `--danger` | `#C4320A` | `#F2683F` | lỗi, sự cố, risk cao |
| `--info` | `#2E5AAC` | `#6C97E0` | thông tin, nhắc nhở |
| `--disabled` | `#667085` | `#98A2B3` | trung tính, chưa xác định |

Mỗi màu semantic có 3 biến thể dùng theo ngữ cảnh:

| Dùng cho | Token | Ví dụ |
|---|---|---|
| Icon, viền, thanh tiến độ | `--success` | `border-color: var(--danger)` |
| Nền mềm của chip / khối cảnh báo | `--success-soft` | nền badge |
| **Chữ** đặt trên nền mềm | `--success-text` | chữ trong badge — đã tính đủ 4.5:1 |

### Biểu đồ (mục 08)

`--chart-1` Digital · `--chart-2` Intelligence · `--chart-3` ESG ·
`--chart-4` Construction · `--chart-5` Other. Dùng dãy này cho dữ liệu **phân loại**;
chỉ dùng màu semantic khi chuỗi dữ liệu thật sự mang nghĩa trạng thái (vd. thang tuổi nợ).

---

## 3. Bề mặt & chữ (mục 06 — nguyên văn quy chuẩn)

| Role token | Light | Dark |
|---|---|---|
| `--bg-app` | `#F5F7F9` | `#081220` |
| `--bg-surface` | `#FFFFFF` | `#111A27` |
| `--bg-elevated` (popover, modal) | `#FFFFFF` | `#162333` |
| `--bg-subtle` / `--bg-muted` | `#F0F3F6` | `#162333` |
| `--border` | `#D9DEE5` | `#263445` |
| `--text-primary` | `#101828` | `#F2F4F7` |
| `--text-secondary` | `#475467` | `#98A2B3` |
| `--text-tertiary` | `#667085` | `#7D8899` |
| `--text-disabled` | `#98A2B3` | `#667085` |

Nguyên tắc riêng của theme tối: **độ nổi thể hiện bằng nền sáng dần**
(`bg-app` → `bg-surface` → `bg-elevated`), **không** bằng bóng đổ — bóng gần như
vô hình trên nền tối. Thanh điều hướng đi ngược lại: tối hơn nền app để giữ phân tầng.

---

## 4. Kiểm chứng tiếp cận (mục 07 · WCAG 2.2 AA)

Đã tính tỷ lệ tương phản cho 23 cặp màu chính ở **cả hai theme**:

| Cặp | Light | Dark |
|---|---|---|
| Chữ chính / thẻ | 17.75:1 | 15.87:1 |
| Chữ phụ / thẻ | 7.69:1 | 6.79:1 |
| Chữ hạng 3 / thẻ | 4.97:1 | 4.87:1 |
| Chữ thương hiệu / thẻ | 5.88:1 | 6.38:1 |
| Chip Success / Warning / Danger / Info | 5.71 · 5.24 · 6.17 · 9.11 | 6.56 · 7.48 · 5.69 · 5.52 |
| Chữ trên nút Primary | 5.88:1 | 5.88:1 |
| 5 chuỗi biểu đồ / thẻ | 4.19 – 6.62 | 5.95 – 7.07 |

Tất cả đạt ngưỡng (chữ thường ≥ 4.5:1 · icon và thành phần UI ≥ 3:1).

**Một ngoại lệ có chủ đích**: `--text-disabled #98A2B3` trên nền trắng = 2.58:1.
Đây đúng là mã quy chuẩn quy định cho Text Disabled, và WCAG 1.4.3 miễn trừ thành
phần đang vô hiệu hoá. Không dùng token này cho chữ còn hiệu lực.

---

## 5. Cơ chế đổi theme

```
src/theme/
├─ theme.ts           # kiểu ThemeChoice, đọc/ghi localStorage, quy đổi, applyTheme()
├─ ThemeProvider.tsx  # context + hook useTheme()
├─ ThemeSwitch.tsx    # ThemeSegmented (User Menu) · ThemeToggleButton (Topbar)
└─ index.ts
```

Ba lựa chọn theo 02.9 · User Menu: **Sáng · Tối · Theo hệ thống**.

Điểm cốt lõi: `"system"` là *lựa chọn của người dùng*, không phải giá trị áp lên DOM.
Nó luôn được quy đổi về `light|dark` rồi mới ghi `<html data-theme="…">`. Nhờ vậy
CSS chỉ cần **một** khối token tối duy nhất, không phải nhân đôi cho
`prefers-color-scheme`.

Chuỗi khởi động:

1. Script inline trong `index.html` chạy **trước** CSS và React → áp `data-theme`
   ngay lập tức, không nháy nền trắng. Phải giữ đồng bộ với `theme.ts` (khoá lưu
   `erpcons.theme`, cách quy đổi).
2. `ThemeProvider` khởi tạo từ đúng giá trị đó.
3. Khi đang chọn `system`, provider lắng nghe `matchMedia` để đổi theo hệ điều hành.
4. Sự kiện `storage` đồng bộ theme giữa nhiều tab đang mở.
5. Lúc đổi, `<html>` được gắn `data-theme-switching` trong 250ms để chạy transition
   mượt, sau đó gỡ ra. Tự vô hiệu khi người dùng bật "giảm chuyển động".

`applyTheme()` cũng cập nhật `<meta name="theme-color">` để thanh trạng thái trình
duyệt trên mobile khớp nền ứng dụng.

---

## 6. Thêm màn hình mới — checklist

- [ ] Không viết mã màu nào trong CSS/TSX của màn hình.
- [ ] Nền dùng `--bg-surface` (thẻ) / `--bg-app` (nền trang) / `--bg-elevated` (nổi).
- [ ] Chữ dùng `--text-primary|secondary|tertiary`, viền dùng `--border`.
- [ ] Trạng thái dùng semantic **kèm icon + chữ**, không truyền đạt chỉ bằng màu.
- [ ] Dữ liệu phân loại trên biểu đồ dùng `--chart-1…5`.
- [ ] Điểm nhấn thương hiệu (Crimson) ≤ 4% diện tích màn hình.
- [ ] Xem thử cả hai theme trước khi coi là xong.

Lệnh soát nhanh trước khi commit — phải không trả về kết quả nào:

```bash
grep -rnE "#[0-9a-fA-F]{3,8}\b|rgba?\([0-9]|: *(white|black)\b" src --include="*.css" \
  | grep -v "src/styles/tokens.css"
```

(`rgba(var(--…), α)` là hợp lệ — alpha pha trên token, không phải mã màu cứng.)
