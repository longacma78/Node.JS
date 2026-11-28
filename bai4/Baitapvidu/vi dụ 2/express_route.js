const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Trang chủ');
});

app.get('/about', (req, res) => {
  res.send('Trang giới thiệu');
});

app.get('/users', (req, res) => {
  const { name } = req.query;
  res.send(`Xin chào, ${name}`);
});

app.use((req, res) => {
  res.status(404).send('Không tìm thấy trang');
});

app.listen(3000, () => {
  console.log('Server đang chạy:');
  console.log('- Trang chủ: http://localhost:3000');
  console.log('- Giới thiệu: http://localhost:3000/about');
  console.log('- Users: http://localhost:3000/users?name=Minh');
});