import React from "react";
import "./style.css";
import API from "../../utils/API";

class PlantInfo extends React.Component {
  state = {
    info: null
  };

  componentWillMount() {
    const plantID = this.props.match.params.plant;
    const { plantData } = this.props.location.state;
    this.setState({ info: plantData });
    API.getUserPlant(plantID).then(res => {
      console.log(res.data.filter(dat => dat._id === plantID))
      this.setState({ info: res.data.filter(dat => dat._id === plantID) })
    });
  }

  render() {
    return (
      <>
        <div className="TOP">
          <br />
          <h1>{this.state.info && this.state.info[0].name}</h1>
          {this.state.info[0].plantInfo &&
            Object.entries(this.state.info[0].plantInfo[0]).map((plant, i) => {
              return (
                <li key={i}>
                  {plant[1].header} {plant[1].info}
                </li>
              );
            })
          }
            <img src={this.state.info[0].url} alt="user uploaded" />
        </div>
      </>
    );
  }
}

export default PlantInfo;
