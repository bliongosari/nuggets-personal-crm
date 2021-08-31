import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Welcome from "./components/Welcome/Welcome.js";
import Home from "./components/Home/Home.js";
import { NavbarWelcome, NavbarHome } from "./components/Navbar/Navbar.js";
import UserProfile from "./components/UserProfile/UserProfile";
import Journal from "./components/Journal/Journal";
import Contacts from "./components/Contacts/Contacts";
import Events from "./components/Events/Events";
import Footer from "./components/Footer/Footer";
import Example from "./components/Example/Example";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedNavbar from "./components/ProtectedRoute/ProtectedNavbar";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import EditContact from "./components/Contacts/EditContact";
import AddContact from "./components/Contacts/AddContact";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={NavbarWelcome} />
        <ProtectedNavbar path="/" component={NavbarHome} />
      </Switch>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/error" component={Unauthorized} />
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute path="/user-profile" component={UserProfile} />
        <ProtectedRoute exact path="/journal" component={Journal} />
        <ProtectedRoute exact path="/contacts" component={Contacts} />
        <ProtectedRoute exact path="/editcontact" component={EditContact} />
        <ProtectedRoute exact path="/addcontact" component={AddContact} />
        <ProtectedRoute exact path="/events" component={Events} />
        <ProtectedRoute exact path="/example" component={Example} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
