# Review section-4

Trạng thái: in_review, chờ review chung. Nguồn HTML tại src/sections/section-4.html; CSS giới hạn theo section trong src/styles/sections.css. [Spec](../specs/section-4.md), [Preview](../../previews/section-4.html).

QA: preview 1920px và 390px không tràn ngang, không phát hiện tràn chữ hoặc lỗi ảnh đã tải; font cục bộ tải đúng. Tích hợp trong index đã kiểm tra 11 viewport từ 320–2560px. Build/static audit/test đạt. Các giới hạn browser và sai khác artwork nằm trong [báo cáo chung](full-page-review.md); nguồn crop tại [asset manifest](../specs/asset-manifest.json).

[Desktop](full-review/section-4-1920.jpg) · [Mobile](full-review/section-4-390.jpg). Kết quả kiểm tra không đồng nghĩa đã nghiệm thu.

## Refinement theo ảnh thiết kế

Đã chỉnh hai dải nền đỏ đen / xanh trắng, grid desktop theo tỷ lệ 388:1255:278, typography DEAL CENTER và tia sét SVG, countdown/CTA riêng, nhãn AI PC/Mới về, icon viền và thumbnail danh mục. Giữ năm sản phẩm, dữ liệu tĩnh, năm ô danh mục mỗi nhóm và breakpoint hiện hành. CSS mới giới hạn trong `.section-4`; trạng thái vẫn `in_review`.

- [Desktop 1920](section-4-refinement/after-1920.jpg), [1760](section-4-refinement/after-1760.jpg), [1280](section-4-refinement/after-1280.jpg), [tablet 768](section-4-refinement/after-768.jpg), [mobile 390](section-4-refinement/after-390.jpg).
- [Ảnh tham chiếu chuẩn hóa](section-4-refinement/reference-normalized-1920.jpg), [đo hình học](section-4-refinement/geometry.json), [so sánh thiết kế](section-4-refinement/design-comparison.json).
- [Responsive](section-4-refinement/responsive.json): đủ 11 viewport 320/375/390/768/1024/1280/1440/1760/1919/1920/2560; không tràn trang/tràn chữ, không lỗi ảnh, tất cả link/button tối thiểu 44px. Rail cuộn ngang tự nhiên khi thiếu chỗ.
- [Tích hợp index](section-4-refinement/integration.json): đủ 11 viewport, không tràn trang hoặc section-4; heading chuyển thành H2 đúng quy trình build.
- [Hồi quy](section-4-refinement/regression.json): so sánh index với bản đối chứng chỉ loại CSS mới của section-4, giữ font-face và custom properties chung. Section-1/2/7 tại 390/1280/1920 không đổi màu, display, cỡ chữ; sai số hình học dưới 0.001px.
- [Tương tác](section-4-refinement/interaction.json), [focus](section-4-refinement/focus-1920.jpg): Tab chuyển focus đúng thứ tự, focus-visible có outline; ArrowRight cuộn rail 40px và giữ đủ năm sản phẩm. Hover/active đã kiểm tra rule CSS; API Browser hiện có không mô phỏng pointer hover/hold nên chưa xác minh trực tiếp hai trạng thái này.
- `npm run check`: build 25 section và static audit index + 25 preview đạt. `npm test`: 5/5 đạt. Không sửa output thủ công.

### Artwork

Giữ năm crop sản phẩm hiện có, robot và ba artwork banner. Sản phẩm dùng contain; tai nghe có tỷ lệ riêng. Banner giữ tỷ lệ gốc, hòa mép phía nền bằng mask, không crop cover. Robot bỏ mask làm mờ logo dưới và chỉ hòa nhẹ hai mép ngang. Các chữ trên màn hình/bảng robot thuộc artwork; chữ giao diện, badge và nút vẫn là HTML/SVG.

Thêm chín thumbnail nguồn `design/section-4.png`, xuất lossless WebP, giữ RGB và nền gần trắng; CSS contain/multiply hòa nền ô. Tọa độ theo thứ tự trái/trên/phải/dưới:

| Asset | Crop | Kích thước |
|---|---|---|
| s4-category-laptop.webp | 68,654,134,702 | 66×48 |
| s4-category-pc.webp | 199,649,245,704 | 46×55 |
| s4-category-vga.webp | 311,653,390,703 | 79×50 |
| s4-category-monitor.webp | 440,650,517,705 | 77×55 |
| s4-category-headset.webp | 579,647,639,705 | 60×58 |
| s4-category-rtx.webp | 849,654,927,704 | 78×50 |
| s4-category-oled.webp | 970,650,1054,706 | 84×56 |
| s4-category-ai-laptop.webp | 1090,650,1184,705 | 94×55 |
| s4-category-handheld.webp | 1220,654,1301,704 | 81×50 |

Các crop loại chữ nhãn và khung ô; manifest ghi nguồn/tọa độ/xử lý. `tools/prepare-section-4.py` tái tạo asset, không chạy trong build. AI PC và năm icon New Arrival dựng SVG inline riêng.

### Sai khác còn lại

Ảnh gốc 2043×770, vùng nội dung tham chiếu x=40–2003, rộng 1963px. Chuẩn hóa về container 1800px với hệ số 0.916964. Ở 1920px, mép trái hàng sản phẩm lệch −2.6px và đầu hàng lệch +3.5px. Đáy thẻ và ranh giới hai dải thấp hơn khoảng 19px do thông số Inter tối thiểu 13px xuống hai dòng; banner bắt đầu thấp hơn khoảng 20px. Hàng danh mục cao 93.5px, cao hơn tham chiếu chuẩn hóa khoảng 4.6px do tên dài xuống dòng. Mục tiêu 4–6px đạt tại đầu hàng và chiều cao danh mục, chưa đạt tại các mốc dọc sau hàng sản phẩm; giữ đủ nội dung theo giới hạn đã chốt.

Chữ nổi, tia sét, nền laser và một số SVG là bản tái tạo, chưa trùng từng pixel. Nền có ít chi tiết tia sáng/sparks hơn ảnh. Robot vẫn có nền gốc ở phần giữa crop; không làm mờ sản phẩm hoặc logo để xóa nền. Desktop hẹp/mobile tăng chiều cao banner để chữ và artwork không chồng nhau.

Chrome DevTools không kết nối được dedicated profile; QA dùng Codex in-app Browser qua localhost, không điều khiển Chrome cá nhân và không chia sẻ session của dedicated profile.
