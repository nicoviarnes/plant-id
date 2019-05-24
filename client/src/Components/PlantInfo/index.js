import React from "react";
import "./style.css";
import API from "../../utils/API";
import Grid from "@material-ui/core/Grid";
import NoteForm from "../NoteForm";

class PlantInfo extends React.Component {
	state = {
		info: null,
		plantId: "",
		notes: null
	};

	componentWillMount() {
		const plantID = this.props.match.params.plant;
		const { plantData } = this.props.location.state;
		this.setState({ info: plantData });
		API.getUserPlant(plantID).then(res => {
			// console.log(res.data.filter(dat => dat._id === plantID));
			this.setState({ plantId: plantID });
			this.setState({ info: res.data.filter(dat => dat._id === plantID) });
		});
		console.log(this.state.Info);
	}
	componentDidMount() {
		const plantID = this.props.match.params.plant;
		console.log(plantID);
		API.getPlantNote(plantID).then(res => {
			this.setState({
				notes: res.data.filter(data => data.plant === plantID)
			});
			console.log(this.state.notes);
		});
		// .then(console.log(this.state.notes));
	}

	render() {
		return (
			<>
				<div className="TOP">
					<br />
					<Grid container>
						<Grid item xs={12} sm={12}>
							<h1 className="info-title">
								{this.state.info && this.state.info[0].name}
							</h1>
						</Grid>
						<Grid item xs={12} sm={2} />
						<Grid item xs={12} sm={4}>
							<img src={this.state.info[0].url} alt="user uploaded" />
						</Grid>
						<Grid item xs={12} sm={6}>
							<NoteForm plantID={this.state.plantId} />
						</Grid>

						<Grid item xs={12} sm={12}>
							<div className="my-notes-wrap">
								<h2>My Notes</h2>
								<div className="notes-target">
									{this.state.notes &&
										Object.entries(this.state.notes[0]).map((note, i) => {
											return <li key={i}>{note[1]}</li>;
										})}
								</div>
							</div>
						</Grid>

						<Grid item xs={12} sm={12}>
							{this.state.info[0].plantInfo &&
								Object.entries(this.state.info[0].plantInfo[0]).map(
									(plant, i) => {
										return (
											<li key={i}>
												{plant[1].header} {plant[1].info}
											</li>
										);
									}
								)}
						</Grid>

						{/* <img src={this.state.info[0].url} alt="user uploaded" /> */}
					</Grid>
				</div>
			</>
		);
	}
}

export default PlantInfo;
