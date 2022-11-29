const express = require('express');
const router = express.Router();
const gameQueries = require ('../db/queries/games');
const { createUser, setUserScore } = require ('../db/queries/users');

/**
 * Does not take in a body
 * 
 * Returns an object like 
 * {
 *  id: 1,
 *  url: "gert56",
 *  timer: 60,
 *  max_players: 8,
 *  users: [{
 *    id: 1,
 *    name: "Terry",
 *    score: 12,
 *    color: "red"
 *  }],
 *  categories: [
 *    "Fruits"
 *  ]
 * }
 */

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const { getMainGame, getGameUsers, getGameCategories } = gameQueries;
  const promiseList = 
    [
      getMainGame,
      getGameUsers,
      getGameCategories
    ]
    .map((query) => query(id));
  
  Promise.all(promiseList)
  .then(([mainGame, gameUsers, gameCategories]) => (
    {
      ...mainGame,
      users: gameUsers,
      categories: gameCategories
    }
  ))
  .then((gameObject => res.json(gameObject)))
  .catch((error) => {
    console.error(error);
    res.json({ error })
  })

})

router.get('/:game_id/subcategories', (req, res) => {
  const game_id = req.params.game_id;
  gameQueries.getRandomSubcategories(game_id)
  .then(subcategories => res.json(subcategories))
  .catch(error => res.json({ error }))
});

router.get('/:game_id/subcategories/:subcategory_number', (req, res) => {
  const { game_id, subcategory_number } = req.params;
  gameQueries.getRandomSubcategories(game_id)
  // Subtract 1 so that the first subcategory is number 1
  .then(subcategories => res.json(subcategories[subcategory_number - 1]))
  .catch(error => res.json({ error }))
});

/**
 * Takes an object in its body
 * { url: 1r4t6y }
 * 
 * returns the new object
 */

router.post('/', (req, res) => {
  const { url } = req.body;
  gameQueries.createNewGame(url)
  .then ((game) => res.json(game))
  .catch(error => {
    console.error(error);
    res.status(500).json({ error })
  })
})

/**
 * Takes an object in its body
 * {
 *  name: Fred
 *  color: blue
 * }
 * 
 * returns the new user object
 */

router.post('/:id/users', (req, res) => {
  const { id: game_id } = req.params;
  const { name, color } = req.body;
  createUser(name, color, game_id)
  .then((user) => res.json(user))
  .catch((error) => {
    console.error(error);
    res.json({ error })
  });
});

/**
 * Takes an object in it's body. 
 * Example: 
 * {
 *  categories: [1, 3],
 *  settings: {
 *   timer: 60,
 *   max_players: 4
 *  }
 * }
 * 
 * returns nothing
 */

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { categories, settings } = req.body;
  gameQueries.updateGameDetails(id, categories, settings)
  .then (() => res.send('Success!'))
  .catch(error => {
    console.error(error);
    res.json({ error });
  });
});

/**
 * Takes an object in its body
 * Example:
 * { 
 *  score: 20
 * }
 * 
 * returns the user with the updated score
 */

router.patch('/:game_id/users/:user_id', (req, res) => {
  const { user_id } = req.params
  const { score } = req.body 
  setUserScore(user_id, score)
  .then((user) => res.json(user))
  .catch((error) => {
    console.error(error);
    res.json({ error });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  gameQueries.deleteGame(id)
  .then((game) => res.json(game))
  .catch(error => {
    console.error(error);
    res.json({ error });
  });
});

module.exports = router