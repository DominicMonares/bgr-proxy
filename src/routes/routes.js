const express = require('express');
const router = express.Router();

const { getGameData } = require('../utils/getGameData.js');

router.post('/games', (req, res) => {
  getGameData()
    .then(data => {
      res.send(data.data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
})

module.exports = router;
