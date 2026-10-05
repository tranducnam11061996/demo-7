# Spec tổng — 25 section HACOM

Theo yêu cầu mới nhất, triển khai toàn bộ 25 section cùng lượt và ghép index.html theo thứ tự 1–25 để review chung. Nhiều section được phép in_review; kiểm thử không đồng nghĩa nghiệm thu. Section-1 và section-7 giữ trạng thái approved, 23 section mới chờ người dùng review.

## Build và nguồn

Nguồn: src/sections, src/styles; manifest: src/sections.manifest.json. Build reviewMode combined ghép approved và in_review theo số nguyên; preview cho approved/in_review, đường dẫn tương đối, không base/fetch. Pending không tạo khoảng trống. Index một h1; preview một h1; section-1 làm header, section-25 làm footer. Metadata trang chủ, nền sáng; section tối tự khai báo.

## Quy tắc triển khai và nghiệm thu

- Đọc lại ảnh đầy đủ trước khi dựng, đối chiếu toàn bộ tên/giá/nhãn/ngày/chapter, không tự sửa bất nhất.
- HTML ngữ nghĩa và Tailwind CSS 4; CSS riêng giới hạn `.section-N`; không JavaScript trong output.
- Link `#`, button type button, không handler/form submit. Trạng thái tabs/carousel/accordion chỉ là thị giác.
- 320–767: lề 16px; 768–1919: lề 24px, max 1600px; từ 1920: lề 40px, max 1800px.
- Inter >=13px, input mobile >=16px; vùng chạm >=44px. Không scale toàn giao diện/cắt nội dung.
- Banner: giới thiệu → artwork; chapter: giới thiệu → thương hiệu/danh mục → lọc → sản phẩm → dịch vụ.
- Rail sản phẩm/danh mục giữ đủ thẻ DOM, cuộn tự nhiên khi hẹp; lưới thông tin 4/2/1 cột, danh mục ngắn có thể 2 cột mobile.
- Gallery/video: nội dung nổi bật trước, phần còn lại 2 cột tablet/1 cột mobile; footer mở toàn bộ.
- Asset cũ ưu tiên khi đúng nội dung; artwork sạch được trích từ ảnh thiết kế, tuyệt đối không lấy UI chữ/nút làm component. Ghi tọa độ, kích thước, nguồn và sai khác vào QA.
- Trước lượt triển khai phải chốt bảng asset thực tế; chưa triển khai thì chưa giả định file đã chọn.
- Kiểm tra 320/375/390/768/1024/1280/1440/1760/1919/1920/2560px; local asset, heading/ID, focus, tràn ngang, nội dung, ảnh, hồi quy section đã duyệt.
- Bàn giao preview, screenshot desktop/mobile, báo cáo sai khác/giới hạn. Chỉ người dùng có quyền chuyển approved.

## Ma trận nội dung

