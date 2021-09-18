import { useState } from "react";
import "./tabs.css";

function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
            Life events
        </button>
        <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
          Conversations, Reminders and Tasks
        </button>
        <button className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>
          Photos and Documents
        </button>
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "content  active-content" : "content"}>
          <h1> Life Updates of (contact name)</h1>
          <hr />
          <h3>Log what happens to the life of (contact name) for your future reference.</h3>
          <div className="addlifeevent">
            <button className="addbtn">
                <h1>Add life event</h1>
            </button>
          </div>
        </div>

        <div className={toggleState === 2 ? "content  active-content" : "content"}>
            <div className = "subcontent">
                <div className="eventreminder">
                    <h1> &nbsp; Reminders or Notes</h1>
                    <button className="eventbtn">
                        <h1>Add reminder</h1>
                    </button>
                </div>
                <div className="eventreminder-content">
                    <h3>All reminders regarding this person will show up here</h3>
                </div>
            </div>

            <hr/>
            <div className = "subcontent">
                <div className="eventreminder">
                    <h1> &nbsp; Task</h1>
                    <button className="eventbtn">
                        <h1>Add task</h1>
                    </button>
                </div>
                <div className="eventreminder-content">
                    <h3>All tasks with this person will show up here</h3>
                </div>
            </div>

            <hr/>
            <div className = "subcontent">
                <div className="eventreminder">
                    <h1> &nbsp; Phone calls</h1>
                    <button className="eventbtn">
                        <h1>Add calls</h1>
                    </button>
                </div>
                <div className="eventreminder-content">
                    <h3>All phone calls with this person will show up here</h3>
                </div>
            </div>
        </div>

        <div className={toggleState === 3 ? "content  active-content" : "content"}>
          <div className = "subcontent">
                <div className="eventreminder">
                    <h1> &nbsp; Photos</h1>
                    <button className="eventbtn">
                        <h1>Upload photos</h1>
                    </button>
                </div>
                <div className="eventreminder-content">
                    <h3>All photos regarding this person will show up here</h3>
                </div>
            </div>

            <hr/>
            <div className = "subcontent">
                <div className="eventreminder">
                    <h1> &nbsp; Documents</h1>
                    <button className="eventbtn">
                        <h1>Upload documents</h1>
                    </button>
                </div>
                <div className="eventreminder-content">
                    <h3>All documents regarding this person will show up here</h3>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;