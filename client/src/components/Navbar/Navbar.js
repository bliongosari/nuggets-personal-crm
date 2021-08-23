import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
        <h1>NUGGETS</h1>

        <div className="buttons">
          <div className="signbtn">
            <Link to="/">
              <button className="btn">Sign in</button>
            </Link>
          </div>

          <div className="signbtn">
            <Link to="/">
              <button className="btn">Sign up</button>
            </Link>
          </div>
        </div>
        
      </div>
  );
}

export default Navbar;
