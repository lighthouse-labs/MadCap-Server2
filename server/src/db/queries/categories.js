const db = require('../connection');

const getCategories = () => {
  return db.query('SELECT * FROM categories;')
    .then(data => {
      return data.rows;
    });
};

const getRandomSubcategories = (category_id, game_seed) => {
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

module.exports = { getCategories, getRandomSubcategories };