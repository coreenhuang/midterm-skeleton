const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.send('quizzes view goes here');
});

module.exports = router;
