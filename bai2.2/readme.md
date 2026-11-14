# BÀI TẬP: XÂY DỰNG ỨNG DỤNG NODE.JS SỬ DỤNG MODULE HTTP

## I. MỤC TIÊU BÀI TẬP

- Sử dụng Node.js để xây dựng một ứng dụng web cơ bản.
- Sử dụng module `http` để tạo máy chủ web.
- Thiết lập máy chủ chạy tại cổng 3000.
- Xây dựng trang HTML hiển thị thông tin sinh viên.
- Xử lý yêu cầu truy cập trang chủ và thông báo lỗi khi truy cập đường dẫn không tồn tại.
- Đưa mã nguồn chương trình lên GitHub và cung cấp liên kết để nộp bài.

## II. NỘI DUNG VÀ CÁC BƯỚC THỰC HIỆN

### Bước 1: Tạo thư mục và tệp mã nguồn

Mở Visual Studio Code, tạo một thư mục mới có tên `NodeJS_Student`.

Trong thư mục này, tạo tệp JavaScript có tên `server.js`.

### Bước 2: Viết chương trình Node.js sử dụng module HTTP

Sử dụng module `http` có sẵn trong Node.js để xây dựng máy chủ web chạy tại địa chỉ `localhost` và cổng `3000`.

**Nội dung chương trình server.js:**

