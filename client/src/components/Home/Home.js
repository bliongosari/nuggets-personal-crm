import React from "react";
import "./Home.css";
import EventsSummary from "./EventsSummary";
function Home() {
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

      <EventsSummary />

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
          <button className="next">
            <img alt="next" src="../../next.svg" className="next"></img>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
