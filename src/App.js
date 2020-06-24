import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage"
import HomePage from "./components/HomePage"

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <Route path="/" exact component={() => <Welcome />} /> */}
          {/* <Route path="/signup" component={() => <Signup />} /> */}
          <Route path="/login" component={() => <LoginPage />} />
          <Route
            crossorigin
            path="/timeline"
            component={() => <HomePage />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
