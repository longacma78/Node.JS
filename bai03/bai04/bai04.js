const http = require('http');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// ================= CẤU HÌNH =================
const URL = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'qlsinhvien';
const COLLECTION_NAME = 'students';
const PORT = 3000;

// ================= BẢNG MÀU ANSI =================
const color = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

// ================= HÀM HIỆU ỨNG TERMINAL =================
function hieuUngLoading(thongBao, thoiGianMs = 800) {
    return new Promise((resolve) => {
        const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
        let i = 0;
        const timer = setInterval(() => {
            process.stdout.write(`\r${color.cyan}${frames[i]} ${thongBao}${color.reset}`);
            i = (i + 1) % frames.length;
        }, 80);

        setTimeout(() => {
            clearInterval(timer);
            process.stdout.write(`\r${color.green}✔ ${thongBao} - Hoàn tất!${color.reset}          \n`);
            resolve();
        }, thoiGianMs);
    });
}

function inBanner() {
    console.clear();
    console.log(`${color.cyan}${color.bold}`);
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║       HỆ THỐNG QUẢN LÝ SINH VIÊN - MONGODB & NODE.JS        ║');
    console.log('║          Bài 4: Thêm và hiển thị dữ liệu MongoDB            ║');
    console.log('╚══════════════════════════════════════════════════════════════╝');
    console.log(`${color.reset}`);
}

// ================= HÀM XỬ LÝ NGHIỆP VỤ =================
function layXepLoai(diem) {
    if (diem >= 9.0) return { text: 'Xuất sắc', colorAnsi: color.magenta, cssClass: 'badge-xs' };
    if (diem >= 8.0) return { text: 'Giỏi', colorAnsi: color.green, cssClass: 'badge-gioi' };
    if (diem >= 6.5) return { text: 'Khá', colorAnsi: color.cyan, cssClass: 'badge-kha' };
    if (diem >= 5.0) return { text: 'T.Bình', colorAnsi: color.yellow, cssClass: 'badge-tb' };
    return { text: 'Yếu', colorAnsi: color.red, cssClass: 'badge-yeu' };
}

function inBangSinhVien(danhSach, tieuDe) {
    console.log(`\n${color.yellow}${color.bold}▶ ${tieuDe}${color.reset}`);
    console.log(`${color.dim}┌──────────┬────────────────────────┬──────┬───────┬────────────┐${color.reset}`);
    console.log(
        `${color.bold}│ ${'Mã SV'.padEnd(8)} │ ${'Họ và Tên'.padEnd(22)} │ ${'Tuổi'.padEnd(4)} │ ${'Điểm'.padEnd(5)} │ ${'Xếp loại'.padEnd(10)} │${color.reset}`
    );
    console.log(`${color.dim}├──────────┼────────────────────────┼──────┼───────┼────────────┤${color.reset}`);

    danhSach.forEach((sv) => {
        const xl = layXepLoai(sv.diem);
        const masv = String(sv.masv).padEnd(8);
        const hoten = String(sv.hoten).padEnd(22);
        const tuoi = String(sv.tuoi).padEnd(4);
        const diem = Number(sv.diem).toFixed(1).padEnd(5);
        const xeploai = xl.text.padEnd(10);

        console.log(`│ ${masv} │ ${hoten} │ ${tuoi} │ ${diem} │ ${xl.colorAnsi}${xeploai}${color.reset} │`);
    });

    console.log(`${color.dim}└──────────┴────────────────────────┴──────┴───────┴────────────┘${color.reset}`);
}

function tinhThongKe(danhSach) {
    const tongDiem = danhSach.reduce((sum, sv) => sum + sv.diem, 0);
    const diemTB = (tongDiem / danhSach.length).toFixed(2);
    const thuKhoa = danhSach.reduce((max, sv) => (sv.diem > max.diem ? sv : max), danhSach[0]);
    const soSVGioi = danhSach.filter((sv) => sv.diem >= 8.0).length;

    return { tongSV: danhSach.length, diemTB, thuKhoa, soSVGioi };
}

