import React from "react";
import "./style.css";
import API from "../../utils/API";
import Grid from "@material-ui/core/Grid";

class PlantInfo extends React.Component {
  state = {
    info: null
  };

  componentWillMount() {
    const plantID = this.props.match.params.plant;
    const { plantData } = this.props.location.state;
    this.setState({ info: plantData });
    API.getUserPlant(plantID).then(res => {
      console.log(res.data.filter(dat => dat._id === plantID))
      this.setState({ info: res.data.filter(dat => dat._id === plantID) })
    });
  }

  render() {
    return (
      <>
        <div className="TOP">
          <br />
          <Grid container>
            <Grid item xs={12} sm={12}>
                <h1 className="info-title">{this.state.info && this.state.info[0].name}</h1>
            </Grid>
            <Grid item xs={12} sm={2}>
                
            </Grid>
            <Grid item xs={12} sm={4} >
                <img src={this.state.info[0].url} alt="user uploaded" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="note-wrap">
                <h4 className="note-tag">Add a Note</h4>
                <textarea className="text-area" type="text"/>
                <button type="submit">add note</button>
              </div>
            </Grid>
            <Grid item xs={12} sm={12}>
            <div className="my-notes-wrap">
                    <h2>My Notes</h2>
                    <div className="notes-target">
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} sm={12}>

                {this.state.info[0].plantInfo &&
                  Object.entries(this.state.info[0].plantInfo[0]).map((plant, i) => {
                    return (
                      <li key={i}>
                        {plant[1].header} {plant[1].info}
                      </li>
                    );
                  })
                }
            </Grid>
            
          
            {/* <img src={this.state.info[0].url} alt="user uploaded" /> */}
            </Grid>  
        </div>
      </>
    );
  }
}

export default PlantInfo;
