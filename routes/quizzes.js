const express = require('express');
const quizHelper = require('../db/queries/quizzes');
const router = express.Router();

router.use((req, res, next) => {
  if (!req.cookies.user_id) {
    return res.redirect("/login");
  }
  next();

})

// view page to create new quiz
router.get('/new', (req, res) => {
  res.render('quizzes/new');
});

// view page for a specific quiz
router.get('/:id/modify', (req, res) => {
  res.render('quizzes/modify');
});

// view page for a specific quiz
router.get('/:id', (req, res) => {
  const quiz_id = req.params.id;
  quizHelper.fetchQuiz(quiz_id);
  res.render('quizzes/view_existing');
});

// view page for quiz results
router.get('/generate random string', (req, res) => {
  res.render('quizzes/results');
});

// create a new quiz
router.post('/', (req, res) => {
  quizHelper.createQuiz(req.body);
  res.render('quizzes/view_existing');
});

module.exports = router;
