import React, { Component } from "react";
import API from "../../utils/API";
import Button from "@material-ui/core/Button";
import RegLogo from "../../assets/images/regLogo.png";
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
		password: "",
		nameError:"",
		emailError:"",
		passwordError:"",
		failedError:""
	};
	
	validate = () => {
		let nameError = "";
		let emailError = "";
		let passwordError = "";
		

		if(!this.state.email.includes("@")){
			emailError = "Please choose a valid email address!"
		}
		if(!this.state.email.includes(".com")){
			emailError = "Please choose a valid email address!"
		}
		if(this.state.password.length<6){
			passwordError = "Please choose a password of at least 6 characters"
		}
		if(this.state.name.length<1){
			nameError = "Please choose a name!"
		}

		if(emailError || passwordError || nameError){
			this.setState({
				emailError,
				passwordError,
				nameError
				
			});
			return false;

		}
		return true;
	}

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		let isValid = this.validate();
		if(isValid){
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
		} else {
			let failedError = "Registration Failed!";
			
			this.setState({
				failedError
			});
		}	
	};

	render() {
		// Notice how each input has a `value`, `name`, and `onChange` prop
		console.log("Register");
		return (
			<>
				<img className="regLogo" src={RegLogo} alt="Registration Logo" />
				<h1 className="regText">
					Register
					<hr />
				</h1>

				<form className="form">
				<div className="login-failed">{this.state.failedError}</div>
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
					<div className="errorStyle">{this.state.nameError}</div>
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
					<div className="errorStyle">{this.state.emailError}</div>
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

export default withStyles(styles)(Form);
