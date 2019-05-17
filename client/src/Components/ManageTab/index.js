import React, { Component } from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";

import PlantTab from "../PlantTab/index";
import PlantTileWrap from "../PlantTileWrap/index";
import decode from "jwt-decode";

import API from "../../utils/API";

class ManageTab extends Component {
  state = {
    garden: null
  };

  componentWillMount() {
   // const UID = localStorage.getItem("user-id");
    const { id } = decode(localStorage.getItem("x-auth-token"));
   // console.log(UID);
    API.getUserGarden(id).then(res => {
      //console.log(res.data.filter(dat => dat.owner === UID))
      this.setState({garden: res.data.filter(dat => dat.owner === id)})
      //console.log("hello?")
    });

  }

  render() {
    return (
      <>
        <Grid container>
          <Grid item sm={12}>
            <div className="content-wrap">
              <div className="bg" />
              <h1 className="main-title">My Garden</h1>
              <PlantTileWrap>
                {this.state.garden && this.state.garden.map(plant => (
                  <PlantTab
                    key={plant._id}
                    id={plant._id}
                    image={plant.url}
                    scientific={plant.name}
                    nickname={plant.name}
                    daysSince={plant.daysSince}
                    plantInfo={plant.plantInfo}
                  />
                ))}
              </PlantTileWrap>
            </div>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default ManageTab;
