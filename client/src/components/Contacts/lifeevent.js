import { useState } from "react";
import "./lifeevent.css";

function LifeEvent() {
  return (
    <div className="containerdiv">

        <div className="contacts-form">
            <div className="formtitle">
                <h1>Add a life event</h1>
                <hr></hr>
            </div>

            <div className="details">
                <h2>Select event category:</h2>
                <div className="custom-select">
                    <form method="post">
                        <select>
                            <option value="a">Started a new job</option>
                            <option value="b">Retirement</option>
                            <option value="c">Starting school</option>
                            <option value="d">Studied abroad</option>
                            <option value="e">Started volunteering</option>
                            <option value="f">Received achievements</option>
                            <option value="g">Started military service</option>
                            <option value="h">Marriage</option>
                        </select>
                    </form>
                </div>
                
            </div>

            <div className="details">
                <h2>Date of event:</h2>
                <input placeholder="dd/mm/yyyy"></input>
            </div>

            <div className="details">
                <h2>Title:</h2>
                <input></input>
            </div>

            <div className="details">
                <h2>Story:</h2>
                <input></input>
            </div>

            <div className="details">
                <h2>Personal Notes:</h2>
                <input></input>
            </div>

            <div className="detailss">
                <button className="eventbtn">
                    <h1>Cancel</h1>
                </button>
                <button className="eventbtn">
                    <h1>Add life event</h1>
                </button>
            </div>
        </div>

    </div>
  );
}

export default LifeEvent;