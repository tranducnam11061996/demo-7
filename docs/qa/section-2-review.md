# Review section-2 — tinh chỉnh theo thiết kế, 05/10/2026

Trạng thái: **in_review**, chờ người dùng nghiệm thu. [Preview](../../previews/section-2.html) · [Spec](../specs/section-2.md). Index vẫn ghép đủ 25 section, theo thứ tự 1–25 và có một h1.

## Thay đổi

- CSS riêng `.section-2`: nền sáng/vệt chéo, gradient bám chiều rộng chữ, eyebrow có hai đường ngang, chữ và khoảng cách desktop theo tỷ lệ container. Inter cục bộ; không thêm font tải mạng.
- Từ 1280px: 5 cột theo tỷ lệ 1/1/1.12/1/1; thẻ linh kiện nhô lên 6px, đáy ngang hàng. Các danh sách bắt đầu cùng cao độ; chiều cao tự nhiên cho phép chữ xuống dòng.
- Giữ cách chia cột cũ dưới 1280px: tablet ba thẻ lớn mỗi hàng với linh kiện cao hai hàng; mobile thẻ lớn xếp dọc, thẻ nhỏ hai cột. Link mobile trong danh sách cao 44px; nút tròn 44×44px, linh kiện 56×56px.
- Artwork lớn trích lại đủ sản phẩm/bệ; RGB lấy từ ảnh thiết kế, alpha giới hạn vùng artwork và loại UI. CSS bổ sung bệ phía sau vùng UI bị che. Giữ crop console; làm sạch mép nút raster còn sót ở các artwork nhỏ 07–11. Không dùng ảnh giao diện làm component.
- Dải cuối có đúng ba lợi ích, SVG khiên/check, thẻ giá và quà; CTA xanh dạng pill. Các nút và chữ là HTML, mọi link `#`; không JavaScript/handler/API.
- Slogan góc phải dùng HTML và font script có sẵn, chỉ hiện từ 1600px.

## Đối chiếu thiết kế

Ảnh gốc 1774×887px; vùng nội dung tham chiếu x=30–1744 rộng 1714px. Desktop1920 dùng container1800px, hệ số tham chiếu 1800/1714. Đây là cách chuẩn hóa ảnh phục vụ QA, không scale giao diện.

Các mốc top/đáy thẻ, top danh sách, top hàng nhỏ, top/đáy dải cam kết nằm trong khoảng 0–6px so với mốc ước lượng sau chuẩn hóa. Thẻ lớn desktop1920 cao486px, thẻ giữa492px; bốn danh sách có cùng y. Font, hình dáng từng sản phẩm và phần trang trí không được khẳng định khớp pixel.

[Phép đo mốc thiết kế](section-2-refinement/design-comparison.json) · [Ảnh thiết kế chuẩn hóa](section-2-refinement/reference-normalized-1920.jpg).

## Kiểm tra

- `npm run check`: build và static audit index +25 preview đạt. `npm test`: cả5 test hiện có đạt.
- 320/375/390/768/1024/1280/1440/1760/1919/1920/2560px: không tràn trang, tràn chữ, chữ chồng ảnh ở thẻ nhỏ; đủ5 thẻ lớn và6 thẻ nhỏ. Chữ nội dung tối thiểu13px.
- Index ghép cũng được kiểm tra đủ11 viewport, không tràn trang; một h1 và đủ25 section. [Kết quả tích hợp](section-2-refinement/integration.json).
- 11/11 ảnh và font cục bộ tải thành công. Screenshot mobile được chụp sau khi ảnh lazy-load đã tải; canvas chụp390×3811px.
- Hover nút tròn: `brightness(1.08)`; focus-visible trên link danh mục: outline vàng. Quy tắc active `brightness(.92)` được kiểm tra trong stylesheet; không mô phỏng giữ chuột xuống. [Trạng thái](section-2-refinement/interaction.json) · [Focus](section-2-refinement/focus-1920.jpg).
- Section-1 và7: so sánh trước/sau ở11 viewport, cùng số phần tử, font, màu và display. Sai số hình học lớn nhất dưới0.0011px do làm tròn tọa độ; file HTML/CSS riêng và shared.css giữ nguyên hash. [Hồi quy](section-2-refinement/regression.json).

[Responsive](section-2-refinement/responsive.json) · [Trước desktop1920](section-2-refinement/before-1920.jpg) · [Sau desktop1920](section-2-refinement/after-1920.jpg) · [Desktop1760](section-2-refinement/after-1760.jpg) · [Desktop1280](section-2-refinement/after-1280.jpg) · [Tablet768](section-2-refinement/after-768.jpg) · [Mobile390](section-2-refinement/after-390.jpg).

## Asset và giới hạn

Nguồn/toạ độ/kích thước/mask/sai khác nằm trong [asset manifest](../specs/asset-manifest.json). Script trích nguồn: `tools/prepare-section-2.py`, không chạy trong build. Script chỉ xử lý asset section-2.

- Silhouette alpha có rìa mềm0.6px, mép crop có feather tối đa4px; giữ RGB nguồn. Có thể còn chênh nhỏ ở rìa sản phẩm và vùng nền giữa các vật thể.
- Pixel artwork bị nút trong thiết kế che không thể khôi phục từ ảnh; phần bệ được CSS hỗ trợ, phần góc nhỏ bị che được để trong suốt, không tạo sản phẩm giả.
- Slogan dùng font script hệ thống nên khác nét và có thể khác giữa máy; tiêu đề/nội dung dùng Inter theo quy định dự án.
- Chrome DevTools không kết nối. QA dùng Browser trong Codex trên HTTP127.0.0.1:4173, không truy cập Chrome người dùng. Chưa xác minh mở trực tiếp `file://` trong lượt này.

Kết quả QA không thay thế nghiệm thu của người dùng.
