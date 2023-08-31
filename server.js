const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'datas/products.json'));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});