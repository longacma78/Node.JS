# Bài 3 — Bài tập 08: Làm việc với File System (`fs`) trong Node.js

## 1. Mục tiêu bài thực hành
Sử dụng module `fs` có sẵn trong Node.js để thực hiện các thao tác trên tập tin và thư mục:
- Tạo thư mục `data` và tập tin `ghichu.txt`.
- Ghi ít nhất 3 dòng nội dung vào tập tin.
- Đổi tên `ghichu.txt` thành `ghichu_moi.txt` bằng `fs.rename()`.
- Đọc và hiển thị nội dung sau khi đổi tên.
- Tạo tập tin `tam.txt`, sau đó xóa bằng `fs.unlink()`.
- In thông báo kết quả của từng thao tác ra màn hình.

## 2. Mô tả các lệnh thực hiện

### Các lệnh chạy trên Terminal (PowerShell):
1. Di chuyển vào thư mục bài tập 08:
   ```powershell
   cd Bt08