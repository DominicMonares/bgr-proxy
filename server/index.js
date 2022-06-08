const express = require('express');

const createServer = require('./server.js');

const app = createServer();
app.listen(8080, () => {
  console.log('Server listening on port 8080!');
});
