import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function ListView({
  data,
  adminLogin,
  login,
  money,
  bookingAdd,
  bookingData,
}) {
  const classes = useStyles();

  const [bookedIds, setBookedIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [bookedUsers, setBookedUsers] = useState([]);
  const [bookedTname, setBookedTname] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const bookSeat = (id, seatCost, availSeat) => {
    bookingAdd({ money, id, seatCost, availSeat });
  };

  useEffect(() => {
    bookingData.map((obj) => {
      bookedIds.push(obj.TournamentId);
    });
  }, [bookingData]);

  const viewBookings = (id) => {
    Axios.post("http://localhost:4000/getBookedUsers", { id }).then((res) => {
      console.log("BOOKED USERS DATA", res);
      if (res.status === 200) {
        setBookedUsers([...res.data]);
        setBookedTname(res.data[0].Tournament.tName);
        handleClickOpen();
      }
    });
  };

  return (
    <div>
      <Typography style={{ padding: "2%" }} variant="h6">
        Tournaments
      </Typography>
      <List className={classes.root}>
        {data.map((obj, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemText
              primary={obj.tName}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {obj.tDesc}
                  </Typography>
                  <br />
                  Seats : {obj.seats}
                  <br />
                  Seat Cost : &#8377;{obj.seatCost}
                  <br />
                  Available Seats : {obj.availSeats}
                  <br />
                  Availability : {obj.available ? "Available" : "Not Available"}
                  <Divider />
                </React.Fragment>
              }
            />
            {adminLogin ? (
              <Button
                onClick={(e) => {
                  viewBookings(obj.id);
                }}
                color="primary"
              >
                View Bookings
              </Button>
            ) : login ? (
              bookedIds.includes(obj.id) ? (
                <Button color="secondary">Unbook</Button>
              ) : (
                <Button
                  onClick={(e) => {
                    bookSeat(obj.id, obj.seatCost, obj.availSeats);
                  }}
                  color="primary"
                >
                  Book Seat
                </Button>
              )
            ) : (
              <span></span>
            )}
          </ListItem>
        ))}
      </List>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{bookedTname}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The users who have registered for {bookedTname} are,
            <List className={classes.root}>
              {bookedUsers.map((obj, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemText
                    primary={
                      <React.Fragment>
                        {index + 1}.{obj.User.email}
                      </React.Fragment>
                    }
                    secondary={<Divider />}
                  />
                </ListItem>
              ))}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
