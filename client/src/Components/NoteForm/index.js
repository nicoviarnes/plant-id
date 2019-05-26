import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import Button from "@material-ui/core/Button";

class NoteForm extends Component {
	state = {
		plant: "",
		title: "",
		note: ""
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
		// console.log(this.props.plantID);
		// console.log(this.state.title);
		// console.log(this.state.note);
		if (this.state.title === "") {
			alert("add a Title!");
		} else if (this.state.note === "") {
			alert("add a Note!");
		} else {
			API.addPlantNote({
				plant: this.props.plantID,
				title: this.state.title,
				note: this.state.note
			})
				.then(res => {})
				.catch(err => console.log(err));

			this.setState({
				title: "",
				note: ""
			});
		}
		// if (!this.state.title || !this.state.note) {
		// 	alert("Fill both a title and a note!");
		// } else {
		// 	alert("Submitted to Database");
		// 	console.log(this.state.title);
		// 	console.log(this.state.note);
		// }
	};

	render() {
		return (
			<>
				<form className="note-form">
					<h2 className="note-head">Add a Note</h2>
					<label>
						<p className="label">Title :</p>
						<input
							className="title-input"
							type="text"
							name="title"
							value={this.state.title}
							onChange={this.handleChange}
						/>
					</label>
					<br />
					<label>
						<p className="label">Note :</p>
						<textarea
							className="note-input"
							type="text"
							name="note"
							value={this.state.note}
							onChange={this.handleChange}
						/>
					</label>

					<Button
						className="note-sub-butt"
						variant="contained"
						color="inherit"
						onClick={this.handleSubmit}
					>
						Save
					</Button>
				</form>
			</>
		);
	}
}

export default NoteForm;
