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

const generateAddGameCategoriesQuery = (category_ids, game_id) => {
  let categoriesQuery = `
  INSERT INTO categories_sets (game_id, category_id)
  VALUES`;
  const categoriesList = [game_id];

  for (let index in category_ids) {
    const intIndex = parseInt(index);
    const id = category_ids[index];
    categoriesQuery += `
    ($1, $${intIndex + 2})`;
     if (intIndex < (category_ids.length - 1)) {
       (categoriesQuery += `,`);
     }
    categoriesList.push(id);
  }

  categoriesQuery += `
  RETURNING *`

  return {categoriesQuery, categoriesList}

}

const createNewGame = (url, category_ids) => {
  
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
    const {categoriesQuery, categoriesList} = generateAddGameCategoriesQuery(category_ids, game_id)
    db.query(categoriesQuery, categoriesList)
    .then((data) => {
      console.log(data.rows)
    })
  });
};

module.exports = { getRandomSubcategories, createNewGame }