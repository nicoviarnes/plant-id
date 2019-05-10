const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/Users");

//Route POST api/auth
//User Authentication
router.post("/", (req, res) => {
	const { email, password } = req.body;

	//Check if all fields are entered
	if (!email || !password) {
		return res.status(400).json({ msg: "Please complete all fields" });
	}

	//Check if user exists
	User.findOne({ email }).then(user => {
		if (!user)
			return res.status(400).json({ msg: "That Email is not registered!" });

		//Validate Password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (!isMatch)
				return res
					.status(400)
					.json({ msg: "Please Check your Email and Password!" });

			jwt.sign(
				{ id: user.id },
				config.get("jwtSecret"),
				{ expiresIn: 3600 }, //Expires in 1 hour
				(err, token) => {
					if (err) throw err;
					res.json({
						token,
						user: {
							id: user.id,
							name: user.name,
							email: user.email
						}
					});
				}
			);
		});
	});
});

// GET api/auth/user
//user data
//Private
router.get("/user", auth, (req, res) => {
	User.findById(req.user.id)
		.select("-password")
		.then(user => res.json(user));
});

module.exports = router;
