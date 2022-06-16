const express = require('express');
const router = express.Router();

const { getGameData } = require('../services/getGameData.js');

router.get('/games/:page?', (req, res) => {
  getGameData(req.params.page)
    .then(data => {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(data);
    })
    .catch(err => {
      res.status(500).send(err);
    });
})

module.exports = router;
