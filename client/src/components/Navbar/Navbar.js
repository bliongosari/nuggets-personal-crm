import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h1>NUGGETS</h1>

      <Link to="/">
        <button className="btn">Log in</button>
      </Link>
      
    </div>
  );
}

export default Navbar;
