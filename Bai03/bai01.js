const http = require("http");

const PORT = 3001;

// Bảng mã màu ANSI cho Terminal
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
  gray: "\x1b[90m",
};

// 1. Sử dụng class và constructor để biểu diễn Sinh viên
class SinhVien {
  constructor(ma, hoTen, tuoi, diem) {
    this.ma = ma;
    this.hoTen = hoTen;
    this.tuoi = tuoi;
    this.diem = diem;
  }

  hienThiTerminal() {
    const mauDiem = this.diem >= 8 ? colors.green : colors.yellow;
    return (
      `${colors.cyan}${this.ma.padEnd(8)}${colors.reset} | ` +
      `${this.hoTen.padEnd(20)} | ` +
      `${String(this.tuoi).padEnd(6)} | ` +
      `${mauDiem}${colors.bold}${this.diem.toFixed(1)}${colors.reset}`
    );
  }
}

// 2. Khai báo danh sách 5 sinh viên
const danhSachSinhVien = [
  new SinhVien("SV001", "Nguyễn Văn An", 20, 8.5),
  new SinhVien("SV002", "Trần Thị Bình", 19, 4.2),
  new SinhVien("SV003", "Lê Hoàng Cường", 21, 6.8),
  new SinhVien("SV004", "Phạm Minh Dung", 20, 3.5),
  new SinhVien("SV005", "Võ Ngọc Em", 22, 9.0),
];

// 3. Sử dụng hàm mũi tên (arrow function) để lọc sinh viên có điểm >= 5
const locSinhVienDat = (ds) => ds.filter((sv) => sv.diem >= 5);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Tạo giao diện HTML có hiệu ứng cho trình duyệt
const taoGiaoDienWeb = (dsTatCa, dsDat) => {
  const rowsHTML = dsDat
    .map(
      (sv, index) => `
      <tr style="animation: slideIn 0.5s ease forwards; animation-delay: ${index * 0.12}s; opacity: 0;">
        <td><span class="code">${sv.ma}</span></td>
        <td><strong>${sv.hoTen}</strong></td>
        <td>${sv.tuoi}</td>
        <td><span class="score ${sv.diem >= 8 ? "high" : "pass"}">${sv.diem.toFixed(1)}</span></td>
        <td><span class="status">✔ Đạt yêu cầu</span></td>
      </tr>
    `
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bài 1 - Quản lý sinh viên ES6</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
      body {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(-45deg, #0f172a, #1e293b, #312e81, #0f172a);
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
      .card {
        width: 100%;
        max-width: 780px;
        background: rgba(255, 255, 255, 0.07);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 20px;
        padding: 32px;
        box-shadow: 0 25px 50px rgba(0,0,0,0.45);
        animation: fadeIn 0.6s ease;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideIn {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      h1 {
        font-size: 24px;
        margin-bottom: 8px;
        background: linear-gradient(90deg, #38bdf8, #a78bfa);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .sub { color: #94a3b8; margin-bottom: 24px; font-size: 14px; }
      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 12px;
        margin-bottom: 24px;
      }
      .stat-box {
        background: rgba(0, 0, 0, 0.25);
        padding: 14px 18px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      .stat-box span { font-size: 12px; color: #94a3b8; display: block; }
      .stat-box strong { font-size: 22px; color: #38bdf8; }
      table { width: 100%; border-collapse: collapse; overflow: hidden; border-radius: 12px; }
      th, td { padding: 14px 16px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.08); }
      th { background: rgba(255,255,255,0.08); color: #cbd5e1; font-size: 13px; text-transform: uppercase; }
      tr:hover td { background: rgba(255,255,255,0.05); }
      .code {
        background: rgba(56, 189, 248, 0.15);
        color: #38bdf8;
        padding: 4px 10px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 13px;
      }
      .score { padding: 4px 10px; border-radius: 6px; font-weight: bold; }
      .score.high { background: rgba(16, 185, 129, 0.2); color: #34d399; }
      .score.pass { background: rgba(250, 204, 21, 0.2); color: #fde047; }
      .status { color: #34d399; font-weight: 600; font-size: 14px; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>🎓 Quản Lý Thông Tin Sinh Viên (JavaScript ES6)</h1>
      <p class="sub">Kết quả lọc danh sách sinh viên có điểm >= 5 bằng Class & Arrow Function</p>

      <div class="stats">
        <div class="stat-box">
          <span>Tổng số sinh viên</span>
          <strong>${dsTatCa.length}</strong>
        </div>
        <div class="stat-box">
          <span>Sinh viên đạt (>= 5)</span>
          <strong style="color: #34d399;">${dsDat.length}</strong>
        </div>
        <div class="stat-box">
          <span>Chưa đạt (< 5)</span>
          <strong style="color: #f87171;">${dsTatCa.length - dsDat.length}</strong>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Mã SV</th>
            <th>Họ và tên</th>
            <th>Tuổi</th>
            <th>Điểm</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHTML}
        </tbody>
      </table>
    </div>
  </body>
  </html>
  `;
};

const chayBai01 = async () => {
  console.log(`\n${colors.magenta}${colors.bold}======================================================${colors.reset}`);
  console.log(`${colors.magenta}${colors.bold}     QUẢN LÝ THÔNG TIN SINH VIÊN - JAVASCRIPT ES6     ${colors.reset}`);
  console.log(`${colors.magenta}${colors.bold}======================================================${colors.reset}\n`);

  const spinner = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  for (let i = 0; i < 12; i++) {
    process.stdout.write(
      `\r${colors.yellow}${spinner[i % spinner.length]} Đang lọc danh sách sinh viên có điểm >= 5...${colors.reset}`
    );
    await delay(70);
  }
  console.log(`\r${colors.green}✔ Lọc dữ liệu thành công!                              ${colors.reset}\n`);

  // Lọc sinh viên đạt yêu cầu
  const danhSachDat = locSinhVienDat(danhSachSinhVien);

  // 4. Hiển thị bằng console.log() trên Terminal
  console.log(`${colors.green}${colors.bold}DANH SÁCH SINH VIÊN ĐẠT YÊU CẦU (ĐIỂM >= 5):${colors.reset}`);
  console.log(`${colors.gray}------------------------------------------------------${colors.reset}`);
  console.log(`${colors.bold}${"Mã SV".padEnd(8)} | ${"Họ và tên".padEnd(20)} | ${"Tuổi".padEnd(6)} | Điểm${colors.reset}`);
  console.log(`${colors.gray}------------------------------------------------------${colors.reset}`);

  for (const sv of danhSachDat) {
    await delay(250);
    console.log(sv.hienThiTerminal());
  }

  console.log(`${colors.gray}------------------------------------------------------${colors.reset}`);
  console.log(`${colors.cyan}Tổng đạt: ${colors.bold}${danhSachDat.length}/${danhSachSinhVien.length}${colors.reset}\n`);

  // Khởi động Web Server để có link chạy trực tiếp trên trình duyệt
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(taoGiaoDienWeb(danhSachSinhVien, danhSachDat));
  });

  server.listen(PORT, () => {
    console.log(`${colors.green}${colors.bold}🌐 Link xem giao diện trực quan:${colors.reset} ${colors.cyan}http://localhost:${PORT}${colors.reset}`);
    console.log(`${colors.yellow}(Giữ Ctrl + Click vào link trên để mở trình duyệt, nhấn Ctrl + C để thoát)${colors.reset}\n`);
  });
};

chayBai01();