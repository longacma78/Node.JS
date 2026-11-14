const http = require('http');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// ================= CẤU HÌNH =================
const URL = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'qlsinhvien';
const COLLECTION_NAME = 'students';
const PORT = 3000;

// ================= MÀU SẮC ANSI =================
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

// ================= HIỆU ỨNG TERMINAL =================
function hieuUngLoading(thongBao, thoiGianMs = 800) {
    return new Promise((resolve) => {
        const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
        let i = 0;
        const timer = setInterval(() => {
            process.stdout.write(`\r${color.cyan}${frames[i]} ${thongBao}${color.reset}`);
            i = (i + 1) % frames.length;
        }, 75);

        setTimeout(() => {
            clearInterval(timer);
            process.stdout.write(`\r${color.green}✔ ${thongBao} - Hoàn tất!${color.reset}               \n`);
            resolve();
        }, thoiGianMs);
    });
}

function inBanner() {
    console.clear();
    console.log(`${color.magenta}${color.bold}`);
    console.log('╔══════════════════════════════════════════════════════════════════╗');
    console.log('║     BÀI 5: TÌM KIẾM, CẬP NHẬT & SẮP XẾP DỮ LIỆU MONGODB         ║');
    console.log('║          Database: qlsinhvien  |  Collection: students           ║');
    console.log('╚══════════════════════════════════════════════════════════════════╝');
    console.log(`${color.reset}`);
}

function layXepLoai(diem) {
    if (diem >= 9.0) return { text: 'Xuất sắc', colorAnsi: color.magenta, css: 'badge-xs' };
    if (diem >= 8.0) return { text: 'Giỏi', colorAnsi: color.green, css: 'badge-gioi' };
    if (diem >= 7.0) return { text: 'Khá', colorAnsi: color.cyan, css: 'badge-kha' };
    if (diem >= 5.0) return { text: 'T.Bình', colorAnsi: color.yellow, css: 'badge-tb' };
    return { text: 'Yếu', colorAnsi: color.red, css: 'badge-yeu' };
}

function inBangSinhVien(danhSach, tieuDe, masvNoiBat = null) {
    console.log(`\n${color.yellow}${color.bold}▶ ${tieuDe}${color.reset}`);
    if (danhSach.length === 0) {
        console.log(`${color.red}   (Không có sinh viên nào thỏa điều kiện)${color.reset}`);
        return;
    }

    console.log(`${color.dim}┌──────────┬────────────────────────┬──────┬───────┬────────────┬─────────────┐${color.reset}`);
    console.log(
        `${color.bold}│ ${'Mã SV'.padEnd(8)} │ ${'Họ và Tên'.padEnd(22)} │ ${'Tuổi'.padEnd(4)} │ ${'Điểm'.padEnd(5)} │ ${'Xếp loại'.padEnd(10)} │ ${'Trạng thái'.padEnd(11)} │${color.reset}`
    );
    console.log(`${color.dim}├──────────┼────────────────────────┼──────┼───────┼────────────┼─────────────┤${color.reset}`);

    danhSach.forEach((sv) => {
        const xl = layXepLoai(sv.diem);
        const isUpdated = masvNoiBat && sv.masv === masvNoiBat;
        const masv = String(sv.masv).padEnd(8);
        const hoten = String(sv.hoten).padEnd(22);
        const tuoi = String(sv.tuoi).padEnd(4);
        const diem = Number(sv.diem).toFixed(1).padEnd(5);
        const xeploai = xl.text.padEnd(10);
        const status = isUpdated
            ? `${color.green}${color.bold}${'★ ĐÃ SỬA'.padEnd(11)}${color.reset}`
            : `${color.dim}${'Bình thường'.padEnd(11)}${color.reset}`;

        console.log(`│ ${masv} │ ${hoten} │ ${tuoi} │ ${diem} │ ${xl.colorAnsi}${xeploai}${color.reset} │ ${status} │`);
    });

    console.log(`${color.dim}└──────────┴────────────────────────┴──────┴───────┴────────────┴─────────────┘${color.reset}`);
}

