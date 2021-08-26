import React from "react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import UserInfo from "../Examples/UserInfo";
import Contact from "../Examples/Contact";

function Home() {
  const history = useHistory();

  const logout = async (e) => {
    Cookies.remove("token");
    history.push("/");
  };

  return (
    <div className="home">
      <UserInfo />
      <Contact />
      <h1>This is home page</h1>
      <button onClick={logout}>Log out....</button>
    </div>
  );
}

export default Home;
