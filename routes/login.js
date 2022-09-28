const express = require('express');
const router = express.Router();
const userHelper = require('../db/queries/users');


router.get("/", (req, res) => {

  res.render("login");

});

router.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  userHelper.getUserbyEmail(email)
    .then((data) => {
      if (!data) {
        return res.status(401).send("User does not exist! Please <a href='/register'>register!</a>");
      }
      if (password !== data.password) {
        return res.status(401).send("Password doesn't match! Please <a href='/login'>try again!</a>");
      }
      res.cookie("user_id", data.user_id)
      res.redirect("/");
    })

});

module.exports = router;
