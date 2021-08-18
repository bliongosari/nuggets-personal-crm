import React from "react";
import Sidebar from "../Sidebar/Sidebar.js";
import Navbar from "../Navbar/Navbar.js";
import "./Home.css";
import Login from "../Login/Login.js";
//import ContainedButtons from "./Side.js";

function Home() {
  return (
    <div className="home">
      <Navbar></Navbar>
      <Login></Login>
      This is home page
    </div>
  );
}

export default Home;
