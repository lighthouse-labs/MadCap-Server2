const db = require('../connection')
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

const createNewGame = (url, category_id) => {
  return db.query(`
  INSERT INTO games (url, seed)
  VALUES ($1, FLOOR(RANDOM() * 20000 + 1))
  RETURNING *
  `, [url])
  .then((data) => {
    console.log(data.rows[0]);
    return data.rows[0];
  })
  .then(({ id: game_id }) => {
    db.query(`
    INSERT INTO categories_sets (game_id, category_id)
    VALUES
    ($1, $2)
    RETURNING *
    `, [game_id, category_id])
    .then((data) => {
      console.log(data.rows[0])
    })
  });
}

createNewGame('agtry', 3);

module.exports = { getRandomSubcategories }