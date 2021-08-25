import React from "react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

function Home() {
  const history = useHistory();

  const logout = async (e) => {
    Cookies.remove("token");
    history.push("/");
  };

  return (
    <div className="home">
      <h1>This is home page</h1>
      <button onClick={logout}>Log out....</button>
    </div>
  );
}

export default Home;
