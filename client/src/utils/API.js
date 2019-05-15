import axios from "axios";

export default {
	// Saves a book to the database
	userRegister: function(data) {
		return axios.post("/api/users", data);
	},

	userLogin: function(data) {
		return axios.post("/api/auth", data);
	}
};
