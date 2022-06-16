const express = require('express');
const router = express.Router();

const { getGameData } = require('../services/getGameData.js');

router.get('/games/:page?', (req, res) => {
  getGameData(req.params.page)
    // 1 sec delay to avoid exceeding rate limit
    .then(data => {
      setTimeout(() => {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(data);
      }, 1000)
    })
    .catch(err => {
      res.status(500).send(err);
    });
})

module.exports = router;
