import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import SignInModal from "../ModalF/SignInModal"
import SignUpModal from "../ModalF/SignUpModal"


function Navbar() {
  return (
    <div className="navbar">
        <h1>NUGGETS</h1>

        <SignInModal/>
        <SignUpModal/>
        
        
      </div>
  );
}

export default Navbar;
