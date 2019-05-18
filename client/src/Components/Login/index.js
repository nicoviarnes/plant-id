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
				localStorage.setItem("x-auth-token", res.data.token);
				// localStorage.setItem("user-id", res.data.user.id)
			})
			// this.props.history.push("/protected"
			.catch(err => console.log(err));
	};

	render() {
		// Notice how each input has a `value`, `name`, and `onChange` prop
		console.log("Login");
		return (
			<div className="test">
				<img className="loginLogo" src={Logo} alt="logo" />
				<h3 className="loginText">
					Login
					<hr className="loginHr" />
				</h3>
				<form className="form">
					{/* <input
						name="email"
						type="text"
						onChange={this.handleInputChange}
						placeholder="Email"
					/>
					<input
						name="password"
						type="password"
						onChange={this.handleInputChange}
						placeholder="Enter a password"
					/> */}
					<TextField
						id="outlined-name-input"
						label="Email"
						type="email"
						name="email"
						autoComplete="email"
						onChange={this.handleInputChange}
						margin="normal"
						variant="outlined"
						required
						errorText="This field is required"
					/>
					<br />
					<TextField
						id="outlined-name-input"
						label="Password"
						type="password"
						name="password"
						autoComplete="password"
						onChange={this.handleInputChange}
						margin="normal"
						variant="outlined"
						required
						errorText="This field is required"
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
			</div>
		);
	}
}

export default Login;
