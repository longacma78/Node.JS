const { MongoClient } = require('mongodb');

// Sử dụng 127.0.0.1 để tránh lỗi kết nối IPv6 trên các phiên bản Node.js mới
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

const dbName = 'qlsinhvien';
const collectionName = 'students_test';

async function main() {
    try {
        // 1. Kết nối tới MongoDB
        await client.connect();
        console.log('Kết nối MongoDB thành công!');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Xóa dữ liệu cũ trong collection test để tránh trùng lặp khi chạy lại nhiều lần
        await collection.deleteMany({});

        // 2. Thêm 9 sinh viên mẫu (có masv, hoten, tuoi, diem)
        const sampleStudents = [
            { masv: 'SV01', hoten: 'Nguyễn Văn An', tuoi: 20, diem: 8.5 },
            { masv: 'SV02', hoten: 'Trần Thị Bình', tuoi: 21, diem: 4.0 },
            { masv: 'SV03', hoten: 'Lê Hoàng Cường', tuoi: 19, diem: 3.5 },
            { masv: 'SV04', hoten: 'Phạm Minh Dũng', tuoi: 22, diem: 7.0 },
            { masv: 'SV05', hoten: 'Hoàng Ngọc Lan', tuoi: 20, diem: 4.8 },
            { masv: 'SV06', hoten: 'Vũ Quang Huy', tuoi: 21, diem: 9.0 },
            { masv: 'SV07', hoten: 'Nguyễn Thành Long', tuoi: 20, diem: 9.5 },
            { masv: 'SV08', hoten: 'Đỗ Thị Mai', tuoi: 19, diem: 7.5 },
            { masv: 'SV09', hoten: 'Bùi Tuấn Kiệt', tuoi: 22, diem: 6.5 }
        ];

        const insertResult = await collection.insertMany(sampleStudents);
        console.log(`\nĐã thêm ${insertResult.insertedCount} sinh viên mẫu vào collection '${collectionName}'.`);

        // 3. Dùng deleteOne() xóa một sinh viên theo mã sinh viên (SV01)
        const deleteOneResult = await collection.deleteOne({ masv: 'SV01' });
        console.log(`\n[deleteOne] Số bản ghi đã xóa (masv: SV01): ${deleteOneResult.deletedCount}`);

        // 4. Dùng deleteMany() xóa các sinh viên có điểm dưới 5 (SV02, SV03, SV05)
        const deleteManyResult = await collection.deleteMany({ diem: { $lt: 5 } });
        console.log(`[deleteMany] Số bản ghi đã xóa (điểm < 5): ${deleteManyResult.deletedCount}`);

        // Tổng số bản ghi đã xóa
        const totalDeleted = deleteOneResult.deletedCount + deleteManyResult.deletedCount;
        console.log(`=> Tổng số bản ghi đã xóa: ${totalDeleted}`);

        // 5. Hiển thị danh sách sinh viên còn lại bằng find() (còn 5 sinh viên)
        const remainingStudents = await collection.find({}).toArray();
        console.log(`\nDanh sách sinh viên còn lại (${remainingStudents.length} sinh viên):`);
        console.table(remainingStudents);

    } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
    } finally {
        // Đóng kết nối
        await client.close();
        console.log('\nĐã đóng kết nối MongoDB.');
    }
}

main();