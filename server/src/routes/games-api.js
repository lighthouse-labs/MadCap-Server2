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

router.get('/:game_url', (req, res) => {
  const { game_url } = req.params;
  const { getMainGame, getGameUsers, getGameCategories } = gameQueries;
  const promiseList = 
    [
      getMainGame,
      getGameUsers,
      getGameCategories
    ]
    .map((query) => query(game_url));
  
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
    res.status(500).json({ error })
  })

})

router.get('/:game_url/subcategories', (req, res) => {
  const { game_url } = req.params;
  gameQueries.getRandomSubcategories(game_url)
  .then(subcategories => res.json(subcategories))
  .catch(error => {
    console.error(error);
    res.status(500).json({ error })})
});

router.get('/:game_url/subcategories/:subcategory_number', (req, res) => {
  const { game_url, subcategory_number } = req.params;
  gameQueries.getRandomSubcategories(game_url)
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
 *  avatar_url: './avatars/avatar-temp-4.png'
 * }
 * 
 * returns the new user object
 */

router.post('/:game_url/users', (req, res) => {
  const { game_url } = req.params;
  const { name, color, avatar_url } = req.body;
  createUser(name, color, game_url, avatar_url)
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

router.put('/:game_url', (req, res) => {
  const { game_url } = req.params;
  const { categories, settings } = req.body;
  gameQueries.updateGameDetails(game_url, categories, settings)
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

router.patch('/:game_url/users/:user_id', (req, res) => {
  const { user_id } = req.params
  const { score } = req.body 
  setUserScore(user_id, score)
  .then((user) => res.json(user))
  .catch((error) => {
    console.error(error);
    res.json({ error });
  });
});

router.delete('/:game_url', (req, res) => {
  const { game_url } = req.params;
  gameQueries.deleteGame(game_url)
  .then((game) => res.json(game))
  .catch(error => {
    console.error(error);
    res.json({ error });
  });
});

module.exports = router