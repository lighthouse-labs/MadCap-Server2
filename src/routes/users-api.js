const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users')

router.get('/top', (req, res) => {
  userQueries.getTopUsers()
  .then((topUsers) => res.json(topUsers))
  .catch((error) => {
    console.error(error);
    res.json({ error })
  });
});

module.exports = router;