const express = require('express');
const router = express.Router();
const userQueries = require ('../db/queries/games');

router.get('/:game_id/subcategories', (req, res) => {
  const game_id = req.params.game_id;
  userQueries.getRandomSubcategories(game_id)
  .then(subcategories => res.json(subcategories))
  .catch(error => res.json({ error }))
});

router.get('/:game_id/subcategories/:subcategory_number', (req, res) => {
  const { game_id, subcategory_number } = req.params;
  userQueries.getRandomSubcategories(game_id)
  // Subtract 1 so that the first subcategory is number 1
  .then(subcategories => res.json(subcategories[subcategory_number - 1]))
  .catch(error => res.json({ error }))
});

/**
 * Takes in an object ex. 
 * {
 *  url: 1r4t6y,
 *  categories: [1, 3]
 * }
 * 
 * returns nothing
 */

router.post('/', (req, res) => {
  const { url, category_ids: categories } = req.body();
  userQueries.createNewGame(url, categories)
  .catch(error => res.json({ error }))
})

module.exports = router