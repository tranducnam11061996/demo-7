# Project rules

## Static HTML demo

- Đây là dự án HTML tĩnh phục vụ demo giao diện; output là HTML và CSS đã build.
- Tất cả liên kết trong giao diện dùng `href="#"`; chưa điều hướng đến trang, tài nguyên hoặc section khác. Quy tắc này không áp dụng cho đường dẫn stylesheet, ảnh và font.
- Các button dùng `type="button"`, không gắn sự kiện click và không submit form.
- Giữ trạng thái hover, active, focus-visible và ngữ nghĩa accessibility.
- Chưa triển khai backend hoặc nghiệp vụ tương tác nếu chưa có yêu cầu mới.
- Dùng Tailwind CSS và CSS riêng cho section; giới hạn CSS component trong class của section để tránh xung đột.
- Chỉnh sửa nguồn trong `src/`; `index.html` và `assets/styles/main.css` được sinh qua `npm run build`.
- Các section được ghép tại bước build, không dùng fetch hoặc JavaScript để import khi mở trang.
- Container tối đa 1600px dưới viewport 1920px, tối đa 1800px từ viewport 1920px; responsive trên màn nhỏ.
- Theo yêu cầu mới, triển khai toàn bộ 25 section và ghép index để người dùng review chung, sau đó sửa từng chi tiết.
- `design/` là nguồn thiết kế. `D:\hacom-0309` chỉ là nguồn tham khảo và asset; không sửa dự án đó.

## Browser Isolation Policy

- For ordinary browser automation, always use the `chrome-devtools` MCP server with its configured dedicated Chrome profile.
- If `chrome-devtools` is unavailable, the only permitted fallback is the Codex in-app Browser. Tell the user when this fallback is used because it does not share the dedicated Chrome profile's persistent session.
- Never infer permission to control the user's existing Chrome from generic requests such as "open a page", "check a website", or "test the UI".
- Control the user's existing Chrome only when the user explicitly asks to use the currently open browser or tab, for example: "use my current Chrome", "work in the browser I already opened", or "control the open tab".
- Explicit permission to control the user's existing Chrome lasts for the remainder of the current Codex task unless the user revokes it. It never carries into another task.
- When permission exists, prefer the official Chrome plugin. Use `computer-use` on the target Chrome window only when the Chrome plugin cannot perform required browser-level UI interaction.
- If multiple Chrome windows or tabs could match the request, ask the user to focus or identify the target before acting.
- If the user revokes permission or asks to stop using their Chrome, stop immediately and return to the dedicated `chrome-devtools` profile.
- Never connect to the user's existing Chrome through CDP, `autoConnect`, `browserUrl`, a remote-debugging port, or its default user-data directory.
- Do not interact with other windows, applications, tabs, accounts, or data beyond what is needed for the user's stated task.
- Browser control permission does not authorize actions outside the stated task. Existing safety and confirmation requirements still apply.

## Combined review

- Manifest có đủ25 section và `reviewMode: combined`; cho phép nhiều section in_review. Section-1 và7 đã duyệt theo phản hồi người dùng; các section mới chờ review chung.
- Index ghép approved và in_review theo thứ tự số nguyên1–25; preview riêng vẫn được sinh cho từng section. Không cần dừng giữa các section.
- Chỉ phản hồi nghiệm thu của người dùng mới cho phép đổi approved; hoàn thành build/QA không tự nghiệm thu.
- Giữ nội dung ảnh kể cả nhãn/chapter/số liệu bất nhất; ghi nhận, không tự chuẩn hóa.
- Asset hybrid: file cũ phù hợp hoặc trích vùng artwork sạch; không dùng ảnh giao diện thay HTML. Ghi nguồn/toạ độ/kích thước/sai khác.
- Menu section-1 desktop: 20 dòng giãn đều, tối thiểu 32px; ưu tiên căn đáy menu với dải cam kết, được vượt 34px khi cần. Thanh đỏ cao 48px, chữ/icon căn giữa; mobile vùng chạm tối thiểu 44px.
- CSS/icon dùng chung phải kiểm tra hồi quy section-7 và section đã duyệt. Spec: docs/specs/master.md.
