import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div>
      <div className="sidebar">
        <div class="sidebar-container">
          <a href="/home"><img alt="" src="../../home.svg"></img><span>Home</span></a>
        </div>
        <div class="sidebar-container">
          <a href="/journal"><img alt="" src="../../journal.svg"></img><span>Journal</span></a>
        </div>
        <div class="sidebar-container">
          <a href="/events"><img alt="" src="../../events.svg"></img><span>Events</span></a>
        </div>
        <div class="sidebar-container">
          <a href="/contacts"><img alt="" src="../../contacts.svg"></img><span>Contacts</span></a>
        </div>
        <div class="sidebar-container">
          <a href="/"><img alt="" src="../../logout.svg"></img><span>Log out</span></a>    
        </div>
      </div>
    </div> 
  );
}

export default Sidebar;
