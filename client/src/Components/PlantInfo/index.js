import React from "react";
import "./style.css";
import API from "../../utils/API";
import Grid from "@material-ui/core/Grid";
import CenteredTabs from "../CenteredTabs";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

class PlantInfo extends React.Component {
	state = {
		info: null,
		plantId: "",
		notes: null,
		prevNotes: null
	};

	componentWillMount() {
		const plantID = this.props.match.params.plant;
		const { plantData } = this.props.location.state;
		this.setState({ info: plantData });
		API.getUserPlant(plantID).then(res => {
			this.setState({ plantId: plantID });
			this.setState({ info: res.data.filter(dat => dat._id === plantID) });
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
			console.log(`res: `, res.data.filter(data => data.plant === plantID));
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
		return (
			<>
				<div className="TOP">
					<Grid container>
						<Grid item xs={12} sm={12}>
							<h1 className="info-title">
								{this.state.info && this.state.info[0].name}
							</h1>
						</Grid>
						<Grid item xs={12} sm={1} />
						<Grid item xs={12} sm={12} md={4}>
							<img src={this.state.info[0].url} alt="user uploaded" />
							<br />
							<br />
							<Button
								variant="contained"
								color="secondary"
								className="delete"
								onClick={() => this.removePlant(this)}
							>
								Remove From Garden
								<DeleteIcon />
							</Button>
							<br />
							<br />
						</Grid>
						<Grid item xs={12} sm={1} />

						<Grid item xs={12} sm={12} md={5}>
							<CenteredTabs
								info={this.state.info}
								plantId={this.state.plantId}
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
