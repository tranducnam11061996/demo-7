# Section-7 — nghiệm thu giao diện

Ngày: 2026-10-05 (Asia/Bangkok).

## Bản bàn giao

- Nguồn HTML: `src/sections/section-7.html`.
- Nguồn CSS component: `src/styles/section-7.css`.
- Đầu ra: `index.html` và `assets/styles/main.css`.
- Rule chung: `AGENTS.md`.
- Preview: `http://127.0.0.1:4173` khi chạy `npm run dev`.

## Kết quả đã xác nhận

- `npm run check`: PASS. Build thành công; không còn include marker; asset đều cục bộ và tồn tại; ID duy nhất; heading/label hợp lệ; đủ tám linh kiện; tất cả link giao diện là `#`; button là `type="button"`; không có script hoặc inline event handler.
- `npm test`: PASS, 2 test. Ghép nhiều section theo thứ tự, hỗ trợ lặp; báo lỗi khi thiếu section, marker sai hoặc include lồng.
- `npm audit`: 0 vulnerabilities. Tailwind CSS/CLI được khóa ở 4.3.0; Font Awesome Free 7.3.1. Dependency tree được lưu trong package-lock.
- Kiểm thử trên Codex Browser qua localhost: ảnh PC và tám thumbnail tải đầy đủ; Inter và Font Awesome được kiểm tra bằng `document.fonts.check`; không có console error/warning.
- Các viewport 320, 375, 390, 768, 1024, 1280, 1440, 1920 và 2560px: không tràn ngang, không có phần tử vượt khỏi chiều rộng nội dung, không cắt tên/giá, chữ từ 13px và vùng bấm từ 44px. Chiều rộng nội dung có thể giảm do scrollbar dọc của trình duyệt desktop; phép đo đã tính trường hợp đó.
- Container tại 1760 và 1919px đạt 1600px; tại 1920 và 2560px đạt 1800px.
- Bàn phím: các CTA, nút thay đổi, lưu, giỏ hàng và link tìm hiểu có thể nhận focus; Tab theo thứ tự nội dung; focus-visible có outline màu cyan rõ ràng.
- Reflow tại viewport 960×540px: không tràn ngang, dùng bố cục tablet và giữ đầy đủ nội dung. Đây là kiểm tra chiều rộng tương đương full HD khi zoom 200%, không phải xác nhận browser zoom 200% thực tế.

## Screenshot và dữ liệu

- `section-7-desktop-1920.jpg`: toàn hero tại full HD, cắt đúng ranh giới section.
- `section-7-mobile-390.jpg`: toàn trang mobile.
- `section-7-laptop-1280.jpg`: laptop, gồm minh họa focus bàn phím.
- `section-7-tablet-768.jpg`: toàn trang tablet.
- `section-7-reflow-960.jpg`: reflow tại 960px.
- `responsive-measurements.json`: phép đo cuối ở chín viewport.
- `container-boundaries.json`: kiểm tra giới hạn 1600px.
- `keyboard-focus.json`: log Tab và trạng thái focus.

## Sai khác và giới hạn đã ghi nhận

- PC, nền, thumbnail và icon dùng asset/phong cách của dự án tham khảo theo lựa chọn đã chốt, nên khác artwork trong ảnh mẫu. Bố cục, chữ tiếng Việt, giá, FPS, ba thẻ, bảng và dải cam kết được dựng bằng HTML/CSS theo mẫu.
- Giá và thông số chỉ là nội dung demo. Chi phí ước tính 32.990.000đ và tổng 92.783.000đ được giữ nguyên từ ảnh; không có phép tính giá hoặc kiểm tra tương thích.
- `chrome-devtools` không kết nối được endpoint Chrome riêng. Đã dùng fallback Codex Browser theo Browser Isolation Policy.
- Codex Browser chặn giao thức `file://`; việc mở trực tiếp file trong trình duyệt chưa được xác minh. Đã kiểm tra tĩnh tất cả đường dẫn tương đối; output không phụ thuộc server, fetch, module JavaScript hay CDN. Không thực hiện cách vòng qua chính sách giao thức.
- Browser zoom 200% thực tế chưa được xác minh: phím zoom không làm thay đổi viewport/DPR trong Codex Browser. Cần kiểm tra thủ công bằng trình duyệt thông thường; chỉ kiểm tra reflow 960px đã được thực hiện.

Các section khác chưa triển khai, chờ nghiệm thu section-7.
