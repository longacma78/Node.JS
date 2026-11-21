// bai07.js
const http = require("http");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { exec } = require("child_process");

const PORT = 3001;

// 3 đường dẫn Local chính của Bài 7
const LOCAL_URLS = [
  `http://localhost:${PORT}`,
  `http://localhost:${PORT}/hello?name=Long`,
  `http://localhost:${PORT}/sum?a=10&b=20`,
];

// Mã màu ANSI hiển thị đẹp trên Terminal
const mau = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  gray: "\x1b[90m",
};

function docSoHopLe(giaTri) {
  if (giaTri === null || giaTri === undefined || String(giaTri).trim() === "") return null;
  const so = Number(giaTri);
  if (Number.isNaN(so) || !Number.isFinite(so)) return null;
  return so;
}

// Hàm xử lý logic bằng đối tượng URL (dùng chung cho cả Terminal và Web Local)
function xuLyRoute(urlString) {
  const reqUrl = new URL(urlString, `http://localhost:${PORT}`);
  const pathname = reqUrl.pathname;
  const params = reqUrl.searchParams;

  // Route /hello?name=...
  if (pathname === "/hello") {
    const name = params.get("name");
    if (!name || name.trim() === "") {
      return {
        status: 400,
        body: "Lỗi: Thiếu tham số 'name' hoặc giá trị không hợp lệ! Ví dụ đúng: /hello?name=Long",
      };
    }
    return { status: 200, body: `Xin chào ${name.trim()}` };
  }

  // Route /sum?a=10&b=20
  if (pathname === "/sum") {
    const aRaw = params.get("a");
    const bRaw = params.get("b");

    if (aRaw === null || bRaw === null || aRaw.trim() === "" || bRaw.trim() === "") {
      return {
        status: 400,
        body: "Lỗi: Thiếu tham số 'a' hoặc 'b'! Ví dụ đúng: /sum?a=10&b=20",
      };
    }

    const a = docSoHopLe(aRaw);
    const b = docSoHopLe(bRaw);
    if (a === null || b === null) {
      return {
        status: 400,
        body: "Lỗi: Giá trị 'a' hoặc 'b' không hợp lệ (phải là số)! Ví dụ đúng: /sum?a=10&b=20",
      };
    }

    const tong = Number((a + b).toFixed(10));
    return { status: 200, body: `Tổng = ${tong}` };
  }

  // Route mở rộng /calc?a=...&b=...&op=add|sub|mul|div
  if (pathname === "/calc") {
    const a = docSoHopLe(params.get("a"));
    const b = docSoHopLe(params.get("b"));
    const op = params.get("op") || "add";

    if (a === null || b === null) {
      return { status: 400, body: "Lỗi: Tham số 'a' và 'b' phải là số hợp lệ!" };
    }

    let ketQua;
    let kyHieu;
    if (op === "add") {
      ketQua = a + b;
      kyHieu = "+";
    } else if (op === "sub") {
      ketQua = a - b;
      kyHieu = "-";
    } else if (op === "mul") {
      ketQua = a * b;
      kyHieu = "×";
    } else if (op === "div") {
      if (b === 0) return { status: 400, body: "Lỗi: Không thể chia cho 0!" };
      ketQua = a / b;
      kyHieu = "÷";
    } else {
      return { status: 400, body: "Lỗi: Phép tính 'op' không hợp lệ (add, sub, mul, div)!" };
    }

    return { status: 200, body: `${a} ${kyHieu} ${b} = ${Number(ketQua.toFixed(6))}` };
  }

  return { status: 404, body: `Lỗi 404: Không tìm thấy đường dẫn '${pathname}'` };
}

let rl = null;

function inLogTerminal(nguon, urlPath, status, ketQua) {
  const mauStatus = status === 200 ? mau.green : mau.red;
  const gio = new Date().toLocaleTimeString("vi-VN");
  if (rl) process.stdout.write("\r\x1b[K");
  console.log(
    `${mau.gray}[${gio}]${mau.reset} ${mau.cyan}[${nguon}]${mau.reset} ${urlPath} -> ${mauStatus}${status}${mau.reset} | ${ketQua}`
  );
  if (rl) rl.prompt(true);
}

// Khởi tạo Web Server tại cổng 3001
const server = http.createServer((req, res) => {
  const baseUrl = `http://${req.headers.host || `localhost:${PORT}`}`;
  const reqUrl = new URL(req.url, baseUrl);
  const pathname = reqUrl.pathname;

  // Local 1: Trang chủ giao diện Web
  if (pathname === "/") {
    const htmlPath = path.join(__dirname, "public", "index.html");
    fs.readFile(htmlPath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`
          <h2>Bài 7 - Web Server Node.js (Cổng ${PORT})</h2>
          <p>3 đường dẫn Local:</p>
          <ul>
            <li><a href="/">Local 1: Trang chủ</a></li>
            <li><a href="/hello?name=Long">Local 2: /hello?name=Long</a></li>
            <li><a href="/sum?a=10&b=20">Local 3: /sum?a=10&b=20</a></li>
          </ul>
        `);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    });
    inLogTerminal("WEB", "/", 200, "Mở Local 1 (Trang chủ giao diện)");
    return;
  }

  // Thông tin server (/info)
  if (pathname === "/info") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(
      JSON.stringify({
        baiTap: "Bài 07 - Module HTTP & Đối tượng URL",
        tacGia: "Nguyễn Thành Long",
        port: PORT,
        nodeVersion: process.version,
        uptimeSeconds: Math.floor(process.uptime()),
        serverTime: new Date().toLocaleString("vi-VN"),
      })
    );
    inLogTerminal("WEB", "/info", 200, "Xem thông tin Server");
    return;
  }

  // Local 2 (/hello), Local 3 (/sum), mở rộng (/calc) & 404
  const ketQua = xuLyRoute(req.url);
  res.writeHead(ketQua.status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(ketQua.body);
  inLogTerminal("WEB", req.url, ketQua.status, ketQua.body);
});

