# Vườn hoa chúc mừng 20/10

Toàn bộ mã nguồn của trang chúc mừng: HTML, CSS, JavaScript, ảnh hoa, nhạc MP3 và các bài kiểm tra. Đây là website tĩnh, không cần backend, khóa API, dịch vụ Sites hay bước biên dịch.

## Đưa lên GitHub Pages

1. Tạo một repository GitHub, ví dụ `chuc-20-10`. Với tài khoản GitHub Free, chọn **Public** để dùng Pages.
2. Đưa **nội dung bên trong thư mục này** vào gốc repo, trên nhánh **main**. Cấu trúc gốc phải có `.github/`, `dist/`, `tests/` và `README.md`; không lồng thêm thư mục `chuc-20-10-github-pages`.
3. Vào **Settings → Pages → Build and deployment → Source**, chọn **GitHub Actions**.
4. Vào tab **Actions**, chọn **Deploy greeting website to GitHub Pages**. Nếu lần chạy đầu thất bại vì chưa bật Pages, chọn **Run workflow → main → Run workflow** để chạy lại.
5. Khi workflow thành công, lấy địa chỉ trong **Settings → Pages** hoặc phần deployment. Link thông thường có dạng `https://TEN-TAI-KHOAN.github.io/TEN-REPO/`.

Mỗi lần đẩy thay đổi lên nhánh `main`, workflow kiểm tra rồi cập nhật trang tự động. Workflow chỉ xuất bản nội dung `dist/`; các file kiểm tra và tài liệu nằm trong repo để bạn quản lý mã nguồn.

Tài liệu chính thức: [GitHub Pages với GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Cấu trúc

```text
.github/workflows/pages.yml   Cấu hình tự triển khai GitHub Pages
dist/
  index.html                 Giao diện, thiệp, pop-up, nút nhạc
  style.css                  Bố cục, chữ, màu sắc và hiệu ứng
  script.js                  Vườn hoa và tương tác
  wishes.js                  60 tiêu đề và lời chúc khác nhau
  music.js                   Phát MP3, tự phát và bật/tắt
  assets/                    Ảnh và file MP3 đã dùng trên trang
  .nojekyll
tests/
  interactions.cjs           Kiểm tra lời chúc và thao tác trong vườn
  music.cjs                  Kiểm tra cơ chế phát nhạc
ASSET-NOTES.txt               Nguồn ảnh và ghi chú chỉnh sửa
```

Thư mục `dist` chứa **mã nguồn đọc được và chỉnh sửa trực tiếp**, không phải bản mã đã nén. Đường dẫn ảnh/nhạc là tương đối nên dùng được ở cả trang repo và trang tài khoản GitHub Pages.

## Chạy thử trên máy

Trong thư mục dự án, chạy:

```sh
python -m http.server 8000 --directory dist
```

Mở `http://localhost:8000`. Dừng server bằng `Ctrl+C`.

Nếu đã có Node.js, chạy kiểm tra:

```sh
node tests/interactions.cjs
node tests/music.cjs
```

Không cần `npm install`.

## Chỉnh nội dung

- Lời chúc và tiêu đề: `dist/wishes.js`. Giữ số tiêu đề bằng số nội dung; mỗi lời chúc có một tiêu đề tương ứng.
- Màn hình chọn đối tượng, cảnh báo và nội dung thiệp: `dist/index.html`.
- Kích thước chữ, màu nền và hiệu ứng: `dist/style.css`.
- Ảnh dùng ở màn hình từ chối phục vụ: `dist/assets/refusal.webp`.
- Nhạc: `dist/assets/tung-ngay-yeu-em.mp3`. Có thể thay bằng một file MP3 khác cùng tên.

## Hành vi hiện tại

- Chọn “Phụ nữ” để vào trang; chọn “Đàn ông” sẽ hiện cảnh báo, và sau 10 lần xác nhận sẽ hiện màn hình từ chối.
- Sau khi chọn “Phụ nữ”, nhạc mới bắt đầu phát hoặc yêu cầu thao tác nếu trình duyệt chặn tự phát.
- Mỗi lần tải lại trang trở về màn hình chọn đối tượng, vị trí cuộn đầu trang và đầy đủ 60 lời chúc.
- Trong một lượt mở trang, các lời chúc không lặp; tải lại sẽ bắt đầu lượt mới.
- Nhạc bắt đầu lại từ đầu và thử tự phát. Nếu trình duyệt chặn âm thanh tự động, lần chạm/bấm đầu tiên sẽ phát nhạc; người nhận vẫn có thể tắt.
- Nền giữ màu xanh trắng ở chế độ sáng và tối. Bật giảm chuyển động trên hệ điều hành sẽ giảm/tắt các hiệu ứng.
- Có 5 mẫu hoa, thiệp, hướng dẫn khám phá và pop-up lời chúc.

Bộ mã nguồn này độc lập với bản đang chạy trên `chatgpt.site`. Thay đổi trong repo GitHub không tự sửa bản Sites và ngược lại.