```javascript
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (req.url === '/') {
        res.end(`
            <!DOCTYPE html>
            <html lang="vi">
            <head>
                <meta charset="UTF-8">
                <title>Thông tin sinh viên</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background: #f0f2f5;
                        text-align: center;
                        padding: 50px;
                    }
                    .container {
                        background: white;
                        padding: 30px;
                        border-radius: 12px;
                        max-width: 600px;
                        margin: auto;
                        box-shadow: 0 4px 10px #ccc;
                    }
                    h1 { color: #1565c0; }
                    p { font-size: 18px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>THÔNG TIN SINH VIÊN</h1>
                    <h2>Cao Đẳng Kỹ Thuật Công Nghệ Nha Trang</h2>
                    <p><strong>Họ và tên:</strong> Nguyễn Thành Long</p>
                    <p><strong>Lớp:</strong> CD-CNTT18B</p>
                    <p><strong>SBD:</strong> CD-CNTT18B17</p>
                    <hr>
                    <p>Website được xây dựng bằng Node.js và module HTTP.</p>
                    <p>Server đang chạy tại cổng 3000.</p>
                </div>
            </body>
            </html>
        `);
    } else {
        res.statusCode = 404;
        res.end('<h1>404 - Không tìm thấy trang</h1>');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server đang chạy tại http://${hostname}:${port}/`);
});
```

### Bước 3: Giải thích chương trình

- `const http = require('http');`: Import module HTTP có sẵn trong Node.js để tạo máy chủ web.
- `hostname = 'localhost'`: Thiết lập địa chỉ máy chủ cục bộ.
- `port = 3000`: Thiết lập cổng hoạt động của máy chủ.
- `http.createServer()`: Khởi tạo máy chủ HTTP để tiếp nhận và xử lý các yêu cầu từ trình duyệt.
- `res.statusCode = 200`: Thiết lập mã trạng thái HTTP 200 khi xử lý yêu cầu thành công.
- `res.setHeader()`: Thiết lập kiểu nội dung trả về là HTML và hỗ trợ tiếng Việt UTF-8.
- `if (req.url === '/')`: Kiểm tra người dùng có truy cập vào trang chủ hay không.
- `res.end()`: Gửi nội dung HTML về trình duyệt, hiển thị thông tin sinh viên.
- `else`: Xử lý trường hợp người dùng truy cập vào đường dẫn không tồn tại và trả về thông báo lỗi 404.
- `server.listen()`: Khởi động máy chủ tại địa chỉ localhost và cổng 3000.

### Bước 4: Chạy chương trình Node.js

Mở Terminal trong Visual Studio Code, di chuyển đến thư mục chứa tệp `server.js` và thực hiện lệnh:

```bash
node server.js
```

Nếu chương trình hoạt động thành công, Terminal sẽ hiển thị thông báo:

```text
Server đang chạy tại http://localhost:3000/
```

Thông báo này cho biết máy chủ Node.js đã được khởi động thành công và đang chờ các yêu cầu truy cập từ trình duyệt.

### Bước 5: Kiểm tra kết quả trên trình duyệt

Mở trình duyệt Google Chrome hoặc Microsoft Edge và truy cập địa chỉ:

```text
http://localhost:3000/
```

Kết quả hiển thị là một trang web có tiêu đề **THÔNG TIN SINH VIÊN**, bao gồm các thông tin:

- Họ và tên: Nguyễn Thành Long.
- Lớp: CD-CNTT18B.
- SBD: CD-CNTT18B17.
- Tên trường: Cao Đẳng Kỹ Thuật Công Nghệ Nha Trang.

Giao diện trang web được thiết kế bằng HTML và CSS, có nền màu xám nhạt, khung thông tin màu trắng, tiêu đề màu xanh dương và nội dung được căn giữa.

Ngoài ra, khi truy cập một đường dẫn không tồn tại, chương trình sẽ trả về thông báo:

```text
404 - Không tìm thấy trang
```

Điều này cho thấy chương trình đã xử lý được cả yêu cầu truy cập trang chủ và trường hợp đường dẫn không hợp lệ.

## III. ĐƯA MÃ NGUỒN LÊN GITHUB

Để nộp bài theo yêu cầu, tiến hành đưa mã nguồn chương trình lên GitHub theo các bước sau:

**Bước 1: Tạo Repository**

- Truy cập trang web https://github.com.
- Đăng nhập tài khoản GitHub.
- Chọn New repository để tạo kho lưu trữ mới.
- Đặt tên Repository là `NodeJS_Student`.
- Chọn chế độ Public.
- Nhấn Create repository.

**Bước 2: Đưa mã nguồn lên GitHub**

Mở Terminal tại thư mục chứa tệp `server.js` và thực hiện lần lượt các lệnh:

```bash
git init
git add server.js
git commit -m "Create Node.js HTTP server"
git branch -M main
git remote add origin https://github.com/USERNAME/NodeJS_Student.git
git push -u origin main
```

Lưu ý: Thay `USERNAME` bằng tên tài khoản GitHub của mình và sử dụng đúng đường dẫn Repository vừa tạo.

**Bước 3: Kiểm tra Repository**

Sau khi thực hiện thành công, truy cập Repository trên GitHub để kiểm tra tệp `server.js` đã được tải lên đầy đủ hay chưa.

**Liên kết GitHub nộp bài:**

https://github.com/USERNAME/NodeJS_Student

## IV. MÔ TẢ VÀ ĐÁNH GIÁ KẾT QUẢ

Sau khi hoàn thành bài tập, ứng dụng Node.js đã đáp ứng các yêu cầu đề ra.

**1. Về chức năng**

- Máy chủ HTTP được tạo bằng module `http` của Node.js.
- Server hoạt động tại địa chỉ `localhost` với cổng 3000.
- Khi truy cập trang chủ, hệ thống trả về trang HTML hiển thị đầy đủ thông tin sinh viên.
- Khi truy cập đường dẫn không tồn tại, hệ thống trả về thông báo lỗi 404.

**2. Về giao diện**

Trang web được thiết kế đơn giản, dễ nhìn và có bố cục rõ ràng. Các thông tin sinh viên được trình bày trong một khung nội dung riêng biệt, sử dụng HTML và CSS để định dạng giao diện.

**3. Về khả năng thực thi**

Chương trình được khởi chạy bằng lệnh `node server.js`. Máy chủ hoạt động ổn định và có thể tiếp nhận yêu cầu từ trình duyệt thông qua địa chỉ `http://localhost:3000/`.

**4. Về lưu trữ mã nguồn**

Mã nguồn được đưa lên GitHub nhằm lưu trữ, quản lý và chia sẻ chương trình. Repository giúp giảng viên có thể truy cập và kiểm tra nội dung bài tập.

## V. KẾT LUẬN

Qua bài tập này, em đã thực hành xây dựng thành công một ứng dụng web cơ bản bằng Node.js và module HTTP.

Ứng dụng có khả năng khởi tạo máy chủ tại cổng 3000, xử lý yêu cầu truy cập trang chủ, hiển thị thông tin sinh viên và thông báo lỗi 404 khi truy cập đường dẫn không tồn tại.

Bên cạnh đó, em đã tìm hiểu cách sử dụng GitHub để lưu trữ và chia sẻ mã nguồn chương trình.

Thông qua bài thực hành, em đã củng cố kiến thức về Node.js, JavaScript, giao thức HTTP, HTML, CSS và quy trình quản lý mã nguồn bằng GitHub. Đây là nền tảng cần thiết để tiếp tục phát triển các ứng dụng web trong những bài học tiếp theo.
