import React, {Component} from "react";
import "./style.css";
import Grid from "@material-ui/core/Grid";

import TestCollection from "../../TestCollection.json";
import PlantTab from "../PlantTab/index";
import PlantTileWrap from "../PlantTileWrap/index";



class ManageTab extends Component {
   
state = {
    
}

clickedPlant = id => {
        
    console.log("you clicked");
    console.log(id);
}    
    
    render(){

        return (
            <>
                <Grid container>
                    <Grid item sm={12}>
                        <div className="content-wrap">
                            <h1>this is hidden by the navbar</h1>
                            <div className="bg"></div>
                            <h1 className="main-title">My Garden</h1>
                            <PlantTileWrap>
                                {TestCollection.map(plant =>
                                    <PlantTab
                                        key={plant.id}
                                        id={plant.id}
                                        image={plant.image}
                                        scientific={plant.scientific}
                                        nickname={plant.nickname}
                                        daysSince={plant.daysSince}
                                        // clickedPlant={this.clickedPlant}
                                        onClick={this.clickedPlant}
                                                                            
                                        />
                                    )}
                            </PlantTileWrap>
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }    
}

export default ManageTab;