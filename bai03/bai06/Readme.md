# Bài 6: Xây dựng Module tính kết quả học tập

## 1. Mô tả bài tập
- `xulyDiem.js`: Module chứa hàm tính điểm trung bình 3 môn (`tinhDiemTrungBinh`) và xếp loại học tập (`xepLoaiHocTap`), xuất bằng `module.exports`.
- `bai06.js`: Nhập module bằng `require()`, tạo dữ liệu 3 sinh viên và hiển thị kết quả lên Terminal.
- `server.js` & `public/index.html`: Giao diện Web mở rộng dùng chung module `xulyDiem.js`.

## 2. Các lệnh thực hiện
```bash
# Cài đặt thư viện
npm install

# Chạy bài tập trên Terminal
node bai06.js

# Chạy giao diện Web mở rộng
node server.js