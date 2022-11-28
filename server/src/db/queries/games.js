const db = require('../connection');
const { generateAddGameCategoriesQuery } = require('./helpers/game_helpers');


const getRandomSubcategories = (game_id) => {

  return db.query(`SELECT seed FROM games WHERE id=$1`, [game_id])
  .then((data) => data.rows[0].seed)
  .then((seed) => db.query(`SELECT SETSEED($1)`, [1.0 / seed]))
  .then(() => db.query(`
  SELECT categories.title AS category, subcategories.subcategory FROM categories_sets
  JOIN games ON game_id = games.id
  JOIN categories ON categories_sets.category_id = categories.id
  JOIN subcategories ON subcategories.category_id = categories.id
  WHERE game_id = $1
  ORDER BY RANDOM()
  `, [game_id])
  )
  .then((data) => data.rows)
};
/**
 * 
 * @param {string} url 
 * @param {array of ints} category_ids 
 * @param {{
 *  timer: int (in seconds),
 *  max_players: int
 * }} settings
 * @returns 
 */
const createNewGame = (url, category_ids, settings) => {
  const {timer, max_players} = settings;
  return db.query(`
  INSERT INTO games (url, seed, timer, max_players)
  VALUES ($1, FLOOR(RANDOM() * 20000 + 1), $2, $3)
  RETURNING *
  `, [url, timer, max_players])
  .then((data) => {
    console.log(data.rows[0]);
    return data.rows[0];
  })
  .then(({ id: game_id }) => {
    const {categoriesQuery, categoriesList} = generateAddGameCategoriesQuery(category_ids, game_id)
    db.query(categoriesQuery, categoriesList)
    .then((data) => {
      console.log(data.rows)
    })
  });
};

const updateGameDetails = (game_id, category_ids, settings) => {
  const {timer, max_players} = settings
  return db.query(`
  UPDATE games
  SET timer = $2,
      max_players = $3
  WHERE id = $1
  RETURNING *
  `, [game_id, timer, max_players])
  .then(() => {
    const {categoriesQuery, categoriesList} = generateAddGameCategoriesQuery(category_ids, game_id)
    db.query(categoriesQuery, categoriesList)
    .then((data) => {
      console.log(data.rows)
    })
  });

};

module.exports = { getRandomSubcategories, createNewGame, updateGameDetails }