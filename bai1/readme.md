# BÀI TẬP 01: CÀI ĐẶT NODE.JS LTS VÀ CHẠY ỨNG DỤNG NODE.JS ĐẦU TIÊN

## I. MỤC TIÊU BÀI TẬP

- Cài đặt môi trường Node.js LTS trên hệ điều hành Windows.
- Kiểm tra phiên bản Node.js và npm sau khi cài đặt.
- Tạo tệp mã nguồn JavaScript sử dụng module HTTP để xây dựng một máy chủ web đơn giản.
- Thực thi chương trình Node.js bằng cửa sổ dòng lệnh Terminal.
- Truy cập ứng dụng thông qua trình duyệt web và kiểm tra kết quả hoạt động.

## II. CÁC BƯỚC THỰC HIỆN

### Bước 1: Kiểm tra môi trường và phiên bản Node.js, npm

Sau khi cài đặt Node.js, mở Visual Studio Code, chọn Terminal để mở cửa sổ dòng lệnh và thực hiện hai lệnh sau:

```bash
node -v
npm -v
```

**Kết quả kiểm tra:**

- Phiên bản Node.js: `v26.13.0`
- Phiên bản npm: `11.20.0`

Kết quả cho thấy Node.js và npm đã được cài đặt thành công trên máy tính. Các lệnh kiểm tra phiên bản hoạt động bình thường, chứng tỏ môi trường lập trình đã sẵn sàng để sử dụng.

### Bước 2: Tạo tệp mã nguồn ứng dụng Node.js

Tiến hành tạo một tệp JavaScript có tên `myFirstNode.js` trong thư mục làm việc bằng Visual Studio Code.

Sử dụng module `http` có sẵn trong Node.js để xây dựng một máy chủ web đơn giản, có nhiệm vụ tiếp nhận yêu cầu từ trình duyệt và trả về nội dung HTML trên cổng 8080.

**Nội dung chương trình:**

```javascript
var http = require('http');

var server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(`
        <html>
            <head>
                <title>Node.js - Hello Long</title>
            </head>
            <body>
                <h1 style="color: blue;">Hello Long!</h1>
                <p>Chào mừng bạn đến với chương trình Node.js.</p>
            </body>
        </html>
    `);
});

server.listen(8080, function () {
    console.log('Server dang chay tai http://localhost:8080');
});
```

**Giải thích chương trình:**

- `var http = require('http');`: Sử dụng module HTTP có sẵn trong Node.js để xây dựng máy chủ web.
- `http.createServer()`: Tạo máy chủ HTTP để tiếp nhận và xử lý các yêu cầu từ trình duyệt.
- `req`: Đại diện cho yêu cầu HTTP được gửi từ phía trình duyệt đến máy chủ.
- `res`: Đại diện cho phản hồi HTTP được máy chủ gửi về trình duyệt.
- `res.writeHead(200, ...)`: Thiết lập mã trạng thái HTTP 200, cho biết yêu cầu được xử lý thành công, đồng thời khai báo nội dung trả về là HTML và hỗ trợ mã hóa tiếng Việt UTF-8.
- `res.end()`: Gửi nội dung HTML về trình duyệt, bao gồm tiêu đề trang web và lời chào mừng người dùng.
- `server.listen(8080, ...)`: Khởi động máy chủ và lắng nghe các yêu cầu tại cổng 8080.
- `console.log()`: Hiển thị thông báo trên Terminal khi máy chủ được khởi động thành công.

### Bước 3: Chạy chương trình bằng lệnh Node.js

Sau khi hoàn thành việc viết mã nguồn và lưu tệp `myFirstNode.js`, mở Terminal trong Visual Studio Code và thực hiện lệnh:

```bash
node myFirstNode.js
```

Khi chương trình được thực thi thành công, Terminal hiển thị thông báo:

```text
Server dang chay tai http://localhost:8080
```

Thông báo trên cho biết máy chủ HTTP đã được khởi động thành công và đang hoạt động tại cổng 8080, sẵn sàng tiếp nhận các yêu cầu truy cập từ trình duyệt web.

### Bước 4: Kiểm tra kết quả trên trình duyệt web

Sau khi khởi động máy chủ thành công, mở trình duyệt Google Chrome hoặc Microsoft Edge và nhập địa chỉ:

```text
http://localhost:8080
```

Kết quả hiển thị trên trình duyệt gồm các nội dung:

**Hello Long!**

Chào mừng bạn đến với chương trình Node.js.

Trong đó:
- Tiêu đề trang web là `Node.js - Hello Long`.
- Dòng chữ `Hello Long!` được hiển thị với màu xanh dương.
- Nội dung chào mừng được hiển thị bên dưới tiêu đề.
- Trang web hiển thị nội dung HTML do máy chủ Node.js gửi về.

Kết quả này chứng minh ứng dụng Node.js đã tiếp nhận yêu cầu HTTP từ trình duyệt và phản hồi thành công.

## III. MÔ TẢ VÀ ĐÁNH GIÁ KẾT QUẢ

Sau khi hoàn thành các bước thực hiện, ứng dụng Node.js đầu tiên đã được xây dựng và chạy thành công trên máy tính cá nhân.

**1. Về môi trường lập trình**

Node.js và npm đã được cài đặt thành công trên hệ điều hành Windows. Các lệnh `node -v` và `npm -v` trả về thông tin phiên bản chính xác, cho thấy môi trường lập trình đã được thiết lập và cấu hình phù hợp.

**2. Về khả năng thực thi chương trình**

Tệp mã nguồn `myFirstNode.js` được thực thi thành công bằng lệnh `node myFirstNode.js`. Máy chủ HTTP được khởi động tại cổng 8080 và hiển thị thông báo hoạt động trên cửa sổ Terminal.

**3. Về kết quả hiển thị trên trình duyệt**

Khi truy cập địa chỉ `http://localhost:8080`, trình duyệt hiển thị trang HTML với nội dung Hello Long! và thông điệp chào mừng. Tiêu đề được định dạng màu xanh dương theo đúng yêu cầu trong chương trình.

**4. Về kiến thức đạt được**

Thông qua bài tập, em đã hiểu được cách kiểm tra phiên bản Node.js và npm, cách tạo và thực thi tệp JavaScript bằng Node.js, cũng như cách sử dụng module HTTP để xây dựng một máy chủ web cơ bản và trả nội dung HTML về trình duyệt.

## IV. KẾT LUẬN

Qua bài tập này, em đã hoàn thành việc cài đặt và kiểm tra môi trường Node.js LTS, đồng thời xây dựng và chạy thành công ứng dụng Node.js đầu tiên trên máy tính cá nhân.

Ứng dụng đã đáp ứng đầy đủ các yêu cầu của đề bài: Node.js và npm được cài đặt thành công, tệp mã nguồn `myFirstNode.js` được thực thi bằng lệnh Node.js, máy chủ HTTP hoạt động tại cổng 8080 và trình duyệt hiển thị chính xác nội dung HTML được gửi từ máy chủ.

Bài tập giúp em nắm được những kiến thức cơ bản về Node.js, npm, JavaScript và cách xây dựng máy chủ web bằng module HTTP. Đây là nền tảng quan trọng để tiếp tục học tập, thực hành và phát triển các ứng dụng web nâng cao trong những bài tập tiếp theo.
