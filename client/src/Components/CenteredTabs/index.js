import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import NoteForm from "../NoteForm";
import API from "../../utils/API";
import Button from "@material-ui/core/Button";
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
    const plant = props.plantId;
    API.getPlantNote(plant).then(res => {
      let newNotes = res.data.filter(data => data.plant === plant);
      setNotes(newNotes);
    });
  }
  function deleteNote(id) {
    API.delPlantNote({ id })
      .then(res => {
        let newNotes = notes.filter(data => data._id !== id);
        setNotes(newNotes);
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <AppBar position="static" className="tab">
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          TabIndicatorProps={{
            style: {
              backgroundColor: "#fff"
            }
          }}
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
              <Grid item xs={12} sm={12}>
                {props.info[0].plantInfo &&
                  Object.entries(props.info[0].plantInfo[0]).map((plant, i) => {
                    return (
                      <li key={i} className="leaves">
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
                      <h1>No Notes</h1>
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
