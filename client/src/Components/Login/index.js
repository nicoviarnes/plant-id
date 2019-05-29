import React, { Component } from "react";
import API from "../../utils/API";
import Logo from "../../assets/images/hands.jpg";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "./style.css";

class Login extends Component {
	// Setting the component's initial state
	state = {
		email: "",
		password: "",
		emailError: "",
		passwordError: "",
		failedError: ""
	};

	validate = () => {
		let emailError = "";
		let passwordError = "";

		if (!this.state.email.includes("@")) {
			emailError = "Please choose a valid email address!";
		}
		if (!this.state.email.includes(".com")) {
			emailError = "Please choose a valid email address!";
		}
		if (this.state.password.length < 6) {
			passwordError = "Please choose a password at of least 6 characters";
		}

		if (emailError || passwordError) {
			this.setState({ emailError, passwordError });
			return false;
		}

		return true;
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		let isValid = this.validate();

		if (isValid) {
			API.userLogin({
				email: this.state.email.toLowerCase(),
				password: this.state.password
			})
				.then(res => {
					localStorage.setItem("x-auth-token", res.data.token);
					window.location.href = "/";
				})
				.catch(err => console.log(err));
		} else {
			let failedError = "Login Failed";
			this.setState({ failedError });
		}
	};

	render() {
		return (
			<>
				<img className="loginLogo" src={Logo} alt="logo" />
				<h1 className="loginText">
					Login
					<hr className="loginHr" />
				</h1>
				<form className="form">
					<div className="login-failed">{this.state.failedError}</div>
					<TextField
						id="outlined-name-input"
						label="Email"
						type="text"
						name="email"
						autoComplete="name"
						onChange={this.handleInputChange}
						margin="normal"
						variant="outlined"
						required
						// errorText="This field is required"
					/>
					<div className="errorStyle">{this.state.emailError}</div>
					<br />
					<TextField
						id="outlined-password-input"
						label="Password"
						type="password"
						name="password"
						autoComplete="password"
						margin="normal"
						onChange={this.handleInputChange}
						variant="outlined"
						required
						// errorText="This field is required"
					/>
					<div className="errorStyle">{this.state.passwordError}</div>
					<br />
					<br />
					<Button
						className="submitBtn"
						variant="contained"
						color="inherit"
						onClick={this.handleFormSubmit}
					>
						Submit
					</Button>
				</form>
			</>
		);
	}
}

export default Login;
