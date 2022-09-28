const express = require('express');
const userHelper = require('../db/queries/users');
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.cookies.user_id) {
    res.render("register");
  }
  else {
    res.redirect("/");
  }
});

router.post("/", (req, res) => {
  const email = req.body.email;
  userHelper.getUserbyEmail(email)
    .then((data) => {
      if (data) {
        return res.status(401).send("User already exist! Please <a href='/login'>login!</a> !");
      }
      userHelper.createUser(req.body);
      res.redirect("/");

    });
});

module.exports = router;
