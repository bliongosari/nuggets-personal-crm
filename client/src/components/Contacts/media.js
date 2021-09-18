import { useState } from "react";
import "./conversation.css";

function Media() {

  return (
    <div className="containerdiv">

        <div className="contacts-form">
            <div className="formtitle">
                <h1>Upload new media</h1>
                <hr></hr>
            </div>

           

            <div className="details">
                <h2>Select event category:</h2>
                <div className="custom-select">
                    <form method="post">
                        <select>
                            <option value="a">Document</option>
                            <option value="b">Photo</option>
                            <option value="c">Video</option>
                            
                        </select>
                    </form>
                </div>
                
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
                    <h1>Attach files/images</h1>
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

export default Media;