import React from "react";
import { Link } from "react-router-dom";
import "./Unauthorized.css";

function Unauthorized() {
  return (
    <div className="unauthorized">
      <h1> Sorry you are unauthorized to view this page </h1>
      <h1>Please create an account to access this.</h1>
      <Link to="/">
        <h1 className="links"> Go to Home</h1>
      </Link>
    </div>
  );
}

export default Unauthorized;
