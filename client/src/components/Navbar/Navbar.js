import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
<<<<<<< Updated upstream
=======
import SignInModal from "../ModalF/SignInModal"
import SignUpModal from "../ModalF/SignUpModal"
>>>>>>> Stashed changes

function Navbar() {
  return (
    <div className="navbar">
      <h1>NUGGETS</h1>

<<<<<<< Updated upstream
      <Link to="/">
        <button className="btn">Log in</button>
      </Link>
      
    </div>
=======
        <SignInModal/>
        <SignUpModal/>
        
        
      </div>
>>>>>>> Stashed changes
  );
}

export default Navbar;
