const db = require('../connection');

const createQuiz = (quizParams) => {
  console.log(quizParams);
  return db.query("INSERT INTO quizzes (name, public) VALUES ($1, $2) returning *", [quizParams.title, quizParams.public])
    .then(data => {
      const promises = [];
      const quiz_id = data.rows[0].id;
      for (let i in quizParams.qstring) {
        const p = db.query("INSERT INTO questions (qstring, ans1, ans2, ans3, ans4, correct_answer, quiz_id) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *",
          [quizParams.qstring[i], quizParams.ans1[i], quizParams.ans2[i], quizParams.ans3[i], quizParams.ans4[i], quizParams.correct_answer[i], quiz_id])
        promises.push(p);
      }
      return Promise.all(promises)
        .then(() => {
          return true;
        })
    })
  console.log(quizParams);
};

const getPublicQuizzes = (quizParams) => {
  // console.log(quizParams);
  return db.query("select * from quizzes where public = 'on';")
    .then(data => {
      return data.rows;
    })

}

const fetchQuiz = (quiz_id) => {
  return db.query("SELECT * FROM quizzes JOIN questions ON quizzes.id = questions.quiz_id WHERE quizzes.id = $1", [quiz_id])
    .then(data => {
      return data.rows;
    })
};

const newAttempt = (quiz_id, answeredQuestions) => {
  return db.query("INSERT INTO attempts (quiz_id) VALUES ($1) returning *", [quiz_id])
    .then(data => {
      console.log('attemptID', data.rows[0].id);
      const attemptId = data.rows[0].id;
      const promises = [];
      const answers = Object.entries(answeredQuestions);
      for (let a of answers) {
        const p = db.query("INSERT INTO answers (question_id, given_answer, attempt_id) VALUES ($1, $2, $3) RETURNING id", [a[0], a[1], data.rows[0].id])
        promises.push(p);
      }
      return Promise.all(promises)
        .then((result) => {
          console.log('what is result',result);
          return attemptId;
        })
    })
};

const fetchScore = (quiz_id, attempt_id) => {
  return db.query("SELECT given_answer, correct_answer FROM answers JOIN attempts ON answers.attempt_id = attempts.id JOIN questions ON answers.question_id = questions.id WHERE attempts.quiz_id = $1 AND attempts.id = $2", [quiz_id, attempt_id])
    .then(data => {
      console.log('all good', data.rows);
      const total = data.rows.length;
      let score = 0;
      for (let ans of data.rows) {
        if (ans.given_answer === ans.correct_answer) {
          score++;
        }
      }
      return {score, total};
    })
};

module.exports = { createQuiz, fetchQuiz, newAttempt, getPublicQuizzes, fetchScore };
