import React from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import "./style.css";
import wateringCan from "../../assets/images/wateringCan.png";
import moment from "moment";

class PlantTab extends React.Component {
  state = {
    info: null,
    watered: "",
    wateringInterval: "",
    fed: "",
    feedingInterval: "",
    plantId: "",
    notes: null,
    prevNotes: null
  };

  water = id => {
    var date = moment().format("MMMM Do YYYY, h:mm:ss a");
    API.waterPlant({ id, date }).then(res => {
      this.setState({ watered: date });
      return console.log(res);
    });
  };

  feed = id => {
    var date = moment().format("MMMM Do YYYY, h:mm:ss a");
    API.feedPlant({ id, date }).then(res => {
      this.setState({ fed: date });
      return console.log(res);
    });
  };

  componentWillMount() {
    const plantID = this.props.id;
    API.getUserPlant(plantID).then(res => {
      this.setState({ plantId: plantID });
      this.setState({ info: res.data.filter(dat => dat._id === plantID) });
      this.setState({ watered: this.state.info && this.state.info[0].watered });
      this.setState({ fed: this.state.info && this.state.info[0].fed });
      this.setState({
        feedingInterval: this.state.info && this.state.info[0].feedingInterval
      });
      this.setState({
        wateringInterval: this.state.info && this.state.info[0].wateringInterval
      });
    });
  }

  render() {
    const waterStyle = {
      display: "inline-block",
      position: "absolute",
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      marginLeft: "22%",
      bottom: 0,
      marginBottom: "20px"
    };
    const feederStyle = {
      display: "inline-block",
      position: "absolute",
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      marginLeft: "56%",
      bottom: 0,
      marginBottom: "20px"
      // backgroundColor: "#70ef76",
    };

    // get current day
    var date = moment().format("MM-DD-YYYY");

    if (this.state.watered && this.state.wateringInterval !== null) {
      var date2 = this.state.watered.split(",");

      var lastWatered = moment(date2[0], "MMMM Do YYYY");
      lastWatered = lastWatered.format("MM-DD-YYYY");
      var waterDate = moment(lastWatered, "MM-DD-YYYY")
        .add(this.state.wateringInterval, "days")
        .format("MM-DD-YYYY");
      var dying = moment(waterDate)
        .add(3, "d")
        .format("MM-DD-YYYY");

      if (moment(date).isBetween(lastWatered, waterDate, null, [])) {
        waterStyle.backgroundColor = "#70ef76";
      } else if (moment(date).isAfter(dying)) {
        waterStyle.backgroundColor = "red";
      } else if (moment(date).isAfter(waterDate)) {
        waterStyle.backgroundColor = "yellow";
      }
    } else {
      waterStyle.backgroundColor = "#70ef76";
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of Watering~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if (this.state.fed) {
      var dateSplitF = this.state.fed.split(",");
      var lastFed = moment(dateSplitF[0], "MMMM Do YYYY");
      lastFed = lastFed.format("MM-DD-YYYY");
    }

    var fedDate = moment(lastFed, "MM-DD-YYYY")
      .add(this.state.feedingInterval, "days")
      .format("MM-DD-YYYY");

    if (this.state.fed && this.state.feedingInterval !== null) {
      var starve = moment(fedDate)
        .add(3, "d")
        .format("MM-DD-YYYY");
      // console.log("Dying", starve);
      // console.log(`Starve If "${date}" is after "${starve}"`);

      if (moment(date).isBetween(lastFed, fedDate, null, [])) {
        feederStyle.backgroundColor = "#70ef76"; //green
      } else if (moment(date).isAfter(starve)) {
        feederStyle.backgroundColor = "red";
      } else if (moment(date).isAfter(fedDate)) {
        feederStyle.backgroundColor = "yellow";
      }
    } else {
      feederStyle.backgroundColor = "#70ef76"; //green
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of Feeding~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    return (
      <>
        <div className="card-wrap">
          <Link
            to={{
              pathname: `/manage/plant/${this.props.id}`,
              state: {
                plantData: "plant db object goes here"
              }
            }}
            className="plantInfo"
          >
            <div className="img-container">
              <img
                className="thumb"
                alt={this.props.id}
                src={this.props.image}
              />
            </div>
            <div className="tile-content">
              <p className="nickname">{this.props.nickname}</p>
            </div>
          </Link>
          <div className="careButtons">
            <div className="water" style={waterStyle}>
              <img
                className="wateringCan"
                src={wateringCan}
                onClick={() => this.water(this.props.id)}
                alt="watering Can"
              />
            </div>
            <div className="feeder" style={feederStyle}>
              <img
                className="feedCan"
                src={
                  "https://cdn3.iconfinder.com/data/icons/ecology-caramel-vol-1/512/FERTILIZE_THE_PLANTS-512.png"
                }
                onClick={() => this.feed(this.props.id)}
                alt="feeding Can"
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PlantTab;
