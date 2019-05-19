import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import "./mobileMenu.css";

// Mobile Menu 
const options = [
	"Home", "I.D.", "Manage", "Calendar", "Login", "Register", "Logout"
]

const ITEM_HEIGHT = 58;

class MobileMenu extends React.Component {
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
      const open = Boolean(anchorEl);
  
      return (
        <div className="menuWrapper">
          <IconButton
            aria-label="More"
            aria-owns={open ? 'long-menu' : undefined}
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
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 200,
              },
            }}
          >
            {options.map(option => (
              <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      );
    }
  }
  
  export default MobileMenu;