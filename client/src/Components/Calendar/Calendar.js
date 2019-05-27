import React from "react";
import Navbar from "../Navbar/Navbar";
import Calendar from "react-calendar";
import "./calendar.css";

import waterIcon from "../../assets/images/waterIcon.png";
import seedIcon from "../../assets/images/seedIcon.png";

class CalendarPage extends React.Component {
    state = {
      date: new Date(),
    }
    onChange = date => this.setState({ date })
    

    render(){
    return(
        <div className="calendarBody">
        <Navbar/>
        <br></br>
        <Calendar
            onChange={this.onChange}
            value={this.state.date}
            calendarType = {"US"}
            // showNavigation={false}
            tileContent={
                <>
                    <br/><br/>
                    <div className="imageDiv">
                        <img className="waterIcon" src={waterIcon} alt="Water Icon"></img>
                    
                        <img className="seedIcon" src={seedIcon} alt="Feed Icon"></img>
                    </div>
                </>
            }
            // tileContent={<img src={seedIcon}></img>}
/>
        </div>
    )
}
}

export default CalendarPage;