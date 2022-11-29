const db = require('../connection');

const getTopUsers = () => {
  const topNumber = 5;
  return db.query(`
  SELECT name, score
  FROM users
  ORDER BY score DESC
  LIMIT $1`, [topNumber])
  .then((data) => {
    return data.rows});
}

const createUser = (name, color, game_id) => {
  return db.query(`
  INSERT INTO users(name, color, game_id)
  VALUES ($1, $2, $3)
  RETURNING *
  `, [name, color, game_id])
  .then((data) => {
    return data.rows[0];
  });
};

const setUserScore = (user_id, score) => {
  return db.query(`
  UPDATE users
  SET score = $2
  WHERE id = $1
  RETURNING *
  `, [user_id, score])
  .then((data) => data.rows);
};

module.exports = { getTopUsers, createUser, setUserScore }