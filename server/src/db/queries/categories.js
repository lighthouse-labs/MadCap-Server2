const db = require('../connection');

const getCategories = () => {
  return db.query('SELECT * FROM categories;')
    .then(data => {
      return data.rows;
    });
};

const getRandomQuestions = (category_id, game_seed) => {
  return db.query(`
  SELECT SETSEED($1)`, [1.0 / game_seed])
  .then(() => db.query(`
  SELECT *
  FROM subcategories
  WHERE category_id = $1
  ORDER BY RANDOM()
  `, [category_id]))
  .then(data => {
    console.log(data.rows);
    return data.rows
  })
}

const getRandomQuestionsFromGame = (game_id) => {

  return db.query(`SELECT seed FROM games WHERE id=$1`, [game_id])
  .then((data) => data.rows[0])
  .then((seed) => db.query(`
  SELECT SETSEED($1)`, [1.0 / seed]))
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


getRandomQuestionsFromGame(2);

module.exports = { getCategories, getRandomQuestions, getRandomQuestionsFromGame };