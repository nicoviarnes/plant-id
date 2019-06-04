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
	},
	wateringInterval: {
		type: Number
	},
	feedingInterval: {
		type: Number
	},
	watered: {
		type: String
	},
	fed: {
		type: String
	},
	added: {
		type: Date,
		default: Date.now()
	},
	nickname: {
		type: String
	},
	displayName: {
		type: String
	}
});

const Plants = mongoose.model("Plants", PlantSchema);

module.exports = Plants;
