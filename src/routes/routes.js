const express = require('express');
const router = express.Router();

const { getGameData } = require('../utils/getGameData.js');

router.post('/games', async (req, res) => {
  res.send('GAME DATA HERE');
})

module.exports = router;
