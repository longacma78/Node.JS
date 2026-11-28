const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <form action="/divide" method="post">
      <label for="dividend">Dividend:</label>
      <input type="number" id="dividend" name="dividend" required>
      <br>
      <label for="divisor">Divisor:</label>
      <input type="number" id="divisor" name="divisor" required>
      <br>
      <input type="submit" value="Submit">
    </form>
  `);
});

app.post('/divide', (req, res) => {
  const dividend = parseFloat(req.body.dividend);
  const divisor = parseFloat(req.body.divisor);

  if (isNaN(dividend) || isNaN(divisor) || divisor === 0) {
    res.status(400).send('Invalid input');
    return;
  }

  const result = dividend / divisor;
  res.send(`Result: ${result}`);
});

app.listen(3000, () => {
  console.log('Server đang chạy tại http://localhost:3000');
});