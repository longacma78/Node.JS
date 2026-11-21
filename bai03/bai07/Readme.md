# Bài 7: Xây dựng Web Server bằng module HTTP và đối tượng URL

- **Học phần:** Phát triển ứng dụng với Node.js (Bài 3 — Module, File System và cơ sở dữ liệu)
- **Sinh viên thực hiện:** Nguyễn Thành Long
- **Thư mục nộp bài:** `NodeJS/Bai03/Bt07`

---

## 1. Mục tiêu và Yêu cầu bài thực hành

Xây dựng ứng dụng Web Server bằng ngôn ngữ JavaScript chạy trên môi trường **Node.js**, sử dụng module tích hợp sẵn **`http`** và đối tượng **`URL`** để phân tích đường dẫn (`pathname`) cùng các tham số truy vấn (`searchParams`).

### Các yêu cầu đã hoàn thành:
1. Tạo tập tin `bai07.js` chạy Web Server lắng nghe tại cổng **`3001`** (`http://localhost:3001`).
2. Xử lý route `/hello?name=...`:
   - Khi truy cập `/hello?name=Minh` → trả về **`Xin chào Minh`** (HTTP `200`).
   - Khi truy cập `/hello?name=Long` → trả về **`Xin chào Long`** (HTTP `200`).
3. Xử lý route `/sum?a=10&b=20` → tính toán và trả về **`Tổng = 30`** (HTTP `200`).
4. Kiểm tra dữ liệu đầu vào: Trả về mã lỗi **HTTP `400`** cùng thông báo lỗi cụ thể nếu thiếu tham số (`name`, `a`, `b`) hoặc truyền giá trị không phải số hợp lệ.
5. **Mở rộng nâng cao:**
   - Chạy song song **chế độ Terminal tương tác** (nhập lệnh kiểm tra trực tiếp trên cửa sổ dòng lệnh) và **Local Web Server**.
   - Xây dựng giao diện Web tương tác tại `/` (`public/index.html`) với hiệu ứng chuyển động, chế độ Sáng/Tối, nút kiểm thử nhanh, khung phân tích cấu trúc đối tượng `URL` và lịch sử gọi request.
   - Bổ sung route `/calc?a=...&b=...&op=...` (máy tính `+`, `-`, `×`, `÷`, bắt lỗi chia cho `0`) và `/info` (xem thông tin cổng, phiên bản Node.js, thời gian hoạt động).

---

## 2. Cấu trúc thư mục dự án

```text
Bt07/
├── bai07.js           # File chính: Web Server cổng 3001 + Terminal tương tác
├── public/
│   └── index.html     # Giao diện Web Local có nút bấm, hiệu ứng & phân tích URL
└── Readme.md          # Tài liệu mô tả lệnh thực hiện và hình ảnh kết quả
```

---

## 3. Mô tả các lệnh thực hiện

### Bước 1: Kiểm tra môi trường cài đặt
Kiểm tra phiên bản Node.js và Git đã được cài đặt trên máy:
```powershell
node -v
git --version
```

### Bước 2: Tạo cấu trúc thư mục bài thực hành
Tạo thư mục `Bai03\Bt07\public` và di chuyển vào thư mục `Bt07`:
```powershell
mkdir Bai03\Bt07\public
cd Bai03\Bt07
```

### Bước 3: Khởi chạy chương trình
Chạy Web Server và Terminal tương tác bằng lệnh theo yêu cầu đề bài:
```powershell
node bai07.js
```

Sau khi chạy thành công, màn hình Terminal hiển thị thông báo:
- Địa chỉ Local Web: `http://localhost:3001`
- Kết quả chạy thử tự động cho các route mẫu.

