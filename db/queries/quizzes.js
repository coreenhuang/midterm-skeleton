const db = require('../connection');

const createQuiz = (quizParams) => {
  console.log('createQuiz');
  return db.query("INSERT INTO quizzes (name, public) VALUES ($1, $2) returning *", [quizParams.title, quizParams.public])
    .then(data => {
      const quiz_id = data.rows[0].id;
      return db.query("INSERT INTO questions (qstring, ans1, ans2, ans3, ans4, correct_answer, quiz_id) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *", [quizParams.qstring, quizParams.ans1, quizParams.ans2, quizParams.ans3, quizParams.ans4, quizParams.correct_answer, quiz_id])
        .then(data => {
          return data.rows;
        })
    })
  console.log(quizParams);
};

// const getPublicQuizzes= (quizParams) => {
//   return db.query("select * from quizzes where public = 'on';")
//   .then(data => {
//     return data.rows
//   })
// console.log(quizParams)
// }

const fetchQuiz = (quiz_id) => {
  console.log('fetchQuiz');
  return db.query("SELECT * FROM quizzes JOIN questions ON quizzes.id = questions.quiz_id WHERE quizzes.id = $1", [quiz_id])
  .then(data => {
    return data.rows[0];
  })
};

const newAttempt = (quiz_id, answeredQuestions) => {
  console.log('newAttempt');
  return db.query("INSERT INTO attempts (quiz_id) VALUES ($1) returning *", [quiz_id])
  .then(data => {
    const answers = Object.entries(answeredQuestions);
    return db.query("INSERT INTO answers (question_id, given_answer, attempt_id) VALUES ($1, $2, $3)", [answers[0][0], answers[0][1], data.rows[0].id])
  })
};

module.exports = { createQuiz, fetchQuiz, newAttempt };
