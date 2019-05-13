const config = require("config");
const jwt = require("jsonwebtoken");

//Middle to get token sent from front-end
function auth(req, res, next) {
	//get it from the header
	//x-auth-token is the header value we are checking for to get the token
	const token = req.header("x-auth-token");

	//check token
	if (!token) res.status(401).json({ msg: "Access Denied!" });

	try {
		//Verify Token
		//pass in token and jwtsecret
		const decoded = jwt.verify(token, config.get("jwtSecret"));
		//Add user from payload
		//Take user from token and put in request.user
		req.user = decoded;
		next();
	} catch (e) {
		res.status(400).json({ msg: "Invalid Token" });
	}
}

module.exports = auth;

//EXAMPLE

//const auth = require("path to middleware auth.js");
//add auth into path as second parameter

// router.post("/", auth, (req, res)=>{
// 	const newItem = new Item({
// 		name:req.body.name
// 	});
// 	newItem.save().then(item=> res.json(item));
// })
