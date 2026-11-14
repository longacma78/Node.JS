
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (req.url === '/') {
        res.end(`
            <!DOCTYPE html>
            <html lang="vi">
            <head>
                <meta charset="UTF-8">
                <title>Thông tin sinh viên</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background: #f0f2f5;
                        text-align: center;
                        padding: 50px;
                    }
                    .container {
                        background: white;
                        padding: 30px;
                        border-radius: 12px;
                        max-width: 600px;
                        margin: auto;
                        box-shadow: 0 4px 10px #ccc;
                    }
                    h1 { color: #1565c0; }
                    p { font-size: 18px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>THÔNG TIN SINH VIÊN</h1>
                    <h2>Cao Đẳng Kỹ Thuật Công Nghệ Nha Trang</h2>
                    <p><strong>Họ và tên:</strong> Nguyễn Thành Long</p>
                    <p><strong>Lớp:</strong> CD-CNTT18B</p>
                    <p><strong>SBD:</strong> CD-CNTT18B17</p>
                    <hr>
                    <p>Website được xây dựng bằng Node.js và module HTTP.</p>
                    <p>Server đang chạy tại cổng 3000.</p>
                </div>
            </body>
            </html>
        `);
    } else {
        res.statusCode = 404;
        res.end('<h1>404 - Không tìm thấy trang</h1>');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server đang chạy tại http://${hostname}:${port}/`);
});
