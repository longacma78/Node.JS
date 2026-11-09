var http = require('http');

var server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(`
        <html>
            <head>
                <title>Node.js - Hello Long</title>
            </head>
            <body>
                <h1 style="color: blue;">Hello Long!</h1>
                <p>Chào mừng bạn đến với chương trình Node.js.</p>
            </body>
        </html>
    `);
});

server.listen(8080, function () {
    console.log('Server dang chay tai http://localhost:8080');
});