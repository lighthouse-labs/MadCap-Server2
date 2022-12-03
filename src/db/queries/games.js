const db = require('../connection');
const { generateAddGameCategoriesQuery } = require('./helpers/game_helpers');

const getMainGame = (game_url) => {
  return db.query(`
  SELECT id, url, timer, max_players AS "maxPlayers", rounds FROM games
  WHERE url = $1`, [game_url])
  .then((data) => data.rows[0])
}

const getGameUsers = (game_url) => {
  return db.query(`
  SELECT users.id, name, score, color, avatar_url, host FROM users
  JOIN games ON games.id = game_id
  WHERE games.url = $1`, [game_url])
  .then((data) => data.rows)
}

const getGameCategories = (game_url) => {
  return db.query(`
  SELECT categories.title AS category
  FROM categories_sets
  JOIN categories ON category_id = categories.id
  JOIN games ON game_id = games.id
  WHERE games.url = $1`, [game_url])
  .then((data) => data.rows)
  .then((game_list) => game_list.map(game_obj => game_obj.category))
}

const getRandomSubcategories = (game_url) => {

  return db.query(`SELECT seed FROM games WHERE url=$1`, [game_url])
  .then((data) => data.rows[0].seed)
  .then((seed) => db.query(`SELECT SETSEED($1)`, [1.0 / seed]))
  .then(() => db.query(`
  SELECT categories.title AS category, subcategories.subcategory FROM categories_sets
  JOIN games ON game_id = games.id
  JOIN categories ON categories_sets.category_id = categories.id
  JOIN subcategories ON subcategories.category_id = categories.id
  WHERE games.url = $1
  ORDER BY RANDOM()
  `, [game_url])
  )
  .then((data) => data.rows)
};

const createNewGame = (url) => {
  return db.query(`
  INSERT INTO games(url, seed)
  VALUES ($1, FLOOR(RANDOM() * 20000 + 1))
  RETURNING *
  `, [url])
  .then((data) => {
    return data.rows[0];
  });
};

/**
 * 
 * @param {string} url 
 * @param {array of ints} category_ids 
 * @param {{
 *  timer: int (int seconds),
 *  maxPlayers: int,
 *  rounds: int,
 * }} settings
 * @returns 
 */
const updateGameSettings = (game_url, settings) => {
  const {timer, maxPlayers, rounds} = settings
  return db.query(`
  UPDATE games
  SET timer = $2,
      max_players = $3,
      rounds = $4
  WHERE url = $1
  RETURNING *
  `, [game_url, timer, maxPlayers, rounds])
  .then((data) => data.rows[0])
};

  const updateGameCategories = (game_url, category_ids) => {
    return db.query(`
    SELECT id 
    FROM games
    WHERE url = $1
    `, [game_url])
  .then((data) => data.rows[0].id)
  .then((game_id) => {
    db.query(`
      DELETE FROM categories_sets
      WHERE game_id = $1
    `, [game_id])
    return game_id
  })
  .then((game_id) => {
    const {categoriesQuery, categoriesList} = generateAddGameCategoriesQuery(category_ids, game_id)
    db.query(categoriesQuery, categoriesList)
    .then((data) => {
      return data.rows;
    })
  });

};

const deleteGame = (game_url) => {
  return db.query(`
  DELETE FROM games
  WHERE url = $1
  RETURNING *
  `, [game_url])
  .then((data) => data.rows[0])
}

module.exports = { getMainGame, getGameUsers, getGameCategories, getRandomSubcategories, createNewGame, updateGameSettings, updateGameCategories, deleteGame }