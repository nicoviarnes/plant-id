import React from "react";
import "./style.css";
import API from "../../utils/API";
import Grid from "@material-ui/core/Grid";
import CenteredTabs from "../CenteredTabs";

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
						<Grid item xs={12} sm={1} />
						<Grid item xs={12} sm={12} md={4}>
							<img src={this.state.info[0].url} alt="user uploaded" />
						</Grid>
						<Grid item xs={12} sm={1} />

						<Grid item xs={12} sm={12} md={5}>
							<CenteredTabs
								info={this.state.info}
								plantId={this.state.plantId}
								notes={this.state.notes}
							/>
						</Grid>

						{/* <img src={this.state.info[0].url} alt="user uploaded" /> */}
					</Grid>
				</div>
			</>
		);
	}
}

export default PlantInfo;
