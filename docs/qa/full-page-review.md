# Review chung — 25 section HACOM

Ngày kiểm tra: 05/10/2026. Đã triển khai toàn bộ và ghép theo thứ tự 1–25 trong index.html theo yêu cầu review chung. Section-1/7 giữ trạng thái approved; 23 section mới in_review. Kết quả QA không thay thế nghiệm thu của người dùng.

## Kết quả

- Build, static audit 26 trang và 5 test cơ chế build đạt.
- Index đủ 25 section theo thứ tự số; mỗi trang có đúng một h1, không trùng ID.
- Mọi link dùng #; mọi button type=button; không script, inline handler, form submit, base hoặc fetch. Asset cục bộ tồn tại, ảnh có alt và kích thước; input có label.
- Kiểm tra index ở 320, 375, 390, 768, 1024, 1280, 1440, 1760, 1919, 1920, 2560 CSS px: không tràn ngang, không phát hiện tràn chữ theo phép đo DOM.
- Container tối đa 1600px tại 1760/1919, 1800px tại 1920/2560; lề mobile/tablet theo rule. Sai lệch đáy menu section-1 và dải cam kết dưới 0,001 CSS px ở desktop; 20 hàng đều nhau.
- 50 preview desktop 1920px/mobile 390px: không tràn ngang, không phát hiện ảnh đã tải bị lỗi; font tải xong. Các section mới có vùng chạm mobile ít nhất 44px ở 320/375/390.
- Bàn phím Tab và outline focus được kiểm tra ở section-20. Nhập search, email và bật/tắt checkbox section-20/25 hoạt động tự nhiên, không đổi URL; trạng thái thử đã được khôi phục.
- Section-7 giữ nguyên nguồn HTML/CSS và asset đã chấp nhận; có ảnh hồi quy desktop/mobile trong bộ bằng chứng.

Dữ liệu đo: [index-breakpoints.json](full-review/index-breakpoints.json), [preview-checks.json](full-review/preview-checks.json). Screenshot trang ghép: [desktop](full-review/index-desktop.jpg), [mobile](full-review/index-mobile.jpg).

## Asset và sai khác cần review

Nội dung, giá, danh mục, chương và số liệu được dựng bằng HTML theo thiết kế, gồm các nhãn lặp và số liệu chưa nhất quán. Các carousel/countdown/video là trạng thái tĩnh. Không tuyên bố khớp pixel ở mọi viewport vì ảnh mẫu và container responsive có tỷ lệ khác nhau.

250 artwork được trích vùng hình từ mẫu; tọa độ, kích thước và vùng loại bỏ badge UI được lưu trong [asset-manifest.json](../specs/asset-manifest.json). Ảnh giữ tỷ lệ, không dùng nguyên screenshot section làm giao diện. Artwork chụp vốn có chữ trang trí có thể giữ chữ thuộc hình.

- Section-1/7 giữ artwork đã chấp nhận, có thể khác mẫu.
- Section-21: video lớn dùng artwork ASUS laptop hiện có. Sáu thumbnail dùng asset cục bộ cùng nhóm: Gigabyte RTX 5070; Gigabyte OLED thay LG; PC HACOM; MacBook M5 thay M4; ASUS ROG Azoth thay AKKO; Corsair TC500 thay ghế Ergonomic. Tiêu đề/thời lượng vẫn là HTML theo mẫu.
- Section-23: thay khung crop ảnh để bỏ mũi tên/trích dẫn in sẵn trong ảnh; phần tương ứng dựng HTML. Khung hình có khác nhẹ.
- Section-25 và các thanh thương hiệu: ưu tiên logo có sẵn; một số logo, thanh toán/chứng nhận được thể hiện bằng wordmark hoặc badge chữ HTML thay hình gốc.
- Artwork trích từ ảnh nhỏ có giới hạn độ nét; không tự bổ sung chi tiết không có trong nguồn. Có thể thay bằng asset độ phân giải cao ở lượt sửa chi tiết.

## Giới hạn xác minh

Chrome DevTools dedicated profile không kết nối được; đã thông báo và dùng Codex in-app Browser theo policy, không điều khiển Chrome của người dùng. Kiểm thử browser thực hiện trên localhost. Công cụ không cho mở file://; đường dẫn tương đối và tính độc lập của output đã được static audit nhưng chưa xác minh bằng trình duyệt file://. Zoom trình duyệt 200% chưa xác minh; kiểm tra reflow ở các viewport nhỏ không được xem là thay thế cho phép thử zoom.

