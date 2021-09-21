import { useState, render } from "react";
import "./tabs.css";
import LifeEvent from "./lifeevent";
import Conversation from "./conversation";
import Reminder from "./reminder";
import Task from "./task";
import Document from "./document";
import Media from "./media";



function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [active, setActive] = useState(false)

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
            <button className="addbtn" onClick={() => setActive("lifeevent")}>
                <h1>Add life event</h1>
            </button>
          </div>

            <div className="contactfunctionalitydeet">
                {active === "lifeevent" && <LifeEvent/>}
            </div>
        </div>

        <div className={toggleState === 2 ? "content  active-content" : "content"}>
            <div className = "subcontent">
                <div className="eventreminder">
                    <h1> Reminders or Notes</h1>
                    <button className="eventbtn" onClick={() => setActive("reminder")}>
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
                    <h1>Task</h1>
                    <button className="eventbtn" onClick={() => setActive("task")}>
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
                    <h1> Phone calls</h1>
                    <button className="eventbtn" onClick={() => setActive("call")}>
                        <h1>Add calls</h1>
                    </button>
                </div>
                <div className="eventreminder-content">
                    <h3>All phone calls with this person will show up here</h3>
                </div>
            </div>

            <div className="contactfunctionalitydeet">
               {active === "call" && <Conversation/>}
                {active === "reminder" && <Reminder/>}
                {active === "task" && <Task/>}
            </div>
        </div>

        <div className={toggleState === 3 ? "content  active-content" : "content"}>
          <div className = "subcontent">
                <div className="eventreminder">
                    <h1> &nbsp; Photos</h1>
                    <button className="eventbtn" onClick={() => setActive("photo")}>
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
                    <button className="eventbtn" onClick={() => setActive("documents")}>
                        <h1>Upload document</h1>
                    </button>
                </div>
                <div className="eventreminder-content">
                    <h3>All documents regarding this person will show up here</h3>
                </div>
            </div>

            <div className="contactfunctionalitydeet">
                {active === "photo" && <Media/>}
                {active === "documents" && <Document/>}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;