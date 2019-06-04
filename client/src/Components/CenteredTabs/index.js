import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import NoteForm from "../NoteForm";
import API from "../../utils/API";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import CareSettings from "../CareSettings";
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

  useEffect(() => {
    const plant = props.plantId;
    API.getPlantNote(plant).then(res => {
      let newNotes = res.data.filter(data => data.plant === plant);
      setNotes(newNotes);
    });
  }, [props.plantId]);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function deleteNote(id) {
    API.delPlantNote({ id })
      .then(res => {
        let newNotes = notes.filter(data => data._id !== id);
        setNotes(newNotes);
      })
      .catch(err => console.log(err));
  }

  function removePlant(id) {
    API.removePlant({ id }).then(res => {
      window.location = "/manage";
    });
  }

  return (
    <div>
      <AppBar position="static" className="tab">
        <Tabs
          variant="scrollable"
          fullWidth={true}
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#fff"
            }
          }}
        >
          <Tab label="Plant Info" />
          <Tab label="Care Settings" />
          {/* <Tab label="Notes" /> */}
          <Tab label={notes.length ? `Notes (${notes.length})` : "Notes"} />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          {
            <>
              <Grid item xs={12} sm={12}>
                <li className="leaves">
                  <strong>Scientific Name:</strong> {props.sciName}
                </li>
                {props.info[0].plantInfo &&
                  Object.entries(props.info[0].plantInfo[0]).map((plant, i) => {
                    return (
                      <li key={i} className="leaves">
                        <strong>{plant[1].header}</strong> {plant[1].info}
                      </li>
                    );
                  })}
                <br />
                <Button
                  variant="contained"
                  color="secondary"
                  className="delete d"
                  onClick={() => removePlant(props.plantId)}
                >
                  Remove From Garden
                  <DeleteIcon />
                </Button>
              </Grid>
            </>
          }
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <>
            <Grid item xs={12} sm={12}>
              <CareSettings info={props.info} plantID={props.plantId} />
            </Grid>
          </>
        </TabContainer>
      )}
      {value === 2 && (
        <TabContainer>
          {
            <>
              <Grid item xs={12} sm={12}>
                <NoteForm plantID={props.plantId} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <div>
                  <div>
                    {notes ? (
                      notes.map((note, i) => {
                        return (
                          <div className="note-form" key={i}>
                            <Button
                              variant="contained"
                              color="secondary"
                              className="deleteNote delete"
                              size="small"
                              onClick={() => deleteNote(note._id)}
                            >
                              x
                            </Button>
                            <p>{note.note}</p>
                          </div>
                        );
                      })
                    ) : (
                      <>
                        <br />
                        <h1>No Notes</h1>
                      </>
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
