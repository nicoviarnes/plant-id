import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import wateringCan from "../../assets/images/wateringCan.png";

// const clickedPlant = id => {
//   console.log("you clicked");
//   console.log(id);
// };

function PlantTab(props) {
  return (
    <>
      <Link
        to={{
          pathname: `/manage/plant/${props.id}`,
          state: {
            plantData: "plant db object goes here"
          }
        }}
        className="plantInfo"
      >
        <div className="card-wrap">
          <div className="img-container">
            <img className="thumb" alt={props.id} src={props.image} />
          </div>
          <div className="tile-content">
            {/* <p>Scientific Name:{props.scientific}</p> */}
            <p className="nickname">{props.nickname}</p>
            {/* <p>Last Watering: {props.daysSince}</p> */}
            <div className="water">
              <img
                className="wateringCan"
                src={wateringCan}
                alt="watering Can"
              />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default PlantTab;
