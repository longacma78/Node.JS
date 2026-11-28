const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(`Yêu cầu đến địa chỉ: ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Chào mừng đến với ứng dụng Express!');
});

app.listen(3000, () => {
  console.log('Server đang chạy tại http://localhost:3000');
});