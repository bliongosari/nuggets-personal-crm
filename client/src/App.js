import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Welcome from "./components/Welcome/Welcome.js"
import Home from "./components/Home/Home.js";
import Navbar from "./components/Navbar/Navbar.js";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/home" component={Home} />

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
