const express = require('express');
const path = require('path');

const app = express()

const port = process.env.PORT || 3000

const outputPath = path.resolve(process.cwd(), 'dist')
const publicPath = '/'

app.use(publicPath, express.static(outputPath));

app.get('*', (req, res) => res.sendFile(path.resolve(publicPath, 'index.html')));

app.listen(port, (err) => {
  console.log('boop')
});
