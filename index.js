const express = require('express');

const createServer = require('./src/server.js');
const { validateToken } = require('./src/services/validateToken.js');

const app = createServer();

app.listen(8080, () => {
  console.log('Server listening on port 8080!');
});

validateToken(); // initial validation

// hourly token validation as required by Twitch
setInterval(() => { validateToken() }, 3600000);
