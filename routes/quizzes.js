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

// posts results after quiz submission
router.post('/:id/results', (req, res) => {
  console.log('hello', req.params.id, req.body);
  // hello 3 { '5': 'samsung', '6': 'world', '7': 'two' }
  console.log('this is new attempt', quizHelper.newAttempt(req.params.id, req.body))
  quizHelper.newAttempt(req.params.id, req.body)
    .then(data => {
      res.redirect(`/quizzes/${req.params.id}/results/${data}`)
    })
  console.log(req.body);
});

router.get('/:id/results/:attempt_id', (req,res) => {
  quizHelper.fetchScore(req.params.id, req.params.attempt_id)
  .then((data) => {
    res.render('quizzes/results', data);
  })
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
