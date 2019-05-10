import axios from "axios";

export default {
	// Saves a book to the database
	userRegister: function(data) {
		console.log("hello")
		return axios.post("/api/users", data);
	}
};
