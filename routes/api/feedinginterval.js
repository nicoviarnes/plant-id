const express = require("express");
const router = express.Router();
const config = require("config");
const Plant = require("../../models/Plants");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

//@Route	get api/notes/remove
//@Desc		Add Plant Notes
//@Access	Public
router.post("/", (req, res) => {
    const { id, interval } = req.body;
    console.log(id, interval)
	Plant.findOneAndUpdate({_id: id}, {feedingInterval: interval})
		.then(plant => res.json(plant))
		.catch(err => console.log(err));
});

module.exports = router;
