import React from "react";
import "./Example.css";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import UserInfo from "./UserInfo";
import Contact from "./Contact";

function Example() {
  const history = useHistory();

  const logout = async (e) => {
    Cookies.remove("token");
    history.push("/");
  };

  return (
    <div className="example">
      <UserInfo />
      <Contact />
      <h1>This is example page</h1>
      <button onClick={logout}>Log out....</button>
    </div>
  );
}

export default Example;
