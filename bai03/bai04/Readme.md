# Bài 4: Thêm và hiển thị dữ liệu MongoDB

**Sinh viên thực hiện:** Nguyễn Thành Long  
**Học phần:** Node.js — Bài 3: Module, File System và cơ sở dữ liệu  

---

## 1. Yêu cầu bài thực hành
- Kết nối tới MongoDB đang chạy trên máy (`mongodb://127.0.0.1:27017`).
- Sử dụng database `qlsinhvien`, collection `students`.
- Thêm ít nhất 3 sinh viên bằng phương thức `insertMany()`, mỗi sinh viên gồm các trường: `masv`, `hoten`, `tuoi`, `diem`.
- Sử dụng `find()` để hiển thị danh sách sinh viên và đóng kết nối sau khi hoàn thành.

## 2. Chức năng đã hoàn thiện trong `bai04.js`
- **Chức năng chính:**
  - Kết nối MongoDB bằng `MongoClient`.
  - Thêm 5 sinh viên mẫu vào collection `students` bằng `insertMany()`.
  - Truy vấn và hiển thị danh sách sinh viên bằng `find()`.
  - Đóng kết nối MongoDB an toàn trong khối `finally`.
- **Chức năng mở rộng & hiệu ứng:**
  - Hiệu ứng Terminal: Banner tiêu đề, loading spinner, bảng kẻ khung màu sắc phân loại học lực.
  - Truy vấn nâng cao: Lọc và sắp xếp Top sinh viên Giỏi/Xuất sắc (`diem >= 8.0`).
  - Thống kê lớp học: Tổng sinh viên, điểm trung bình, thủ khoa.
  - Module `fs`: Tự động sao lưu danh sách sinh viên ra file `danh_sach_sinhvien.json`.
  - Giao diện Web (`http://localhost:3000`): Tạo đường dẫn xem bảng dữ liệu trực quan kèm thanh tìm kiếm nhanh trên trình duyệt.

---

## 3. Cấu trúc thư mục
```text
Bt04/ (hoặc bai04/)
├── anh/                     # Thư mục chứa ảnh chụp màn hình kết quả
│   ├── buoc1_caidat.png
│   ├── buoc2_terminal.png
│   ├── buoc3_giaodienweb.png
│   └── buoc4_mongodb.png
├── bai04.js                 # Tập tin mã nguồn chính
├── danh_sach_sinhvien.json  # File JSON tự động xuất sau khi chạy
├── package.json             # Cấu hình dự án và thư viện
└── Readme.md                # File mô tả bài thực hành
```

---

## 4. Các lệnh thực hiện

### Bước 1: Mở Terminal tại thư mục chứa bài 4
```powershell
cd "Nguyen Thanh Long\bai04"
```

### Bước 2: Khởi tạo dự án Node.js và cài đặt thư viện `mongodb`
```powershell
npm init -y
npm install mongodb
```
*(Lưu ý: Nếu PowerShell chặn lệnh `npm`, có thể thay bằng `npm.cmd init -y` và `npm.cmd install mongodb`).*

### Bước 3: Chạy chương trình
*(Đảm bảo MongoDB Service trên máy đang bật trước khi chạy)*
```powershell
node bai04.js
```

### Bước 4: Xem kết quả và dừng Web Server
- Giữ **`Ctrl + Click`** vào đường dẫn `http://localhost:3000` hiển thị trên Terminal để mở giao diện web trên trình duyệt.
- Nhấn **`Ctrl + C`** tại Terminal khi muốn dừng Web Server.

---

## 5. Hình ảnh chạy các bước và kết quả cuối cùng

### Bước 1: Cài đặt package `mongodb` và chạy lệnh `node bai04.js`
![Cài đặt và chạy lệnh](./anh/buoc1_caidat.png)

### Bước 2: Kết quả hiển thị danh sách sinh viên và đường dẫn trên Terminal
![Kết quả trên Terminal](./anh/buoc2_terminal.png)

### Bước 3: Kết quả hiển thị giao diện trực quan qua đường dẫn `http://localhost:3000`
![Giao diện Web kết quả](./anh/buoc3_giaodienweb.png)

### Bước 4: Kiểm tra dữ liệu đã được lưu trong MongoDB (MongoDB Compass)
![Dữ liệu lưu trong MongoDB](./anh/buoc4_mongodb.png)