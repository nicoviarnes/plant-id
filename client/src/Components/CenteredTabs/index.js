import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import NoteForm from "../NoteForm";


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

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Plant Info" />
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
                        {plant[1].header} {plant[1].info}
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
          {
            <>
              <Grid item xs={12} sm={12}>
                <div className="my-notes-wrap">
                  <h2>My Notes</h2>
                  <div className="notes-target" />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
              <NoteForm plantID={props.plantId} />
            </Grid>
            </>
          }
        </TabContainer>
      )}
    </div>
  );
}

export default CenteredTabs;
