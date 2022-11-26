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

const getRandomQuestion = (category_id, game_seed, question_number) => {
  return getRandomQuestions(category_id, game_seed)
  .then(questions => {
    return questions([question_number - 1]) 
  })
}
getRandomQuestions(1, 10006);

module.exports = { getCategories, getRandomQuestions, getRandomQuestion };