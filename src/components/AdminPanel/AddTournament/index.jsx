import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const AddTournament = ({ setData }) => {
  const [addOpen, setAddOpen] = useState(false);

  const [tName, setTname] = useState("");
  const [tDesc, setTdesc] = useState("");
  const [seats, setSeats] = useState("");
  const [seatCost, setSeatCost] = useState("");
  const [available, setAvailable] = useState("true");

  const handleClickOpen = () => {
    setAddOpen(true);
  };

  const handleClose = () => {
    clearFields();
    setAddOpen(false);
  };

  const clearFields = () => {
    setTname(undefined);
    setTdesc(undefined);
    setSeats(undefined);
    setSeatCost(undefined);
    setAvailable("true");
  };

  const addTournament = () => {
    const data = {
      tName,
      tDesc,
      seats,
      seatCost,
      available,
    };

    setData(data);
    handleClose();
  };

  const handleAvail = (event) => {
    setAvailable(event.target.value);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Add Tournament
      </Button>
      <Dialog
        open={addOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Tournament</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add an upcoming tournament along with it's description, seats, cost
            of booking a seat and the availability
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tournament Name"
            fullWidth
            value={tName}
            onChange={(e) => setTname(e.target.value)}
          />
          <TextField
            margin="dense"
            id="desc"
            label="Tournament Description"
            fullWidth
            value={tDesc}
            onChange={(e) => setTdesc(e.target.value)}
          />
          <TextField
            margin="dense"
            type="number"
            id="seats"
            label="No.of Seats"
            fullWidth
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
          />
          <TextField
            margin="dense"
            type="number"
            id="seatCost"
            label="Seat Cost"
            fullWidth
            value={seatCost}
            onChange={(e) => setSeatCost(e.target.value)}
          />
          <br />
          <br />
          <FormControl component="fieldset">
            <FormLabel component="legend">Availability</FormLabel>
            <RadioGroup
              row
              aria-label="availability"
              name="availability1"
              value={available}
              onChange={handleAvail}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Available"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Not Available"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTournament} color="primary">
            Add Tournament
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTournament;
