const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../models/Users");

//@Route	POST api/users
//@Desc		User Sign-up
//@Access	Public
router.post("/", (req, res) => {
	const { name, email, password } = req.body;

	//Check if all fields are entered
	if (!name || !email || !password) {
		return res.status(400).json({ msg: "Please complete all fields" });
	}

	//Check if user exists
	User.findOne({ email }).then(user => {
		if (user) return res.status(400).json({ msg: "That Email is registered!" });

		const newUser = new User({
			name,
			email,
			password
		});

		//Password Salt + Hash
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, has) => {
				if (err) throw err;
				newUser.password = has;
				newUser.save().then(user => {
					//Sign Token
					jwt.sign(
						//Payload
						//First param is json object equal to user id
						//Using id so that we know who it belongs to, to access correct info
						//Can be anything
						{ id: user.id },
						//get jwtsecret from config folder
						config.get("jwtSecret"),
						//Set expire to 1 hour
						{ expiresIn: "20d" },
						//Call Back Async
						(err, token) => {
							if (err) throw err;
							res.json({
								//gives us token and user when we register for private routes
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
	});
});

module.exports = router;
