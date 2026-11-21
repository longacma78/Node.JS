# Bài 03 - Bài tập 10: Liên kết Collection bằng `aggregate()` và `$lookup` trong MongoDB

- **Sinh viên thực hiện:** Nguyễn Thành Long
- **Mã sinh viên:** CD-CNTT18B17

---

## 1. Chi tiết từng yêu cầu và cách thực hiện

### - Tạo tập tin `bai10.js`:
* **Tạo collection `departments`:** Gồm 3 khoa (`CNTT`, `KT`, `QTKD`), mỗi khoa có đầy đủ `makhoa`, `tenkhoa`.
* **Tạo collection `students_join`:** Gồm 4 sinh viên (`CD-CNTT18B17` trở xuống `CD-CNTT18B14`), mỗi sinh viên có đầy đủ `masv`, `hoten`, `makhoa`.
* **Sử dụng `aggregate()` kết hợp `$lookup`:** Liên kết collection `students_join` với `departments` thông qua trường `makhoa`, kết hợp `$unwind` và `$project` để lấy ra `tenkhoa`.
* **Hiển thị kết quả:** Sử dụng `console.table()` để hiển thị danh sách sinh viên gồm đầy đủ cả `makhoa` và `tenkhoa` tương ứng.

### - Lệnh chạy: `node bai10.js`
* **Cách làm:** Mở Terminal tại thư mục `Bt10` và chạy lệnh `node bai10.js`.

---

## 2. Các lệnh thực hiện

```bash
# Bước 1: Khởi tạo dự án và cài đặt thư viện mongodb
npm init -y
npm install mongodb

# Bước 2: Chạy file bai10.js
node bai10.js

# Bước 3: Đẩy bài lên GitHub
cd ../..
git add Bai03/Bt10
git commit -m "Hoan thanh Bai03 - Bt10 - Nguyen Thanh Long"
git push
```

---

## 3. Ảnh chạy các bước và kết quả cuối cùng

### Ảnh 1: Cài đặt thư viện (`npm init -y` và `npm install mongodb`)
![Cài đặt thư viện](./images/anh1_caidat.png)

### Ảnh 2: Chạy lệnh `node bai10.js` và kết quả danh sách sinh viên kèm mã khoa, tên khoa
![Kết quả chạy bai10.js](./images/anh2_ketqua.png)