# HACOM — demo HTML tĩnh, 25 section

Đã dựng đủ section-1 đến section-25 và ghép theo thứ tự số vào `index.html` để review chung. Section-1 và section-7 đã được chấp nhận; 23 section mới giữ trạng thái `in_review`, không tự nghiệm thu bằng kết quả kiểm thử.

## Xem và phát triển

Mở `index.html` bằng double-click, giữ `assets/` và `LOGO-HACOM.png` bên cạnh. Mỗi section có trang riêng tại `previews/section-N.html`. Output không cần Node.js, mạng hoặc JavaScript.

Dùng Node.js 20 trở lên để chỉnh nguồn:

```powershell
npm ci
npm run dev
```

Mở http://127.0.0.1:4173. Công cụ theo dõi nguồn, template và manifest; refresh trình duyệt sau thay đổi. Có thể đặt `$env:PORT = '4174'` trước khi chạy để đổi cổng.

```powershell
npm run build
npm run check
npm test
```

Build ghép HTML và biên dịch Tailwind CSS 4. Check kiểm tra 26 trang, asset, heading, label và rule demo; test kiểm tra cơ chế build. Không chỉnh trực tiếp `index.html`, `previews/` hoặc `assets/styles/main.css` vì build ghi đè các file này.

## Chỉnh từng chi tiết

- HTML: `src/sections/section-N.html`.
- CSS section-1 và section-7: file riêng trong `src/styles/`.
- CSS 23 section mới: `src/styles/sections.css`; token/container/icon: `src/styles/shared.css`.
- Tailwind entry: `src/styles/input.css`; metadata: `src/index.template.html`.
- Spec: `docs/specs/master.md` và `docs/specs/section-N.md`.
- Asset mới: `assets/images/sections/`; nguồn và vùng trích xuất: `docs/specs/asset-manifest.json`.

Manifest `src/sections.manifest.json` đang dùng `reviewMode: combined`: trang ghép chứa mọi section đã triển khai, gồm cả `in_review`. Khi người dùng duyệt, mới cập nhật `approved`. Chế độ `sequential` vẫn được hỗ trợ nếu cần quay lại quy trình cũ. Build kiểm tra thiếu nguồn, status sai, ID trùng, marker còn sót; trang ghép và mỗi preview có một h1. Header/footer được đặt đúng landmark, CSS đặc thù giới hạn trong section.

## Rule demo

Mọi link dùng `href="#"`; button dùng `type="button"` và không gắn sự kiện. Tìm kiếm, tabs, countdown, carousel, video và bộ lọc chỉ thể hiện giao diện. Input/checkbox có hành vi HTML tự nhiên; không gửi hoặc lưu dữ liệu. Giá, thông số, ngày tháng và số liệu giữ theo thiết kế, chưa tính toán hoặc xác thực.

Container: lề 16px mobile, 24px từ 768px; max-width 1600px dưới 1920px; từ 1920px max-width 1800px và lề tối thiểu 40px. Rail sản phẩm/danh mục cuộn ngang nội bộ trên màn hẹp. Menu desktop section-1 giãn đều 20 dòng và căn đáy với dải cam kết.

## Asset và bằng chứng review

250 artwork mới được trích vùng hình từ ảnh thiết kế, bổ sung 6 thumbnail video từ dự án tham khảo. Chữ, giá và CTA vẫn là HTML. Một số logo/chứng nhận dùng chữ thay thế, ảnh video dùng asset cùng nhóm sản phẩm; chi tiết tại `docs/qa/full-page-review.md`. Asset đã chấp nhận của section-1/7 được giữ nguyên. Dự án `D:\hacom-0309` và ảnh thiết kế không bị chỉnh sửa.

Font Inter và Font Awesome đóng gói cục bộ; license tại `assets/fonts/`. Các công cụ Python chuẩn bị artwork là công cụ một lần, không thuộc build thường ngày; không chạy lại vì có thể ghi đè crop đã tinh chỉnh.

Báo cáo chung: `docs/qa/full-page-review.md`. Có 50 screenshot desktop/mobile và dữ liệu đo tại `docs/qa/full-review/`, cùng báo cáo riêng từng section. Kiểm thử qua localhost; giới hạn xác minh file:// và zoom 200% được ghi trong báo cáo.
