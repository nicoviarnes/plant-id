import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import Button from "@material-ui/core/Button";

class NoteForm extends Component {
  state = {
    plant: "",
    // title: "",
    note: "",
    noteError: ""
  };

  validate = () => {
    let noteError = "";
    if (this.state.note === "") {
      noteError = "Please add a note!";
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
    const isValid = this.validate();
    if (isValid) {
      API.addPlantNote({
        plant: this.props.plantID,
        // title: this.state.title,
        note: this.state.note
      })
        .then(res => {})
        .catch(err => console.log(err));

      this.setState({
        title: "",
        note: ""
      });
    } else {
    }
  };

  render() {
    return (
      <>
        <form className="note-form">
          <label>
            <textarea
              className="note-input"
              type="text"
              name="note"
              value={this.state.note}
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
            Save Note
          </Button>
        </form>
      </>
    );
  }
}

export default NoteForm;
