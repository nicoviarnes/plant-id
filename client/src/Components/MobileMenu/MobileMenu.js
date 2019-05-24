import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";

import "./mobileMenu.css";

import decode from "jwt-decode";
import Form from "../Form/index";
import Login from "../Login/index";
import Logout from "../Logout/index";
import Modal from "react-modal";
import { ModalProvider, ModalConsumer } from "../LoginModal/ModalContext";
import ModalRoot from "../LoginModal/ModalRoot";

// Register Modal
const Modal1 = ({ onRequestClose, ...otherProps }) => (
  <div className="modalWrapperMobile">
    <Modal
      isOpen
      onRequestClose={onRequestClose}
      {...otherProps}
      ariaHideApp={false}
    >
      {/* <div className="modalOne"> */}
        <Form />
        {/* <Button
					variant="contained"
					className="modalClose"
					color="secondary"
					onClick={onRequestClose}
				>
					close
				</Button> */}
      {/* </div> */}
    </Modal>
  </div>
);

// Login Modal
const mobileLogin = ({ onRequestClose, foo, ...otherProps }) => (
  <div className="modalWrapperMobile">
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

const checkAuth = () => {
  const token = localStorage.getItem("x-auth-token");
  if (!token) {
    return false;
  } else {
    //Get expiration and id of user from token
    const { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  }
  return true;
};



// Mobile Menu
const options = [
  // {checkAuth() ? ( <Logout/>): (

//   <Button className="menuBtn" href="/">
//     Home
//   </Button>,
//   <Button className="menuBtn" href="/id">
//     Identify
//   </Button>,
//   <Button className="menuBtn" href="/manage">
//     Manage
//   </Button>,
//   <Button className="menuBtn" href="/calendar">
//     Calendar
//   </Button>,

//   <ModalProvider>
//     <ModalRoot />
//     <ModalConsumer>
//       {({ showModal }) => (
//         <Fragment>

//           {/* Login Button */}
//           <Button
//             classes={{ label: "loginBtnMobile" }}
//             className="loginBtnMobile"
//             color="inherit"
//             onClick={() => showModal(mobileLogin)}
//           >
//             Login
//           </Button>

//           {/* Register Button */}
//           <Button
//             classes={{ label: "regBtnMobile" }}
//             className="regBtnMobile"
//             color="inherit"
//             onClick={() => showModal(Modal1)}
//           >
//             Register
//           </Button>
//         </Fragment>
//       )}
//     </ModalConsumer>
//   </ModalProvider>


    <a href="/" className="menuBtn">Home</a>,
    <a href="/id" className="menuBtn">Identify</a>,
    <a href="/manage" className="menuBtn">Manage</a>,
    <a href="/calendar" className="menuBtn">Calendar</a>,

    <ModalProvider>
    <ModalRoot />
    <ModalConsumer>
      {({ showModal }) => (
        <Fragment>

          {/* Login Button */}
          <a
            classes={{ label: "loginBtnMobile" }}
            className="loginBtnMobile"
            color="inherit"
            onClick={() => showModal(mobileLogin)}
          >
            Login
          </a>

          {/* Register Button */}
          <a
            cllabelsses={{ label: "regBtnMobile" }}
            className="regBtnMobile"
            color="inherit"
            onClick={() => showModal(Modal1)}
          >
            Register
          </a>
        </Fragment>
      )}
    </ModalConsumer>
  </ModalProvider>

];


// const ITEM_HEIGHT = 58;

class MobileMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className="menuWrapper">
        <IconButton
          aria-label="More"
          aria-owns={open ? "long-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
            //   maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          {options.map(option => (
            <MenuItem
              key={option}
              selected={option === "Pyxis"}
              onClick={this.handleClose}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default MobileMenu;
