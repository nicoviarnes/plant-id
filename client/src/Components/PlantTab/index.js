import React from "react";
import API from "../../utils/API"
import { Link } from "react-router-dom";
import "./style.css";
import wateringCan from "../../assets/images/wateringCan.png";
import moment from "moment"

const water = (id) => {
  //event.preventDefault();
  var date = moment().format("MMM Do")
  API.waterPlant({id, date}).then(res => {
    console.log(res)
  })

};

function PlantTab(props) {
  return (
    <>
      <div className="card-wrap">
        <Link
          to={{
            pathname: `/manage/plant/${props.id}`,
            state: {
              plantData: "plant db object goes here"
            }
          }}
          className="plantInfo"
        >
          <div className="img-container">
            <img className="thumb" alt={props.id} src={props.image} />
          </div>
          <div className="tile-content">
            {/* <p>Scientific Name:{props.scientific}</p> */}
            <p className="nickname">{props.nickname}</p>
            {/* <p>Last Watering: {props.daysSince}</p> */}
          </div>
        </Link>
        <div className="water">
          <img
            className="wateringCan"
            src={wateringCan}
            onClick={() => water(props.id)}
            alt="watering Can"
          />
        </div>
      </div>
    </>
  );
}

export default PlantTab;
