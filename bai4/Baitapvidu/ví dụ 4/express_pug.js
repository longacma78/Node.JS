const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  const name = 'John Doe';
  res.render('index', { name });
});

app.listen(3000, () => {
  console.log('Server đang chạy tại http://localhost:3000');
});