// ================= GIAO DIỆN WEB HIỆU ỨNG ĐẸP =================
function taoGiaoDienWeb(duLieu) {
    const { dsLocTruoc, dsLocSau, thongTinCapNhat, tatCaSau, fileJsonPath } = duLieu;
    const diemTB = (dsLocSau.reduce((s, sv) => s + sv.diem, 0) / (dsLocSau.length || 1)).toFixed(2);

    const taoDongBang = (ds, highlightMasv = null) =>
        ds
            .map((sv, idx) => {
                const xl = layXepLoai(sv.diem);
                const isUpdated = highlightMasv && sv.masv === highlightMasv;
                const percent = Math.min(100, Math.max(0, sv.diem * 10));
                return `
                <tr class="row-anim ${isUpdated ? 'row-updated' : ''}" style="animation-delay: ${idx * 0.07}s">
                    <td><span class="code-id">${sv.masv}</span></td>
                    <td>
                        <strong>${sv.hoten}</strong>
                        ${isUpdated ? '<span class="tag-new">✨ Vừa cập nhật</span>' : ''}
                    </td>
                    <td>${sv.tuoi}</td>
                    <td>
                        <div class="score-wrap">
                            <span class="score-num">${Number(sv.diem).toFixed(1)}</span>
                            <div class="bar-bg"><div class="bar-fill" style="width: ${percent}%"></div></div>
                        </div>
                    </td>
                    <td><span class="badge ${xl.css}">${xl.text}</span></td>
                </tr>`;
            })
            .join('');

    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài 5 - Tìm kiếm, Cập nhật & Sắp xếp MongoDB</title>
    <style>
        * { box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body {
            margin: 0; padding: 30px 16px; color: #f8fafc; min-height: 100vh;
            background: linear-gradient(-45deg, #0f172a, #1e1b4b, #0f172a, #042f2e);
            background-size: 400% 400%;
            animation: gradientBG 12s ease infinite;
        }
        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .container { max-width: 1000px; margin: auto; }
        .header {
            text-align: center; padding: 28px; border-radius: 18px;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.85), rgba(6, 182, 212, 0.85));
            backdrop-filter: blur(10px);
            box-shadow: 0 12px 35px rgba(139, 92, 246, 0.35);
            margin-bottom: 24px; animation: fadeInDown 0.6s ease;
        }
        .header h1 { margin: 0 0 8px; font-size: 26px; letter-spacing: 0.4px; }
        .header p { margin: 0; opacity: 0.92; font-size: 14px; }

        .cards {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 16px; margin-bottom: 24px;
        }
        .card {
            background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(12px);
            border: 1px solid rgba(148, 163, 184, 0.2);
            padding: 18px; border-radius: 14px; text-align: center;
            transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .card:hover {
            transform: translateY(-5px); border-color: #38bdf8;
            box-shadow: 0 10px 25px rgba(56, 189, 248, 0.2);
        }
        .card .label { font-size: 13px; color: #94a3b8; }
        .card .num { font-size: 28px; font-weight: 700; color: #38bdf8; margin-top: 6px; }

        .update-banner {
            display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.16), rgba(6, 182, 212, 0.14));
            border: 1px solid rgba(52, 211, 153, 0.45);
            border-radius: 14px; padding: 18px 22px; margin-bottom: 24px;
            animation: pulseGlow 2.8s infinite;
        }
        @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 12px rgba(16, 185, 129, 0.18); }
            50% { box-shadow: 0 0 24px rgba(16, 185, 129, 0.38); }
        }
        .diff-pill {
            display: inline-flex; align-items: center; gap: 10px;
            background: rgba(15, 23, 42, 0.85); padding: 8px 16px; border-radius: 999px;
            font-weight: 700; font-size: 16px;
        }
        .old-score { color: #f87171; text-decoration: line-through; }
        .new-score { color: #34d399; font-size: 20px; }

        .box {
            background: rgba(15, 23, 42, 0.78); backdrop-filter: blur(14px);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 16px; padding: 22px; margin-bottom: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .box-header {
            display: flex; justify-content: space-between; align-items: center;
            flex-wrap: wrap; gap: 12px; margin-bottom: 16px;
        }
        .box h2 { margin: 0; font-size: 18px; color: #38bdf8; }
        .controls { display: flex; gap: 8px; flex-wrap: wrap; }
        input.search {
            padding: 8px 14px; border-radius: 10px; border: 1px solid #475569;
            background: #020617; color: #fff; outline: none; width: 230px;
        }
        input.search:focus { border-color: #a78bfa; }
        .btn-tab {
            padding: 8px 14px; border-radius: 10px; border: 1px solid #475569;
            background: #1e293b; color: #cbd5e1; cursor: pointer; font-weight: 600; transition: 0.2s;
        }
        .btn-tab.active, .btn-tab:hover { background: #3b82f6; color: #fff; border-color: #3b82f6; }

        table { width: 100%; border-collapse: collapse; overflow: hidden; border-radius: 12px; }
        th, td { padding: 13px 14px; text-align: left; border-bottom: 1px solid rgba(51, 65, 85, 0.7); }
        th { background: rgba(2, 6, 23, 0.85); color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.6px; }
        tr:hover td { background: rgba(56, 189, 248, 0.08); }
        .row-updated td { background: rgba(16, 185, 129, 0.12); }

        .code-id { background: #1e293b; color: #38bdf8; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-size: 13px; }
        .tag-new {
            margin-left: 8px; font-size: 11px; padding: 2px 8px; border-radius: 999px;
            background: rgba(16, 185, 129, 0.22); color: #6ee7b7; border: 1px solid rgba(52, 211, 153, 0.4);
        }
        .score-wrap { display: flex; align-items: center; gap: 10px; min-width: 130px; }
        .score-num { font-weight: 700; width: 32px; }
        .bar-bg { flex: 1; height: 8px; background: #1e293b; border-radius: 999px; overflow: hidden; }
        .bar-fill {
            height: 100%; border-radius: 999px;
            background: linear-gradient(90deg, #06b6d4, #8b5cf6);
            transition: width 1s ease;
        }

        .badge { padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .badge-xs { background: rgba(217, 70, 239, 0.22); color: #f0abfc; }
        .badge-gioi { background: rgba(34, 197, 94, 0.22); color: #86efac; }
        .badge-kha { background: rgba(6, 182, 212, 0.22); color: #67e8f9; }
        .badge-tb { background: rgba(234, 179, 8, 0.22); color: #fde047; }
        .badge-yeu { background: rgba(239, 68, 68, 0.22); color: #fca5a5; }

        .path-box { font-size: 13px; color: #cbd5e1; line-height: 1.9; }
        .path-box code { background: #020617; padding: 3px 8px; border-radius: 6px; color: #38bdf8; }
        .hidden { display: none; }

        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInRow { from { opacity: 0; transform: translateX(-14px); } to { opacity: 1; transform: translateX(0); } }
        .row-anim { animation: fadeInRow 0.45s ease forwards; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔎 BÀI 5: TÌM KIẾM, CẬP NHẬT & SẮP XẾP MONGODB</h1>
            <p>Truy vấn <code>$gte: 7</code> • Sắp xếp <code>sort({ diem: -1 })</code> • Cập nhật <code>updateOne()</code> & <code>$set</code></p>
        </div>

        <div class="cards">
            <div class="card"><div class="label">Tổng SV trong DB</div><div class="num count-up" data-target="${tatCaSau.length}">0</div></div>
            <div class="card"><div class="label">SV đạt điểm &ge; 7 (Trước sửa)</div><div class="num count-up" data-target="${dsLocTruoc.length}">0</div></div>
            <div class="card"><div class="label">SV đạt điểm &ge; 7 (Sau sửa)</div><div class="num count-up" data-target="${dsLocSau.length}">0</div></div>
            <div class="card"><div class="label">Điểm TB nhóm &ge; 7</div><div class="num count-up" data-target="${diemTB}" data-float="true">0</div></div>
        </div>

        <div class="update-banner">
            <div>
                <div style="font-size: 13px; color: #6ee7b7; font-weight: 700;">✔ KẾT QUẢ CẬP NHẬT BẰNG updateOne() &amp; $set</div>
                <div style="font-size: 17px; margin-top: 4px;">
                    Sinh viên: <strong>${thongTinCapNhat.hoten}</strong> (<code>${thongTinCapNhat.masv}</code>)
                    <span style="font-size:13px; color:#94a3b8;">| matched: ${thongTinCapNhat.matchedCount}, modified: ${thongTinCapNhat.modifiedCount}</span>
                </div>
            </div>
            <div class="diff-pill">
                <span class="old-score">${Number(thongTinCapNhat.diemCu).toFixed(1)}</span>
                <span>➔</span>
                <span class="new-score">${Number(thongTinCapNhat.diemMoi).toFixed(1)} điểm</span>
            </div>
        </div>

        <div class="box">
            <div class="box-header">
                <h2>🏆 Danh sách điểm &ge; 7 sau cập nhật (Sắp xếp giảm dần)</h2>
                <div class="controls">
                    <button class="btn-tab active" onclick="chuyenTab('sau', this)">Sau cập nhật (${dsLocSau.length})</button>
                    <button class="btn-tab" onclick="chuyenTab('truoc', this)">Trước cập nhật (${dsLocTruoc.length})</button>
                    <button class="btn-tab" onclick="chuyenTab('tatca', this)">Toàn bộ DB (${tatCaSau.length})</button>
                    <input type="text" class="search" id="searchInput" placeholder="🔍 Tìm mã SV hoặc tên...">
                </div>
            </div>

            <table id="table-sau">
                <thead><tr><th>Mã SV</th><th>Họ và Tên</th><th>Tuổi</th><th>Điểm (Thanh tiến độ)</th><th>Xếp loại</th></tr></thead>
                <tbody>${taoDongBang(dsLocSau, thongTinCapNhat.masv)}</tbody>
            </table>

            <table id="table-truoc" class="hidden">
                <thead><tr><th>Mã SV</th><th>Họ và Tên</th><th>Tuổi</th><th>Điểm (Thanh tiến độ)</th><th>Xếp loại</th></tr></thead>
                <tbody>${taoDongBang(dsLocTruoc)}</tbody>
            </table>

            <table id="table-tatca" class="hidden">
                <thead><tr><th>Mã SV</th><th>Họ và Tên</th><th>Tuổi</th><th>Điểm (Thanh tiến độ)</th><th>Xếp loại</th></tr></thead>
                <tbody>${taoDongBang(tatCaSau, thongTinCapNhat.masv)}</tbody>
            </table>
        </div>

        <div class="box path-box">
            <strong>📂 Thông tin đường dẫn:</strong><br>
            • File mã nguồn: <code>${__filename}</code><br>
            • File JSON kết quả: <code>${fileJsonPath}</code><br>
            • MongoDB: <code>${URL}/${DB_NAME}.${COLLECTION_NAME}</code> (Đã đóng kết nối an toàn)
        </div>
    </div>

    <script>
        function chuyenTab(tenTab, btn) {
            document.querySelectorAll('.btn-tab').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            document.getElementById('table-sau').classList.add('hidden');
            document.getElementById('table-truoc').classList.add('hidden');
            document.getElementById('table-tatca').classList.add('hidden');
            document.getElementById('table-' + tenTab).classList.remove('hidden');
        }

        document.getElementById('searchInput').addEventListener('input', function () {
            var kw = this.value.toLowerCase();
            document.querySelectorAll('tbody tr').forEach(function (row) {
                row.style.display = row.innerText.toLowerCase().indexOf(kw) !== -1 ? '' : 'none';
            });
        });

        document.querySelectorAll('.count-up').forEach(function (el) {
            var target = parseFloat(el.getAttribute('data-target'));
            var isFloat = el.getAttribute('data-float') === 'true';
            var current = 0;
            var step = target / 25;
            var timer = setInterval(function () {
                current += step;
                if (current >= target) {
                    el.textContent = isFloat ? target.toFixed(2) : Math.round(target);
                    clearInterval(timer);
                } else {
                    el.textContent = isFloat ? current.toFixed(2) : Math.round(current);
                }
            }, 25);
        });
    </script>
</body>
</html>`;
}

// ================= WEB SERVER TỰ ĐỔI PORT NẾU TRÙNG =================
function khoiDongWebServer(duLieu, port) {
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(taoGiaoDienWeb(duLieu));
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            khoiDongWebServer(duLieu, port + 1);
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
    let duLieuWeb = null;

    try {
        // 1. Kết nối MongoDB
        await hieuUngLoading('Đang kết nối MongoDB (qlsinhvien.students)...', 700);
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // Nếu collection chưa có dữ liệu từ Bài 4 thì tự động khởi tạo để không bị trống
        const soLuongHienTai = await collection.countDocuments();
        if (soLuongHienTai === 0) {
            console.log(`${color.yellow}ℹ Collection đang trống, tự động thêm dữ liệu mẫu của Bài 4...${color.reset}`);
            await collection.insertMany([
                { masv: 'SV001', hoten: 'Nguyễn Thành Long', tuoi: 20, diem: 9.2 },
                { masv: 'SV002', hoten: 'Trần Minh Anh', tuoi: 21, diem: 8.5 },
                { masv: 'SV003', hoten: 'Lê Hoàng Nam', tuoi: 20, diem: 7.4 },
                { masv: 'SV004', hoten: 'Phạm Thảo Vy', tuoi: 22, diem: 6.0 },
                { masv: 'SV005', hoten: 'Hoàng Quốc Bảo', tuoi: 19, diem: 8.8 },
            ]);
        }

        // 2. Tìm sinh viên có diem >= 7 bằng find() + $gte và sắp xếp giảm dần bằng sort()
        await hieuUngLoading('Đang lọc sinh viên diem >= 7 ($gte) và sắp xếp giảm dần...', 700);
        const dsLocTruoc = await collection
            .find({ diem: { $gte: 7 } })
            .sort({ diem: -1 })
            .toArray();

        inBangSinhVien(dsLocTruoc, 'DANH SÁCH SINH VIÊN CÓ ĐIỂM >= 7 (TRƯỚC CẬP NHẬT)');

        // 3. Chọn 1 sinh viên theo masv để cập nhật điểm bằng updateOne() và $set
        let svMucTieu = await collection.findOne({ masv: 'SV004' });
        if (!svMucTieu) {
            // Nếu không có SV004 thì lấy sinh viên điểm thấp nhất hiện tại trong collection
            svMucTieu = await collection.find().sort({ diem: 1 }).limit(1).next();
        }

        const diemCu = svMucTieu.diem;
        // Đảm bảo điểm mới khác điểm cũ để thấy rõ kết quả cập nhật dù chạy nhiều lần
        const diemMoi = diemCu < 8.6 ? 8.6 : 9.1;

        await hieuUngLoading(`Đang cập nhật điểm cho ${svMucTieu.masv} bằng updateOne() & $set...`, 800);
        const ketQuaUpdate = await collection.updateOne(
            { masv: svMucTieu.masv },
            { $set: { diem: diemMoi } }
        );

        console.log(
            `${color.green}   → Cập nhật thành công! ${svMucTieu.masv} (${svMucTieu.hoten}): ` +
            `${color.red}${diemCu}${color.reset} ➔ ${color.green}${color.bold}${diemMoi}${color.reset} ` +
            `${color.dim}(matched: ${ketQuaUpdate.matchedCount}, modified: ${ketQuaUpdate.modifiedCount})${color.reset}`
        );

        // 4. Hiển thị lại thông tin sau cập nhật để kiểm tra kết quả
        await hieuUngLoading('Đang truy vấn kiểm tra lại dữ liệu sau cập nhật...', 600);
        const svSauCapNhat = await collection.findOne({ masv: svMucTieu.masv });
        const dsLocSau = await collection
            .find({ diem: { $gte: 7 } })
            .sort({ diem: -1 })
            .toArray();
        const tatCaSau = await collection.find({}).sort({ diem: -1 }).toArray();

        console.log(`\n${color.cyan}${color.bold}🔎 KIỂM TRA SINH VIÊN SAU CẬP NHẬT (findOne):${color.reset}`);
        console.log(
            `   • Mã SV: ${color.bold}${svSauCapNhat.masv}${color.reset} | ` +
            `Họ tên: ${color.bold}${svSauCapNhat.hoten}${color.reset} | ` +
            `Tuổi: ${svSauCapNhat.tuoi} | ` +
            `Điểm mới: ${color.green}${color.bold}${svSauCapNhat.diem}${color.reset}`
        );

        inBangSinhVien(dsLocSau, 'DANH SÁCH ĐIỂM >= 7 SAU CẬP NHẬT (SẮP XẾP GIẢM DẦN)', svMucTieu.masv);

        // Lưu kết quả ra file JSON
        const fileJsonPath = path.join(__dirname, 'ketqua_bai05.json');
        fs.writeFileSync(
            fileJsonPath,
            JSON.stringify(
                {
                    capNhat: { masv: svMucTieu.masv, hoten: svMucTieu.hoten, diemCu, diemMoi },
                    danhSachDiemLonHonBang7: dsLocSau,
                },
                null,
                2
            ),
            'utf8'
        );

        duLieuWeb = {
            dsLocTruoc,
            dsLocSau,
            tatCaSau,
            fileJsonPath,
            thongTinCapNhat: {
                masv: svMucTieu.masv,
                hoten: svMucTieu.hoten,
                diemCu,
                diemMoi,
                matchedCount: ketQuaUpdate.matchedCount,
                modifiedCount: ketQuaUpdate.modifiedCount,
            },
        };
    } catch (err) {
        console.error(`\n${color.red}${color.bold}✖ LỖI:${color.reset} ${err.message}`);
        console.error(`${color.yellow}💡 Hãy kiểm tra MongoDB Server trên máy đã được bật chưa.${color.reset}`);
    } finally {
        await client.close();
        console.log(`\n${color.cyan}🔌 Đã đóng kết nối MongoDB an toàn.${color.reset}`);
    }

    if (duLieuWeb) {
        console.log(`\n${color.blue}${color.bold}📂 ĐƯỜNG DẪN FILE:${color.reset}`);
        console.log(`   • Mã nguồn : ${color.dim}${__filename}${color.reset}`);
        console.log(`   • Kết quả  : ${color.dim}${duLieuWeb.fileJsonPath}${color.reset}\n`);
        khoiDongWebServer(duLieuWeb, PORT);
    }
}

main();