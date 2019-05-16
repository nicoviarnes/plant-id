const express = require("express");
const router = express.Router();
const config = require("config");
const User = require("../../models/Users");

//@Route	get api/garden
//@Desc		User Garden Data
//@Access	Public
router.get("/", (req, res) => {
  // const { name, email, password } = req.body;
  console.log("Plant data goes in here");
  //User.findOne({id}).then(user => res.json(user.garden));
});

module.exports = router;