- [1. Header và Laptop AI](section-1.md): Thanh thông tin; header logo/tìm kiếm/4 tiện ích; 8 từ khóa; 9 điều hướng; 20 danh mục; Laptop AI; 3 banner phụ; 5 cam kết.
- [2. Danh mục nổi bật](section-2.md): Tiêu đề giới thiệu; 5 thẻ lớn; 6 thẻ nhỏ; lợi ích và CTA. Linh kiện trung tâm màu xanh.
- [3. Chọn máy theo nghề](section-3.md): 8 nghề: sinh viên, game thủ, văn phòng, designer, video editor, kiến trúc sư, AI user, streamer. Mỗi thẻ có lợi ích, nhóm sản phẩm, CTA và màu riêng; chỉ báo trang.
- [4. Deal Center](section-4.md): 3 lựa chọn Flash Sale/Hot Trend/New Arrival; countdown; 5 sản phẩm; artwork bên phải; 3 khối khám phá. Giá, rating và countdown tĩnh.
- [5. Laptop – MacBook – Tablet](section-5.md): Banner; thương hiệu; Copilot+; 8 danh mục; bộ lọc; 6 sản phẩm; khám phá/tư vấn. Giữ nhãn Văn phòng lặp.
- [6. PC và AI Workstation](section-6.md): Banner PC; thương hiệu; AI Workstation; 8 danh mục; bộ lọc; 6 sản phẩm; dịch vụ. Giữ AI Workstation lặp.
- [7. PC Builder](section-7.md): Hero PC Builder hiện có; 8 linh kiện; 3 thẻ số liệu; 5 cam kết. Đã được duyệt; không dựng lại artwork.
- [8. Linh kiện máy tính](section-8.md): Banner linh kiện; 8 nhóm CPU/mainboard/VGA/RAM/lưu trữ/PSU/case/tản nhiệt; 3 dịch vụ; bộ lọc; 8 sản phẩm; gợi ý cấu hình.
- [9. Màn hình](section-9.md): Banner màn hình; thương hiệu và OLED theo bố cục riêng; bộ lọc; 7 sản phẩm; cam kết.
- [10. Console](section-10.md): Banner console; 8 nền tảng; 4 nhóm phụ kiện; bộ lọc; 8 sản phẩm; khám phá. Giữ Chapter 06.
- [11. Gaming Gear](section-11.md): Banner gaming gear; thương hiệu; 8 danh mục; bộ lọc; 7 sản phẩm; gợi ý setup. Giữ Chapter 05 và Streaming lặp.
- [12. Mạng và lưu trữ](section-12.md): Banner mạng/lưu trữ; thương hiệu; 8 danh mục; bộ lọc; 7 sản phẩm; giải pháp doanh nghiệp. Đủ Wi-Fi/NAS/server/UPS/phần mềm.
- [13. Văn phòng và doanh nghiệp](section-13.md): Banner văn phòng/doanh nghiệp; thương hiệu; 8 danh mục; bộ lọc; 7 sản phẩm; dịch vụ. Không sửa nhãn chưa nhất quán.
- [14. Smart Home](section-14.md): Banner smart home; 8 giải pháp; bộ lọc; 6 camera; cam kết. Giữ số liệu chính sách.
- [15. Dịch vụ PC](section-15.md): Banner dịch vụ PC; 8 dịch vụ; bộ lọc; 6 cấu hình PC thẻ ngang; hỗ trợ. Không đổi thành thẻ sản phẩm đứng.
- [16. Phụ kiện](section-16.md): Banner phụ kiện; thương hiệu; 10 danh mục; bộ lọc; 7 sản phẩm; cam kết. Giữ Chuột lặp.
- [17. Hậu mãi](section-17.md): Banner hậu mãi; 10 nhóm hỗ trợ; bộ lọc; 7 dịch vụ; cam kết. Giá số tiền, Từ… và Liên hệ giữ nguyên.
- [18. Thu cũ đổi mới](section-18.md): Banner thu cũ; quy trình 4 bước; thông điệp môi trường; bộ lọc; 6 sản phẩm; cam kết. Giữ trợ giá và Đổi ngay.
- [19. HACOM in Numbers](section-19.md): Tiêu đề, mô tả; 8 số liệu; tagline. Desktop 4 × 2; chữ số đỏ; không đếm động.
- [20. Kiến thức](section-20.md): Banner kiến thức; 3 bài nổi bật; 5 bài hot; chủ đề; 5 bài viết; tìm kiếm; nhận tin; lợi ích. Giữ ngày và lượt xem.
- [21. Video](section-21.md): Header/bộ lọc; 1 video lớn; 6 video nhỏ; metadata; đăng ký kênh; lợi ích. Thumbnail/thời lượng/play tĩnh; không player.
- [22. Cộng đồng](section-22.md): Banner cộng đồng; 4 trụ cột; 4 hoạt động có ảnh; trích dẫn; 4 ô thông tin; CTA.
- [23. Khách hàng](section-23.md): Tiêu đề; 4 chỉ số/cam kết; gallery 10 ảnh; trích dẫn HTML; mũi tên/chỉ báo. Desktop 1 ảnh lớn và ảnh nhỏ hai hàng.
- [24. Năm kênh khám phá](section-24.md): 5 thẻ AI/Shopee/TikTok/PC Builder/Flash Deal. Mỗi thẻ có màu, artwork, CTA và lợi ích riêng.
- [25. Footer và showroom](section-25.md): Nhận tin; showroom; 20 địa điểm; bản đồ trang trí; nhóm link; 5 danh mục; mạng xã hội/thanh toán/chứng nhận; công ty. Giữ 20 và 22 showroom cùng năm bản quyền.

## Sau nghiệm thu cuối

Kiểm tra toàn trang 1–25; lazy loading ảnh ngoài màn hình; bàn giao HTML/CSS cuối.
