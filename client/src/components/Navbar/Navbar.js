import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h1> This is navbar</h1>

      <Link to="/">
        <button>Go to Home</button>
      </Link>
      <Link to="/login">
        <button>Go to Login</button>
      </Link>
    </div>
  );
}

export default Navbar;
