const express = require('express');
const router = express.Router();
const userQueries = require ('../db/queries/games');

router.get('/:game_id/questions', (req, res) => {
  const game_id = req.params.game_id;
  userQueries.getRandomQuestionsFromGame(game_id)
  .then(questions => res.json(questions))
  .catch(error => res.json({ error }))
});

module.exports = router