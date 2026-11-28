# Bài 4: Xây dựng Web với nền tảng Express (Express Framework)

- **Sinh viên thực hiện:** Nguyễn Thành Long
- **Môn học:** Phát triển ứng dụng Web với NodeJS
- **Nội dung:** Thực hành tất cả các ví dụ Bài 4 về Express.js, Route, Middleware, Template Engine (Pug), Error Handling và mô hình MVC.

---

## 1. Cấu trúc thư mục dự án

```text
Baii4/
├── .gitignore
├── package.json
├── package-lock.json
├── Readme.md
├── images/
│   ├── Screenshot 2026-11-28 150938.png
│   ├── Screenshot 2026-11-28 151015.png
│   ├── Screenshot 2026-11-28 151115.png
│   ├── Screenshot 2026-11-28 151134.png
│   ├── Screenshot 2026-11-28 151210.png
│   ├── Screenshot 2026-11-28 151242.png
│   ├── Screenshot 2026-11-28 151318.png
│   └── Screenshot 2026-11-28 155429.png
├── app.js
├── express_route.js
├── express_middleware.js
├── express_pug.js
├── express_errorhandling.js
├── views/
│   └── index.pug
└── my-express-app/
    ├── app.js
    ├── controllers/
    │   └── calculatorController.js
    ├── models/
    │   └── calculatorModel.js
    ├── views/
    │   └── calculator.pug
    └── public/
        └── styles.css
```

---

## 2. Các bước khởi tạo và cài đặt thư viện

Mở Terminal trong VS Code, di chuyển vào thư mục `Baii4` và chạy các lệnh sau:

```powershell
# Di chuyển vào thư mục làm việc
cd Baii4

# Khởi tạo file package.json mặc định
npm init -y

# Cài đặt các gói thư viện cần thiết: express, pug và body-parser
npm install express pug body-parser
```

- **`express`**: Framework web giúp tạo server, định nghĩa route và middleware nhanh chóng.
- **`pug`**: Template engine giúp tạo giao diện HTML động từ dữ liệu phía server.
- **`body-parser`**: Middleware hỗ trợ phân tích dữ liệu gửi lên từ form HTML (`POST`).

---

## 3. Chi tiết thực hiện các ví dụ và kết quả

### Ví dụ 1: Tạo ứng dụng đầu tiên với Express (`app.js`)

- **Mô tả:** Khởi tạo một ứng dụng Express cơ bản lắng nghe tại cổng `3000`, định nghĩa route GET cho đường dẫn gốc `/` và trả về chuỗi `"Hello, Express!"`.
- **Lệnh thực hiện:**
  ```powershell
  node app.js
  ```
- **Kiểm tra trên trình duyệt:** Truy cập `http://localhost:3000/`
- **Kết quả:** Trình duyệt hiển thị dòng chữ `Hello, Express!`, Terminal thông báo server đang chạy tại `http://localhost:3000`.

![Kết quả Ví dụ 1 - Hello Express](images/Screenshot%202026-11-28%20150938.png)

---

### Ví dụ 2: Định tuyến Route trong Express (`express_route.js`)

- **Mô tả:** Thực hành định nghĩa nhiều route khác nhau gồm đường dẫn gốc `/`, đường dẫn `/about`, đường dẫn `/users` có nhận tham số truy vấn (`req.query.name`) và middleware mặc định trả về mã lỗi `404` khi không tìm thấy trang.
- **Lệnh thực hiện:**
  ```powershell
  node express_route.js
  ```
- **Kiểm tra lần lượt các đường dẫn và kết quả:**

1. **Đường dẫn `/` (`http://localhost:3000/`):** Hiển thị `Trang chủ`.

   ![Kết quả Ví dụ 2 - Trang chủ](images/Screenshot%202026-11-28%20151015.png)

2. **Đường dẫn `/about` (`http://localhost:3000/about`):** Hiển thị `Trang giới thiệu`.

   ![Kết quả Ví dụ 2 - Trang giới thiệu](images/Screenshot%202026-11-28%20151115.png)

3. **Đường dẫn `/users?name=Minh` (`http://localhost:3000/users?name=Minh`):** Đọc query parameter `name` và hiển thị `Xin chào, Minh`.

   ![Kết quả Ví dụ 2 - Route Users với Query Parameter](images/Screenshot%202026-11-28%20151134.png)

---

### Ví dụ 3: Sử dụng Middleware trong Express (`express_middleware.js`)

