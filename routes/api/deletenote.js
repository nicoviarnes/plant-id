const express = require("express");
const router = express.Router();
const config = require("config");
const Note = require("../../models/Notes");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

//@Route	get api/notes/remove
//@Desc		Add Plant Notes
//@Access	Public
router.post("/", (req, res) => {
	const { id } = req.body;
	Note.findByIdAndRemove(ObjectId(id))
		.then(note => res.json(note))
		.catch(err => console.log(err));
});

module.exports = router;
