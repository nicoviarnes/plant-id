const express = require("express");
const router = express.Router();
const config = require("config");
const Plant = require("../../models/Plants");

//@Route	get api/plant
//@Desc		User Garden Data
//@Access	Public
router.post("/", (req, res) => {
	const { owner, name, url, plantInfo } = req.body;
	Plant.create(req.body).then(plant => res.json(plant));
});

module.exports = router;
