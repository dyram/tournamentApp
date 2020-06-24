import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import "./index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [rePass, setRePass] = useState("");

  return (
    <div className="login-form-div">
      <h1>SIGN-UP</h1>
      <TextField
        required
        id="outlined-required-email"
        label="Email"
        // defaultValue="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <TextField
        type="password"
        required
        id="outlined-required-password"
        label="Password"
        // defaultValue="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPass(e.target.value)}
      />
      <br />
      <br />
      <TextField
        type="password"
        required
        id="outlined-required-password"
        label="Re-confirm Password"
        // defaultValue="Password"
        variant="outlined"
        value={rePass}
        onChange={(e) => setRePass(e.target.value)}
      />
      <br />
      <br />
      <Button variant="contained" color="primary">
        Register
      </Button>
      <br />
      <span>
        <p className="italic-text">
          Already have an account? <Link href="/login">Login</Link> now
        </p>
      </span>
    </div>
  );
};

export default SignUp;
