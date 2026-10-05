# Section-1: Header và Laptop AI

Nguồn: `design/section-1.png`. Trạng thái ban đầu: `in_review`.

## Cấu trúc bắt buộc

Thanh thông tin; header logo/tìm kiếm/4 tiện ích; 8 từ khóa; 9 điều hướng; 20 danh mục; Laptop AI; 3 banner phụ; 5 cam kết.

Màu chủ đạo: navy–đỏ, banner xanh. Chữ và dữ liệu nhìn thấy trong ảnh là chuẩn nghiệm thu.

## Phân tích và bố cục chi tiết

Ảnh gốc 1728 × 910. Thanh thông tin 60px; header khoảng 108px. Theo phản hồi nghiệm thu, thanh đỏ và hàng điều hướng desktop cao tối thiểu 48px; chữ/icon căn giữa. Menu trái gồm 20 dòng giãn đều, tối thiểu 32px; được vượt 34px để đáy khung menu bằng đáy dải cam kết, sai lệch tối đa 1 CSS px. Không overlap bằng margin âm. Desktop ba cột: danh mục 270–288px, hero co giãn, banner phụ 240–313px; gap 14px. Cam kết nằm dưới hero và banner phụ. Menu không sticky. Tablet/mobile vẫn cuộn ngang và vùng chạm 44px.

- Topbar: thông điệp thương hiệu, bốn kênh online/Bắc/Trung/Nam, ba link tra cứu/hỗ trợ/doanh nghiệp.
- Header: logo và Since 2001, tìm kiếm có label, camera và nút tìm kiếm; tám từ khóa; bốn tiện ích với badge 0. Không form submit.
- Điều hướng: Flash Sale, AI PC, Gaming, Build PC, Laptop AI, OLED Monitor, Doanh nghiệp, Hàng mới, Xả kho.
- Danh mục: giữ đủ 20 tên và số 01–20 theo nguồn HTML; không submenu hoặc drawer.
- Hero: HACOM × ASUS; ROG · TUF · ZENBOOK · VIVOBOOK; LAPTOP AI; KIẾN TẠO TƯƠNG LAI; thông điệp hiệu năng/AI/thế hệ mới; ba lợi ích; CTA Khám phá ngay; bốn chấm với chấm thứ hai đỏ.
- Banner phụ: Flash Sale, 09:24:12; RTX 50 SERIES/NVIDIA/GEFORCE RTX; Build PC và ba lợi ích. Nút tối thiểu 44px dù ảnh mẫu nhỏ hơn.
- Cam kết: giao nhanh 2h, bảo hành chính hãng, trả góp 0%, đổi trả 15 ngày, hotline 1900 1903.

Tablet chia logo/tiện ích và tìm kiếm thành hai hàng; menu/từ khóa/điều hướng cuộn nội bộ. Hero toàn chiều rộng, ba promo một hàng. Mobile logo/tiện ích cùng hàng; tìm kiếm riêng; hero chữ trước ảnh; ba promo dọc; cam kết hai cột và hotline toàn hàng. Giữ đủ dữ liệu trong DOM.

## Bảng asset đã chọn

| Asset | Nguồn | Vùng nguồn / kích thước | Cách đặt |
|---|---|---|---|
| hacom-logo.png | LOGO-HACOM.png có sẵn | 1449 × 552 | contain, tỷ lệ nguyên gốc |
| laptop-artwork.webp | design/section-1.png | x865,y238,x1375,y716; 510 × 478 | contain; feather cạnh bằng mask CSS |
| flash-headphones.webp | cùng ảnh thiết kế | x1575,y330,x1702,y411; 127 × 81 | contain, chỉ vùng tai nghe |
| rtx-graphics.webp | cùng ảnh thiết kế | x1544,y486,x1702,y574; 158 × 88 | contain, chỉ VGA |
| build-pc.webp | cùng ảnh thiết kế | x1585,y588,x1702,y756; 117 × 168 | contain, PC |

Artwork laptop giữ chữ trang trí FOR THOSE WHO DARE/Work Play Create Live Better trong artwork; CTA/lợi ích/countdown/tên banner đều HTML. Script `tools/prepare-section-1.py` tái tạo crop bằng Pillow, không cần chạy trong build thường.

Logo có sẵn khác phiên bản slogan trong mẫu; ASUS/NVIDIA dựng chữ thay wordmark chính xác; icon cùng ngữ nghĩa có khác nét vẽ. Nền trái hero và nền promo được tái tạo bằng CSS. Crop promo nhỏ nên giữ gần kích thước gốc, không ép phủ toàn thẻ. Ghi lại sai khác trong QA để người dùng nghiệm thu.

## Quy tắc triển khai và nghiệm thu

- Đọc lại ảnh đầy đủ trước khi dựng, đối chiếu toàn bộ tên/giá/nhãn/ngày/chapter, không tự sửa bất nhất.
- HTML ngữ nghĩa và Tailwind CSS 4; CSS riêng giới hạn `.section-1`; không JavaScript trong output.
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
