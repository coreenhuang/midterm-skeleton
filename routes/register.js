const express = require('express');
const userHelper = require('../db/queries/users');
const router = express.Router();

router.get("/", (req, res) => {

  res.render("register");

});

router.post("/", (req, res) => {
  userHelper.createUser(req.body);
  //console.log("register req.body:", req.body)
  res.redirect("/");

});

module.exports = router;