### Bước 4: Các lệnh tương tác trực tiếp trên Terminal
Khi chương trình đang chạy (`Long-Terminal>`), có thể gõ các lệnh sau để kiểm tra ngay:
```text
hello Long            # In ra: Xin chào Long
hello Minh            # In ra: Xin chào Minh
sum 10 20             # In ra: Tổng = 30
calc 25 5 div         # In ra: 25 ÷ 5 = 5
/sum?a=15&b=25        # Kiểm tra trực tiếp theo định dạng URL
open                  # Tự động mở http://localhost:3001 trên trình duyệt
exit                  # Dừng Web Server và thoát chương trình
```

### Bước 5: Đưa mã nguồn lên GitHub
Khởi tạo và đẩy thư mục `Bt07` lên repository `NodeJS` theo đúng cấu trúc `NodeJS/Bai03/Bt07`:
```powershell
git init
git add .
git commit -m "Hoan thanh Bai 07 - Web Server HTTP va doi tuong URL"
git branch -M main
git remote add origin https://github.com/<TEN_GITHUB>/NodeJS.git
git push -u origin main
```

---

## 4. Bảng kiểm thử các đường dẫn (Routes)

| Đường dẫn truy cập (URL) | Trường hợp kiểm thử | Mã HTTP | Kết quả trả về |
| :--- | :--- | :---: | :--- |
| `/` | Mở trang chủ giao diện Web | `200` | Hiển thị giao diện `public/index.html` |
| `/hello?name=Minh` | Truyền đúng tham số `name` | `200` | `Xin chào Minh` |
| `/hello?name=Long` | Truyền đúng tham số `name` | `200` | `Xin chào Long` |
| `/hello` | Thiếu tham số `name` | `400` | `Lỗi: Thiếu tham số 'name' hoặc giá trị không hợp lệ!...` |
| `/sum?a=10&b=20` | Truyền đúng 2 số `a`, `b` | `200` | `Tổng = 30` |
| `/sum?a=10` | Thiếu tham số `b` | `400` | `Lỗi: Thiếu tham số 'a' hoặc 'b'!...` |
| `/sum?a=abc&b=20` | Tham số `a` không phải số | `400` | `Lỗi: Giá trị 'a' hoặc 'b' không hợp lệ...` |
| `/calc?a=25&b=5&op=div` | Mở rộng phép chia | `200` | `25 ÷ 5 = 5` |
| `/calc?a=10&b=0&op=div` | Mở rộng chia cho 0 | `400` | `Lỗi: Không thể chia cho 0!` |
| `/info` | Xem thông tin Server | `200` | Dữ liệu JSON thông tin cổng & Node.js |
| `/khongtontai` | Đường dẫn không tồn tại | `404` | `Lỗi 404: Không tìm thấy đường dẫn...` |

---

## 5. Hình ảnh chạy các bước và kết quả cuối cùng

> *(Hướng dẫn: Chụp ảnh màn hình từng bước bên dưới rồi chèn link ảnh hoặc kéo thả trực tiếp ảnh vào trình soạn thảo `Readme.md` trên GitHub).*

### 5.1. Ảnh chạy lệnh `node bai07.js` và tương tác trên Terminal
![Kết quả chạy trên Terminal](./images/step1-terminal.png)

### 5.2. Ảnh giao diện Local Web tại `http://localhost:3001`
![Giao diện Local Web](./images/step2-web-home.png)

### 5.3. Ảnh kết quả route `/hello?name=Minh` và `/hello?name=Long`
![Kết quả route hello](./images/step3-hello.png)

### 5.4. Ảnh kết quả route `/sum?a=10&b=20`
![Kết quả route sum](./images/step4-sum.png)

### 5.5. Ảnh kiểm thử thông báo lỗi khi thiếu hoặc sai tham số (HTTP 400)
![Kết quả thông báo lỗi 400](./images/step5-error.png)

---

## 6. Kết luận
Qua Bài 7, em đã nắm vững cách khởi tạo Web Server bằng module **`http`** trong Node.js, cách sử dụng đối tượng **`URL`** và **`searchParams`** để trích xuất đường dẫn cũng như tham số truy vấn, đồng thời xử lý bắt lỗi đầu vào hợp lệ và xây dựng giao diện tương tác trực quan trên trình duyệt.