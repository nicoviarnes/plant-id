import axios from "axios";

export default {
	// Saves a book to the database
	userRegister: function(data) {
		return axios.post("/api/users", data);
	},

	userLogin: function(data) {
		return axios.post("/api/auth", data);
	},

	addUserPlant: function(data) {
		return axios.post("/api/addplant", data);
	},

	getUserGarden: function(data) {
		return axios.get("/api/garden", data);
	},

	getUserPlant: function(data) {
		return axios.get("/api/plant", data);
	},
	addPlantNote: function(data) {
		return axios.post("/api/addnote", data);
	},
	getPlantNote: function(data) {
		return axios.get("/api/notes", data);
	},
	delPlantNote: function(data) {
		return axios.post("/api/notes/remove", data);
	},
	removePlant: function(data) {
		return axios.post("/api/removeplant", data);
	},
	waterPlant: function(data) {
		return axios.post("/api/waterplant", data);
	},
	feedPlant: function(data) {
		return axios.post("/api/feedplant", data);
	},
	setWateringInterval: function(data) {
		return axios.post("/api/wateringinterval", data);
	},
	setFeedingInterval: function(data) {
		return axios.post("/api/feedinginterval", data);
	},
	setNickname: function(data) {
		return axios.post("/api/nickname", data);
	},
};
