const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes.js');

const createServer = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use('/', router);
  return app;
}

module.exports = createServer;
