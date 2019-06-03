import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import Button from "@material-ui/core/Button";

class CareSettings extends Component {
  state = {
    plant: "",
    // title: "",
    wateringInterval: "",
    feedingInterval: "",
    noteError: ""
  };

  validate = () => {
    let noteError = "";
    if (
      this.state.wateringInterval === "" ||
      this.state.feedingInterval === ""
    ) {
      noteError = "Please add an interval!";
    }
    if (noteError) {
      this.setState({ noteError });
      return false;
    }

    return true;
  };

  handleChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.props.plantID);
    if (this.state.wateringInterval !== "") {
    }
    API.setWateringInterval({
      id: this.props.plantID,
      interval: this.state.wateringInterval
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    API.setFeedingInterval({
      id: this.props.plantID,
      interval: this.state.feedingInterval
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.setState({ wateringInterval: this.props.info[0].wateringInterval });
    this.setState({ feedingInterval: this.props.info[0].feedingInterval });
  }

  render() {
    console.log(this.props.info)
    return (
      <>
        <form className="note-form">
          <label>
            <p className="label care">Watering Interval (days): </p>
            <textarea
              className="wateringInterval"
              type="text"
              name="wateringInterval"
              minLength="1"
              maxLength="2"
              size="2"
              value={this.state.wateringInterval}
              onChange={this.handleChange}
            />
            <br />
            <p className="label care">Feeding Interval (days): </p>
            <textarea
              className="wateringInterval"
              type="text"
              name="feedingInterval"
              minLength="1"
              maxLength="2"
              size="2"
              value={this.state.feedingInterval}
              onChange={this.handleChange}
            />
            <div className="errorStyle">{this.state.noteError}</div>
          </label>

          <Button
            className="note-sub-butt upload"
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Save
          </Button>
        </form>
      </>
    );
  }
}

export default CareSettings;
