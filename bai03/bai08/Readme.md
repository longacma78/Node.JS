# Bài 3 - Bt08: Thực hành Module File System (`fs`)

## 1. Các lệnh thực hiện

```powershell
# Di chuyển vào thư mục bài tập 08
cd Bt08

# Chạy chương trình Node.js
node bai08.js
```

Lệnh nộp bài lên GitHub (chạy tại thư mục gốc repo `NodeJS`):
```powershell
git add Bai03/Bt08
git commit -m "Hoan thanh Bai03 - Bt08"
git push origin main
```

---

## 2. Giải thích từng bước thực hiện trong `bai08.js`

- **Tạo thư mục `data` và tập tin `ghichu.txt`:**
  - Dùng `path.join(__dirname, 'data')` xác định đường dẫn thư mục `data` nằm trong `Bt08`.
  - Dùng `fs.mkdir(dataDir, { recursive: true }, ...)` để tạo thư mục `data` (có `{ recursive: true }` để chạy lại nhiều lần không bị lỗi đã tồn tại).
  - Dùng `fs.writeFile(oldFile, noiDung, 'utf8', ...)` để tạo tập tin `data/ghichu.txt`.

- **Ghi 3 dòng nội dung vào `data/ghichu.txt`:**
  - Nội dung đã ghi vào tập tin gồm 3 dòng ngăn cách bởi `\n`:
    1. `Dòng 1: Thực hành Node.js - Module File System (fs).`
    2. `Dòng 2: Tạo thư mục, tạo tập tin và ghi nội dung.`
    3. `Dòng 3: Đổi tên, đọc nội dung và xóa tập tin tạm.`

- **Đổi tên tập tin bằng `fs.rename()`:**
  - Dùng `fs.rename(oldFile, newFile, ...)` để đổi tên `data/ghichu.txt` thành `data/ghichu_moi.txt`.

- **Đọc và hiển thị nội dung sau khi đổi tên:**
  - Dùng `fs.readFile(newFile, 'utf8', (err, data) => ...)` để đọc toàn bộ nội dung chữ từ `data/ghichu_moi.txt` và in ra terminal bằng `console.log(data.trim())`.

- **Tạo và xóa tập tin `tam.txt` bằng `fs.unlink()`:**
  - Dùng `fs.writeFile(tempFile, 'Đây là tập tin tạm sẽ bị xóa.', 'utf8', ...)` tạo ra `data/tam.txt`.
  - Ngay trong callback thành công, gọi `fs.unlink(tempFile, ...)` để xóa `data/tam.txt`.

- **Thông báo kết quả từng thao tác:**
  - Mỗi bước đều đặt trong callback kiểm tra `if (err)` để bắt lỗi; nếu thành công sẽ in thông báo theo thứ tự từ `1.` đến `6.` ra terminal.

---

## 3. Ảnh chạy các bước và kết quả cuối cùng

### Ảnh chụp màn hình khi chạy lệnh `node bai08.js`
![Kết quả chạy bai08.js](./images/ketqua.png)

### Kết quả cuối cùng in ra Terminal
```text
1. Đã tạo thư mục "data" thành công.
2. Đã tạo tập tin "data/ghichu.txt" và ghi 3 dòng nội dung thành công.
3. Đã đổi tên tập tin thành "data/ghichu_moi.txt" thành công.
4. Đọc nội dung tập tin "data/ghichu_moi.txt" thành công:
--- NỘI DUNG TẬP TIN ---
Dòng 1: Thực hành Node.js - Module File System (fs).
Dòng 2: Tạo thư mục, tạo tập tin và ghi nội dung.
Dòng 3: Đổi tên, đọc nội dung và xóa tập tin tạm.
------------------------
5. Đã tạo tập tin "data/tam.txt" thành công.
6. Đã xóa tập tin "data/tam.txt" bằng fs.unlink() thành công.
=> Hoàn thành tất cả các thao tác!
```

### Cấu trúc thư mục `Bt08` sau khi chạy xong
```text
Bt08/
├── data/
│   └── ghichu_moi.txt
├── images/
│   └── ketqua.png
├── bai08.js
└── Readme.md
```