const express = require('express');
const quizHelper = require('../db/queries/quizzes');
const router = express.Router();



// router.use((req, res, next) => {
//   if (!req.cookies.user_id) {
//     return res.redirect("/login");
//   }
//   next();

// })

// view page to create new quiz
router.get('/new', (req, res) => {
  res.render('quizzes/new');
});

// view page for a specific quiz
router.get('/:id', (req, res) => {
  const quiz_id = req.params.id;
  quizHelper.fetchQuiz(quiz_id)
    .then(data => {
      res.render('quizzes/view_existing', { data });
    })
});

// I forget what this router post does
router.post('/:id/results', (req, res) => {
  quizHelper.newAttempt(req.params.id, req.body)
    .then(data => {
      res.send('Good');

    })
  console.log(req.body);
});

// view page for quiz results
router.get('/:id/results', (req, res) => {
  res.render('quizzes/results');
});

// view page for a specific quiz
router.get('/:id/modify', (req, res) => {
  res.render('quizzes/modify');
});

// create a new quiz
router.post('/', (req, res) => {
  quizHelper.createQuiz(req.body)
    .then(data => {
      res.render('quizzes/view_existing', { data });
      //return data;

    })

});

module.exports = router;
