BÀI TẬP 01: CÀI ĐẶT NODE.JS LTS & CHẠY ỨNG DỤNG NODE.JS ĐẦU TIÊN
📌 Yêu cầu đề bài
Cài đặt Node.js LTS; chạy lệnh kiểm tra phiên bản node -v và npm -v; tạo tệp mã nguồn ứng dụng Node.js, chạy trên trình duyệt web và mô tả kết quả.

📸 Hình ảnh minh họa chứng thực từng bước trên máy cá nhân
Bước 1: Kiểm tra môi trường phiên bản Node.js và npm
Mở cửa sổ Terminal/PowerShell trên Visual Studio Code và thực hiện kiểm tra lệnh:

Bash
node -v
npm -v
Môi trường chạy Node.js: v26.13.0   
mã kiểm tra và xem phiên bản.jpg

Trình quản lý gói Node (npm): 11.20.0
(Xem hình minh họa: mã kiểm tra và xem phiên bản.jpg)   
mã kiểm tra và xem phiên bản.jpg
+ 1

Bước 2: Tạo và kiểm tra tệp nguồn mã ứng dụng (myFirstNode.js)
Tạo tập tin myFirstNode.js sử dụng module http để thiết lập máy chủ web đơn giản chạy ở cổng 8080.
(Xem hình minh họa: code chương trình.jpg)   
code chương trình.jpg

Bước 3: Chạy chương trình qua lệnh node
Thực thi tệp JavaScript trong cửa sổ dòng lệnh:   
chạy trên web.jpg
+ 1

Bash
node myFirstNode.js
Terminal hiển thị thông báo: Server đang chạy tại http://localhost:8080
(Xem hình minh họa: mã chạy chương trình.jpg)   
chạy trên web.jpg
+ 2

Bước 4: Kiểm tra kết quả trên trình duyệt Web
Truy cập địa chỉ http://localhost:8080 trên trình duyệt để kiểm tra giao diện và phản hồi từ ứng dụng Node.js.
(Xem hình minh họa: chạy trên web.jpg)   
chạy trên web.jpg

📋 Mô tả chi tiết kết quả thực hiện
Khi khởi động lệnh node myFirstNode.js, máy chủ HTTP đã hoạt động ổn định và trả về trang HTML chào mừng trên trình duyệt với tiêu đề và định dạng màu sắc trực quan:   
chạy trên web.jpg
+ 1

HTML
Hello Long!
Chào mừng bạn đến với chương trình Node.js.
Đánh giá & Kết luận:
Môi trường hoạt động: Node.js đã được cài đặt và cấu hình biến môi trường (PATH) chính xác trên hệ điều hành Windows.

Khả năng thực thi: Node Engine biên dịch và chạy tệp JavaScript xử lý HTTP Server trơn tru, không có cảnh báo hoặc lỗi.

Nhà phát triển sẵn sàng: Trình thông dịch Node và trình quản lý gói npm (phiên bản 11.20.0) đã sẵn sàng phục vụ cho các bài tập tiếp theo về ứng dụng web nâng cao.   
mã kiểm tra và xem phiên bản.jpg
