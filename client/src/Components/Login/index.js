import React, { Component } from "react";
import API from "../../utils/API";

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
			.then(res => localStorage.setItem("x-auth-token", res.data.token))
			// this.props.history.push("/protected"
			.catch(err => console.log(err));
	};

	render() {
		// Notice how each input has a `value`, `name`, and `onChange` prop
		console.log("Login");
		return (
			<div className="test">
				<form className="form">
					<input
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
					/>
					<button onClick={this.handleFormSubmit}>Submit</button>
				</form>
			</div>
		);
	}
}

export default Login;
