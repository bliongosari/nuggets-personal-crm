import React from "react";
import { login, logout } from "./features/user/userSlice";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Home from "./components/Home/Home.js";

function App() {
  return (
    <div className="app">
      {/* <Navbar></Navbar> */}
      <Home></Home>
    </div>
  );
}

export default App;
