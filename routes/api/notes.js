const express = require("express");
const router = express.Router();
const config = require("config");
const Note = require("../../models/Notes");

//@Route	get api/notes
//@Desc		Get all Notes
//@Access	Public
router.get("/", (req, res) => {
	Note.find(req.body).then(note => res.json(note));
});

module.exports = router;
