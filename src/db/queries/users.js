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

const createUser = (name, color, game_url, avatar_url, isHost) => {
  return db.query(`
  SELECT id
  FROM games
  WHERE url = $1
  `, [game_url])
  .then((data) => data.rows[0].id)
  .then((game_id) => db.query(`
  INSERT INTO users(name, color, game_id, avatar_url, host)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `, [name, color, game_id, avatar_url, isHost || false]))
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
  .then((data) => data.rows[0]);
};

module.exports = { getTopUsers, createUser, setUserScore }