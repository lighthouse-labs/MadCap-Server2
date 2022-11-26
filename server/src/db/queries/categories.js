const db = require('../connection');

const getCategories = () => {
  return db.query('SELECT * FROM categories;')
    .then(data => {
      return data.rows;
    });
};

const getRandomQuestion = (category_id) => {
  return db.query(`
  SELECT *
  FROM subcategories
  WHERE category_id = $1
  ORDER BY RANDOM()
  LIMIT 1;
  `, [category_id]).then(data => {
    console.log(data.rows);
    return data.rows[0]
  })
}
getRandomQuestion(1);

module.exports = { getCategories, getRandomQuestion };