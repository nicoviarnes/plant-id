import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import NoteForm from "../NoteForm";
import API from "../../utils/API";
import "./style.css";

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
};

function CenteredTabs(props) {
	const [value, setValue] = React.useState(0);
	const [notes, setNotes] = React.useState(0);

	function handleChange(event, newValue) {
		setValue(newValue);
		setNotes(props.notes);
	}

	function deleteNote(id) {
		API.delPlantNote({ id })
			.then(res => {
				let afterDel = notes.filter(data => data._id !== id);
				setNotes(afterDel);
			})
			.catch(err => console.log(err));
	}
	// React.useEffect(() => {
	// 	return () => {
	// 		effect;
	// 	};
	// }, []);

	return (
		<div>
			<AppBar position="static" className="tab">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					centered
				>
					<Tab label="Plant Info" />
					<Tab label="Add Notes" />
					<Tab label="My Notes" />
				</Tabs>
			</AppBar>
			{value === 0 && (
				<TabContainer>
					{
						<>
							{/* <Grid item xs={12} sm={12}>
                <div className="my-notes-wrap">
                  <h2>My Notes</h2>
                  <div className="notes-target" />
                </div>
              </Grid> */}
							<Grid item xs={12} sm={12}>
								{props.info[0].plantInfo &&
									Object.entries(props.info[0].plantInfo[0]).map((plant, i) => {
										return (
											<li key={i}>
												<strong>{plant[1].header}</strong> {plant[1].info}
											</li>
										);
									})}
							</Grid>
						</>
					}
				</TabContainer>
			)}
			{value === 1 && (
				<TabContainer>
					<Grid item xs={12} sm={12}>
						<NoteForm plantID={props.plantId} />
					</Grid>
				</TabContainer>
			)}
			{value === 2 && (
				<TabContainer>
					{
						<>
							<Grid item xs={12} sm={12}>
								<div className="my-notes-wrap">
									<h2>My Notes</h2>
									<div className="notes-target">
										{/* {props.notes &&
											Object.entries(props.notes).map((note, i) => {
												return (
													<div key={i}>
														<h2>Title:</h2>
														<h3>{note[1].title}</h3>
														<p>{note[1].note}</p>
														<button onClick={() => deleteNote(note[1]._id)}>
															X
														</button>
														
														<hr />
													</div>
												);
											})} */}
										{notes ? (
											notes.map((note, i) => {
												return (
													<div key={i}>
														<h2>Title:</h2>
														<h3>{note.title}</h3>
														<p>{note.note}</p>
														<button onClick={() => deleteNote(note._id)}>
															X
														</button>
														<hr />
													</div>
												);
											})
										) : (
											<h1>No Notes!</h1>
										)}
									</div>
								</div>
							</Grid>
						</>
					}
				</TabContainer>
			)}
		</div>
	);
}

export default CenteredTabs;
