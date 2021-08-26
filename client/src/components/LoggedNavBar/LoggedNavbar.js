import React from "react";
import "./LoggedNavBar.css";


function LoggedNavbar() {
  return (
    <div className="navbar">
        <div className="burger">
            <img alt="" src="../../whiteburger.svg"></img>
        </div>
        
        <div className="appname">
            <h1>NUGGETS</h1>
        </div>
        

        <div className="notif">
            <img alt="" src="../../whitenotif.svg"></img>
        </div>

        <div className="profile">
            <img alt="" src="../../whiteprofile.svg"></img>
        </div>
        
        
      </div>
  );
}

export default LoggedNavbar;
