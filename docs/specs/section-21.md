# Section-21: Video

Nguồn: `design/section-21.png`. Trạng thái ban đầu: `pending`.

## Cấu trúc bắt buộc

Header/bộ lọc; 1 video lớn; 6 video nhỏ; metadata; đăng ký kênh; lợi ích. Thumbnail/thời lượng/play tĩnh; không player.

Màu chủ đạo: navy–đỏ. Chữ và dữ liệu nhìn thấy trong ảnh là chuẩn nghiệm thu.

## Quy tắc triển khai và nghiệm thu

- Đọc lại ảnh đầy đủ trước khi dựng, đối chiếu toàn bộ tên/giá/nhãn/ngày/chapter, không tự sửa bất nhất.
- HTML ngữ nghĩa và Tailwind CSS 4; CSS riêng giới hạn `.section-21`; không JavaScript trong output.
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

## Triển khai review chung

Nguồn HTML đã dựng trong src/sections; preview độc lập và trang index ghép đủ 25 section. Trạng thái in_review, chưa được người dùng nghiệm thu. Asset chi tiết/tọa độ/kích thước: asset-manifest.json. Artwork được trích từ thiết kế, chữ/giá/CTA là HTML; logo có file gốc được sao chép cục bộ, các wordmark còn thiếu dùng chữ.
