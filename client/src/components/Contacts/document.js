import { useState } from "react";
import "./conversation.css";

function Document() {

  return (
    <div className="containerdiv">

        <div className="contacts-form">
            <div className="formtitle">
                <h1>Upload new document</h1>
                <hr></hr>
            </div>

            <div className="details">
                <h2>Upload title:</h2>
                <input></input>
            </div>

            <div className="details">
                <h2>Upload description:</h2>
                <input></input>
            </div>
        
            <div className="detailss">
                 <button className="eventbtn">
                    <h1>Attach files</h1>
                </button>
                <button className="eventbtn">
                    <h1>Cancel</h1>
                </button>
                <button className="eventbtn">
                    <h1>Upload</h1>
                </button>
            </div>
        </div>

    </div>
  );
}

export default Document;