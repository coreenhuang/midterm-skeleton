const express = require('express');
const quizHelper = require('../db/queries/quizzes');
const router = express.Router();

router.get('/new', (req, res) => {
  // res.send('new quizzes view goes here');
  res.render('quizzes/new');
});

router.get('/:id', (req, res) => {
  res.send('specific quizzes view goes here');
});

router.post('/', (req, res) => {
  quizHelper.createQuiz(req.body);
  res.send('Send OK');
});

module.exports = router;
