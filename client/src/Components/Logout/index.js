import React, { Component } from "react";
import { Redirect } from "react-router";

import Button from "@material-ui/core/Button";

// import "./style.css";

class Logout extends Component {
	handleFormSubmit = event => {
		localStorage.removeItem("x-auth-token");
	};

	render() {
		return (
			<Button
				href="/"
				className="submitBtn"
				variant="contained"
				color="inherit"
				onClick={this.handleFormSubmit}
			>
				Logout
			</Button>
		);
	}
}

export default Logout;
