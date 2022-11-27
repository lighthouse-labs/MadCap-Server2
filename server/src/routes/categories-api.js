/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/categories');

router.get('/', (req, res) => {
  userQueries.getCategories()
    .then(categories => {
      res.json({ categories });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//// *** can we pls change any use of 'questions' or ***
////    '/questions'   TO   '/subcategories'??
//// :))) 
////  thx

router.get('/:category_id/questions', (req, res) => {
  const { game_id } = req.query;
  const {category_id} = req.params
  userQueries.getRandomQuestions(category_id, game_id)
  .then(questions => {
    res.json(questions);
  });
});

router.get('/:category_id/questions/:question_number', (req, res) => {
  const { game_id } = req.query;
  const {category_id, question_number} = req.params
  userQueries.getRandomQuestions(category_id, game_id)
  .then(questions => {
    const question = questions[question_number - 1];
    res.json(question);
  })
  .catch(err => console.error(err));
});


module.exports = router;