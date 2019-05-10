const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../models/Users");

//Route POST api/users
//User Sign-up
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
					jwt.sign(
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
	});
});

module.exports = router;
