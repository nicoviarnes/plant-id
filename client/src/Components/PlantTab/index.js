import React from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import "./style.css";
import wateringCan from "../../assets/images/wateringCan.png";
import moment from "moment";

const water = id => {
  var date = moment().format("MMMM Do YYYY, h:mm:ss a");
  API.waterPlant({ id, date }).then(res => {
    return console.log(res);
  });
};

const feed = id => {
  var date = moment().format("MMMM Do YYYY, h:mm:ss a");
  API.feedPlant({ id, date }).then(res => {
    return console.log(res);
  });
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
            <p className="nickname">{props.nickname}</p>
          </div>
        </Link>
        <div className="careButtons">
        <div className="water">
          <img
            className="wateringCan"
            src={wateringCan}
            onClick={() => water(props.id)}
            alt="watering Can"
          />
        </div>
        <div className="feeder">
          <img
            className="feedCan"
            src={
              "https://cdn3.iconfinder.com/data/icons/ecology-caramel-vol-1/512/FERTILIZE_THE_PLANTS-512.png"
            }
            onClick={() => feed(props.id)}
            alt="feeding Can"
          />
        </div>
        </div>
      </div>
    </>
  );
}

export default PlantTab;
