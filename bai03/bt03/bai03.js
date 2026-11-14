const fs = require("fs").promises;
const path = require("path");
const http = require("http");

const PORT = 3003;
const filePath = path.join(__dirname, "thongtin.txt");

// ============================================================
// CẬP NHẬT THÔNG TIN CỦA BẠN TẠI ĐÂY
// ============================================================
const thongTin = {
  hoTen: "Nguyễn Thành Long",
  maSV: "20240001", // <-- Thay mã sinh viên của bạn vào đây
  tenLop: "CNTT K18", // <-- Thay tên lớp của bạn vào đây
};

const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const hienThiTienTrinh = async (buoc, moTa) => {
  const spinner = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  for (let i = 0; i < 10; i++) {
    process.stdout.write(
      `\r${colors.yellow}${spinner[i % spinner.length]} [${buoc}] ${moTa}...${colors.reset}`
    );
    await delay(60);
  }
  console.log(`\r${colors.green}✔ [${buoc}] ${moTa} - Hoàn tất!          ${colors.reset}`);
};

const inKhungNoiDung = async (tieuDe, noiDung, highlightDongCuoi = false) => {
  console.log(`${colors.cyan}${colors.bold}┌─── ${tieuDe} ───────────────────────────────┐${colors.reset}`);
  const cacDong = noiDung.trim().split("\n");
  for (let i = 0; i < cacDong.length; i++) {
    await delay(180);
    const laDongMoi = highlightDongCuoi && i === cacDong.length - 1;
    if (laDongMoi) {
      console.log(`${colors.cyan}│${colors.reset} ${colors.green}${colors.bold}+ ${cacDong[i]}  (← Vừa thêm mới)${colors.reset}`);
    } else {
      console.log(`${colors.cyan}│${colors.reset}   ${cacDong[i]}`);
    }
  }
  console.log(`${colors.cyan}${colors.bold}└─────────────────────────────────────────────────────────┘${colors.reset}\n`);
};

// Tạo giao diện web so sánh dữ liệu trước và sau appendFile()
const taoGiaoDienWeb = (noiDung1, noiDung2) => `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bài 3 - Thao tác File System (fs)</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
    body {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(-45deg, #064e3b, #0f172a, #1e1b4b, #0f172a);
      background-size: 400% 400%;
      animation: bgMove 10s ease infinite;
      color: #fff;
      padding: 20px;
    }
    @keyframes bgMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .container {
      width: 100%;
      max-width: 760px;
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 20px;
      padding: 32px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.45);
      animation: fadeUp 0.6s ease;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(25px); }
      to { opacity: 1; transform: translateY(0); }
    }
    h1 {
      font-size: 24px;
      margin-bottom: 8px;
      background: linear-gradient(90deg, #34d399, #38bdf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .sub { color: #94a3b8; font-size: 14px; margin-bottom: 24px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 18px;
    }
    .box {
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      padding: 20px;
      transition: transform 0.3s ease;
    }
    .box:hover { transform: translateY(-4px); }
    .box.updated { border-color: rgba(52, 211, 153, 0.5); }
    .tag {
      display: inline-block;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 999px;
      margin-bottom: 12px;
    }
    .tag.before { background: rgba(56, 189, 248, 0.2); color: #38bdf8; }
    .tag.after { background: rgba(52, 211, 153, 0.2); color: #34d399; }
    pre {
      font-family: Consolas, monospace;
      font-size: 14px;
      line-height: 1.7;
      white-space: pre-wrap;
      color: #e2e8f0;
    }
    .new-line {
      color: #34d399;
      font-weight: bold;
      background: rgba(52, 211, 153, 0.12);
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      animation: pulseText 2s infinite;
    }
    @keyframes pulseText {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📁 Thao Tác File System (Module fs) — thongtin.txt</h1>
    <p class="sub">Minh họa kết quả trước và sau khi ghi nối tên lớp bằng <code>fs.appendFile()</code></p>

    <div class="grid">
      <div class="box">
        <span class="tag before">Bước 1 & 2: Tạo & Đọc lần 1</span>
        <pre>${noiDung1.trim()}</pre>
      </div>

      <div class="box updated">
        <span class="tag after">Bước 3 & 4: Sau appendFile()</span>
        <pre>${noiDung2
          .trim()
          .split("\n")
          .map((line, idx, arr) =>
            idx === arr.length - 1 ? `<span class="new-line">+ ${line} (Mới thêm)</span>` : line
          )
          .join("\n")}</pre>
      </div>
    </div>
  </div>
</body>
</html>
`;

const chayBai03 = async () => {
  try {
    console.log(`\n${colors.magenta}${colors.bold}===========================================================${colors.reset}`);
    console.log(`${colors.magenta}${colors.bold}   BÀI 3: THAO TÁC TẬP TIN VỚI MODULE FS TRONG NODE.JS     ${colors.reset}`);
    console.log(`${colors.magenta}${colors.bold}===========================================================${colors.reset}\n`);

    // 1. Tạo tập tin thongtin.txt chứa họ tên và mã sinh viên
    await hienThiTienTrinh("Bước 1/4", "Đang tạo tập tin thongtin.txt");
    const noiDungBanDau = `Họ và tên: ${thongTin.hoTen}\nMã sinh viên: ${thongTin.maSV}\n`;
    await fs.writeFile(filePath, noiDungBanDau, "utf8");

    // 2. Đọc và hiển thị nội dung tập tin lên Terminal
    await hienThiTienTrinh("Bước 2/4", "Đang đọc nội dung thongtin.txt (lần 1)");
    const noiDungLan1 = await fs.readFile(filePath, "utf8");
    await inKhungNoiDung("Nội dung ban đầu của thongtin.txt", noiDungLan1);

    // 3. Ghi nối thêm tên lớp vào cuối tập tin bằng appendFile()
    await hienThiTienTrinh("Bước 3/4", "Đang ghi nối tên lớp bằng appendFile()");
    await fs.appendFile(filePath, `Tên lớp: ${thongTin.tenLop}\n`, "utf8");

    // 4. Đọc lại tập tin để chứng minh nội dung đã được cập nhật
    await hienThiTienTrinh("Bước 4/4", "Đang đọc lại thongtin.txt sau cập nhật");
    const noiDungLan2 = await fs.readFile(filePath, "utf8");
    await inKhungNoiDung("Nội dung sau khi cập nhật (appendFile)", noiDungLan2, true);

    // Khởi động Web Server để có link chạy trực tiếp trên trình duyệt
    const server = http.createServer(async (req, res) => {
      const noiDungHienTai = await fs.readFile(filePath, "utf8");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(taoGiaoDienWeb(noiDungLan1, noiDungHienTai));
    });

    server.listen(PORT, () => {
      console.log(`${colors.green}${colors.bold}🌐 Link xem giao diện trực quan:${colors.reset} ${colors.cyan}http://localhost:${PORT}${colors.reset}`);
      console.log(`${colors.yellow}(Giữ Ctrl + Click vào link trên để mở trình duyệt, nhấn Ctrl + C để thoát)${colors.reset}\n`);
    });
  } catch (err) {
    console.error("\n❌ Đã xảy ra lỗi:", err.message);
  }
};

chayBai03();