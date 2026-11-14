# Bài 2. Tạo Web Server bằng module HTTP trong Node.js

- **Học phần:** Bài 3 — Module, File System và cơ sở dữ liệu
- **Sinh viên thực hiện:** Nguyễn Thành Long
- **Tệp mã nguồn:** `bai02.js`

---

## 1. Yêu cầu bài thực hành
Tạo tập tin `bai02.js` thực hiện các chức năng sau:
- Sử dụng module `http` tích hợp sẵn của Node.js để tạo Web Server chạy tại cổng `3000`.
- Khi truy cập đường dẫn `/`, hiển thị lời chào và mã sinh viên.
- Khi truy cập đường dẫn `/about`, hiển thị thông tin giới thiệu bản thân.
- Khi truy cập đường dẫn không tồn tại, trả về mã trạng thái **HTTP 404** kèm trang thông báo lỗi.
- Bổ sung hiệu ứng log màu trên Terminal và hiệu ứng giao diện HTML/CSS trực quan trên trình duyệt.

---

## 2. Cấu trúc thư mục
```text
NodeJS/
└── Bai03/
    └── Bt02/
        ├── bai02.js
        ├── Readme.md
        └── images/              # Thư mục chứa ảnh chụp màn hình (nếu có)
```

---

## 3. Mô tả các lệnh thực hiện

### Bước 1: Kiểm tra môi trường Node.js
Mở Terminal (CMD / PowerShell / VS Code Terminal) và kiểm tra phiên bản Node.js:
```bash
node -v
```

### Bước 2: Di chuyển vào thư mục bài tập `Bt02`
```bash
cd Bai03/Bt02
```

### Bước 3: Khởi chạy Web Server
```bash
node bai02.js
```
Sau khi chạy lệnh trên, Terminal sẽ thông báo server đã khởi động tại địa chỉ `http://localhost:3000`.

### Bước 4: Kiểm tra kết quả trên trình duyệt
Mở trình duyệt web và lần lượt truy cập các đường dẫn sau:
- Trang chủ: `http://localhost:3000`
- Trang giới thiệu: `http://localhost:3000/about`
- Đường dẫn không tồn tại (test mã 404): `http://localhost:3000/khong-ton-tai`

*(Nhấn **Ctrl + C** trên Terminal khi muốn dừng server)*

### Bước 5: Đẩy mã nguồn lên GitHub
```bash
git add .
git commit -m "Hoan thanh Bai 03 - Bt02: Web Server HTTP Node.js"
git push origin main
```

---

## 4. Ảnh chạy các bước và kết quả cuối cùng

### Bước 1: Chạy lệnh `node bai02.js` khởi động Server trên Terminal
*(Thay đường dẫn ảnh chụp Terminal khi server đang chạy và ghi log request)*
![Chạy lệnh node bai02.js](./images/chay-server-terminal.png)

### Bước 2: Kết quả truy cập trang chủ `http://localhost:3000`
*(Hiển thị lời chào và mã sinh viên)*
![Trang chủ localhost:3000](./images/ket-qua-trang-chu.png)

### Bước 3: Kết quả truy cập trang giới thiệu `http://localhost:3000/about`
*(Hiển thị thông tin giới thiệu bản thân)*
![Trang giới thiệu /about](./images/ket-qua-about.png)

### Bước 4: Kết quả truy cập đường dẫn không tồn tại (HTTP 404)
*(Mẹo: Bạn nên nhấn `F12` -> chọn tab `Network` -> tải lại trang để chụp rõ trạng thái Status `404`)*
![Trang lỗi 404](./images/ket-qua-404.png)