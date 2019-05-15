import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Components/HomePage/HomePage";
import IDpage from "./Components/IDpage/index";
import ManageTab from "./Components/ManageTab/index";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SimpleModalWrapped from "./Components/LoginModal/LoginModal";

import Login from "./Components/Login";
import Form from "./Components/Form";
import Protected from "./Components/Protected";

//Decode JWT
import decode from "jwt-decode";

const checkAuth = () => {
	const token = localStorage.getItem("x-auth-token");
	if (!token) {
		return false;
	}

	try {
		//Get expiration and id of user from token
		const { exp, id } = decode(token);
		if (exp < new Date().getTime() / 1000) {
			return false;
		}
	} catch (err) {
		return false;
	}

	return true;
};

const AuthRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			checkAuth() ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: "/login" }} />
			)
		}
	/>
);

function App() {
	// const id = localStorage.getItem("x-auth-token");

	return (
		<div className="App">
			<Navbar />
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={HomePage} />
					{/* <Route path="/login" component={SimpleModalWrapped} /> */}
					<Route path="/ID" component={IDpage} />
					<Route path="/Manage" component={ManageTab} />

					<Route path="/login" component={Login} />
					<Route path="/register" component={Form} />
					{/* Protected Routes */}
					<AuthRoute exact path="/auth" component={Protected} />

					{/* 					<AuthRoute
						exact
						path="/auth"
						component={props => <Protected id={id} props={props} />}
					/> */}
				</Switch>
			</BrowserRouter>
			{/* <SimpleModalWrapped /> */}
		</div>
	);
}

export default App;
