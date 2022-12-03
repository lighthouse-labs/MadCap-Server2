/**
 * Generates the querry to categories sets for linking all
 * a games categories to the game
 * @param {array} category_ids 
 * @param {number} game_id 
 * @returns {object} {categoriesQuery, categoriesList}
 */

const generateAddGameCategoriesQuery = (category_ids, game_id) => {
  let categoriesQuery = `
  INSERT INTO categories_sets (game_id, category_id)
  VALUES`;
  const categoriesList = [game_id];
  // Return a list of values from category_ids (ex ($1, $2), ($1, $3))
  for (let index in category_ids) {
    const intIndex = parseInt(index);
    const id = category_ids[intIndex];
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

module.exports = { generateAddGameCategoriesQuery };