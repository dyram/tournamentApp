import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";

import { Link } from "react-router-dom";

import AdminPanel from "../AdminPanel";
import "./index.css";
import Axios from "axios";

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

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userToken"));
    if (data != null) {
      setUid(data.id);
      setShowLogin(data.validity);
      setAdminLogin(data.role);
      getTournaments();
    } else {
      setShowLogin(false);
      getTournaments();
    }
  }, []);

  const getTournaments = () => {
    Axios.get("http://localhost:4000/tournament").then((res) => {
      if (res.status === 200) {
        setTournaments(res.data);
        setFetchOpen(true);
        console.log("TOURNAMENT DATA", res.data);
      }
    });
  };

  const addTournament = (data) => {
    Axios.post("http://localhost:4000/tournament", data).then((res) => {
      getTournaments();
    });
  };

  const logOutUser = () => {
    localStorage.removeItem("userToken");
    window.location.href = "/";
  };

  const logIn = () => {
    window.location.href = "/login";
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Tournament
          </Typography>
          {showLogin ? (
            <Button onClick={logOutUser} color="inherit">
              Logout
            </Button>
          ) : (
            <Button onClick={logIn} color="inherit">
              Login
            </Button>
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
        <p>&nbsp;&nbsp;View, book, browse tournaments...</p>
      )}
    </div>
  );
};

export default HomePage;
