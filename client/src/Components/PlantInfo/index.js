import React from "react";
import "./style.css";
import API from "../../utils/API";

class PlantInfo extends React.Component {
  state = {
    info: null
  };

  componentDidMount() {
    const { plantData } = this.props.location.state;
    this.setState({ info: plantData });
    API.getUserGarden();
  }

  render() {
    const plantID = this.props.match.params.plant;
    return (
      <>
        <div className="TOP">
          <br />
          <h1>Manage Plant id: {plantID}</h1>
          <p>{this.state.info}</p>
        </div>
      </>
    );
  }
}

export default PlantInfo;
