import React from 'react';
import Navbar from '../Navbar/Navbar';
import SplashBG from "../../assets/images/small.jpg";
import './homePage.css';




import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';




const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);





function HomePage() {
    return (
      <div className="App">
      <Navbar/>
        <div>
            <img className="splashImg" src={SplashBG} alt="splashImg"/>
            <h1 className="titleName">Name</h1>
        </div>
        <div className="body">
        <br/>
            <div className="aboutBody">
                <h2>About</h2>
                <hr/>
                <p>Welcome too appname! Do you ever wonder what that plant was you recieved as a house warming gift? Or do you have a hard time remembering when all your plants need to be feed and watered? Well worry no more! This App can help identify your plants via your own pictures and setup a feeding and watering schedule for your plants! Being a plant owner has never been so easy!</p>
            </div>
            <br/> <br/> <br/>
            <div className="docBody">
                <h2>Documentation</h2>
                <hr/>
                <p>This application can help you identify, store, and manage your plants in one easy place.</p>
            </div>
        <div className="footer">
          <Table>
        <TableHead>
          <TableRow> Hello
            {/* <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat (g)</TableCell>
            <TableCell align="right">Carbs (g)</TableCell> */}
            {/* <CustomTableCell align="center">Created By</CustomTableCell> */}
          </TableRow>
        </TableHead>
        </Table>
        </div>
        </div>
      </div>
    );
  }
  
  export default HomePage;
  