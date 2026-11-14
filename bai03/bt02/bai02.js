const http = require("http");

const PORT = 3000;

// ============================================================
// CẬP NHẬT THÔNG TIN SINH VIÊN CỦA BẠN TẠI ĐÂY
// ============================================================
const thongTinSinhVien = {
  hoTen: "Nguyễn Thành Long",
  maSV: "20240001", // <-- Thay mã sinh viên của bạn vào đây
  lop: "CNTT K18",
  nganh: "Công nghệ thông tin",
  soThich: "Lập trình Web, Node.js, Thiết kế giao diện",
  mucTieu: "Trở thành lập trình viên Full-stack chuyên nghiệp",
};

// Mã màu ANSI cho Terminal
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
};

// Hàm tạo khung HTML chung kèm CSS hiệu ứng
const renderPage = (title, content, activeRoute) => `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    body {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      background: linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #1e1b4b);
      background-size: 400% 400%;
      animation: gradientBG 10s ease infinite;
      padding: 20px;
    }

    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .card {
      width: 100%;
      max-width: 620px;
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      padding: 36px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
      animation: fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #6ee7b7;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 18px;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 10px #10b981;
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.5); opacity: 0.5; }
    }

    h1 {
      font-size: 28px;
      margin-bottom: 12px;
      background: linear-gradient(90deg, #38bdf8, #818cf8, #f472b6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      color: #cbd5e1;
      line-height: 1.7;
      font-size: 16px;
      margin-bottom: 14px;
    }

    .highlight-box {
      background: rgba(0, 0, 0, 0.25);
      border-left: 4px solid #38bdf8;
      padding: 16px 20px;
      border-radius: 10px;
      margin: 20px 0;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .highlight-box:hover {
      transform: translateX(6px);
      box-shadow: 0 8px 20px rgba(56, 189, 248, 0.15);
    }

    .info-list {
      list-style: none;
      margin: 18px 0;
    }

    .info-list li {
      padding: 10px 14px;
      margin-bottom: 8px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      gap: 12px;
      transition: background 0.25s ease, transform 0.25s ease;
    }

    .info-list li:hover {
      background: rgba(255, 255, 255, 0.12);
      transform: translateX(4px);
    }

    .info-list span.label {
      color: #94a3b8;
      font-weight: 600;
    }

    .nav {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 26px;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
    }

    .btn {
      text-decoration: none;
      padding: 10px 18px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
    }

    .btn:hover {
      background: #38bdf8;
      color: #0f172a;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(56, 189, 248, 0.35);
    }

    .btn.active {
      background: linear-gradient(90deg, #38bdf8, #6366f1);
      border-color: transparent;
    }

    .error-code {
      font-size: 72px;
      font-weight: 800;
      color: #f87171;
      text-shadow: 0 0 25px rgba(248, 113, 113, 0.5);
      animation: bounce 2s infinite;
      margin-bottom: 10px;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  </style>
</head>
<body>
  <div class="card">
    ${content}
    <div class="nav">
      <a href="/" class="btn ${activeRoute === "/" ? "active" : ""}">🏠 Trang chủ (/)</a>
      <a href="/about" class="btn ${activeRoute === "/about" ? "active" : ""}">👤 Giới thiệu (/about)</a>
      <a href="/khong-ton-tai" class="btn ${activeRoute === "404" ? "active" : ""}">⚠️ Thử lỗi 404</a>
    </div>
  </div>
</body>
</html>
`;

