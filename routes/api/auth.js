const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/Users");

//@Route	POST api/auth
//@Desc		User Authentication
//@Access	Public
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
				//Check user.js for comments
				{ id: user.id },
				config.get("jwtSecret"),
				{ expiresIn: 3600 },
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

//Get current users data by using token
//JWT auth is stateless

// @Route	GET api/auth/user
// @Desc	Token Return
//@Access	Private
//validate user with token
router.get("/user", auth, (req, res) => {
	User.findById(req.user.id)
		//-pass so it does not return the password
		.select("-password")
		//send user without password
		.then(user => res.json(user));
});

module.exports = router;
