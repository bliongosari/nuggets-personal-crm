import React, { useState, useEffect } from "react";
import "./Navbar.css";
import SignInModal from "../ModalF/SignInModal";
import SignUpModal from "../ModalF/SignUpModal";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

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
  //const checkAuth = async () => {};

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

  return (
    <div>
      <div className="navbar">
        <img alt="menu" src="../../menu.svg" className="menu-button"></img>
        <div className="logo-home">
          <img alt="logo" src="../../logo.svg" className="logo-home"></img>
          <h1 className="title-home">NUGGETS</h1>
        </div>
        <img
          alt="notification"
          src="../../notification.svg"
          className="notif-button"
        ></img>
        <a href="/">
          <img
            alt="user-profile"
            src="../../user.svg"
            className="user-button"
          ></img>
        </a>
      </div>
      <div>
        <div className="sidebar">
          <div className="sidebar-container">
            <a href="/home">
              <img alt="" src="../../home.svg"></img>
              <span>Home</span>
            </a>
          </div>
          <div className="sidebar-container">
            <a href="/journal">
              <img alt="" src="../../journal.svg"></img>
              <span>Journal</span>
            </a>
          </div>
          <div className="sidebar-container">
            <a href="/events">
              <img alt="" src="../../events.svg"></img>
              <span>Events</span>
            </a>
          </div>
          <div className="sidebar-container">
            <a href="/contacts">
              <img alt="" src="../../contacts.svg"></img>
              <span>Contacts</span>
            </a>
          </div>
          <div className="sidebar-container">
            <a href="/">
              <img alt="" src="../../logout.svg"></img>
              <span>Log out</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarWelcome;
export { NavbarWelcome, NavbarHome };
