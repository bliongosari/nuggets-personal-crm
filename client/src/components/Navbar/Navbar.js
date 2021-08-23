import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
        <h1>NUGGETS</h1>

        <div className="buttonss">
          <button className="btn">
            Sign In
          </button>
        
          <button className="btn">
            Sign Up
          </button>
        </div>
        
        
      </div>
  );
}

export default Navbar;
