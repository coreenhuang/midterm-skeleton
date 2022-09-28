const db = require('../connection');

const createQuiz = (quizParams) => {
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

const fetchQuiz = (quiz_id) => {
  return db.query("SELECT ")
};

module.exports = { createQuiz };
