const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const oldFile = path.join(dataDir, 'ghichu.txt');
const newFile = path.join(dataDir, 'ghichu_moi.txt');
const tempFile = path.join(dataDir, 'tam.txt');

const noiDung =
  'Dòng 1: Thực hành Node.js - Module File System (fs).\n' +
  'Dòng 2: Tạo thư mục, tạo tập tin và ghi nội dung.\n' +
  'Dòng 3: Đổi tên, đọc nội dung và xóa tập tin tạm.\n';

// Bước 1: Tạo thư mục data
fs.mkdir(dataDir, { recursive: true }, (err) => {
  if (err) {
    return console.error('Lỗi khi tạo thư mục data:', err);
  }
  console.log('1. Đã tạo thư mục "data" thành công.');

  // Bước 2: Tạo tập tin ghichu.txt và ghi ít nhất 3 dòng nội dung
  fs.writeFile(oldFile, noiDung, 'utf8', (err) => {
    if (err) {
      return console.error('Lỗi khi tạo và ghi tập tin ghichu.txt:', err);
    }
    console.log('2. Đã tạo tập tin "data/ghichu.txt" và ghi 3 dòng nội dung thành công.');

    // Bước 3: Đổi tên ghichu.txt thành ghichu_moi.txt bằng fs.rename()
    fs.rename(oldFile, newFile, (err) => {
      if (err) {
        return console.error('Lỗi khi đổi tên tập tin:', err);
      }
      console.log('3. Đã đổi tên tập tin thành "data/ghichu_moi.txt" thành công.');

      // Bước 4: Đọc và hiển thị nội dung sau khi đổi tên
      fs.readFile(newFile, 'utf8', (err, data) => {
        if (err) {
          return console.error('Lỗi khi đọc tập tin ghichu_moi.txt:', err);
        }
        console.log('4. Đọc nội dung tập tin "data/ghichu_moi.txt" thành công:');
        console.log('--- NỘI DUNG TẬP TIN ---');
        console.log(data.trim());
        console.log('------------------------');

        // Bước 5: Tạo tập tin tam.txt
        fs.writeFile(tempFile, 'Đây là tập tin tạm sẽ bị xóa.', 'utf8', (err) => {
          if (err) {
            return console.error('Lỗi khi tạo tập tin tam.txt:', err);
          }
          console.log('5. Đã tạo tập tin "data/tam.txt" thành công.');

          // Bước 6: Xóa tập tin tam.txt bằng fs.unlink()
          fs.unlink(tempFile, (err) => {
            if (err) {
              return console.error('Lỗi khi xóa tập tin tam.txt:', err);
            }
            console.log('6. Đã xóa tập tin "data/tam.txt" bằng fs.unlink() thành công.');
            console.log('=> Hoàn thành tất cả các thao tác!');
          });
        });
      });
    });
  });
});