- **Mô tả:** Đăng ký một middleware bằng `app.use()` chạy trước các route chính để ghi nhận (log) đường dẫn của mỗi yêu cầu HTTP (`req.url`), sau đó gọi hàm `next()` để chuyển quyền xử lý tiếp cho route `/`.
- **Lệnh thực hiện:**
  ```powershell
  node express_middleware.js
  ```
- **Kiểm tra trên trình duyệt:** Truy cập `http://localhost:3000/`
- **Kết quả:** Trình duyệt hiển thị `Chào mừng đến với ứng dụng Express!`, đồng thời cửa sổ Terminal tự động ghi log dòng `Yêu cầu đến địa chỉ: /`.

![Kết quả Ví dụ 3 - Middleware](images/Screenshot%202026-11-28%20151210.png)

---

### Ví dụ 4: Sử dụng Template Engine Pug (`express_pug.js` & `views/index.pug`)

- **Mô tả:** Cấu hình Express sử dụng `pug` làm view engine (`app.set('view engine', 'pug')`), truyền biến `name = 'John Doe'` từ server vào file template `views/index.pug` thông qua `res.render('index', { name })` để tạo trang HTML động.
- **Lệnh thực hiện:**
  ```powershell
  node express_pug.js
  ```
- **Kiểm tra trên trình duyệt:** Truy cập `http://localhost:3000/`
- **Kết quả:** Trình duyệt hiển thị tiêu đề `<h1>` với nội dung `Hello, John Doe!`.

![Kết quả Ví dụ 4 - Template Engine Pug](images/Screenshot%202026-11-28%20151242.png)

---

### Ví dụ 5: Xử lý lỗi - Error Handling (`express_errorhandling.js`)

- **Mô tả:** Xây dựng form HTML nhập hai số `Dividend` và `Divisor` gửi bằng phương thức `POST` đến `/divide`. Server dùng `body-parser` để lấy dữ liệu và kiểm tra tính hợp lệ (nếu dữ liệu không phải số hoặc `divisor === 0` thì trả về HTTP Status `400` kèm thông báo `Invalid input`, ngược lại trả về kết quả phép chia).
- **Lệnh thực hiện:**
  ```powershell
  node express_errorhandling.js
  ```
- **Kiểm tra trên trình duyệt:** Truy cập `http://localhost:3000/`
- **Kết quả:** Trình duyệt hiển thị biểu mẫu nhập `Dividend`, `Divisor` và nút `Submit` để thực hiện phép chia và kiểm tra xử lý lỗi đầu vào.

![Kết quả Ví dụ 5 - Error Handling](images/Screenshot%202026-11-28%20151318.png)

---

### Ví dụ 6: Dự án ứng dụng Calculator theo mô hình MVC (`my-express-app/`)

- **Mô tả:** Kết hợp toàn bộ kiến thức đã học để xây dựng ứng dụng máy tính theo kiến trúc **MVC (Model - View - Controller)**:
  - **Model (`models/calculatorModel.js`):** Chứa logic xử lý 4 phép toán (`add`, `subtract`, `multiply`, `divide`) và kiểm tra chia cho `0`.
  - **View (`views/calculator.pug` & `public/styles.css`):** Giao diện nhập hai số, chọn phép tính và hiển thị kết quả bằng Pug kết hợp file CSS tĩnh từ thư mục `public`.
  - **Controller (`controllers/calculatorController.js`):** Nhận request GET `/calculator` để hiển thị form và POST `/calculator/calculate` để gọi Model tính toán, trả kết quả ra View hoặc chuyển lỗi sang middleware xử lý lỗi qua `next(err)`.
  - **App (`app.js`):** Cấu hình `body-parser`, `express.static('public')`, view engine `pug`, gắn router `/calculator` và middleware xử lý lỗi.
- **Lệnh thực hiện:**
  ```powershell
  cd my-express-app
  node app.js
  ```
- **Kiểm tra trên trình duyệt:** Truy cập `http://localhost:3000/calculator`
- **Kết quả cuối cùng:** Hiển thị giao diện ứng dụng **Calculator** hoàn chỉnh với CSS được định dạng gọn gàng, sẵn sàng thực hiện các phép tính cộng, trừ, nhân, chia.

![Kết quả Ví dụ 6 - Ứng dụng Calculator MVC](images/Screenshot%202026-11-28%20155429.png)

---

## 4. Đưa mã nguồn lên GitHub

Từ thư mục gốc của repository, thực hiện các lệnh sau để đẩy toàn bộ bài làm lên GitHub:

```powershell
git add .
git commit -m "Hoan thanh Bai 4 - Express Framework"
git push
```