const express = require('express');
//const quizHelper = require('../db/queries/quizzes');
const router = express.Router();

app.get("/register", (req, res) => {
  if (!req.session.user_id) {
    res.render("register");
  }
  else {
    res.redirect("/index");
  }
});

app.post("/register", (req, res) => {

  const user_id = Math.random().toString(36).substring(2, 8);

  const newEmail = req.body.email;
  const newPassword = req.body.password;
  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  if (!newEmail || !hashedPassword) {
    return res.status(401).send("Error! email and password cannot be blank!");
  }

  if (getUserByEmail(newEmail)) {
    return res.status(401).send("User already exist! Please <a href='/login'>login!</a> !");
  }
  const user = {
    id: user_id,
    email: newEmail,
    password: hashedPassword
  };
  users[user_id] = user;

  req.session.user_id = user_id;
  res.redirect("/urls");

});

module.exports = router;
