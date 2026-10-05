# Section-1 — chờ người dùng nghiệm thu

Preview: `previews/section-1.html`. Nguồn: `src/sections/section-1.html`, `src/styles/section-1.css`. Section-1 in_review; section-7 approved; 23 section pending. Index hiện chỉ chứa section-7. Chưa triển khai section-2.

## Kết quả kiểm tra

- `npm run check`: đạt với index và cả hai preview; local asset tồn tại, một h1/trang, ID không trùng, link #, button type button, không script/handler/base/form submit.
- `npm test`: 4 test đạt; kiểm tra include/missing source, manifest/status/ID/thứ tự số, heading và đường dẫn preview.
- Localhost Codex Browser: 320,375,390,768,1024,1280,1440,1760,1919,1920,2560px. Tất cả scrollWidth bằng clientWidth; đủ 20 danh mục; không ảnh lỗi. Dữ liệu: section-1-responsive.json.
- Menu desktop giãn đều khoảng 33–33,5px/dòng để căn đáy với dải cam kết; tablet/mobile 44px. Container tại 1760/1919 là 1600px, tại 1920/2560 là 1800px. Ở viewport hẹp trình duyệt có scrollbar 15px, gutters tính từ vùng nội dung.
- Inter và Font Awesome cục bộ tải được. Input tiếng Việt cho phép nhập; Tab sang camera, focus-visible có outline vàng. Tiện ích mobile có tên truy cập độc lập; vùng chạm 44 × 44 trở lên. Bằng chứng: section-1-focus.json.
- Screenshot: section-1-1920.jpg, section-1-1280.jpg, section-1-768.jpg, section-1-390.jpg.
- Hồi quy section-7: kiểm tra 390/768/1280/1920, đủ 8 linh kiện, không tràn ngang/ảnh lỗi, height desktop1920 vẫn 763.9px. So ảnh cũ tại1920 vùng section có độ lệch RGB trung bình 0.56/255 (JPEG); nguồn CSS và artwork section-7 giữ nguyên. Metadata/nền ngoài section đổi theo spec. Bằng chứng section-7-regression*.json/jpg.

## Sai khác cần nghiệm thu thị giác

- Logo HACOM dùng file có sẵn với Since 2001, khác logo/slogan trong ảnh mẫu. ASUS và NVIDIA thể hiện bằng chữ HTML; icon Font Awesome cùng ngữ nghĩa, khác nét vẽ mẫu.
- Nền trái hero và ba promo dùng gradient CSS, không khớp hoàn toàn hiệu ứng sàn/phát sáng trong ảnh. Artwork laptop trích đúng mẫu, feather cạnh; crop bỏ vùng giao diện/chấm chỉ báo, không kéo giãn.
- Artwork phụ có độ phân giải nhỏ trong ảnh nguồn. Chỉ sử dụng vùng tai nghe/VGA/PC sạch; không phóng phủ toàn banner. Một số chữ trang trí ở mép artwork laptop bị crop.
- Nút promo cao44px để dễ chạm, lớn hơn mẫu. Container max1600 tại viewport1728 làm bố cục hẹp hơn ảnh thiết kế1728; desktop1920 dùng1800 theo rule.
- Header vùng hẹp và tablet dùng cuộn nội bộ/hàng riêng; mobile dựng lại bố cục, không scale ảnh mẫu.

## Phần chưa xác minh

Chrome DevTools không kết nối được profile riêng; dùng Codex Browser theo policy. `file://` bị chặn trong công cụ trình duyệt từ lượt kiểm thử trước; không vượt chặn. Đường dẫn asset preview/index được audit trên filesystem và localhost, nhưng mở double-click chưa được xác minh thực tế. Zoom trình duyệt200% chưa được công cụ xác minh; reflow theo các viewport đã kiểm tra không thay thế bằng chứng zoom200%.

## Điểm dừng

## Cập nhật theo phản hồi chỉnh menu

- Thanh đỏ desktop cao48px, bỏ padding dọc và overlap margin âm. Icon căn giữa chính xác theo DOM; chữ line-height24px căn giữa bằng flex.
- Menu dùng grid20 hàng đồng đều, tự giãn theo cụm banner/cam kết. Đáy menu và dải cam kết chênh không quá0.00002 CSS px tại1280/1440/1760/1919/1920/2560; các hàng cùng chiều cao. Dữ liệu: section-1-menu-alignment.json.
- Thanh điều hướng desktop ẩn scrollbar thị giác để không làm phát sinh khe11,2px dưới thanh đỏ ở màn hẹp; vẫn cuộn ngang tự nhiên và truy cập từng link bằng bàn phím.
- 320/390/768/1024: đủ20 mục, dòng44px, không tràn ngang. Screenshot390/768/1280/1920 đã cập nhật.
- Hồi quy section-7 tại390/1920: đủ8 linh kiện, không ảnh lỗi/tràn ngang; chiều cao2638.875px và763.9px giữ nguyên. Dữ liệu section-7-menu-regression.json và ảnh tương ứng.
- Build/static audit và4 test đều đạt. Rule/spec đã cập nhật ngoại lệ ưu tiên căn đáy. Section-1 vẫn in_review, index vẫn chỉ section-7; chưa bắt đầu section-2.

Chỉ người dùng có quyền nghiệm thu. Sau phản hồi duyệt section-1 mới cập nhật approved, build index gồm1 rồi7, kiểm tra tích hợp và bắt đầu section-2.
