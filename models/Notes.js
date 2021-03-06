const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema
const NoteSchema = new Schema({
	plant: {
		type: String,
		required: true
	},
	note: {
		type: String
	}
});

const Notes = mongoose.model("Notes", NoteSchema);

module.exports = Notes;