// Tạo Web Server bằng module http
const server = http.createServer((req, res) => {
  // Lấy đường dẫn URL sạch (bỏ qua query string nếu có)
  const urlPath = req.url.split("?")[0];
  const thoiGian = new Date().toLocaleTimeString("vi-VN");

  // 1. Khi truy cập "/"
  if (urlPath === "/") {
    console.log(
      `${colors.green}[${thoiGian}] 200 OK${colors.reset} - Truy cập trang chủ: ${colors.cyan}${urlPath}${colors.reset}`
    );

    const html = renderPage(
      "Trang chủ - Node.js HTTP Server",
      `
        <div class="badge"><span class="dot"></span> Node.js HTTP Server • Port ${PORT}</div>
        <h1>Xin chào! Chào mừng đến với Web Server 👋</h1>
        <p>Đây là ứng dụng Web Server đầu tiên được xây dựng bằng module <strong>http</strong> trong Node.js.</p>
        <div class="highlight-box">
          <p style="margin-bottom: 6px;">👨‍🎓 <strong>Sinh viên thực hiện:</strong> ${thongTinSinhVien.hoTen}</p>
          <p style="margin-bottom: 0;">🆔 <strong>Mã sinh viên:</strong> <span style="color: #38bdf8; font-weight: bold;">${thongTinSinhVien.maSV}</span></p>
        </div>
        <p>Chọn các nút bên dưới hoặc nhập đường dẫn trên trình duyệt để kiểm tra các route khác.</p>
      `,
      "/"
    );

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  }

  // 2. Khi truy cập "/about"
  else if (urlPath === "/about") {
    console.log(
      `${colors.green}[${thoiGian}] 200 OK${colors.reset} - Truy cập trang giới thiệu: ${colors.cyan}${urlPath}${colors.reset}`
    );

    const html = renderPage(
      "Giới thiệu bản thân - /about",
      `
        <div class="badge"><span class="dot"></span> Thông tin cá nhân</div>
        <h1>Giới Thiệu Bản Thân ✨</h1>
        <p>Xin chào thầy/cô và các bạn! Dưới đây là một vài thông tin giới thiệu về bản thân mình:</p>
        <ul class="info-list">
          <li><span class="label">Họ và tên:</span> <span>${thongTinSinhVien.hoTen}</span></li>
          <li><span class="label">Mã sinh viên:</span> <span>${thongTinSinhVien.maSV}</span></li>
          <li><span class="label">Lớp:</span> <span>${thongTinSinhVien.lop}</span></li>
          <li><span class="label">Chuyên ngành:</span> <span>${thongTinSinhVien.nganh}</span></li>
          <li><span class="label">Sở thích:</span> <span>${thongTinSinhVien.soThich}</span></li>
          <li><span class="label">Mục tiêu:</span> <span>${thongTinSinhVien.mucTieu}</span></li>
        </ul>
      `,
      "/about"
    );

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  }

  // 3. Khi truy cập đường dẫn không tồn tại -> Trả về HTTP 404
  else {
    console.log(
      `${colors.red}[${thoiGian}] 404 Not Found${colors.reset} - Đường dẫn không tồn tại: ${colors.yellow}${urlPath}${colors.reset}`
    );

    const html = renderPage(
      "404 - Không tìm thấy trang",
      `
        <div class="error-code">404</div>
        <h1>Không tìm thấy trang yêu cầu!</h1>
        <p>Đường dẫn <strong>"${urlPath}"</strong> không tồn tại trên máy chủ.</p>
        <p>Hệ thống đã trả về đúng mã trạng thái <strong>HTTP 404 Not Found</strong> theo yêu cầu.</p>
      `,
      "404"
    );

    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  }
});

// Khởi động Server tại cổng 3000
server.listen(PORT, () => {
  console.log(`\n${colors.magenta}${colors.bold}==================================================${colors.reset}`);
  console.log(`${colors.green}${colors.bold}   🚀 WEB SERVER ĐANG CHẠY TẠI CỔNG ${PORT}   ${colors.reset}`);
  console.log(`${colors.magenta}${colors.bold}==================================================${colors.reset}`);
  console.log(`${colors.cyan}👉 Trang chủ (/)     :${colors.reset} http://localhost:${PORT}`);
  console.log(`${colors.cyan}👉 Giới thiệu (/about):${colors.reset} http://localhost:${PORT}/about`);
  console.log(`${colors.yellow}👉 Nhấn Ctrl + C để dừng server.${colors.reset}\n`);
});