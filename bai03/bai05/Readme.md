# Bài 5: Tìm kiếm, cập nhật và sắp xếp MongoDB

**Sinh viên thực hiện:** Nguyễn Thành Long  
**Học phần:** Node.js — Bài 3: Module, File System và cơ sở dữ liệu  

---

## 1. Yêu cầu bài thực hành
Sử dụng lại collection `students` trong database `qlsinhvien` của Bài 4 để thực hiện:
- Tìm các sinh viên có `diem >= 7` bằng `find()` và toán tử `$gte`.
- Sắp xếp kết quả theo điểm giảm dần bằng `sort({ diem: -1 })`.
- Cập nhật điểm của một sinh viên theo `masv` bằng `updateOne()` và `$set`.
- Hiển thị lại thông tin sau cập nhật để kiểm tra kết quả.

## 2. Chức năng đã hoàn thiện trong `bai05.js`
- **Chức năng chính theo yêu cầu:**
  - Kết nối tới MongoDB local (`mongodb://127.0.0.1:27017`), sử dụng database `qlsinhvien` và collection `students`.
  - Lọc sinh viên có `diem >= 7` bằng `find({ diem: { $gte: 7 } })` kết hợp sắp xếp giảm dần `.sort({ diem: -1 })`.
  - Cập nhật điểm cho sinh viên theo `masv` bằng `updateOne()` và `$set`.
  - Truy vấn kiểm tra lại bằng `findOne()` và hiển thị danh sách sau cập nhật để đối chiếu.
  - Đóng kết nối MongoDB an toàn trong khối `finally`.
- **Chức năng mở rộng & hiệu ứng:**
  - Hiệu ứng Terminal: Banner tiêu đề, loading spinner từng bước, bảng dữ liệu có màu phân loại học lực và đánh dấu `★ ĐÃ SỬA` cho sinh viên vừa cập nhật.
  - Module `fs`: Tự động xuất kết quả lọc và cập nhật ra file `ketqua_bai05.json`.
  - Giao diện Web (`http://localhost:3000`): Thiết kế nền gradient động, số liệu đếm tự động, khung so sánh `Điểm cũ ➔ Điểm mới`, thanh tiến độ điểm, thanh tìm kiếm và 3 tab chuyển đổi (*Sau cập nhật / Trước cập nhật / Toàn bộ DB*).

---

## 3. Cấu trúc thư mục
```text
Bt05/ (hoặc bai05/)
├── anh/                     # Thư mục chứa ảnh chụp màn hình kết quả
│   ├── buoc1_caidat.png
│   ├── buoc2_terminal.png
│   ├── buoc3_giaodienweb.png
│   └── buoc4_mongodb.png
├── bai05.js                 # Tập tin mã nguồn chính
├── ketqua_bai05.json        # File JSON lưu kết quả sau khi chạy
├── package.json             # Cấu hình dự án và thư viện mongodb
└── Readme.md                # File mô tả bài thực hành
```

---

## 4. Các lệnh thực hiện

### Bước 1: Di chuyển vào thư mục Bài 5
```powershell
cd "Nguyen Thanh Long\bai05"
```

### Bước 2: Khởi tạo dự án và cài đặt thư viện `mongodb`
```powershell
npm init -y
npm install mongodb
```
*(Nếu PowerShell chặn `npm`, dùng `npm.cmd init -y` và `npm.cmd install mongodb`).*

### Bước 3: Chạy chương trình
*(Đảm bảo MongoDB Service trên máy đang chạy)*
```powershell
node bai05.js
```

### Bước 4: Xem giao diện kết quả trên trình duyệt
- Giữ **`Ctrl + Click`** vào đường dẫn `http://localhost:3000` (hoặc cổng hiển thị trên Terminal) để xem giao diện web trực quan.
- Nhấn **`Ctrl + C`** tại Terminal để dừng Web Server khi hoàn tất.

---

## 5. Hình ảnh chạy các bước và kết quả cuối cùng

### Bước 1: Cài đặt thư viện `mongodb` và thực thi lệnh `node bai05.js`
![Cài đặt và chạy lệnh](./anh/buoc1_caidat.png)

### Bước 2: Kết quả lọc `$gte: 7`, sắp xếp giảm dần và cập nhật `updateOne()` trên Terminal
![Kết quả trên Terminal](./anh/buoc2_terminal.png)

### Bước 3: Giao diện Web trực quan hiển thị trước và sau cập nhật
![Giao diện Web kết quả](./anh/buoc3_giaodienweb.png)

### Bước 4: Kiểm tra dữ liệu đã được cập nhật trong MongoDB (MongoDB Compass)
![Dữ liệu trong MongoDB Compass](./anh/buoc4_mongodb.png)