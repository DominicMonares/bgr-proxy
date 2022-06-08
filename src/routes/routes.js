const express = require('express');
const router = express.Router();


router.post('/games', async (req, res) => {
  res.send('GAME DATA HERE');
})

module.exports = router;
