
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import SignInModal from "../ModalF/SignInModal";
import SignUpModal from "../ModalF/SignUpModal";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function NavbarWelcome() {
  return (
    <div className="navbar">
      <img alt="logo" src="../../logo.svg" className="logo-welcome"></img>
      <h1 className="title-welcome">NUGGETS</h1>
      <SignInModal />
      <SignUpModal />
    </div>
  );
}

function NavbarHome() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/user/verifyToken",
      headers: {
        "X-ACCESS-TOKEN": Cookies.get("token"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setAuth(true);
        } else {
          Cookies.remove("token");
          history.push("/");
        }
      })
      .catch((err) => {
        Cookies.remove("token");
        history.push("/");
      });
  }, []);
  
  const [sidebar, setSidebar] = useState(false);
  const [dropdownUser, setdropdownUser] = useState(false);
  const [dropdownNotif, setdropdownNotif] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const showDropdownUser = () => {
    setdropdownUser(!dropdownUser);
    if (dropdownNotif) {
      setdropdownNotif(!dropdownNotif);
    }
  };
  const showDropdownNotif = () => {
    setdropdownNotif(!dropdownNotif)
    if (dropdownUser) {
      setdropdownUser(!dropdownUser);
    }
  };

  return (
    <div>
      <div className="navbar">
        {/* Navigation Bar after Log in */}
        <button className="menu-button" onClick={showSidebar}><img alt="menu" src="../../menu.svg" className="menu-button"></img></button>
        <div className="logo-home">
          <img alt="logo" src="../../logo.svg" className="logo-home"></img>
          <h1 className="title-home">NUGGETS</h1>
        </div>
        {/* Notifications Button */}
        <div className="dropdown">
          <img alt="notification" src="../../notification.svg" className="notif-button" onClick={showDropdownNotif}></img>
          {dropdownNotif && (
            <div>
            <div className="arrow-up2"></div>
            <div className="dropdown-content">
              <div className="dropdown-container">
                <span>No Notification</span>
              </div>
              {/* <hr></hr> */}
            </div>
          </div>
          )}
        </div>
        
        {/* User Button */}
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

      {/* Collapse Sidebar */}
      {!sidebar && (
        <div className="sidebar">
          <div className="sidebar-container">
            <Link to="/home"><img alt="" src="../../home.svg"></img></Link>
          </div>
          <div className="sidebar-container">
            <Link to="/journal"><img alt="" src="../../journal.svg"></img></Link>
          </div>
          <div className="sidebar-container">
            <Link to="/events"><img alt="" src="../../events.svg"></img></Link>
          </div>
          <div className="sidebar-container">
            <Link to="/contacts"><img alt="" src="../../contacts.svg"></img></Link>
          </div>
          <div className="sidebar-container">
            <Link to="/"><img alt="" src="../../logout.svg"></img></Link>    
          </div>
        </div>
      )}

      {/* Expand Sidebar */}
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
export { NavbarWelcome, NavbarHome };
