// server.js
const express = require("express");
const path = require("path");
const { xuLyKetQuaSinhVien, thongKeLop } = require("./xulyDiem");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Dữ liệu mặc định ban đầu (3 sinh viên)
const duLieuMacDinh = [
  { id: 1, hoTen: "Nguyễn Thành Long", mon1: 8.5, mon2: 9.0, mon3: 8.0 },
  { id: 2, hoTen: "Trần Thị Minh Anh", mon1: 7.0, mon2: 6.5, mon3: 7.5 },
  { id: 3, hoTen: "Lê Hoàng Nam", mon1: 4.5, mon2: 5.0, mon3: 4.0 },
];

let danhSachSV = duLieuMacDinh.map((sv) => ({ ...sv }));

// API lấy danh sách sinh viên đã tính ĐTB + Xếp loại + Thống kê
app.get("/api/sinhvien", (req, res) => {
  const ketQua = danhSachSV.map(xuLyKetQuaSinhVien);
  const thongKe = thongKeLop(ketQua);
  res.json({ danhSach: ketQua, thongKe });
});

// API thêm sinh viên mới
app.post("/api/sinhvien", (req, res) => {
  try {
    const { hoTen, mon1, mon2, mon3 } = req.body;
    if (!hoTen || !hoTen.trim()) {
      return res.status(400).json({ error: "Vui lòng nhập họ tên sinh viên!" });
    }
    const svMoi = xuLyKetQuaSinhVien({
      id: Date.now(),
      hoTen: hoTen.trim(),
      mon1,
      mon2,
      mon3,
    });
    danhSachSV.unshift({
      id: svMoi.id,
      hoTen: svMoi.hoTen,
      mon1: svMoi.mon1,
      mon2: svMoi.mon2,
      mon3: svMoi.mon3,
    });
    res.status(201).json(svMoi);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// API cập nhật điểm sinh viên
app.put("/api/sinhvien/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const index = danhSachSV.findIndex((sv) => sv.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Không tìm thấy sinh viên." });
    }
    const { hoTen, mon1, mon2, mon3 } = req.body;
    const svCapNhat = xuLyKetQuaSinhVien({ id, hoTen, mon1, mon2, mon3 });
    danhSachSV[index] = {
      id,
      hoTen: svCapNhat.hoTen,
      mon1: svCapNhat.mon1,
      mon2: svCapNhat.mon2,
      mon3: svCapNhat.mon3,
    };
    res.json(svCapNhat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// API xóa 1 sinh viên
app.delete("/api/sinhvien/:id", (req, res) => {
  const id = Number(req.params.id);
  danhSachSV = danhSachSV.filter((sv) => sv.id !== id);
  res.json({ message: "Đã xóa sinh viên." });
});

// API khôi phục 3 sinh viên mặc định
app.post("/api/reset", (req, res) => {
  danhSachSV = duLieuMacDinh.map((sv) => ({ ...sv }));
  res.json({ message: "Đã khôi phục dữ liệu mặc định." });
});

app.listen(PORT, () => {
  console.log(`Web giao diện đang chạy tại: http://localhost:${PORT}`);
});