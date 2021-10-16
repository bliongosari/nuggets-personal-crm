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

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [active, setActive] = useState(false)
  const deactivate = () => {
    setActive("");
  }

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


  if (Life) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  if (Remind) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  if (Convo) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  if (Task2) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }


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
            {active === "editlifeevent" && <EditLifeEvent deactivate={deactivate} contact={contact} index={index}/>}
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
                        <div className="editmodal">
                           <div onClick={toggleLife} className="editoverlay"></div>
                          <div className="modalcontentedit">
                            <div className="contacts-form">
                            <div className="formtitle">
                              <h1>Edit life event</h1>
                              <div className="closeee">
                                <img alt="" src="../../close.svg" onClick={toggleLife}></img>
                              </div>
                              <hr></hr>
                            </div>

                            <div className="details">
                              <h2>Select event category:</h2>
                              <div className="custom-select">
                                {/* <form method="post">
                                    <select onChange={(e) => setCategory(e.target[e.target.value].innerText)}>
                                      <option value="0" disabled selected>-- Select option --</option>
                                      <option value="1">Started a new job</option>
                                      <option value="2">Retirement</option>
                                      <option value="3">Starting school</option>
                                      <option value="4">Studied abroad</option>
                                      <option value="5">Started volunteering</option>
                                      <option value="6">Received achievements</option>
                                      <option value="7">Started military service</option>
                                      <option value="8">Marriage</option>
                                      <option value="9">Other</option>
                                    </select>
                                </form> */}
                              </div>
                            </div>

                            <div className="details">
                              <h2>Date of event:</h2>
                              <input></input>
                              {/* <input value={date} 
                                    name="date"
                                    type="date" //change to time later
                                    onChange={(e) => setDate(e.target.value)} /> */}
                            </div>

                            <div className="details">
                              <h2>Title:</h2>
                              {/* <input value={title} onChange={(e) => setTitle(e.target.value)} /> */}
                              <input/>
                            </div>

                            <div className="details">
                              <h2>Story:</h2>
                              {/* <input value={story} onChange={(e) => setStory(e.target.value)} /> */}
                              <input/>
                            </div>

                            <div className="details">
                              <h2>Personal Notes:</h2>
                              {/* <input value={notes} onChange={(e) => setNotes(e.target.value)} /> */}
                              <input/>
                            </div>

                            {/* <div className="detailss">
                              <button className="eventbtn" onClick={deactivate}>
                                <h1>Cancel</h1>
                              </button>
                              <button className="eventbtn" onClick={() => {
                                contact.lifeevents[index] = {
                                  category,
                                  date,
                                  title,
                                  story,
                                  notes,
                                };
                                editContact(contact);
                              }}
                              >
                                <h1>Edit life event</h1>
                              </button>
                            </div> */}
                          </div>
                          </div>
                          
                        </div>
                      )
                      }
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
              <button className="eventbtn" onClick={() => setActive("reminder")}>
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
                        <div className="editmodal">
                           <div onClick={toggleRemind} className="editoverlay"></div>
                           <div className="modalcontentedit">
                          <div className="contacts-form">
                            <div className="formtitle">
                              <h1>Edit reminder</h1>
                              <div className="closeee">
                                <img alt="" src="../../close.svg" onClick={toggleRemind}></img>
                              </div>
                              <hr/>
                            </div>

                            <div className="details">
                              <h2>Reminder title:</h2>
                              <input/>
                              {/* <input value={title} onChange={(e) => setTitle(e.target.value)} /> */}
                            </div>

                            <div className="details">
                              <h2>Reminder description:</h2>
                              <input/>
                              {/* <input value={description} onChange={(e) => setDescription(e.target.value)} /> */}
                            </div>

                            <div className="details">
                              <h2>Reminder date:</h2>
                              <input/>
                              {/* <input value={date} placeholder="dd/mm/yyyy" onChange={(e) => setDate(e.target.value)} /> */}
                            </div>

                            <div className="details">
                              <h2>Repeat reminder:</h2>
                              <div className="custom-select">
                                {/* <form method="post">
                                  <select onChange={(e) => setRepeat(e.target[e.target.value].innerText)}>
                                    <option value="0" disabled selected>-- Select option --</option>
                                    <option value="1">Remind me once</option>
                                    <option value="2">Remind me every day</option>
                                    <option value="3">Remind me every week</option>
                                    <option value="4">Remind me every month</option>
                                  </select>
                                </form> */}
                              </div>
                                
                            </div>

                            <div className="detailss">
                              {/* <button className="eventbtn" onClick={deactivate}>
                                <h1>Cancel</h1>
                              </button>
                              <button className="eventbtn" onClick={() => {
                                contact.reminders[index] = {
                                  title,
                                  description,
                                  date,
                                  repeat,
                                };
                                editContact(contact);
                              }}
                              >
                                <h1>Edit reminder</h1>
                              </button> */}
                            </div>
                          </div>
                          
                        </div>
                        </div>
                      )
                      }

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
              <button className="eventbtn" onClick={() => setActive("task")}>
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
                        <div className="editmodal">
                           <div onClick={toggleTask2} className="editoverlay"></div>
                          <div className="modalcontentedit">
                            <div className="contacts-form">
                              <div className="formtitle">
                                <h1>Edit task</h1>
                                <div className="closeee">
                                <img alt="" src="../../close.svg" onClick={toggleTask2}></img>
                              </div>
                                <hr/>
                              </div>

                              <div className="details">
                                <h2>Task title:</h2>
                                <input/>
                                {/* <input value={title} onChange={(e) => setTitle(e.target.value)} /> */}
                              </div>

                              <div className="details">
                                <h2>Task description:</h2>
                                 <input/>
                                {/* <input value={description} onChange={(e) => setDescription(e.target.value)} /> */}
                              </div>

                              <div className="details">
                                <h2>Due date:</h2>
                                 <input/>
                                {/* <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="dd/mm/yyyy" /> */}
                              </div>

                          
                              <div className="detailss">
                                {/* <button className="eventbtn" onClick={deactivate}>
                                  <h1>Cancel</h1>
                                </button>
                                <button className="eventbtn" onClick={() => {
                                  contact.tasks[index] = {
                                    title,
                                    description,
                                    date,
                                  };
                                  editContact(contact);
                                }}
                                >
                                  <h1>Edit task</h1>
                                </button> */}
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      )
                      }
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
              <button className="eventbtn" onClick={() => setActive("conversation")}>
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
                         toggleConvo();;
                      }} className="confbutton">
                        <ModeEditIcon/>
                      </button>
                      { Convo && (
                        <div className="editmodal">
                           <div onClick={toggleConvo} className="editoverlay"></div>
                          <div className="modalcontentedit">
                            <div className="contacts-form">
                            <div className="formtitle">
                              <h1>Edit conversation</h1>
                              <div className="closeee">
                                <img alt="" src="../../close.svg" onClick={toggleConvo}></img>
                              </div>
                              <hr/>
                            </div>

                            <div className="details">
                              <h2>Date of conversation:</h2>
                              {/* <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="dd/mm/yyyy" /> */}
                              <input/>
                            </div>

                            <div className="details">
                              <h2>Select form of communication:</h2>
                              <div className="custom-select">
                                {/* <form method="post">
                                  <select onChange={(e) => setForm(e.target[e.target.value].innerText)}>
                                    <option value="0" disabled selected>-- Select option --</option>
                                    <option value="1">Phone Number</option>
                                    <option value="2">Email</option>
                                    <option value="3">Twitter</option>
                                    <option value="4">Facebook</option>
                                    <option value="5">Instagram</option>
                                    <option value="6">LinkedIn</option>
                                    <option value="7">In Person</option>
                                    <option value="8">Other</option>
                                  </select>
                                </form> */}
                              </div>
                                
                            </div>

                            <div className="details">
                              <h2>Topic of conversation:</h2>
                              {/* <input value={topic} onChange={(e) => setTopic(e.target.value)} /> */}
                                <input/>
                            </div>

                            <div className="details">
                              <h2>Important messages to note:</h2>
                              {/* <input value={messages} onChange={(e) => setMessages(e.target.value)} /> */}
                                <input/>
                            </div>

                            <div className="details">
                              <h2>Who started the communication:</h2>
                              {/* <input value={startedBy} onChange={(e) => setStartedBy(e.target.value)} /> */}
                            <input/>
                            </div>

                            <div className="detailss">
                              {/* <button className="eventbtn" onClick={deactivate}>
                                <h1>Cancel</h1>
                              </button>
                              <button className="eventbtn" onClick={() => {
                                contact.conversations[index] = {
                                  date,
                                  form,
                                  topic,
                                  messages,
                                  startedBy,
                                };
                                editContact(contact);
                              }}
                              >
                                <h1>Edit conversation</h1>
                              </button> */}
                            </div>
                          </div>
                          </div>
                        </div>
                      )
                      }
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
            {active === "conversation" && <Conversation deactivate={deactivate} contact={contact}/>}
            {active === "editconversation" && <EditConversation deactivate={deactivate} contact={contact} index={index}/>}
            {active === "reminder" && <Reminder deactivate={deactivate} contact={contact}/>}
            {active === "editreminder" && <EditReminder deactivate={deactivate} contact={contact} index={index}/>}
            {active === "task" && <Task deactivate={deactivate} contact={contact}/>}
            {active === "edittask" && <EditTask deactivate={deactivate} contact={contact} index={index}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;