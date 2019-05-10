import React, { Component } from "react";
import API from "../../utils/API";

// import "./style.css";

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
    return (
      <div>
        <form className="form">
          <input
            name="name"
            type="text"
            onChange={this.handleInputChange}
            placeholder="Name"
          />

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

export default Form;
