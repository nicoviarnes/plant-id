import React from "react";
import "./style.css";
import wateringCan from "../../assets/images/wateringCan.png";

// const style = {
//     icon:{width:10, height:20} blake sucks
// }
const clickedPlant = id => {
    console.log("you clicked");
    console.log(id);
};

function PlantTab(props){
    return (
        <>
            <div className="card-wrap" onClick={() => clickedPlant(props.id)}>
                <div className="img-container">
                    <img alt={props.id} src={props.image}/>
                </div>
                <div className="tile-content">
                {/* <p>Scientific Name:{props.scientific}</p> */}
                <p className="nickname">{props.nickname}</p>
                <p>Last Watering: {props.daysSince}</p>
                        {/* <img style={style.icon} src={wateringCan} alt="watering Can"/>    */}
                </div>
                
            </div>
        </>
    )
}

export default PlantTab;