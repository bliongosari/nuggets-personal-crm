import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Welcome from "./components/Welcome/Welcome.js"
import Home from "./components/Home/Home.js";
import {NavbarWelcome, NavbarHome} from "./components/Navbar/Navbar.js";
import UserProfile from "./components/UserProfile/UserProfile";
import Journal from "./components/Journal/Journal";
import Contacts from "./components/Contacts/Contacts";
import Events from "./components/Events/Events";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route exact path="/"><NavbarWelcome/></Route>
          <Route path="/"><NavbarHome/></Route>
        </Switch>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/user-profile" component={UserProfile} />
          <Route exact path="/journal" component={Journal} />
          <Route exact path="/contacts" component={Contacts} />
          <Route exact path="/events" component={Events} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
