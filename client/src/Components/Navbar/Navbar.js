import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "./Navbar.css";
import Grid from "@material-ui/core/Grid";

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

function ButtonAppBar(props) {
  const { classes } = props;
  return (
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
                  <path opacity=".3" d="M7 10.19V18h2v-6h6v6h2v-7.81l-5-4.5z" />
                </svg>
              </IconButton>
              {/* Identify Button */}
              <Button color="inherit">Identify</Button>
              {/* Manage Button */}
              <Button color="inherit">Manage</Button>
              {/* Calender Button */}
              <Button color="inherit">Calender</Button>
            </Grid>


            {/* Navbar Text */}
            <Grid item>
              {/* Login Button */}
              <Button
                classes={{ label: "loginBtn" }}
                className="loginBtn"
                color="inherit">
                Login
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
