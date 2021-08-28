import React from "react";
import { Link } from "react-router-dom";
import "./Unauthorized.css";

function Unauthorized() {
  return (
    <div>
      <div className="nav">
        <img alt="logo" src="../../logo.svg" className="logo-welcome"></img>
        <h1 className="title-welcome">NUGGETS</h1>
      </div>
      <div className="unauthorized">
        <div className="sorry">
          <h1 className="text"> Sorry</h1>
          <img alt="sorry" src="../../sorry.svg" className="logo-welcome"></img>
        </div>
        <h1>You are unauthorized to view this page. </h1>
        <h1>Please log in to access.</h1>
        <Link to="/">
          <h1 className="links"> Go to Home</h1>
        </Link>
      </div>
      
    </div>
  );
}

export default Unauthorized;
