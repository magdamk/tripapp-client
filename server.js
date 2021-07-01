const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

app2 = express();
app2.use(serveStatic(path.join(__dirname, 'dist')));

const port = process.env.PORT || 80;

app2.listen(port);