const express = require('express');
//const quizHelper = require('../db/queries/quizzes');
const router = express.Router();

app.get("/login", (req, res) => {
  let user = req.session.user_id;
  const templateVars = {
    user: user
  };
  if (!req.session.user_id) {
    res.render("login", templateVars);
  } else {
    res.redirect('/urls');
  }

});

app.post('/login', (req, res) => {

  const testEmail = req.body.email;
  const testPassword = req.body.password;
  const user = getUserByEmail(testEmail);

  if (!getUserByEmail(testEmail)) {
    return res.status(401).send("User does not exist! Please <a href='/register'>register!</a>");
    return;
  }
  if (!bcrypt.compareSync(testPassword, user.password)) {
    return res.status(401).send("Password doesn't match! Please <a href='/login'>try again!</a>");
  }

  req.session.user_id = user.id;

  res.redirect("/urls");


});

module.exports = router;

