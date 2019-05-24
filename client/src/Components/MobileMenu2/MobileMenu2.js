import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./mobileMenu2.css";




import decode from "jwt-decode";
import Form from "../Form/index";
import Login from "../Login/index";
import Logout from "../Logout/index";
import Modal from "react-modal";
import { ModalProvider, ModalConsumer } from "../LoginModal/ModalContext";
import ModalRoot from "../LoginModal/ModalRoot";


// Register Modal
// const Modal1 = ({ onRequestClose, ...otherProps }) => (
//     <div className="modalWrapperMobile">
//       <Modal
//         isOpen
//         onRequestClose={onRequestClose}
//         {...otherProps}
//         ariaHideApp={false}
//       >
//         {/* <div className="modalOne"> */}
//           <Form />
//           {/* <Button
//                       variant="contained"
//                       className="modalClose"
//                       color="secondary"
//                       onClick={onRequestClose}
//                   >
//                       close
//                   </Button> */}
//         {/* </div> */}
//       </Modal>
//     </div>
//   );
  
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









class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div className="rootDiv">


<IconButton
          aria-label="More"
        //   aria-owns={open ? "long-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <a href="/">
          <MenuItem onClick={this.handleClose}>Home</MenuItem>
          </a>
          <a href="/id">
          <MenuItem onClick={this.handleClose}>Identify</MenuItem>
          </a>
          <a href="/manage">
          <MenuItem onClick={this.handleClose}>Manage</MenuItem>
          </a>
          <a href="/calendar">
          <MenuItem onClick={this.handleClose}>Calendar</MenuItem>
          </a>







        <ModalProvider>
    <ModalRoot />
    <ModalConsumer>
      {({ showModal }) => (
          <Fragment>

          {/* Login Button */}
          {/* <a> */}
              <MenuItem
            className="loginBtnMobile"
            onClick={() => 
                {  
                    // this.handleClose();

                        showModal(mobileLogin);
                }
            }
            >
                        
                            
            Login
              </MenuItem>
          {/* </a> */}
          {/* Register Button */}
          <a>
              <MenuItem
            className="loginBtnMobile"
            onClick={() => showModal(mobileLogin)}
            >
            Register
            </MenuItem>
          </a>
        </Fragment>
      )}
    </ModalConsumer>
  </ModalProvider>
      </Menu>









      </div>
    );
  }
}

export default SimpleMenu;