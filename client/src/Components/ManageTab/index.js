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
    const { id } = decode(localStorage.getItem("x-auth-token"));
    API.getUserGarden(id).then(res => {
      this.setState({ garden: res.data.filter(dat => dat.owner === id) });
      console.log(this.state.garden)
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
              {this.state.garden !== null && this.state.garden !== undefined && this.state.garden.length !== 0 ? (
                <PlantTileWrap>
                  {this.state.garden &&
                    this.state.garden.map(plant => (
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
              ) : (
                <>
                  <h1>No Plants Here! Identify a Plant to Get Started!</h1>
                </>
              )}
            </div>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default ManageTab;
