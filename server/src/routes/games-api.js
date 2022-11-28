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
 *  categories: [1, 3],
 *  settings: {
 *   timer: 60,
 *   max_players: 4
 *  }
 * }
 * 
 * returns nothing
 */

router.post('/', (req, res) => {
  const { url, categories, settings } = req.body;
  userQueries.createNewGame(url, categories, settings)
  .then (() => res.send('Success!'))
  .catch(error => {
    console.error(error);
    res.json({ error })
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { categories, settings } = req.body;
  userQueries.updateGameDetails(id, categories, settings)
  .then (() => res.send('Success!'))
  .catch(error => {
    console.error(error);
    res.json({ error })
  })
})

module.exports = router