import React, { Component } from "react";
import API from "../../utils/API";
import Button from "@material-ui/core/Button";
import RegLogo from "../../assets/images/regLogo.png";
import "./style.css";


import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
	container: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
	input: {
	  margin: theme.spacing.unit,
	},
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
			.then(res => console.log(`You are logged in ${this.state.firstName}`))
			.catch(err => console.log(err));
	};

	render() {
		// Notice how each input has a `value`, `name`, and `onChange` prop
		console.log("Register");
		return (
			<>
				<img className="regLogo" src={RegLogo} alt="Registration Logo"/>
				<h1 className="regText">Register
				<hr></hr>
				</h1>
				

				<form className="form">
					<TextField
						  id="outlined-name-input"
						  label="name"
						  type="name"
						  name="name"
						  autoComplete="name"
						  margin="normal"
						  variant="outlined"
							required
							errorText="This field is required"
							/>
						<br/>
		<TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
		  variant="outlined"
		  required
	      errorText="This field is required"
        />
					<br/>
		<TextField
          id="outlined-email-input"
          label="Password"
          type="password"
          name="password"
          autoComplete="password"
          margin="normal"
		  variant="outlined"
		  required
		  errorText="This field is required"
        />
					<br/><br/>
					<Button className="submitBtn" variant="contained" color="inherit" onClick={this.handleFormSubmit}>Submit</Button>
				</form>
			</>
		);
	}
}

export default withStyles(styles)(Form);

