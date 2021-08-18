import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { login, logout } from "./features/user/userSlice";
import "./App.css";
import Home from "./components/Home/Home.js";
import Login from "./components/Login/Login.js";

function App() {
  return (
    <div className="app">
      <Home></Home>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        {/* <Route path="/calendar">
          <Calendar />
        </Route>
        <Route path="/contacts">
          <Home />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
