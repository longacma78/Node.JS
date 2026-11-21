// xulyDiem.js

/**
 * Kiểm tra điểm hợp lệ (từ 0 đến 10)
 */
function kiemTraDiemHopLe(diem) {
  const so = Number(diem);
  return !Number.isNaN(so) && so >= 0 && so <= 10;
}

/**
 * Tính điểm trung bình của 3 môn (làm tròn 2 chữ số thập phân)
 */
function tinhDiemTrungBinh(mon1, mon2, mon3) {
  if (!kiemTraDiemHopLe(mon1) || !kiemTraDiemHopLe(mon2) || !kiemTraDiemHopLe(mon3)) {
    throw new Error("Điểm các môn phải là số trong khoảng từ 0 đến 10.");
  }
  const dtb = (Number(mon1) + Number(mon2) + Number(mon3)) / 3;
  return Number(dtb.toFixed(2));
}

/**
 * Xếp loại học tập theo quy định:
 * - Giỏi: từ 8
 * - Khá: từ 6.5
 * - Trung bình: từ 5
 * - Yếu: dưới 5
 */
function xepLoaiHocTap(dtb) {
  if (dtb >= 8) return "Giỏi";
  if (dtb >= 6.5) return "Khá";
  if (dtb >= 5) return "Trung bình";
  return "Yếu";
}

/**
 * Nhận xét / Gợi ý học bổng theo xếp loại
 */
function nhanXetHocTap(dtb) {
  if (dtb >= 8) return "Xuất sắc - Đủ điều kiện xét học bổng";
  if (dtb >= 6.5) return "Tốt - Tiếp tục phát huy";
  if (dtb >= 5) return "Đạt - Cần cố gắng thêm";
  return "Cảnh báo học vụ - Cần ôn tập lại";
}

/**
 * Xử lý đầy đủ thông tin 1 sinh viên
 */
function xuLyKetQuaSinhVien(sv) {
  const dtb = tinhDiemTrungBinh(sv.mon1, sv.mon2, sv.mon3);
  const xepLoai = xepLoaiHocTap(dtb);
  const nhanXet = nhanXetHocTap(dtb);

  return {
    id: sv.id || Date.now(),
    hoTen: sv.hoTen,
    mon1: Number(sv.mon1),
    mon2: Number(sv.mon2),
    mon3: Number(sv.mon3),
    diemTrungBinh: dtb,
    xepLoai,
    nhanXet,
  };
}

/**
 * Thống kê toàn bộ danh sách sinh viên
 */
function thongKeLop(danhSachKetQua) {
  if (!danhSachKetQua || danhSachKetQua.length === 0) {
    return {
      tongSinhVien: 0,
      diemTBCaLop: 0,
      tyLeDat: 0,
      svCaoNhat: null,
      phanBo: { Gioi: 0, Kha: 0, TrungBinh: 0, Yeu: 0 },
    };
  }

  let tongDTB = 0;
  let soDat = 0;
  let svCaoNhat = danhSachKetQua[0];
  const phanBo = { Gioi: 0, Kha: 0, TrungBinh: 0, Yeu: 0 };

  for (const sv of danhSachKetQua) {
    tongDTB += sv.diemTrungBinh;
    if (sv.diemTrungBinh >= 5) soDat++;
    if (sv.diemTrungBinh > svCaoNhat.diemTrungBinh) {
      svCaoNhat = sv;
    }

    if (sv.xepLoai === "Giỏi") phanBo.Gioi++;
    else if (sv.xepLoai === "Khá") phanBo.Kha++;
    else if (sv.xepLoai === "Trung bình") phanBo.TrungBinh++;
    else phanBo.Yeu++;
  }

  return {
    tongSinhVien: danhSachKetQua.length,
    diemTBCaLop: Number((tongDTB / danhSachKetQua.length).toFixed(2)),
    tyLeDat: Number(((soDat / danhSachKetQua.length) * 100).toFixed(1)),
    svCaoNhat,
    phanBo,
  };
}

// Xuất các hàm bằng module.exports theo yêu cầu đề bài
module.exports = {
  tinhDiemTrungBinh,
  xepLoaiHocTap,
  nhanXetHocTap,
  xuLyKetQuaSinhVien,
  thongKeLop,
};