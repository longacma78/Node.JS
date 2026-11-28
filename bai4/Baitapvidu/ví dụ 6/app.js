const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

const calculatorController = require('./controllers/calculatorController');
app.use('/calculator', calculatorController);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000/calculator');
});