function moLink(url) {
  if (process.platform === "win32") exec(`start "" "${url}"`);
  else if (process.platform === "darwin") exec(`open "${url}"`);
  else exec(`xdg-open "${url}"`);
}

function mo3Local(chiSo) {
  if (chiSo === 1 || chiSo === 2 || chiSo === 3) {
    const url = LOCAL_URLS[chiSo - 1];
    console.log(`${mau.green}Đang mở Local ${chiSo}:${mau.reset} ${url}`);
    moLink(url);
    return;
  }
  console.log(`${mau.green}Đang mở cả 3 đường dẫn Local trên trình duyệt...${mau.reset}`);
  LOCAL_URLS.forEach((url, idx) => {
    setTimeout(() => moLink(url), idx * 350);
  });
}

function hienThiTerminalBanDau() {
  console.log(`${mau.cyan}${mau.bold}============================================================`);
  console.log("      BÀI 07: CHẠY TRÊN TERMINAL & 3 ĐƯỜNG DẪN LOCAL");
  console.log(`============================================================${mau.reset}`);
  console.log(`${mau.green}${mau.bold}✔ 3 Đường dẫn Local (Port ${PORT}):${mau.reset}`);
  console.log(`   [1] Trang chủ Web : ${LOCAL_URLS[0]}`);
  console.log(`   [2] Chào hỏi      : ${LOCAL_URLS[1]}  (hoặc ?name=Minh)`);
  console.log(`   [3] Tính tổng     : ${LOCAL_URLS[2]}`);

  console.log(`\n${mau.yellow}${mau.bold}➜ Kết quả chạy kiểm tra ngay trên Terminal:${mau.reset}`);
  const mauTest = [
    "/hello?name=Long",
    "/hello?name=Minh",
    "/sum?a=10&b=20",
    "/sum?a=10",
    "/sum?a=abc&b=20",
  ];
  for (const urlTest of mauTest) {
    const kq = xuLyRoute(urlTest);
    const mauKQ = kq.status === 200 ? mau.green : mau.red;
    console.log(`   • ${urlTest.padEnd(18)} => ${mauKQ}[${kq.status}] ${kq.body}${mau.reset}`);
  }

  console.log(`\n${mau.cyan}--- LỆNH TƯƠNG TÁC TRÊN TERMINAL ---${mau.reset}`);
  console.log("  hello <tên>       -> Test lời chào (VD: hello Long)");
  console.log("  sum <a> <b>       -> Test tính tổng (VD: sum 10 20)");
  console.log("  calc <a> <b> <op> -> Mở rộng + - * / (VD: calc 25 5 div)");
  console.log("  open              -> Mở CẢ 3 link Local lên trình duyệt");
  console.log("  open 1 | 2 | 3    -> Mở riêng Local 1, 2 hoặc 3");
  console.log("  exit              -> Tắt Server và thoát\n");
}

function batTerminalTuongTac() {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${mau.bold}Long-Terminal> ${mau.reset}`,
  });

  rl.prompt();

  rl.on("line", (line) => {
    const input = line.trim();
    if (!input) {
      rl.prompt();
      return;
    }

    if (input === "exit" || input === "quit") {
      console.log(`${mau.yellow}Đang tắt server... Tạm biệt Long!${mau.reset}`);
      rl.close();
      server.close(() => process.exit(0));
      return;
    }

    const parts = input.split(/\s+/);
    const cmd = parts[0].toLowerCase();

    if (cmd === "open") {
      const so = Number(parts[1]);
      mo3Local(so);
      rl.prompt();
      return;
    }

    if (input.startsWith("/")) {
      const kq = xuLyRoute(input);
      inLogTerminal("CLI", input, kq.status, kq.body);
      return;
    }

    if (cmd === "hello") {
      const ten = parts.slice(1).join(" ");
      const urlPath = ten ? `/hello?name=${encodeURIComponent(ten)}` : "/hello";
      const kq = xuLyRoute(urlPath);
      inLogTerminal("CLI", urlPath, kq.status, kq.body);
    } else if (cmd === "sum") {
      const a = parts[1] ?? "";
      const b = parts[2] ?? "";
      const urlPath = `/sum?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`;
      const kq = xuLyRoute(urlPath);
      inLogTerminal("CLI", urlPath, kq.status, kq.body);
    } else if (cmd === "calc") {
      const a = parts[1] ?? "";
      const b = parts[2] ?? "";
      const op = parts[3] || "add";
      const urlPath = `/calc?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}&op=${op}`;
      const kq = xuLyRoute(urlPath);
      inLogTerminal("CLI", urlPath, kq.status, kq.body);
    } else {
      console.log(`${mau.red}Lệnh không hợp lệ.${mau.reset} Thử: hello Long | sum 10 20 | open | exit`);
      rl.prompt();
    }
  });
}

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`${mau.red}Lỗi: Cổng ${PORT} đang bận! Hãy tắt server cũ (Ctrl + C) rồi chạy lại.${mau.reset}`);
  } else {
    console.log(`${mau.red}Lỗi server:${mau.reset}`, err.message);
  }
  process.exit(1);
});

server.listen(PORT, () => {
  hienThiTerminalBanDau();
  batTerminalTuongTac();
});