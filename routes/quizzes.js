const express = require('express');
const quizHelper = require('../db/queries/quizzes');
const router = express.Router();

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
  res.render('quizzes/view_existing');
});

// create a new quiz
router.post('/', (req, res) => {
  quizHelper.createQuiz(req.body);
  res.send('Send OK');
});

module.exports = router;
