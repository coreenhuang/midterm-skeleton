/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
//const getQuiz = require('../db/queries/quizzes');
const db = require('../db/connection');

router.post('/', (req, res) => {
  // res.render('quizzes/view_existing');
  res.send("All good");
  // db.query("select * from quizzes where public = 'on' order by id;")
  //   .then((response) => {
  //     const publicQuizzes = response.rows;
  //     console.log("publicQuizzes:", publicQuizzes);
  //res.render('index', { publicQuizzes });
  //})
})

module.exports = router;

