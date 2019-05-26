import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import "./Navbar.css";
import Grid from "@material-ui/core/Grid";
import Form from "../Form/index";
import Login from "../Login/index";
import Logout from "../Logout/index";
import decode from "jwt-decode";

import Modal from "react-modal";
import { ModalProvider, ModalConsumer } from "../LoginModal/ModalContext";
import ModalRoot from "../LoginModal/ModalRoot";

// Register Modal
const Modal1 = ({ onRequestClose, ...otherProps }) => (
	<div className="modalWrapper">
		<Modal
			isOpen
			onRequestClose={onRequestClose}
			{...otherProps}
			ariaHideApp={false}
		>
			<div className="modalOne">
				<Form />
				{/* <Button
					variant="contained"
					className="modalClose"
					color="secondary"
					onClick={onRequestClose}
				>
					close
				</Button> */}
			</div>
		</Modal>
	</div>
);

// Login Modal
const Modal2 = ({ onRequestClose, foo, ...otherProps }) => (
	<div className="modalWrapper">
		<Modal
			isOpen
			onRequestClose={onRequestClose}
			{...otherProps}
			ariaHideApp={false}
		>
			<div className="modalOne">
				<Login />
				{/* <Button
					variant="contained"
					className="modalClose"
					color="secondary"
					onClick={onRequestClose}
				>
					close
				</Button> */}
			</div>
		</Modal>
	</div>
);

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	}
});

const checkAuth = () => {
	const token = localStorage.getItem("x-auth-token");
	if (!token) {
		return false;
	} else {
		//Get expiration and id of user from token
		const { exp } = decode(token);
		if (exp < Date.now() / 1000) {
			return false;
		}
	}
	return true;
};

function ButtonAppBar(props) {
	const { classes } = props;

	return (
		<>
			<div className={classes.root}>
				<Grid container className="navGrid">
					<AppBar className="navBar" position="static">
						<Toolbar>
							<Grid className="leftMenu" item xs={12}>
								<IconButton href="/" className={classes.root}>
									{/* Home Button */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
									>
										<path fill="none" d="M0 0h24v24H0V0z" />
										<path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm5 15h-2v-6H9v6H7v-7.81l5-4.5 5 4.5V18z" />
										<path
											opacity=".3"
											d="M7 10.19V18h2v-6h6v6h2v-7.81l-5-4.5z"
										/>
									</svg>
								</IconButton>
								{/* Identify Button */}
								<Button className="navBtn" href="/id" color="inherit">
									<span className="navFont">Identify</span>
								</Button>
								{/* Manage Button */}
								<Button className="navBtn" href="/manage" color="inherit">
									<span className="navFont">Manage</span>
								</Button>
								{/* Calender Button */}
								<Button className="navBtn" href="/calendar" color="inherit">
									<span className="navFont">Calendar</span>
								</Button>
							</Grid>

							{/* Navbar Text */}
							<Grid item>
								{checkAuth() ? (
									<Logout />
								) : (
									<ModalProvider>
										<ModalRoot />
										<ModalConsumer>
											{({ showModal }) => (
												<Fragment>
													{/* Login Button */}
													<Button
														classes={{ label: "loginBtn" }}
														className="loginBtn"
														color="inherit"
														onClick={() => showModal(Modal2)}
													>
														<span className="navFont">Login</span>
													</Button>

													{/* Register Button */}
													<Button
														classes={{ label: "loginBtn" }}
														className="loginBtn"
														color="inherit"
														onClick={() => showModal(Modal1)}
													>
														<span className="navFont">Register</span>
													</Button>
												</Fragment>
											)}
										</ModalConsumer>
									</ModalProvider>
								)}
							</Grid>
						</Toolbar>
					</AppBar>
				</Grid>
			</div>

			{/* <ModalProvider>
    <ModalRoot />
    <ModalConsumer>
      {({ showModal }) => (
        <Fragment>
          <button onClick={() => showModal(Modal1)}>Open Modal</button>
          <button onClick={() => showModal(Modal2, { foo: 'bar' })}>
            Open Second Modal
          </button>
        </Fragment>
      )}
    </ModalConsumer>
  </ModalProvider> */}
		</>
	);
}

ButtonAppBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
