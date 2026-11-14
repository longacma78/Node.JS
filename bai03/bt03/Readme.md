# Bài 3. Thao tác với File System (module `fs`) trong Node.js

- **Học phần:** Bài 3 — Module, File System và cơ sở dữ liệu
- **Sinh viên thực hiện:** Nguyễn Thành Long
- **Tệp mã nguồn:** `bai03.js`
- **Tệp dữ liệu được tạo:** `thongtin.txt`

---

## 1. Yêu cầu bài thực hành
Tạo tập tin `bai03.js` sử dụng module `fs` tích hợp sẵn của Node.js để thực hiện:
- Tạo tập tin `thongtin.txt` chứa họ tên và mã sinh viên.
- Đọc và hiển thị nội dung tập tin lên Terminal.
- Ghi nối thêm tên lớp vào cuối tập tin bằng hàm `appendFile()`.
- Đọc lại tập tin để chứng minh nội dung đã được cập nhật đầy đủ.
- Bổ sung hiệu ứng hiển thị tiến trình và khung dữ liệu màu sắc trên Terminal.

---

## 2. Cấu trúc thư mục
```text
NodeJS/
└── Bai03/
    └── Bt03/
        ├── bai03.js
        ├── thongtin.txt         # Tự động được tạo khi chạy node bai03.js
        ├── Readme.md
        └── images/              # Thư mục chứa ảnh chụp màn hình (nếu có)
```

---

## 3. Mô tả các lệnh thực hiện

### Bước 1: Kiểm tra phiên bản Node.js
```bash
node -v
```

### Bước 2: Di chuyển vào thư mục `Bt03`
```bash
cd Bai03/Bt03
```

### Bước 3: Chạy chương trình `bai03.js`
```bash
node bai03.js
```
Sau khi chạy lệnh trên, chương trình sẽ tự động tạo file `thongtin.txt`, ghi dữ liệu ban đầu, đọc lần 1, gọi `fs.appendFile()` để nối thêm tên lớp và đọc lại lần 2 để hiển thị toàn bộ kết quả lên Terminal.

### Bước 4: Kiểm tra lại nội dung file `thongtin.txt` (tùy chọn)
- Trên **Windows (CMD / PowerShell)**:
  ```bash
  type thongtin.txt
  ```
- Trên **Git Bash / Linux / macOS**:
  ```bash
  cat thongtin.txt
  ```

### Bước 5: Đẩy mã nguồn lên GitHub
```bash
git add .
git commit -m "Hoan thanh Bai 03 - Bt03: Thao tac tap tin voi module fs"
git push origin main
```

---

## 4. Ảnh chạy các bước và kết quả cuối cùng

### Ảnh 1: Thực thi lệnh `node bai03.js` trên Terminal
*(Chụp ảnh màn hình Terminal khi chạy lệnh và hiển thị đủ 4 bước tạo, đọc, ghi nối và đọc lại tập tin)*
![Chạy lệnh node bai03.js](./images/chay-bai03-terminal.png)

### Ảnh 2: Kiểm tra nội dung tệp `thongtin.txt` đã được tạo và cập nhật
*(Chụp ảnh tệp `thongtin.txt` mở trong VS Code hoặc hiển thị bằng lệnh `cat thongtin.txt`)*
![Nội dung file thongtin.txt](./images/ket-qua-thongtin-txt.png)

**Kết quả hiển thị trên Terminal:**
```text
===========================================================
   BÀI 3: THAO TÁC TẬP TIN VỚI MODULE FS TRONG NODE.JS     
===========================================================

✔ [Bước 1/4] Đang tạo tập tin thongtin.txt - Hoàn tất!
✔ [Bước 2/4] Đang đọc nội dung thongtin.txt (lần 1) - Hoàn tất!
┌─── Nội dung ban đầu của thongtin.txt ────────────────────────┐
│   Họ và tên: Nguyễn Thành Long
│   Mã sinh viên: 20240001
└──────────────────────────────────────────────────────────────┘

✔ [Bước 3/4] Đang ghi nối tên lớp bằng appendFile() - Hoàn tất!
✔ [Bước 4/4] Đang đọc lại thongtin.txt sau cập nhật - Hoàn tất!
┌─── Nội dung sau khi cập nhật (appendFile) ───────────────────┐
│   Họ và tên: Nguyễn Thành Long
│   Mã sinh viên: 20240001
│ + Tên lớp: CNTT K18  (← Vừa thêm mới)
└──────────────────────────────────────────────────────────────┘

🎉 Hoàn thành! Tập tin thongtin.txt đã được tạo và cập nhật thành công.
```