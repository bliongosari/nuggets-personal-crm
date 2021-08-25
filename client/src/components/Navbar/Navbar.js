import React from "react";
import "./Navbar.css";
import SignInModal from "../ModalF/SignInModal"
import SignUpModal from "../ModalF/SignUpModal"
import { Link } from "react-router-dom";


function NavbarWelcome() {
  return (
    <div className="navbar">
        <img alt="logo" src="../../logo.svg" className="logo-welcome"></img>
        <h1 className="title-welcome">NUGGETS</h1>
        <SignInModal/>
        <SignUpModal/>
    </div>
  );
}

function NavbarHome() {
  return (
    <div>
      <div className="navbar">
        <img alt="menu" src="../../menu.svg" className="menu-button"></img>
        <div className="logo-home">
          <img alt="logo" src="../../logo.svg" className="logo-home"></img>
          <h1 className="title-home">NUGGETS</h1>
        </div>
        <img alt="notification" src="../../notification.svg" className="notif-button"></img>
        <Link to="/"><img alt="user-profile" src="../../user.svg" className="user-button"></img></Link>
      </div>

      <div>
        <div className="sidebar">
          <div className="sidebar-container">
            <Link to="/home"><img alt="" src="../../home.svg"></img><span>Home</span></Link>
          </div>
          <div className="sidebar-container">
            <Link to="/journal"><img alt="" src="../../journal.svg"></img><span>Journal</span></Link>
          </div>
          <div className="sidebar-container">
            <Link to="/events"><img alt="" src="../../events.svg"></img><span>Events</span></Link>
          </div>
          <div className="sidebar-container">
            <Link to="/contacts"><img alt="" src="../../contacts.svg"></img><span>Contacts</span></Link>
          </div>
          <div className="sidebar-container">
            <Link to="/"><img alt="" src="../../logout.svg"></img><span>Log out</span></Link>    
          </div>
        </div>
      </div> 
    </div>
  );
}

export default NavbarWelcome;
export {NavbarWelcome, NavbarHome};
