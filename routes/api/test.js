const express = require("express");
const router = express.Router();
const User = require("../../models/Users");
const auth = require("../../middleware/auth");

//@Route	/api/test
//@Desc		Shows all registered users
//@Access 	Private
router.get("/", auth, (req, res) => {
	User.find().then(users => res.json(users));
});

module.exports = router;
