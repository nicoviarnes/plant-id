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
    const { id, date } = req.body;
    console.log(req.body)
	Plant.findOneAndUpdate({_id: id}, {fed: date})
		.then(plant => res.json(plant))
		.catch(err => console.log(err));
});

module.exports = router;
