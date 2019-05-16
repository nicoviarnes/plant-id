import React from "react";
import "./style.css";

class PlantInfo extends React.Component {
  render() {
    const plantID = this.props.match.params.plant
    return (
      <>
        <div className="TOP">
          <br />
          <h1>Manage Plant id: {plantID}</h1>
        </div>
      </>
    );
  }
}

export default PlantInfo;
