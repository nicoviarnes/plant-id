import React, { Component } from "react";
import API from "../../utils/API";
import Button from "@material-ui/core/Button";
import "./style.css";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
	container: {
		display: "flex",
		flexWrap: "wrap"
	},
	input: {
		margin: theme.spacing.unit
	}
});

class Form extends Component {
	// Setting the component's initial state
	state = {
		name: "",
		email: "",
		password: ""
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		API.userRegister({
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		})
			.then(res => {
				API.userLogin({
					email: this.state.email,
					password: this.state.password
				})
					.then(res => {
						localStorage.setItem("x-auth-token", res.data.token);
						window.location.href = "/";
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	};

	render() {
		// Notice how each input has a `value`, `name`, and `onChange` prop
		console.log("Register");
		return (
			<>
				<form className="form">
					<TextField
						id="outlined-name-input"
						label="Name"
						type="name"
						name="name"
						onChange={this.handleInputChange}
						autoComplete="name"
						margin="normal"
						variant="outlined"
						required
						errortext="This field is required"
					/>
					<br />
					<TextField
						id="outlined-email-input"
						label="Email"
						type="email"
						name="email"
						onChange={this.handleInputChange}
						autoComplete="email"
						margin="normal"
						variant="outlined"
						required
						errortext="This field is required"
					/>
					<br />
					<TextField
						id="outlined-password-input"
						label="Password"
						type="password"
						name="password"
						onChange={this.handleInputChange}
						autoComplete="password"
						margin="normal"
						variant="outlined"
						required
						errortext="This field is required"
					/>
					<br />
					<br />
					<Button
						className="submitBtn"
						variant="contained"
						color="inherit"
						onClick={this.handleFormSubmit}
					>
						Register
					</Button>
				</form>
			</>
		);
	}
}

export default withStyles(styles)(Form);
