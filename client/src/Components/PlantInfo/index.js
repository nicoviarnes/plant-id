import React from "react";
import "./style.css";
import API from "../../utils/API";
import Grid from "@material-ui/core/Grid";
import CenteredTabs from "../CenteredTabs";
import wateringCan from "../../assets/images/wateringCan.png";
import moment from "moment";

class PlantInfo extends React.Component {
  state = {
    info: null,
    watered: "",
    wateringInterval: "",
    fed: "",
    feedingInterval: "",
    plantId: "",
    notes: null,
    prevNotes: null,
    sciName: ""
  };

  water = id => {
    var date = moment().format("MMMM Do YYYY, h:mm:ss a");
    const plantID = this.props.match.params.plant;
    console.log(plantID, date);
    API.waterPlant({ id: plantID, date }).then(res => {
      this.setState({ watered: date });
      return console.log(this.state.watered);
    });
  };

  feed = id => {
    var date = moment().format("MMMM Do YYYY, h:mm:ss a");
    const plantID = this.props.match.params.plant;
    console.log(plantID, date);
    API.feedPlant({ id: plantID, date }).then(res => {
      this.setState({ fed: date });
      return console.log(this.state.fed);
    });
  };

  componentWillMount() {
    const plantID = this.props.match.params.plant;
    const { plantData } = this.props.location.state;
    this.setState({ info: plantData });
    API.getUserPlant(plantID).then(res => {
      this.setState({ plantId: plantID });
      this.setState({ info: res.data.filter(dat => dat._id === plantID) });
      this.setState({ watered: this.state.info[0].watered });
      this.setState({ fed: this.state.info[0].fed });
      this.setState({ feedingInterval: this.state.info[0].feedingInterval });
      this.setState({ wateringInterval: this.state.info[0].wateringInterval });
      this.setState({ sciName: this.state.info[0].name });
    });

    API.getPlantNote(plantID).then(res => {
      this.setState({
        notes: res.data.filter(data => data.plant === plantID)
      });
    });
  }

  componentDidMount() {
    const plantID = this.props.match.params.plant;

    API.getPlantNote(plantID).then(res => {
      this.setState({
        notes: res.data.filter(data => data.plant === plantID)
      });
    });
  }

  removePlant(t) {
    var self = t;
    API.removePlant({ id: self.state.plantId }).then(res => {
      window.location = "/manage";
    });
  }

  render() {
    const plantID = this.props.match.params.plant;

    const waterStyle = {
      display: "inline-block",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      marginLeft: "15px",
      marginRight: "15px"
      // backgroundColor: "red"
    };
    const feederStyle = {
      display: "inline-block",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      marginLeft: "15px",
      marginRight: "15px"
      // backgroundColor: "#70ef76",
    };

    // get current day
    var date = moment().format("MM-DD-YYYY");

    if (this.state.watered) {
      // last watering date and format
      var date2 = this.state.watered.split(",");
      var lastWatered = moment(date2[0], "MMMM Do YYYY");
      lastWatered = lastWatered.format("MM-DD-YYYY");
    }

    var waterDate = moment(lastWatered, "MM-DD-YYYY")
      .add(this.state.wateringInterval, "days")
      .format("MM-DD-YYYY");

    if (this.state.watered && this.state.wateringInterval !== null) {
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
        <div className="TOP">
          <Grid container>
            <Grid item xs={12} sm={12}>
              <h1 className="info-title">
                {this.state.info[0].displayName === undefined && this.state.info[0].name}
                {this.state.info[0].displayName === "scientific" &&
                  this.state.info[0].name}
                {this.state.info[0].displayName === "nickname" &&
                  this.state.info[0].nickname}
              </h1>
            </Grid>
            <Grid item xs={12} sm={1} />
            <Grid item xs={12} sm={12} md={4}>
              <div className="card-wrapBig">
                <div className="img-containerBig">
                  <img
                    className="userUploadBig"
                    src={this.state.info[0].url}
                    alt="user uploaded"
                  />
                </div>
                <h4>
                  Last Watering:{" "}
                  <span className="waterSpan">
                    {this.state.watered !== undefined
                      ? moment(
                          this.state.watered,
                          "MMMM Do YYYY, h:mm:ss a"
                        ).fromNow()
                      : "Never!"}
                  </span>
                </h4>
                <h4>
                  Last Feeding:{" "}
                  <span className="feedSpan">
                    {this.state.fed !== undefined
                      ? moment(
                          this.state.fed,
                          "MMMM Do YYYY, h:mm:ss a"
                        ).fromNow()
                      : "Never!"}
                  </span>
                </h4>
                <div className="careButtons">
                  <div className="waterBig" style={waterStyle}>
                    <img
                      className="wateringCanBig"
                      src={wateringCan}
                      onClick={() => this.water(plantID)}
                      alt="watering Can"
                    />
                  </div>
                  <div className="feederBig" style={feederStyle}>
                    <img
                      className="feedBig"
                      src={
                        "https://cdn3.iconfinder.com/data/icons/ecology-caramel-vol-1/512/FERTILIZE_THE_PLANTS-512.png"
                      }
                      onClick={() => this.feed(plantID)}
                      alt="feeding Can"
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={1} />

            <Grid item xs={12} sm={12} md={5}>
              <CenteredTabs
                info={this.state.info}
                plantId={this.state.plantId}
                sciName={this.state.sciName}
                notes={this.state.notes}
              />
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default PlantInfo;
