import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./style.css";
import Button from "@material-ui/core/Button";

// const useStyles = makeStyles(theme => ({
//   button: {
//     display: 'block',
//     marginTop: theme.spacing(2),
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
// }));

function ControlledOpenSelect() {
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    setAge(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <FormControl className={"formControl"}>
      <InputLabel htmlFor="demo-controlled-open-select">Display By</InputLabel>
      <Select
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={age}
        onChange={handleChange}
        inputProps={{
          name: "age",
          id: "demo-controlled-open-select"
        }}
      >
        <MenuItem value={10}>Nickname</MenuItem>
        <MenuItem value={20}>Scientific Name</MenuItem>
      </Select>
    </FormControl>
  );
}

export default ControlledOpenSelect;
