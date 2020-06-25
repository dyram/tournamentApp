import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";

import { Link } from "react-router-dom";
import Axios from "axios";

import AdminPanel from "../AdminPanel";
import ListView from "./ListView";
import "./index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const HomePage = () => {
  const classes = useStyles();

  const [uid, setUid] = useState();
  const [showLogin, setShowLogin] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);

  const [fetchOpen, setFetchOpen] = useState(false);

  const [tournaments, setTournaments] = useState([]);
  const [users, setUsers] = useState([]);
  const [money, setMoney] = useState({});
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userToken"));
    if (data != null) {
      getMoney(data.id);
      setUid(data.id);
      setShowLogin(data.validity);
      setAdminLogin(data.role);
      getTournaments();
      getBooking(data.id);
    } else {
      setShowLogin(false);
      getTournaments();
    }
  }, []);

  const getTournaments = () => {
    Axios.get("http://localhost:4000/tournament").then((res) => {
      if (res.status === 200) {
        // console.log("GET TOURNAMENTS", res.data);
        setTournaments([...res.data]);
        setFetchOpen(true);
        getUsers();
      }
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:4000/users").then((res) => {
      console.log("USERS", res);
      if (res.status === 200) {
        setUsers([...res.data]);
      }
    });
  };

  const getMoney = (data) => {
    Axios.post("http://localhost:4000/user", { data }).then((res) => {
      if (res.status === 200) {
        setMoney(res.data);
      }
    });
  };

  const addTournament = (data) => {
    Axios.post("http://localhost:4000/tournament", data).then((res) => {
      getTournaments();
    });
  };

  const addBooking = (data) => {
    Axios.post("http://localhost:4000/booking", data).then((res) => {
      console.log("BOOKING", res);
      // getBooking();
      getTournaments();
    });
  };

  const getBooking = (data) => {
    Axios.post("http://localhost:4000/getBooking", { data }).then((res) => {
      if (res.status === 200) {
        // console.log("GET BOOKING", res.data);
        setBookings([...res.data]);
      }
    });
  };

  const logOutUser = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/";
  };

  const logIn = () => {
    window.location.href = "/login";
  };

  const signUp = () => {
    window.location.href = "/signup";
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Tournament
          </Typography>
          {showLogin ? (
            <Button onClick={logOutUser} color="inherit">
              Logout
            </Button>
          ) : (
            <span>
              <Button onClick={logIn} color="inherit">
                Login
              </Button>{" "}
              /
              <Button onClick={signUp} color="inherit">
                Sign-Up
              </Button>
            </span>
          )}
        </Toolbar>
      </AppBar>
      <Snackbar
        open={fetchOpen}
        autoHideDuration={2000}
        onClose={(e) => setFetchOpen(false)}
      >
        <Alert variant="filled" severity="success">
          Tournament Data fetched
        </Alert>
      </Snackbar>
      <br />
      {adminLogin ? (
        <AdminPanel
          emitData={(data) => {
            addTournament(data);
          }}
        />
      ) : (
        <span>
          <p>&nbsp;&nbsp;View, book, browse tournaments...</p>
          <p>&nbsp;&nbsp;Balance Left : &#8377;{money.money}</p>
        </span>
      )}
      <ListView
        money={money}
        login={showLogin}
        adminLogin={adminLogin}
        data={tournaments}
        bookingAdd={(data) => {
          addBooking(data);
        }}
        bookingData={bookings}
      />
    </div>
  );
};

export default HomePage;