## Preview và screenshot từng section

| Section | Preview | Desktop | Mobile |
|---|---|---|---|
| 1 | [Preview](../../previews/section-1.html) | [1920px](full-review/section-1-1920.jpg) | [390px](full-review/section-1-390.jpg) |
| 2 | [Preview](../../previews/section-2.html) | [1920px](full-review/section-2-1920.jpg) | [390px](full-review/section-2-390.jpg) |
| 3 | [Preview](../../previews/section-3.html) | [1920px](full-review/section-3-1920.jpg) | [390px](full-review/section-3-390.jpg) |
| 4 | [Preview](../../previews/section-4.html) | [1920px](full-review/section-4-1920.jpg) | [390px](full-review/section-4-390.jpg) |
| 5 | [Preview](../../previews/section-5.html) | [1920px](full-review/section-5-1920.jpg) | [390px](full-review/section-5-390.jpg) |
| 6 | [Preview](../../previews/section-6.html) | [1920px](full-review/section-6-1920.jpg) | [390px](full-review/section-6-390.jpg) |
| 7 | [Preview](../../previews/section-7.html) | [1920px](full-review/section-7-1920.jpg) | [390px](full-review/section-7-390.jpg) |
| 8 | [Preview](../../previews/section-8.html) | [1920px](full-review/section-8-1920.jpg) | [390px](full-review/section-8-390.jpg) |
| 9 | [Preview](../../previews/section-9.html) | [1920px](full-review/section-9-1920.jpg) | [390px](full-review/section-9-390.jpg) |
| 10 | [Preview](../../previews/section-10.html) | [1920px](full-review/section-10-1920.jpg) | [390px](full-review/section-10-390.jpg) |
| 11 | [Preview](../../previews/section-11.html) | [1920px](full-review/section-11-1920.jpg) | [390px](full-review/section-11-390.jpg) |
| 12 | [Preview](../../previews/section-12.html) | [1920px](full-review/section-12-1920.jpg) | [390px](full-review/section-12-390.jpg) |
| 13 | [Preview](../../previews/section-13.html) | [1920px](full-review/section-13-1920.jpg) | [390px](full-review/section-13-390.jpg) |
| 14 | [Preview](../../previews/section-14.html) | [1920px](full-review/section-14-1920.jpg) | [390px](full-review/section-14-390.jpg) |
| 15 | [Preview](../../previews/section-15.html) | [1920px](full-review/section-15-1920.jpg) | [390px](full-review/section-15-390.jpg) |
| 16 | [Preview](../../previews/section-16.html) | [1920px](full-review/section-16-1920.jpg) | [390px](full-review/section-16-390.jpg) |
| 17 | [Preview](../../previews/section-17.html) | [1920px](full-review/section-17-1920.jpg) | [390px](full-review/section-17-390.jpg) |
| 18 | [Preview](../../previews/section-18.html) | [1920px](full-review/section-18-1920.jpg) | [390px](full-review/section-18-390.jpg) |
| 19 | [Preview](../../previews/section-19.html) | [1920px](full-review/section-19-1920.jpg) | [390px](full-review/section-19-390.jpg) |
| 20 | [Preview](../../previews/section-20.html) | [1920px](full-review/section-20-1920.jpg) | [390px](full-review/section-20-390.jpg) |
| 21 | [Preview](../../previews/section-21.html) | [1920px](full-review/section-21-1920.jpg) | [390px](full-review/section-21-390.jpg) |
| 22 | [Preview](../../previews/section-22.html) | [1920px](full-review/section-22-1920.jpg) | [390px](full-review/section-22-390.jpg) |
| 23 | [Preview](../../previews/section-23.html) | [1920px](full-review/section-23-1920.jpg) | [390px](full-review/section-23-390.jpg) |
| 24 | [Preview](../../previews/section-24.html) | [1920px](full-review/section-24-1920.jpg) | [390px](full-review/section-24-390.jpg) |
| 25 | [Preview](../../previews/section-25.html) | [1920px](full-review/section-25-1920.jpg) | [390px](full-review/section-25-390.jpg) |
