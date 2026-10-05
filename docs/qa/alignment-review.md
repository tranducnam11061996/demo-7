# Audit và sửa căn hàng — 05/10/2026

Đã sửa CSS nguồn và build lại index cùng 25 preview. Phạm vi: thẻ nghề nghiệp section-3, thẻ sản phẩm section-4/5/6/8–18, ba box khám phá section-4. Các nhóm section-15/17/24/25 được rà thêm: khung thẻ đồng cấp đã đều theo từng hàng, không cần ép chiều cao giữa các hàng khác nhau.

## Thay đổi

- Flexbox dọc giãn phần nội dung và đẩy CTA/cụm giá xuống đáy; không cắt tên hoặc thông số.
- Giá bán, giá cũ, rating thành hàng Grid. Rail có giá cũ/rating dành hàng tương ứng cho thẻ thiếu dữ liệu bằng CSS :has(), không thêm dữ liệu giả.
- Nút giỏ hàng 44×44px, cột giá co giãn và nút cố định; giữ Đổi ngay toàn chiều rộng section-18 và thẻ ngang section-15.
- Trả góp có vùng tối thiểu hai dòng, bảo đảm nút cùng hàng kể cả nội dung xuống dòng.
- Ba article khám phá section-4 dùng subgrid hai hàng chia sẻ; mobile/tablet một cột dùng chiều cao tự nhiên. Nút tròn đặt cuối banner.
- Không thêm script, hành vi, điều hướng hoặc thay nội dung/asset. Nguồn section-1/7 giữ nguyên.

## Bằng chứng

Đo 320,375,390,768,1024,1280,1440,1760,1919,1920,2560px: không tràn ngang; chênh vị trí đáy CTA/giỏ hàng không quá 1px trong tất cả rail; ba box desktop có đường tiếp giáp và chiều cao hàng đồng đều. Không phát hiện tràn chữ ở tên sản phẩm, giá và CTA; mọi nút giỏ hàng đủ 44px.

[Phép đo căn hàng](alignment/measurements.json) · [Kiểm tra nội dung](alignment/content-checks.json).

[Trước section-3](alignment/before-section-3.jpg) · [Sau desktop](alignment/after-section-3-desktop.jpg) · [Sau mobile](alignment/after-section-3-mobile.jpg).

[Trước section-4: giỏ hàng và ba box](alignment/before-section-4.jpg) · [Sau desktop](alignment/after-section-4-desktop.jpg) · [Sau mobile](alignment/after-section-4-mobile.jpg).

Screenshot mobile bổ sung section-7/15/17/18 trong thư mục alignment. Ảnh trước chụp ở viewport browser mặc định; ảnh sau desktop 1920px/mobile390px, do đó không dùng hai ảnh để kết luận khớp pixel.

Build/static audit 26 trang và 5 test hiện có đạt. Kiểm tra hồi quy section-1/7, focus và phép đo bổ sung lưu trong regression.json. Kiểm thử dùng Codex in-app Browser vì Chrome DevTools không kết nối, đúng policy cách ly; không truy cập Chrome người dùng. Không audit SEO. file:// và zoom200% chưa xác minh trong lượt này.
