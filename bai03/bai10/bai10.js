// Sinh viên thực hiện: Nguyễn Thành Long - MSSV: CD-CNTT18B17
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function main() {
  try {
    // 1. Kết nối tới MongoDB
    await client.connect();
    console.log('Kết nối MongoDB thành công!\n');

    const db = client.db('bai3_bt10');

    // Xóa collection cũ (nếu có) để chạy lại nhiều lần không bị trùng dữ liệu
    await db.collection('departments').drop().catch(() => {});
    await db.collection('students_join').drop().catch(() => {});

    // 2. Tạo collection departments gồm ít nhất 2 khoa (makhoa, tenkhoa)
    await db.createCollection('departments');
    const departmentsCol = db.collection('departments');
    await departmentsCol.insertMany([
      { makhoa: 'CNTT', tenkhoa: 'Công nghệ thông tin' },
      { makhoa: 'KT', tenkhoa: 'Kinh tế' },
      { makhoa: 'QTKD', tenkhoa: 'Quản trị kinh doanh' }
    ]);
    console.log('Đã tạo collection departments.');

    // 3. Tạo collection students_join gồm ít nhất 4 sinh viên (masv, hoten, makhoa)
    await db.createCollection('students_join');
    const studentsCol = db.collection('students_join');
    await studentsCol.insertMany([
      { masv: 'CD-CNTT18B17', hoten: 'Nguyễn Thành Long', makhoa: 'CNTT' },
      { masv: 'CD-CNTT18B16', hoten: 'Trần Minh Quân', makhoa: 'CNTT' },
      { masv: 'CD-CNTT18B15', hoten: 'Lê Thị Thu Hà', makhoa: 'KT' },
      { masv: 'CD-CNTT18B14', hoten: 'Phạm Hoàng Nam', makhoa: 'QTKD' }
    ]);
    console.log('Đã tạo collection students_join.\n');

    // 4. Sử dụng aggregate() kết hợp $lookup để liên kết sinh viên với khoa thông qua makhoa
    const ketQua = await studentsCol.aggregate([
      {
        $lookup: {
          from: 'departments',        // Collection cần nối
          localField: 'makhoa',       // Trường liên kết ở students_join
          foreignField: 'makhoa',     // Trường liên kết ở departments
          as: 'thongtin_khoa'         // Tên mảng kết quả nối
        }
      },
      {
        $unwind: {
          path: '$thongtin_khoa',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 0,
          masv: 1,
          hoten: 1,
          makhoa: 1,
          tenkhoa: '$thongtin_khoa.tenkhoa' // Hiển thị kèm tên khoa tương ứng
        }
      }
    ]).toArray();

    // 5. Hiển thị danh sách sinh viên kèm mã khoa và tên khoa tương ứng
    console.log('=== DANH SÁCH SINH VIÊN KÈM TÊN KHOA ===');
    console.table(ketQua);

  } catch (err) {
    console.error('Lỗi:', err);
  } finally {
    // Đóng kết nối MongoDB
    await client.close();
  }
}

main();