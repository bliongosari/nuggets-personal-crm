import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Welcome from "./components/Welcome/Welcome.js"
import Home from "./components/Home/Home.js";
import Login from "./components/Login/Login.js";
import Signup from "./components/Signup/Signup.js"
import Sidebar from "./components/Sidebar/Sidebar.js"
import Navbar from "./components/Navbar/Navbar.js";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
