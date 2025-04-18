const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send('Test POST route');
});

router.get('/', (req, res) => {
  res.send('Test GET route');
});

module.exports = router;
