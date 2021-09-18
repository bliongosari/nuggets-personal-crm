import { useState } from "react";
import "./conversation.css";

function Reminder() {

  return (
    <div className="containerdiv">

        <div className="contacts-form">
            <div className="formtitle">
                <h1>Add a new reminder</h1>
                <hr></hr>
            </div>

            <div className="details">
                <h2>Reminder title:</h2>
                <input></input>
            </div>

            <div className="details">
                <h2>Reminder description:</h2>
                <input></input>
            </div>

            <div className="details">
                <h2>Reminder date:</h2>
                <input placeholder="dd/mm/yyyy"></input>
            </div>

            <div className="details">
                <h2>Repeat reminder:</h2>
                <div className="custom-select">
                    <form method="post">
                        <select>
                            <option value="a">Remind me once</option>
                            <option value="b">Remind me every day</option>
                            <option value="c">Remind me every week</option>
                            <option value="d">Remind me every month</option>
                        </select>
                    </form>
                </div>
                
            </div>

            <div className="detailss">
                <button className="eventbtn">
                    <h1>Cancel</h1>
                </button>
                <button className="eventbtn">
                    <h1>Add reminder</h1>
                </button>
            </div>
        </div>

    </div>
  );
}

export default Reminder;