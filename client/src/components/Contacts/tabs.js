import { useState, render } from "react";
import "./tabs.css";
import LifeEvent from "./lifeevent";
import EditLifeEvent from "./EditLifeEvent";
import Conversation from "./conversation";
import EditConversation from "./EditConversation";
import Reminder from "./reminder";
import EditReminder from "./EditReminder"
import Task from "./task";
import EditTask from "./EditTask";
import Document from "./document";
import Media from "./media";
import { editContact } from "./contactsAPI";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./lifeevent.css";
import "./conversation.css";

function Tabs({contact}) {
  const [toggleState, setToggleState] = useState(1);
  const [index, setIndex] = useState(-1);
  const [Life, setLife] = useState(false);
  const [Remind, setRemind] = useState(false);
  const [Convo, setConvo] = useState(false);
  const [Task2, setTask2] = useState(false);
  const [AddLife, setAddLife] = useState(false);
  const [AddRemind, setAddRemind] = useState(false);
  const [AddConvo, setAddConvo] = useState(false);
  const [AddTask2, setAddTask2] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [active, setActive] = useState(false)
  const deactivate = () => {
    setActive("");
  }

  const toggleAddLife = () => {
    setAddLife(!AddLife);
  };
   const toggleAddRemind = () => {
    setAddRemind(!AddRemind);
  };
   const toggleAddConvo = () => {
    setAddConvo(!AddConvo);
  };
   const toggleAddTask2 = () => {
    setAddTask2(!AddTask2);
  };
    const toggleLife = () => {
    setLife(!Life);
  };
   const toggleRemind = () => {
    setRemind(!Remind);
  };
   const toggleConvo = () => {
    setConvo(!Convo);
  };
   const toggleTask2 = () => {
    setTask2(!Task2);
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => {toggleTab(1); setActive("");}}>
          Life events
        </button>
        <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => {toggleTab(2); setActive("");}}>
          Conversations, Reminders and Tasks
        </button>

      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "content  active-content" : "content"}>
          <div className="head">
            <h1 style = {{fontSize: "15px", marginBottom: "10px"}}> Life Updates with {contact.full_name.split(' ')[0]}</h1>
            <button className="addbtn" onClick={() => active === "lifeevent" ? setActive(""): setActive("lifeevent")}>
              <h1 style = {{fontSize: "12px"}}>Add life event</h1>
            </button>
            {/* <hr /> */}
          </div>
          <div className="contactfunctionalitydeet">
            {active === "lifeevent" && <LifeEvent deactivate={deactivate} contact={contact}/>}
            {active === "editlifeevent" && <EditLifeEvent deactivate={deactivate} contact={contact} index={index} toggleLife = {toggleLife} />}
          </div>

          
          <div className="addlifeevent">
            <div className="eventreminder-content">
              <h3>All life events regarding this person will show up here</h3>
              {contact.lifeevents.map((lifeevent, idx) => (
                <div key={lifeevent.title+idx}>
                  <hr/>
                  <div className="datacontent">
                    
                    <div className="editdelbutton">
                      <button onClick={() =>  {
                        setIndex(idx);
                        toggleLife();
                      }} className="confbutton">
                        <ModeEditIcon/>
                      </button>
                      { Life && (
                        <EditLifeEvent deactivate={deactivate} contact={contact} index={index} toggleLife = {toggleLife} />
                      )}
                      <button onClick={() => {
                        contact.lifeevents.splice(idx, 1);
                        editContact(contact);
                      }} className="confbutton">
                        <DeleteIcon/>
                      </button>
                    </div>
                    <div className="datadetails">
                      <h1>{lifeevent.title}</h1>
                      <p>View More</p>
                    </div>
                    
                  </div>
                  <hr/>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={toggleState === 2 ? "content  active-content" : "content"}>
          <div className = "subcontent">
            <div className="eventreminder">
              <h1> Reminders or Notes</h1>
              {/* <button className="eventbtn" onClick={() => setActive("reminder")}> */}
              <button className="eventbtn" onClick={toggleAddRemind}>
                { AddRemind && (<Reminder deactivate={deactivate} contact={contact}  toggleAddRemind = {toggleAddRemind} />)}
                <h1>Add reminder</h1>
              </button>
            </div>
            <div className="eventreminder-content">
              <h3>All reminders regarding this person will show up here</h3>
              {contact.reminders.map((reminder, idx) => (
                <div key={reminder.title+idx}>
                  <hr/>
                  <div className="datacontent">
                    <div className="editdelbutton">
                      <button onClick={() => {
                        setIndex(idx);
                        toggleRemind();
                      }} className="confbutton">
                        <ModeEditIcon/>
                      </button>
                      { Remind && (
                        <EditReminder deactivate={deactivate} contact={contact} index={index} toggleRemind = {toggleRemind} />
                        )}

                      <br/>
                      <button onClick={() => {
                        contact.reminders.splice(idx, 1);
                        editContact(contact);
                      }} className="confbutton">
                        <DeleteIcon/>
                      </button>
                    </div>
                    <div className="datadetails">
                      <h1>{reminder.title}</h1>
                      <p>View More</p>
                    </div>
                    
                  </div>
                  {/* <hr/> */}
                </div>
              ))}
            </div>
          </div>

          <hr/>
          <div className = "subcontent">
            <div className="eventreminder">
              <h1>Task</h1>
               <button className="eventbtn" onClick={toggleAddTask2}>
                { AddTask2 && (<Task deactivate={deactivate} contact={contact}  toggleAddTask2 = {toggleAddTask2} />)}
                <h1>Add task</h1>
              </button>
            </div>
            <div className="eventreminder-content">
              <h3>All tasks with this person will show up here</h3>
              {contact.tasks.map((task, idx) => (
                <div key={task.title+idx}>
                  <hr/>
                  <div className="datacontent">
                    <div className="editdelbutton">
                      <button onClick={() => {
                        setIndex(idx);
                         toggleTask2();
                      }} className="confbutton">
                        <ModeEditIcon/>
                      </button>
                      { Task2 && (
                        <EditTask deactivate={deactivate} contact={contact} index={index} toggleTask2 = {toggleTask2} />
                      )}
                      <br/>
                      <button onClick={() => {
                        contact.tasks.splice(idx, 1);
                        editContact(contact);
                      }} className="confbutton">
                        <DeleteIcon/>
                      </button>
                    </div>
                    <div className="datadetails">
                      <h1>{task.title}</h1>
                      <p>View More</p>
                    </div>
                    
                  </div>
                  <hr/>
                  
                  
                </div>
              ))}
            </div>
          </div>

          <hr/>
          <div className = "subcontent">
            <div className="eventreminder">
              <h1>Conversations</h1>
              <button className="eventbtn" onClick={toggleAddConvo}>
                { AddConvo && (<Conversation deactivate={deactivate} contact={contact}  toggleAddConvo = {toggleAddConvo} />)}
                <h1>Add conversation</h1>
              </button>
            </div>
            <div className="eventreminder-content">
              <h3>All conversations with this person will show up here</h3>
              {contact.conversations.map((conversation, idx) => (
                <div key={conversation.topic+idx}>
                  <hr/>
                  <div className="datacontent">
                    <div className="editdelbutton">
                      <button onClick={() => {
                        setIndex(idx);
                         toggleConvo();
                      }} className="confbutton">
                        <ModeEditIcon/>
                      </button>
                      { Convo && (
                        <EditConversation deactivate={deactivate} contact={contact} index={index} toggleConvo = {toggleConvo} />
                      )}
                      <br/>
                      <button onClick={() => {
                        contact.conversations.splice(idx, 1);
                        editContact(contact);
                      }} className="confbutton">
                        <DeleteIcon/>
                      </button>
                    </div>
                  <div className="datadetails">
                      <h1>{conversation.topic}</h1>
                      <p>View More</p>
                    </div>
                    
                  </div>
                  <hr/>
                </div>
              ))}
            </div>
          </div>

          <div className="contactfunctionalitydeet">
            {/* {active === "conversation" && <Conversation deactivate={deactivate} contact={contact}/>}
            {active === "editconversation" && <EditConversation deactivate={deactivate} contact={contact} index={index}/>}
            {active === "reminder" && <Reminder deactivate={deactivate} contact={contact}/>}
            {active === "editreminder" && <EditReminder deactivate={deactivate} contact={contact} index={index}/>}
            {active === "task" && <Task deactivate={deactivate} contact={contact}/>}
            {active === "edittask" && <EditTask deactivate={deactivate} contact={contact} index={index}/>} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;