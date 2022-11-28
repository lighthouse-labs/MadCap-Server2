const express = require('express');
const router = express.Router();
const userQueries = require ('../db/queries/games');

router.get('/:game_id/subcategories', (req, res) => {
  const game_id = req.params.game_id;
  userQueries.getRandomSubcategoriesFromGame(game_id)
  .then(subcategories => res.json(subcategories))
  .catch(error => res.json({ error }))
});

router.get('/:game_id/subcategories/:subcategory_number', (req, res) => {
  const { game_id, subcategory_number } = req.params;
  userQueries.getRandomSubcategoriesFromGame(game_id)
  .then(subcategories => res.json(subcategories[subcategory_number - 1]))
  .catch(error => res.json({ error }))
});

module.exports = router