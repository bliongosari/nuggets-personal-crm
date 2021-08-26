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
      {/* Summary Table */}
      <div className="summary summary-container">
        <div>
          <h1>(num)</h1>
          <h2>JOURNAL</h2>
        </div>
        <div>
          <h1>(num)</h1>
          <h2>EVENTS</h2>
        </div>
        <div>
          <h1>(num)</h1>
          <h2>CONTACTS</h2>
        </div>
      </div>

      {/* Events Table */}
      <div className="current-events">
        <h1>EVENTS IN THE NEXT 2 WEEKS</h1>
        <div className="current-events-container">
          <img alt="events" src="../../events.svg"></img>
          <h2>Meeting</h2>
          <h3>DD/MM/YYYY</h3>
        </div>
        <hr className="line"></hr>
        <div className="current-events-container">
          <img alt="events" src="../../events.svg"></img>
          <h2>Meeting</h2>
          <h3>DD/MM/YYYY</h3>
        </div>
        <hr className="line"></hr>
        <div className="current-events-container">
          <img alt="events" src="../../events.svg"></img>
          <h2>Meeting</h2>
          <h3>DD/MM/YYYY</h3>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="new-contacts">
        <h1>RECENTLY ADDED CONTACTS</h1>
        <div className="new-contacts-container">
          <div>
            <h2 className="square">A</h2>
            <h3>Contacts Name</h3>
          </div>
          <div>
            <h2 className="square">B</h2>
            <h3>Contacts Name</h3>
          </div>
          <div>
            <h2 className="square">C</h2>
            <h3>Contacts Name</h3>
          </div>
          <button className="next"><img alt="next" src="../../next.svg" className="next"></img></button>
        </div>
      </div>
    </div>
  );
}

export default Home;
