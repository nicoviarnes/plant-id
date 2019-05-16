import React, { Component } from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";

import TestCollection from "../../TestCollection.json";
import PlantTab from "../PlantTab/index";
import PlantTileWrap from "../PlantTileWrap/index";

import API from "../../utils/API";

class ManageTab extends Component {
  state = {};

  componentDidMount() {
    API.getUserGarden();
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
                {TestCollection.map(plant => (
                  <PlantTab
                    key={plant.id}
                    id={plant.id}
                    image={plant.image}
                    scientific={plant.scientific}
                    nickname={plant.nickname}
                    daysSince={plant.daysSince}
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
