const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/categories');

router.get('/', (req, res) => {
  userQueries.getCategories()
    .then(categories => {
      res.json(categories);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;