# Section-7: PC Builder

Nguồn: `design/section-7.png`. Trạng thái ban đầu: `approved`.

## Cấu trúc bắt buộc

Hero PC Builder hiện có; 8 linh kiện; 3 thẻ số liệu; 5 cam kết. Đã được duyệt; không dựng lại artwork.

Màu chủ đạo: tối đỏ–xanh. Chữ và dữ liệu nhìn thấy trong ảnh là chuẩn nghiệm thu.

## Quy tắc triển khai và nghiệm thu

- Đọc lại ảnh đầy đủ trước khi dựng, đối chiếu toàn bộ tên/giá/nhãn/ngày/chapter, không tự sửa bất nhất.
- HTML ngữ nghĩa và Tailwind CSS 4; CSS riêng giới hạn `.section-7`; không JavaScript trong output.
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
