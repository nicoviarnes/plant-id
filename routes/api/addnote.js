const express = require("express");
const router = express.Router();
const config = require("config");
const Note = require("../../models/Notes");

//@Route	get api/note
//@Desc		Add Plant Notes
//@Access	Public
router.post("/", (req, res) => {
	const { owner, note } = req.body;
	Note.create(req.body).then(note => res.json(note));
});

module.exports = router;
