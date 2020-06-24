import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Modal from "@material-ui/core/Modal";

import { Link } from "react-router-dom";

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

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userToken"));
    if (data != null) {
      setUid(data.id);
      setShowLogin(data.validity);
      setAdminLogin(data.role);
    } else setShowLogin(false);
  }, []);

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
      <br />
      {adminLogin ? (
        <Button variant="contained" onClick={logOutUser} color="primary">
          Add Tournament
        </Button>
      ) : (
        <p>View,book,browse tournaments...</p>
      )}
    </div>
  );
};

export default HomePage;
