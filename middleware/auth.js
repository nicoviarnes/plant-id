const config = require("config");
const jwt = require("jsonwebtoken");

//Middle to get token sent from front-end
function auth(req, res, next) {
	const token = req.header("x-auth-token");

	//check token
	if (!token) res.status(401).json({ msg: "Access Denied!" });

	try {
		//Verify Token
		const decoded = jwt.verify(token, config.get("jwtSecret"));
		//Add user from payload
		req.user = decoded;
		next();
	} catch (e) {
		res.status(400).json({ msg: "Invalid Token" });
	}
}

module.exports = auth;

//const auth = require("path to middleware auth.js");
//add auth into path as second parameter

//EXAMPLE

// router.post("/", auth, (req, res)=>{
// 	const newItem = new Item({
// 		name:req.body.name
// 	});
// 	newItem.save().then(item=> res.json(item));
// })
