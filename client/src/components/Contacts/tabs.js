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
import ViewDetails from "./ViewLife"
import ViewTaskdet from "./ViewTask"
import ViewReminderdet from "./ViewReminder"
import ViewConvodet from "./ViewConvo"
import "./lifeevent.css";
import "./conversation.css";
import Feedback from "../Feedback/Feedback";

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
  const [ViewLife, setViewLife] = useState(false);
  const [ViewTask2, setViewTask2] = useState(false);
  const [ViewReminder, setViewReminder] = useState(false);
  const [ViewConvo, setViewConvo] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [curMsg, setCurMsg] = useState("");
  const [delLifeEvent, setDelLifeEvent] = useState(false);
  const [delTask, setDelTask] = useState(false);
  const [delConvo, setDelConvo] = useState(false);
  const [delReminder, setDelReminder] = useState(false);

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
  const toggleViewLife = () => {
    setViewLife(!ViewLife);
  };
  const toggleViewTask2 = () => {
    setViewTask2(!ViewTask2);
  };
  const toggleViewReminder = () => {
    setViewReminder(!ViewReminder);
  };
  const toggleViewConvo = () => {
    setViewConvo(!ViewConvo);
  };
  const toggleDelLifeEvent = () => {
    setDelLifeEvent(!delLifeEvent);
  };
  const toggleDelTask = () => {
    setDelTask(!delTask);
  };
  const toggleDelReminder = () => {
    setDelReminder(!delReminder);
  };
  const toggleDelConvo = () => {
    setDelConvo(!delConvo);
  };
  
  const setSuccessMsg = async (msg) => {
    setCurMsg(msg);
    setSuccess(true);
    setTimeout(function(){ 
      setSuccess(false);
      setCurMsg("");
    }, 6000)
  }

  const setFailedMsg = async (msg) => {
    setCurMsg(msg);
    setFailed(true);
    setTimeout(function(){ 
      setFailed(false);
      setCurMsg("");
    }, 6000)
  }

  const editResponse = async (res) => {
    if (res){
      setSuccessMsg("Successfully edited");
      setLife(false);
      setRemind(false);
      setTask2(false);
      setConvo(false);
    } else {
      setFailedMsg("Failed to edit");
    };
  }

  const addResponse = async (res) => {
    if (res){
      setSuccessMsg("Successfully added");
      setAddRemind(false);
      setAddLife(false);
      setAddConvo(false);
      setAddTask2(false);
    } else {
      setFailedMsg("Failed to add");
    };
  }

  const deleteDetailLife = async (idx) => {
    contact.lifeevents.splice(idx, 1);
    if (editContact(contact)){
      setSuccessMsg("Successfully deleted life event");
    } else {
      setFailedMsg("Failed to delete");
    };
  }

  const deleteReminder = async (idx) => {
    contact.reminders.splice(idx, 1);
    if (editContact(contact)) {
      setSuccessMsg("Successfully deleted reminder");
    }
    else {
      setFailedMsg("Failed to delete");
    }
  }
  const deleteTask = async (idx) => {
    contact.tasks.splice(idx, 1);
    if (editContact(contact)) {
      setSuccessMsg("Successfully deleted task");
    }
    else {
      setFailedMsg("Failed to delete");
    }
  }

  const deleteConversation = async (idx) => {
    contact.conversations.splice(idx, 1);
    if (editContact(contact)) {
      setSuccessMsg("Successfully deleted conversation");
    }
    else {
      setFailedMsg("Failed to delete");
    }
  }


  return (
    <div className="container">
      {success && <Feedback success message = {curMsg} />}
      {failed && <Feedback message = {curMsg} />}
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
          <div style = {{display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap"}}>
          <div className="head" style = {{display: "flex"}}>
            <h1 style = {{fontSize: "15px", marginBottom: "10px"}}> Life Updates with {contact.full_name.split(' ')[0]}</h1>
            {/* <hr /> */}
          </div>
          <button className = "btnAdd" style ={{display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px", padding: "1% 5%", borderRadius: "10px", color : "white"}} onClick={() => setAddLife(true)}>
              <h1 style = {{color : "white", fontSize: "12px"}}>Add life event</h1>
            </button>
          </div>
          <div className="contactfunctionalitydeet">
            {AddLife && <LifeEvent msg = {addResponse} deactivate={deactivate} contact={contact} toggleLife = {toggleAddLife} />}
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
                        <EditLifeEvent editLife = {editResponse} deactivate={deactivate} contact={contact} index={index} toggleLife = {toggleLife} />
                      )}

                      <button onClick={() => {toggleDelLifeEvent(); }} className="confbutton">
                        <DeleteIcon/>
                      </button>

                      {delLifeEvent && (
                  <div className="modal1">
                    <div onClick={toggleDelLifeEvent} className="overlay"></div>
                    <div className="modal2-content">
                      <div className="modal-titlee">
                        <h2>Confirmation</h2>
                        <hr></hr>
                      </div>

                      <div className="closebutton">
                        <img alt="" src="../../close.svg" onClick={toggleDelLifeEvent}></img>
                      </div>

                      <div className="modal-titlee2">
                        <br/>
                        <h2>Are you sure you want to delete this life event?</h2>
                        <br/>
                      </div>

                      <button className="confirmbtn1" onClick={() => {deleteDetailLife(idx); toggleDelLifeEvent();}}>
                        <h1>Delete Life Event</h1>
                      </button>
                    </div>
                  </div>
                )}


                    </div>
                    <div className="datadetails">
                      <h1>{lifeevent.title}</h1>
                      <button className="viewbtn" onClick={() =>  {
                        setIndex(idx);
                        toggleViewLife();
                      }}>      
                        <h1>View More</h1>
                      </button>
                      {ViewLife && (
                        <ViewDetails contact={contact} index={index} toggleViewLife = {toggleViewLife} />
                      )}
                    </div>
                    
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={toggleState === 2 ? "content  active-content" : "content"}>
          <div className = "subcontent">
            <div style = {{marginBottom: "20px", fontSize: "80%", display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap", flexDirection: "row"}}>
            <div style = {{display: "flex"}} >
              <h1> Reminders or Notes</h1>
              {/* <button className="eventbtn" onClick={() => setActive("reminder")}> */}
            </div>
            <button  className = "btnAdd" style ={{display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px", padding: "1% 5%", borderRadius: "10px", color : "white"}} onClick={toggleAddRemind}>
                <h1 style = {{color : "white", fontSize: "12px"}}>Add reminder</h1>
            </button>
            </div>
              { AddRemind && (<Reminder msg = {addResponse} deactivate={deactivate} contact={contact}  toggleAddRemind = {toggleAddRemind} />)}
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
                        <EditReminder edit = {editResponse} deactivate={deactivate} contact={contact} index={index} toggleRemind = {toggleRemind} />
                        )}

                      <br/>
                      {/* <button onClick={() => {
                        deleteReminder(idx)
                      }} className="confbutton">
                        <DeleteIcon/>
                      </button> */}
                      <button onClick={() => {toggleDelReminder(); }} className="confbutton">
                        <DeleteIcon/>
                      </button>

                      {delReminder && (
                  <div className="modal1">
                    <div onClick={toggleDelReminder} className="overlay"></div>

                    <div className="modal2-content">
                      <div className="modal-titlee">
                        <h2>Confirmation</h2>
                        <hr></hr>
                      </div>

                      <div className="closebutton">
                        <img alt="" src="../../close.svg" onClick={toggleDelReminder}></img>
                      </div>

                      <div className="modal-titlee2">
                        <br/>
                        <h2>Are you sure you want to delete this reminder?</h2>
                        <br/>
                      </div>

                      <button className="confirmbtn1"  onClick={() => {
                        deleteReminder(idx); toggleDelReminder();}}>
                        <h1>Delete Reminder</h1>
                      </button>
                    </div>
                  </div>
                )}
                    </div>
                    <div className="datadetails">
                      <h1>{reminder.title}</h1>
                      <button className="viewbtn" onClick={() =>  {
                        setIndex(idx);
                        toggleViewReminder();
                      }}>      
                        <h1>View More</h1>
                      </button>
                      {ViewReminder && (
                        <ViewReminderdet contact={contact} index={index} toggleViewReminder = {toggleViewReminder} />
                        )}
                    </div>
                    
                  </div>
                  {/* <hr/> */}
                </div>
              ))}
            </div>
          </div>

          <hr/>
          <div className = "subcontent">
          <div style = {{marginBottom: "20px", fontSize: "80%", display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap", flexDirection: "row"}}>
            <div  style = {{display: "flex"}}>
              <h1>Task</h1>
            </div>
            <button  className = "btnAdd" style ={{display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px", padding: "1% 5%", borderRadius: "10px", color : "white"}} onClick={toggleAddTask2}>
                <h1 style = {{color : "white", fontSize: "12px"}}>Add task</h1>
              </button>
              { AddTask2 && (<Task msg = {addResponse} deactivate={deactivate} contact={contact}  toggleAddTask2 = {toggleAddTask2} />)}
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
                        <EditTask edit = {editResponse} deactivate={deactivate} contact={contact} index={index} toggleTask2 = {toggleTask2} />
                      )}
                      <br/>
                    
                      <button onClick={() => {toggleDelTask(); }} className="confbutton">
                        <DeleteIcon/>
                      </button>

                      {delTask && (
                  <div className="modal1">
                    <div onClick={toggleDelTask} className="overlay"></div>

                    <div className="modal2-content">
                      <div className="modal-titlee">
                        <h2>Confirmation</h2>
                        <hr></hr>
                      </div>

                      <div className="closebutton">
                        <img alt="" src="../../close.svg" onClick={toggleDelTask}></img>
                      </div>

                      <div className="modal-titlee">
                        <br/>
                        <h2>Are you sure you want to delete this task?</h2>
                        <br/>
                      </div>

                      <button className="confirmbtn1" onClick={() => {
                        deleteTask(idx); toggleDelTask();
                      }}>
                        <h1>Delete Task</h1>
                      </button>
                    </div>
                  </div>
                )}
                    </div>
                    <div className="datadetails">
                      <h1>{task.title}</h1>
                      <button className="viewbtn" onClick={() =>  {
                        setIndex(idx);
                        toggleViewTask2();
                      }}>      
                        <h1>View More</h1>
                      </button>
                    </div>
                    {ViewTask2 && (
                        <ViewTaskdet contact={contact} index={index} toggleViewTask2={toggleViewTask2} />
                        )}
                    
                  </div>
                  <hr/>
                  
                  
                </div>
              ))}
            </div>
          </div>

          <hr/>
          <div className = "subcontent">
          <div style = {{marginBottom: "20px", fontSize: "80%", display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap", flexDirection: "row"}}>
            <div  style = {{display: "flex"}}>
              <h1>Conversations</h1>
            </div>
            <button  className = "btnAdd" style ={{display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px", padding: "1% 5%", borderRadius: "10px", color : "white"}}  onClick={toggleAddConvo}>
                <h1 style = {{color : "white", fontSize: "12px"}}>Add conversation</h1>
              </button>
              </div>
              { AddConvo && (<Conversation msg = {addResponse} deactivate={deactivate} contact={contact}  toggleAddConvo = {toggleAddConvo} />)}
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
                        <EditConversation edit = {editResponse} deactivate={deactivate} contact={contact} index={index} toggleConvo = {toggleConvo} />
                      )}
                      <br/>
                      
                      <button onClick={() => {toggleDelConvo(); }} className="confbutton">
                        <DeleteIcon/>
                      </button>

                      {delConvo && (
                  <div className="modal1">
                    <div onClick={toggleDelConvo} className="overlay"></div>

                    <div className="modal2-content">
                      <div className="modal-titlee">
                        <h2>Confirmation</h2>
                        <hr></hr>
                      </div>

                      <div className="closebutton">
                        <img alt="" src="../../close.svg" onClick={toggleDelConvo}></img>
                      </div>

                      <div className="modal-titlee2">
                        <br/>
                        <h2>Are you sure you want to delete this conversation?</h2>
                        <br/>
                      </div>

                      <button className="confirmbtn1" onClick={() => {
                        deleteConversation(idx); toggleDelConvo();
                      }}>
                        <h1>Delete Conversation</h1>
                      </button>
                    </div>
                  </div>
                )}
                    </div>
                  <div className="datadetails">
                      <h1>{conversation.topic}</h1>
                      <button className="viewbtn" onClick={() =>  {
                        setIndex(idx);
                        toggleViewConvo();
                      }}>      
                        <h1>View More</h1>
                      </button>
                      {ViewConvo && (
                        <ViewConvodet contact={contact} index={index} toggleViewConvo = {toggleViewConvo} />
                        )}
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