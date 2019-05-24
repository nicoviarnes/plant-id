const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema
const PlantSchema = new Schema({
	owner: {
		type: String,
		required: true
	},
	name: {
		type: String
		// required: true
	},
	url: {
		type: String,
		required: true
	},
	plantInfo: {
		type: []
	}
});

const Plants = mongoose.model("Plants", PlantSchema);

module.exports = Plants;
