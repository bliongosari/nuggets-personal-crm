import { useState } from "react";
import "./conversation.css";

function Task() {

  return (
    <div className="containerdiv">

      <div className="contacts-form">
        <div className="formtitle">
          <h1>Add a new task</h1>
          <hr></hr>
        </div>

        <div className="details">
          <h2>Task title:</h2>
          <input></input>
        </div>

        <div className="details">
          <h2>Task description:</h2>
          <input></input>
        </div>

        <div className="details">
          <h2>Due date:</h2>
          <input placeholder="dd/mm/yyyy"></input>
        </div>

    
        <div className="detailss">
          <button className="eventbtn">
            <h1>Cancel</h1>
          </button>
          <button className="eventbtn">
            <h1>Add task</h1>
          </button>
        </div>
      </div>

    </div>
  );
}

export default Task;