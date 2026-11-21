// bai06.js
const {
  tinhDiemTrungBinh,
  xepLoaiHocTap,
  xuLyKetQuaSinhVien,
  thongKeLop,
} = require("./xulyDiem");

// Mã màu ANSI hiển thị đẹp trên Terminal
const mau = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
};

function layMauXepLoai(xepLoai) {
  if (xepLoai === "Giỏi") return mau.green;
  if (xepLoai === "Khá") return mau.blue;
  if (xepLoai === "Trung bình") return mau.yellow;
  return mau.red;
}

// Tạo dữ liệu 3 sinh viên
const danhSachSinhVien = [
  { hoTen: "Nguyễn Thành Long", mon1: 8.5, mon2: 9.0, mon3: 8.0 },
  { hoTen: "Trần Thị Minh Anh", mon1: 7.0, mon2: 6.5, mon3: 7.5 },
  { hoTen: "Lê Hoàng Nam", mon1: 4.5, mon2: 5.0, mon3: 4.0 },
];

console.log(`${mau.cyan}${mau.bold}============================================================`);
console.log("         BÁO CÁO KẾT QUẢ HỌC TẬP SINH VIÊN (BÀI 06)");
console.log(`============================================================${mau.reset}\n`);

// Gọi các hàm từ module xulyDiem.js để xử lý từng sinh viên
const ketQua = danhSachSinhVien.map((sv, index) => {
  const dtb = tinhDiemTrungBinh(sv.mon1, sv.mon2, sv.mon3);
  const xepLoai = xepLoaiHocTap(dtb);
  const mauXL = layMauXepLoai(xepLoai);

  console.log(
    `${mau.bold}${index + 1}. Họ tên:${mau.reset} ${sv.hoTen}` +
      ` | Điểm 3 môn: [${sv.mon1}, ${sv.mon2}, ${sv.mon3}]` +
      ` | ĐTB: ${mau.bold}${dtb}${mau.reset}` +
      ` | Xếp loại: ${mauXL}${mau.bold}${xepLoai}${mau.reset}`
  );

  return xuLyKetQuaSinhVien(sv);
});

// Hiển thị bảng tổng hợp và thống kê lớp
console.log("\n--- BẢNG TỔNG HỢP ---");
console.table(
  ketQua.map((sv) => ({
    "Họ và tên": sv.hoTen,
    "Môn 1": sv.mon1,
    "Môn 2": sv.mon2,
    "Môn 3": sv.mon3,
    "Điểm TB": sv.diemTrungBinh,
    "Xếp loại": sv.xepLoai,
  }))
);

const thongKe = thongKeLop(ketQua);
console.log(`${mau.cyan}Thống kê lớp:${mau.reset} Tổng: ${thongKe.tongSinhVien} SV | ĐTB cả lớp: ${thongKe.diemTBCaLop} | Tỷ lệ đạt: ${thongKe.tyLeDat}%`);
console.log(`${mau.green}SV cao điểm nhất:${mau.reset} ${thongKe.svCaoNhat.hoTen} (${thongKe.svCaoNhat.diemTrungBinh} điểm)\n`);