// ================= TẠO GIAO DIỆN WEB TRỰC QUAN =================
function taoGiaoDienWeb(tatCaSV, svGioi, thongKe, fileJsonPath) {
    const taoDongBang = (ds) =>
        ds
            .map((sv, idx) => {
                const xl = layXepLoai(sv.diem);
                return `
                <tr class="row-anim" style="animation-delay: ${idx * 0.08}s">
                    <td><strong>${sv.masv}</strong></td>
                    <td>${sv.hoten}</td>
                    <td>${sv.tuoi}</td>
                    <td><strong>${Number(sv.diem).toFixed(1)}</strong></td>
                    <td><span class="badge ${xl.cssClass}">${xl.text}</span></td>
                </tr>`;
            })
            .join('');

    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài 4 - Quản lý Sinh viên MongoDB</title>
    <style>
        * { box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body {
            margin: 0; padding: 30px 15px;
            background: linear-gradient(135deg, #0f172a, #1e293b);
            color: #f8fafc; min-height: 100vh;
        }
        .container { max-width: 960px; margin: auto; }
        .header {
            text-align: center; padding: 28px; border-radius: 16px;
            background: linear-gradient(135deg, #06b6d4, #3b82f6);
            box-shadow: 0 10px 30px rgba(6, 182, 212, 0.3);
            margin-bottom: 24px; animation: fadeInDown 0.6s ease;
        }
        .header h1 { margin: 0 0 8px; font-size: 26px; }
        .header p { margin: 0; opacity: 0.9; font-size: 14px; }
        .cards {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px; margin-bottom: 24px;
        }
        .card {
            background: rgba(30, 41, 59, 0.9); border: 1px solid #334155;
            padding: 18px; border-radius: 12px; text-align: center;
            transition: transform 0.25s, border-color 0.25s;
        }
        .card:hover { transform: translateY(-4px); border-color: #38bdf8; }
        .card .num { font-size: 26px; font-weight: bold; color: #38bdf8; margin-top: 6px; }
        .card .label { font-size: 13px; color: #94a3b8; }
        .box {
            background: rgba(30, 41, 59, 0.95); border: 1px solid #334155;
            border-radius: 14px; padding: 22px; margin-bottom: 24px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.25);
        }
        .box-header {
            display: flex; justify-content: space-between; align-items: center;
            flex-wrap: wrap; gap: 10px; margin-bottom: 14px;
        }
        .box h2 { margin: 0; font-size: 18px; color: #38bdf8; }
        input.search {
            padding: 8px 14px; border-radius: 8px; border: 1px solid #475569;
            background: #0f172a; color: #fff; outline: none; width: 240px;
        }
        input.search:focus { border-color: #38bdf8; }
        table { width: 100%; border-collapse: collapse; overflow: hidden; border-radius: 10px; }
        th, td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #334155; }
        th { background: #0f172a; color: #94a3b8; font-size: 13px; text-transform: uppercase; }
        tr:hover td { background: rgba(56, 189, 248, 0.08); }
        .badge { padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .badge-xs { background: rgba(217, 70, 239, 0.2); color: #f0abfc; }
        .badge-gioi { background: rgba(34, 197, 94, 0.2); color: #86efac; }
        .badge-kha { background: rgba(6, 182, 212, 0.2); color: #67e8f9; }
        .badge-tb { background: rgba(234, 179, 8, 0.2); color: #fde047; }
        .badge-yeu { background: rgba(239, 68, 68, 0.2); color: #fca5a5; }
        .path-box { font-size: 13px; color: #cbd5e1; line-height: 1.8; }
        .path-box code { background: #0f172a; padding: 3px 8px; border-radius: 6px; color: #38bdf8; }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInRow { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
        .row-anim { animation: fadeInRow 0.4s ease forwards; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 QUẢN LÝ SINH VIÊN MONGODB</h1>
            <p>Database: <strong>${DB_NAME}</strong> | Collection: <strong>${COLLECTION_NAME}</strong></p>
        </div>

        <div class="cards">
            <div class="card"><div class="label">Tổng sinh viên</div><div class="num">${thongKe.tongSV}</div></div>
            <div class="card"><div class="label">Điểm trung bình</div><div class="num">${thongKe.diemTB}</div></div>
            <div class="card"><div class="label">Sinh viên Giỏi/XS</div><div class="num">${thongKe.soSVGioi}</div></div>
            <div class="card"><div class="label">Thủ khoa (${thongKe.thuKhoa.masv})</div><div class="num">${thongKe.thuKhoa.diem} đ</div></div>
        </div>

        <div class="box">
            <div class="box-header">
                <h2>📋 Danh sách sinh viên (find())</h2>
                <input type="text" class="search" id="searchInput" placeholder="🔍 Tìm mã SV hoặc họ tên...">
            </div>
            <table id="svTable">
                <thead>
                    <tr><th>Mã SV</th><th>Họ và Tên</th><th>Tuổi</th><th>Điểm</th><th>Xếp loại</th></tr>
                </thead>
                <tbody>${taoDongBang(tatCaSV)}</tbody>
            </table>
        </div>

        <div class="box">
            <div class="box-header">
                <h2>🏆 Top Sinh viên Giỏi / Xuất sắc (Điểm &ge; 8.0)</h2>
            </div>
            <table>
                <thead>
                    <tr><th>Mã SV</th><th>Họ và Tên</th><th>Tuổi</th><th>Điểm</th><th>Xếp loại</th></tr>
                </thead>
                <tbody>${taoDongBang(svGioi)}</tbody>
            </table>
        </div>

        <div class="box path-box">
            <strong>📂 Thông tin đường dẫn hệ thống:</strong><br>
            • File thực thi: <code>${__filename}</code><br>
            • File JSON sao lưu: <code>${fileJsonPath}</code><br>
            • Kết nối MongoDB: <code>${URL}/${DB_NAME}</code> (Đã đóng kết nối an toàn sau khi truy vấn)
        </div>
    </div>

    <script>
        document.getElementById('searchInput').addEventListener('input', function () {
            const keyword = this.value.toLowerCase();
            document.querySelectorAll('#svTable tbody tr').forEach(row => {
                row.style.display = row.innerText.toLowerCase().includes(keyword) ? '' : 'none';
            });
        });
    </script>
</body>
</html>`;
}

// ================= KHỞI ĐỘNG WEB SERVER IN RA LINK =================
function khoiDongWebServer(tatCaSV, svGioi, thongKe, fileJsonPath, port) {
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(taoGiaoDienWeb(tatCaSV, svGioi, thongKe, fileJsonPath));
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            khoiDongWebServer(tatCaSV, svGioi, thongKe, fileJsonPath, port + 1);
        } else {
            console.error(`${color.red}Lỗi Web Server:${color.reset}`, err.message);
        }
    });

    server.listen(port, () => {
        console.log(`${color.green}${color.bold}🌐 Link xem giao diện trực quan: http://localhost:${port}${color.reset}`);
        console.log(`${color.yellow}   (Giữ Ctrl + Click vào link trên để mở trình duyệt | Nhấn Ctrl + C để thoát)${color.reset}\n`);
    });
}

// ================= CHƯƠNG TRÌNH CHÍNH =================
async function main() {
    inBanner();
    const client = new MongoClient(URL);
    let tatCaSinhVien = [];
    let sinhVienGioi = [];
    let daKetNoiThanhCong = false;

    try {
        // 1. Kết nối MongoDB
        await hieuUngLoading('Đang kết nối tới MongoDB local (127.0.0.1:27017)...', 700);
        await client.connect();

        // 2. Chọn DB & Collection
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // 3. Thêm ít nhất 3 sinh viên bằng insertMany()
        const danhSachMau = [
            { masv: 'SV001', hoten: 'Nguyễn Thành Long', tuoi: 20, diem: 9.2 },
            { masv: 'SV002', hoten: 'Trần Minh Anh', tuoi: 21, diem: 8.5 },
            { masv: 'SV003', hoten: 'Lê Hoàng Nam', tuoi: 20, diem: 7.4 },
            { masv: 'SV004', hoten: 'Phạm Thảo Vy', tuoi: 22, diem: 6.0 },
            { masv: 'SV005', hoten: 'Hoàng Quốc Bảo', tuoi: 19, diem: 8.8 },
        ];

        const dsMaSV = danhSachMau.map((sv) => sv.masv);
        await collection.deleteMany({ masv: { $in: dsMaSV } });

        await hieuUngLoading('Đang thêm sinh viên bằng insertMany()...', 800);
        const ketQuaThem = await collection.insertMany(danhSachMau);
        console.log(`${color.green}   → Đã thêm ${color.bold}${ketQuaThem.insertedCount}${color.reset}${color.green} sinh viên vào MongoDB!${color.reset}`);

        // 4. Sử dụng find() hiển thị danh sách sinh viên
        await hieuUngLoading('Đang đọc dữ liệu bằng find()...', 600);
        tatCaSinhVien = await collection.find({}).toArray();
        sinhVienGioi = await collection.find({ diem: { $gte: 8.0 } }).sort({ diem: -1 }).toArray();

        inBangSinhVien(tatCaSinhVien, 'DANH SÁCH SINH VIÊN (find())');
        daKetNoiThanhCong = true;
    } catch (err) {
        console.error(`\n${color.red}${color.bold}✖ LỖI KẾT NỐI MONGODB:${color.reset} ${err.message}`);
        console.error(`${color.yellow}💡 Hãy bật MongoDB Server trên máy rồi chạy lại lệnh: node bai04.js${color.reset}`);
    } finally {
        // Đóng kết nối MongoDB sau khi hoàn thành
        await client.close();
        console.log(`\n${color.cyan}🔌 Đã đóng kết nối MongoDB an toàn.${color.reset}`);
    }

    // 5. Xuất đường dẫn file & Mở link Web Server nếu lấy dữ liệu thành công
    if (daKetNoiThanhCong) {
        const fileJsonPath = path.join(__dirname, 'danh_sach_sinhvien.json');
        fs.writeFileSync(fileJsonPath, JSON.stringify(tatCaSinhVien, null, 2), 'utf8');

        console.log(`\n${color.blue}${color.bold}📂 ĐƯỜNG DẪN FILE & THƯ MỤC:${color.reset}`);
        console.log(`   • Thư mục chạy : ${color.dim}${__dirname}${color.reset}`);
        console.log(`   • File mã nguồn: ${color.dim}${__filename}${color.reset}`);
        console.log(`   • File dữ liệu : ${color.dim}${fileJsonPath}${color.reset}\n`);

        const thongKe = tinhThongKe(tatCaSinhVien);
        khoiDongWebServer(tatCaSinhVien, sinhVienGioi, thongKe, fileJsonPath, PORT);
    }
}

main();