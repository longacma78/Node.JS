# Bài 1. Quản lý thông tin sinh viên bằng JavaScript ES6

- **Học phần:** Bài 3 — Module, File System và cơ sở dữ liệu
- **Sinh viên thực hiện:** Nguyễn Thành Long
- **Tệp mã nguồn:** `bai01.js`

---

## 1. Yêu cầu bài thực hành
Tạo tập tin `bai01.js` thực hiện các chức năng bằng JavaScript ES6:
- Khai báo danh sách gồm 5 sinh viên, mỗi sinh viên có các thông tin: `mã`, `họ tên`, `tuổi` và `điểm`.
- Sử dụng `class` và `constructor` để biểu diễn đối tượng sinh viên.
- Sử dụng hàm mũi tên (`arrow function`) để lọc ra các sinh viên có điểm từ **5 trở lên**.
- Hiển thị danh sách sinh viên đạt yêu cầu ra Terminal bằng `console.log()` (có bổ sung hiệu ứng màu sắc ANSI và hiệu ứng loading/xuất hiện từng dòng).

---

## 2. Cấu trúc thư mục
```text
NodeJS/
└── Bai03/
    └── Bt01/
        ├── bai01.js
        ├── Readme.md
        └── images/              # Thư mục chứa ảnh chụp màn hình (nếu có)
```

---

## 3. Mô tả các lệnh thực hiện

### Bước 1: Kiểm tra môi trường Node.js
Mở Terminal (CMD / PowerShell / VS Code Terminal) và kiểm tra Node.js đã được cài đặt:
```bash
node -v
```

### Bước 2: Di chuyển vào thư mục chứa bài tập
```bash
cd Bai03/Bt01
```

### Bước 3: Chạy chương trình `bai01.js`
```bash
node bai01.js
```

### Bước 4: Đưa mã nguồn lên GitHub
```bash
git add .
git commit -m "Hoan thanh Bai 03 - Bt01: Quan ly sinh vien ES6"
git push origin main
```

---

## 4. Ảnh chạy các bước và kết quả cuối cùng

### Ảnh 1: Chạy lệnh kiểm tra và thực thi `node bai01.js`
*(Chụp ảnh màn hình Terminal khi gõ lệnh và hiệu ứng đang chạy, rồi thay đường dẫn ảnh bên dưới)*
![Chạy lệnh node bai01.js](./images/buoc-chay-lenh.png)

### Ảnh 2: Kết quả hiển thị cuối cùng trên Terminal
*(Chụp ảnh màn hình kết quả bảng danh sách 3 sinh viên đạt yêu cầu, rồi thay đường dẫn ảnh bên dưới)*
![Kết quả cuối cùng](./images/ket-qua-cuoi-cung.png)

**Kết quả dạng văn bản hiển thị trên Terminal:**
```text
======================================================
     QUẢN LÝ THÔNG TIN SINH VIÊN - JAVASCRIPT ES6     
======================================================

✔ Lọc dữ liệu thành công!

DANH SÁCH SINH VIÊN ĐẠT YÊU CẦU (ĐIỂM >= 5):
------------------------------------------------------
Mã SV    | Họ và tên            | Tuổi   | Điểm
------------------------------------------------------
SV001    | Nguyễn Văn An        | 20     | 8.5
SV003    | Lê Hoàng Cường       | 21     | 6.8
SV005    | Võ Ngọc Em           | 22     | 9.0
------------------------------------------------------
Tổng số sinh viên đạt: 3/5
```