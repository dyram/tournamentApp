import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage"
import HomePage from "./components/HomePage"
import Axios from 'axios';

function App() {
  useEffect(() => {
    Axios.get("http://localhost:4000").then(res => {
      console.log(res);
    });
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <Route path="/" exact component={() => <Welcome />} /> */}
          {/* <Route path="/signup" component={() => <Signup />} /> */}
          <Route path="/login" component={() => <LoginPage />} />
          <Route
            crossorigin
            path="/"
            component={() => <HomePage />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
