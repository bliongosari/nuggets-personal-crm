import React from "react";
import "./AddEvent.css";

function AddEvent() {
return (
    <div className="home">

      <div className="searchbar">
        <img alt="search" src="../../searchbar.svg"></img>
        <input type="text" placeholder="SEARCH EVENTS"></input>
      </div>

      <div className="addEvents">
        <button className="addbtn">
          <img alt="plus" src="../../whiteadd.svg"></img>
          <h1>ADD NEW EVENT</h1>
        </button>
      </div>
      
      <div className="eventssummary">
        <div className="summarytitle">
          <h1>(num) Events</h1>
        </div>
        <div className="summarybutton">
          <button className="sortbtn">
            <h1>SORT</h1>
            <img alt="sort" src="../../sort.svg"></img>
        </button>
        </div>
      </div>

      {/* Events Table */}
      <div className="current-events">
        <div className="current-events-headings">
          <h1>Avatar</h1>
          <h1>Event</h1>
          <h1>Description</h1>
        </div>
        <div className="current-events-container">
          <img alt="events" src="../../events.svg"></img>
          <h2>John Smith</h2>
          <h3>Blablabla</h3>
        </div>
        <hr className="line"></hr>
        <div className="current-events-container">
          <img alt="events" src="../../events.svg"></img>
          <h2>John Smith</h2>
          <h3>Blablabla</h3>
        </div>
        <hr className="line"></hr>
        <div className="current-events-container">
          <img alt="events" src="../../events.svg"></img>
          <h2>John Smith</h2>
          <h3>Blablabla</h3>
        </div>
        <div className="events-summary-container">
          <div className="summarytitle">
            <h2>Page 2 of 2</h2>
          </div>
          <div className="navbutton">
            <button className="backbtn">
              <img alt="back" src="../../back.svg"></img>
              <h1>Back</h1>
            </button>

            <button className="backbtn">
              <h1>Next</h1>
              <img alt="next" src="../../nextt.svg"></img>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AddEvent;
