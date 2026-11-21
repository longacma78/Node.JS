# Bài 03 - Bài tập 09: Thao tác xóa dữ liệu MongoDB bằng Node.js
**Sinh viên thực hiện:** Nguyễn Thành Long

## 1. Chi tiết từng yêu cầu và cách thực hiện

### - Kết nối database `qlsinhvien`, sử dụng collection riêng `students_test`
* **Cách làm:** Sử dụng lớp `MongoClient` từ thư viện `mongodb` để kết nối tới MongoDB Server tại `mongodb://127.0.0.1:27017`. Sau khi kết nối, chọn database `qlsinhvien` và collection `students_test`.
* **Code minh họa:**
```javascript
const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

await client.connect();
const db = client.db('qlsinhvien');
const collection = db.collection('students_test');
```

---

### - Thêm ít nhất 5 sinh viên mẫu có `masv`, `hoten`, `tuoi`, `diem`
* **Cách làm:** Tạo mảng gồm 9 sinh viên mẫu (trong đó có `SV07 - Nguyễn Thành Long`) với đầy đủ các trường `masv`, `hoten`, `tuoi`, `diem`, sau đó gọi `insertMany()` để thêm vào collection.
* **Code minh họa:**
```javascript
const sampleStudents = [
    { masv: 'SV01', hoten: 'Nguyễn Văn An', tuoi: 20, diem: 8.5 },
    { masv: 'SV02', hoten: 'Trần Thị Bình', tuoi: 21, diem: 4.0 },
    { masv: 'SV03', hoten: 'Lê Hoàng Cường', tuoi: 19, diem: 3.5 },
    { masv: 'SV04', hoten: 'Phạm Minh Dũng', tuoi: 22, diem: 7.0 },
    { masv: 'SV05', hoten: 'Hoàng Ngọc Lan', tuoi: 20, diem: 4.8 },
    { masv: 'SV06', hoten: 'Vũ Quang Huy', tuoi: 21, diem: 9.0 },
    { masv: 'SV07', hoten: 'Nguyễn Thành Long', tuoi: 20, diem: 9.5 },
    { masv: 'SV08', hoten: 'Đỗ Thị Mai', tuoi: 19, diem: 7.5 },
    { masv: 'SV09', hoten: 'Bùi Tuấn Kiệt', tuoi: 22, diem: 6.5 }
];
const insertResult = await collection.insertMany(sampleStudents);
```

---

### - Dùng `deleteOne()` xóa một sinh viên theo mã sinh viên
* **Cách làm:** Gọi hàm `collection.deleteOne({ masv: 'SV01' })` để xóa đúng 1 sinh viên có mã `SV01`.
* **Code minh họa:**
```javascript
const deleteOneResult = await collection.deleteOne({ masv: 'SV01' });
console.log(`[deleteOne] Số bản ghi đã xóa (masv: SV01): ${deleteOneResult.deletedCount}`);
```

---

### - Dùng `deleteMany()` xóa các sinh viên có điểm dưới 5
* **Cách làm:** Sử dụng toán tử `$lt` (nhỏ hơn) với điều kiện `{ diem: { $lt: 5 } }` trong hàm `collection.deleteMany()` để xóa tất cả sinh viên có điểm dưới 5 (`SV02`, `SV03`, `SV05`).
* **Code minh họa:**
```javascript
const deleteManyResult = await collection.deleteMany({ diem: { $lt: 5 } });
console.log(`[deleteMany] Số bản ghi đã xóa (điểm < 5): ${deleteManyResult.deletedCount}`);
```

---

### - Hiển thị số bản ghi đã xóa và danh sách còn lại bằng `find()`
* **Cách làm:** Tính tổng `deletedCount` từ `deleteOne()` và `deleteMany()` (tổng 4 bản ghi đã xóa). Sau đó dùng `collection.find({}).toArray()` để lấy 5 sinh viên còn lại và in ra bảng bằng `console.table()`.
* **Code minh họa:**
```javascript
const totalDeleted = deleteOneResult.deletedCount + deleteManyResult.deletedCount;
console.log(`=> Tổng số bản ghi đã xóa: ${totalDeleted}`);

const remainingStudents = await collection.find({}).toArray();
console.table(remainingStudents);
```

---

### - Lệnh chạy: `node bai09.js`
* **Cách làm:** Mở Terminal tại thư mục `Bt09` và chạy lệnh `node bai09.js`.

---

## 2. Các lệnh thực hiện

```bash
# Bước 1: Cài đặt thư viện
npm init -y
npm install mongodb

# Bước 2: Chạy file bai09.js
node bai09.js

# Bước 3: Đẩy bài lên GitHub
cd ../..
git add Bai03/Bt09
git commit -m "Hoan thanh Bai03 - Bt09 - Nguyen Thanh Long"
git push
```

---

## 3. Ảnh chạy các bước và kết quả cuối cùng

### Ảnh 1: Cài đặt thư viện `mongodb`
![Cài đặt thư viện](./images/buoc1_caidat.png)

### Ảnh 2: Chạy lệnh `node bai09.js` và kết quả danh sách 5 sinh viên còn lại
![Kết quả chạy](./images/buoc2_ketqua.png)