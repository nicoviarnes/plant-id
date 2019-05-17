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
      this.setState({
        info: res.data
      });
    });
  }

  render() {
    return (
      <>
        <div className="TOP">
          <br />
          <h1>{this.state.info.name}</h1>
          {this.state.info.plantInfo &&
            Object.entries(this.state.info.plantInfo[0]).map((plant, i) => {
              return (
                <li key={i}>
                  {plant[1].header} {plant[1].info}
                </li>
              );
            })}
            <img src={this.state.info.url} alt="user uploaded" />
        </div>
      </>
    );
  }
}

export default PlantInfo;
