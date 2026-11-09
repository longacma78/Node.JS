
var http = require('http');

var server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(`
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Thong tin sinh vien</title>
        </head>
        <body>
            <h1>THONG TIN SINH VIEN</h1>
            <h2>Ho va ten: Nguyen Thanh Long</h2>
            <p>Lop: CD-CNTT18B</p>
        </body>
        </html>
    `);
});

server.listen(3000, function () {
    console.log('Server dang chay tai http://localhost:3000');
});
