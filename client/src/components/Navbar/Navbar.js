import {React, useState} from "react";
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
  const [sidebar, setSidebar] = useState(false);
  const [dropdownUser, setdropdownUser] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const showDropdownUser = () => setdropdownUser(!dropdownUser);

  return (
    <div>
      <div className="navbar">
        <button className="menu-button" onClick={showSidebar}><img alt="menu" src="../../menu.svg" className="menu-button"></img></button>
        <div className="logo-home">
          <img alt="logo" src="../../logo.svg" className="logo-home"></img>
          <h1 className="title-home">NUGGETS</h1>
        </div>
        <img alt="notification" src="../../notification.svg" className="notif-button"></img>
        
        <div className="dropdown">
          <img alt="user" src="../../user.svg" className="user-button" onClick={showDropdownUser}></img>
          {dropdownUser && (
            <div>
              <div className="arrow-up"></div>
              <div className="dropdown-content">
                <div className="dropdown-container">
                  <Link to="/user-profile"><img alt="user" src="../../person-blue.svg"></img><span>View Profile</span></Link>
                </div>
                <hr></hr>
                <div className="dropdown-container">
                  <Link to="/"><img alt="user" src="../../logout.svg"></img><span>Log out</span></Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {!sidebar && (
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
      )}

      {sidebar && (
        <div>
          <div className="sidebar1">
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
      )}
    </div>
  );
}

export default NavbarWelcome;
export {NavbarWelcome, NavbarHome};
