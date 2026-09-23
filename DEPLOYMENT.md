# Hướng dẫn triển khai Vercel

## 1. Import repository

1. Đăng nhập [Vercel](https://vercel.com/) bằng tài khoản GitHub.
2. Chọn **Add New → Project**.
3. Chọn repository `thichduongduy16112004-source/HCM202` rồi nhấn **Import**.
4. Nếu repository chưa xuất hiện, cấp quyền cho Vercel GitHub App truy cập repository này.

## 2. Kiểm tra cấu hình build

Các giá trị đã được khai báo trong `vercel.json`; màn hình import cần hiển thị:

| Cấu hình | Giá trị |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | `.` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Production Branch | `main` |

Dự án là website tĩnh và hiện không cần biến môi trường. Không thêm `deploy` vào Root Directory vì nội dung của thư mục local `deploy` đã được đưa lên thư mục gốc của repository.

## 3. Deploy và kiểm tra

1. Nhấn **Deploy** và chờ trạng thái **Ready**.
2. Mở URL do Vercel cung cấp.
3. Kiểm tra trang chủ, điều hướng giữa các phân đoạn, ảnh tư liệu, lightbox, bảng nguồn và hiệu ứng chuyển cảnh.
4. Kiểm tra lại trên điện thoại và màn hình máy tính.

Sau khi GitHub đã được kết nối, mỗi lần push lên `main` sẽ tạo một production deployment mới. Các branch khác sẽ tạo preview deployment.

## 4. Cập nhật và quay lui

- Cập nhật: commit thay đổi rồi push lên `main`.
- Quay lui bằng Git: revert commit lỗi và push commit revert.
- Quay lui nhanh trên Vercel: mở **Deployments**, chọn bản ổn định trước đó và dùng chức năng rollback/promote phù hợp.
