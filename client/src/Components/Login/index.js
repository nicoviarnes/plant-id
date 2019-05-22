import React, { Component } from "react";
import API from "../../utils/API";
import Logo from "../../assets/images/hands.jpg";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

import "./style.css";

class Login extends Component {
	// Setting the component's initial state
	state = {
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
		API.userLogin({
			email: this.state.email,
			password: this.state.password
		})
			.then(res => {
				localStorage.setItem("x-auth-token", res.data.token)
				window.location.href = "/";
			})
			.catch(err => console.log(err));
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
