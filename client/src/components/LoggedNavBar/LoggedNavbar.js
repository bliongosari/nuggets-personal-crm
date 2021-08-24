import React from "react";
import "./LoggedNavbar.css";


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
