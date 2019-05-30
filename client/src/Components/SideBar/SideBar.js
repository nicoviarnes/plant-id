import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import SideLogin from "../SideLogin/index";
import SideRegister from "../SideRegister/index";
import decode from "jwt-decode";

// Icons
import LoginIcon from "../../assets/images/login.png";
import RegisterIcon from "../../assets/images/register.png";
import HomeIcon from "../../assets/images/home.png";
import IdentifyIcon from "../../assets/images/magnify.png";
import ManageIcon from "../../assets/images/sprout.png";
import CalendarIcon from "../../assets/images/calendar.png";
import LogoutIcon from "../../assets/images/logout.png";
import "./sideBar.css";

import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

// const useStyles = makeStyles({
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// });
const handleFormSubmit = event => {
	localStorage.removeItem("x-auth-token");
};

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

function SwipeableTemporaryDrawer() {
	//   const classes = useStyles();
	const [state, setState] = React.useState({
		left: false
	});

	const [open, setOpen] = React.useState(false);
	const [open1, setOpen1] = React.useState(false);
	function handleClick() {
		setOpen(!open);
	}
	function handleClick1() {
		setOpen1(!open1);
	}

	const toggleDrawer = (side, open) => event => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [side]: open });
	};

	const sideList = side => (
		<div
			className="sideBarWrapper"
			//   className={classes.list}
			role="presentation"
			//   onClick={toggleDrawer(side, false)}
			//   onKeyDown={toggleDrawer(side, false)}
		>
			<List>
				{/* Home Btn */}
				<a className="menuLink" href="/">
					<MenuItem>
						<ListItemIcon>
							<img src={HomeIcon} alt="Login Icon" />
						</ListItemIcon>
						<ListItemText className="sideText">Home</ListItemText>
					</MenuItem>
				</a>
				<Divider />
				{checkAuth() ? (
					<>
						{/* Identify Btn */}
						<a className="menuLink" href="/id">
							<MenuItem>
								<ListItemIcon>
									<img src={IdentifyIcon} alt="Identify Icon" />
								</ListItemIcon>
								<ListItemText className="sideText" primary="Identify" />
							</MenuItem>
						</a>

						<Divider />

						{/* Manage Btn */}
						<a className="menuLink" href="/manage">
							<MenuItem>
								<ListItemIcon>
									<img src={ManageIcon} alt="Manage Icon" />
								</ListItemIcon>
								<ListItemText className="sideText" primary="Manage" />
							</MenuItem>
						</a>
						<Divider />

						{/* Calendar Btn */}
						<a className="menuLink" href="/calendar">
							<MenuItem>
								<ListItemIcon>
									<img src={CalendarIcon} alt="Calendar Icon" />
								</ListItemIcon>
								<ListItemText className="sideText" primary="Calendar" />
							</MenuItem>
						</a>
						<Divider />

						<a onClick={handleFormSubmit} className="menuLink" href="/">
							<MenuItem>
								<ListItemIcon>
									<img src={LogoutIcon} alt="Calendar Icon" />
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</MenuItem>
						</a>
					</>
				) : (
					<div>
						{/* Login Collapse */}
						<ListItem button onClick={handleClick}>
							<ListItemIcon>
								<img src={LoginIcon} alt="Login Icon" />
							</ListItemIcon>
							<ListItemText className="sideText collapseItem" primary="Login" />
							{open ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItem button>
									<SideLogin />
								</ListItem>
							</List>
						</Collapse>

						{/* Register Collapse */}
						<Divider />
						<ListItem button onClick={handleClick1}>
							<ListItemIcon>
								<img src={RegisterIcon} alt="Register Icon" />
							</ListItemIcon>
							<ListItemText className="sideText" primary="Register" />
							{open1 ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={open1} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItem button>
									<ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
									{/* <ListItemText primary="Starred" /> */}
									<SideRegister />
								</ListItem>
							</List>
						</Collapse>
					</div>
				)}
			</List>
		</div>
	);

	//   Mobile Button
	return (
		<div className="mobileMenu">
			<IconButton
				onClick={toggleDrawer("left", true)}
				aria-label="More"
				aria-haspopup="true"
			>
				<MoreVertIcon />
			</IconButton>

			{/* <Button className="mobileMenu" onClick={toggleDrawer('left', true)}>Open Left</Button> */}
			<SwipeableDrawer
				open={state.left}
				onClose={toggleDrawer("left", false)}
				onOpen={toggleDrawer("left", true)}
			>
				{sideList("left")}
			</SwipeableDrawer>
		</div>
	);
}

export default SwipeableTemporaryDrawer;
