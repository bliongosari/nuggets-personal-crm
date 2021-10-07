import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./ContactProfile.css";
import { deleteContact } from "./contactsAPI";
import Tabs from './tabs';
import api from "../../config/axiosConfig";


function ContactProfile(props) {
    const { contact } = props.location.state;
    const [reminders, setReminders] = useState(false);
    const [info, setInfo] = useState(false);
    const [dateReminder, setDateReminderReal] = useState("")
    const [reminderMessage, setReminderMessage] = useState("")
    
    const toggleReminders = () => {
        setReminders(!reminders);
    };

    const setDateReminder = (e) =>{
       setDateReminderReal(e.target.value);
    }

  const changeToTime = (data) => {
    const start = new Date(data);
    start.setMinutes(start.getMinutes() - start.getTimezoneOffset());
    return start.toISOString().slice(0,16);
  }

    const toggleInfo = () => {
        setInfo(!info);
    };

    const submitReminder = () => {
        if (dateReminder == "" || new Date(dateReminder) < Date.now()){
            setReminderMessage("Reminder need to be after the current date")
        }
        else {
            //alert(contact._id);
            api({
                method: "POST",
                url: "/api/contacts/addReminder",
                data: {
                    userID: contact._id,
                    alert: new Date(dateReminder),
                },
              })
                .then(function (res) {
                  if (res.status === 200) {
                    setReminderMessage("Added successfully")
                    window.location.reload(false);
                  } else {
                    setReminderMessage("Failed to add")
                  }
                })
                .catch(function (error) {
                    setReminderMessage("Failed to add")
                });

        }

    }

    if(reminders) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    if(info) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
  
    function parseDate(notif) {
        return new Date(notif).getDate()+"/"+new Date(notif).getMonth()+"/"+new Date(notif).getFullYear();
      }

    return (
        <div className="home">
           <div className="backdiv">
                <a href="/contacts">Back to all contacts</a>
            </div> 

            <div className="profileheader">
                <div className="profpic">
                    <img alt="plus" src="../../person-blue.svg"></img>
                </div>

                <div className="profpic">
                    <h1>{contact.full_name}</h1>
                    <div className="lastactivity">
                        <h1>Last contacted: </h1>
                        <h1>Tags:</h1>
                        <button onClick={toggleReminders} className="reminderbtn">
                            <h2>Set reminder to contact</h2>
                        </button>
                    </div>

                {reminders && (
                <div className="modal1">
                    <div onClick={toggleReminders} className="overlay"></div>

                    <div className="modal-content">
                        <div className="modal-title">
                            <h2>Stay in touch</h2>
                            <hr></hr>
                        </div>

                        <div className="closebutton">
                            <img alt="" src="../../close.svg" onClick={toggleReminders}></img>
                        </div>

                        <div className="modal-body">
                            <label>Remind me via notifications on</label>
                            <h3>{reminderMessage} </h3>
                        </div>

                        <div style = {{display: "flex", flexDirection: "column", marginTop: "10px", alignItems: "center"}}>
                             <input
                                style = {{width: "300px", alignItems: "center"}}
                                name="date"
                                type="date" //change to time later
                                // value = {(dateReminder)}
                                onChange={setDateReminder}
                                required={true}
                            />
                            <button onClick={submitReminder} className="addbtn" style = {{width: "100px", fontSize: "13px"}}>
                            <h1>Add a reminder </h1>
                            </button>
                        </div>
                    </div>
                </div>
                )}
                </div>
            </div>

            <div className="contactcontent">
                <div className="contactdetails">
                    <div className="current-contacts">
                        <div className="curr-contacts-container">
                            <h2>Full Name:</h2>
                        </div>
                        <div className="curr-contacts-container" style ={{display: "flex", marginTop: "10px", maxHeight: "150px", overflow: "scroll"}}>
                            <h3>{contact.full_name || "-"}</h3>
                        </div>

                        <div className="curr-contacts-container">
                            <h2>Preferred Name:</h2>
                        </div>
                        <div className="curr-contacts-container" style ={{display: "flex", marginTop: "10px", maxHeight: "150px", overflow: "scroll"}}>
                            <h3>{contact.preferred_name || "-"}</h3>
                        </div>
                        <div className="curr-contacts-container ">
                            <h2>Birthday:</h2>
                            <h3>{parseDate(contact.birthday) || "-"}</h3>
                        </div>

                        <div className="curr-contacts-container" >
                            <h2>Relationship:</h2>
                        </div>
                        <div className="curr-contacts-container" style ={{display: "flex", marginTop: "10px", maxHeight: "150px", overflow: "scroll"}}>
                            <h3>{contact.relationship || "-" }</h3>
                        </div>
                        <div className="curr-contacts-container" >
                            <h2>Tags</h2>
                            <h3>{contact.tags || "-"}</h3>
                        </div>
                        <div className="curr-contacts-container">
                            <h2>How we met:</h2>
                        </div>
                        <div className="curr-contacts-container" style ={{display: "flex", marginTop: "10px", maxHeight: "150px", overflow: "scroll"}}>
                            <h3>{contact.meetDetails|| "-"}</h3>
                        </div>
                        <div className="curr-contacts-container">
                            <h2>Description:</h2>
                        </div>
                        <div className="curr-contacts-container" style ={{display: "flex", marginTop: "10px", maxHeight: "150px", overflow: "scroll"}}>
                            <h3>{contact.description || "-"}</h3>
                        </div>
                    </div>

                    <div className="detailsbutton">
                        <div className="editcontact">
                            <button onClick={toggleInfo} className="editbtn">
                                <h1>View Information</h1>
                            </button>
                            {info && (
                               <div className="modal1">
                                <div onClick={toggleInfo} className="overlay"></div>

                                <div className="modal-content">
                                    <div className="modal-titlee">
                                        <h2>Contact Information</h2>
                                        <hr></hr>
                                    </div>

                                    <div className="closebutton">
                                        <img alt="" src="../../close.svg" onClick={toggleInfo}></img>
                                    </div>

                                    <div className="modalbodyy">
                                        <div className="currr-contacts">
                                            <h1>Personal Information</h1>
                                            <div className="currr-contacts-container">
                                                <h2>Full Name:</h2>
                                                <h3>{contact.full_name || "-"}</h3>
                                            </div>

                                            <div className="currr-contacts-container">
                                                <h2>Preferred Name:</h2>
                                                <h3>{contact.preferred_name || "-"}</h3>
                                            </div>
                                            <div className="currr-contacts-container">
                                                <h2>Birthday:</h2>
                                                <h3>{contact.birthday || "-"}</h3>
                                            </div>
    
                                            <div className="currr-contacts-container">
                                                <h2>Relationship:</h2>
                                                <h3>{contact.relationship || "-" }</h3>
                                            </div>
                                            <div className="currr-contacts-container">
                                                <h2>Tags</h2>
                                                <h3>{contact.tags[0] || "-"}</h3>
                                            </div>
                                            <div className="currr-contacts-container">
                                                <h2>How we met:</h2>
                                                <h3>{contact.meetDetails|| "-"}</h3>
                                            </div>
                                            <div className="currr-contacts-container">
                                                <h2>Description:</h2>
                                                <h3>{contact.description || "-"}</h3>
                                            </div>
                                        </div>

                                        <div className="currr-contacts">
                                            <h1>Communication</h1>
                                            <div className="currr-contacts-container">
                                                <h2>Email Address:</h2>
                                                <h3>{contact.email || "-"}</h3>
                                            </div>
                                            
                                            <div className="currr-contacts-container">
                                                <h2>Phone Number:</h2>
                                                <h3>{contact.phone_number || "-"}</h3>
                                            </div>
                                            
                                            <div className="currr-contacts-container">
                                                <h2>LinkedIn:</h2>
                                                 <h3>{contact.linkedin || "-"}</h3>
                                            </div>
                                            
                                            <div className="currr-contacts-container">
                                                <h2>Twitter:</h2>
                                                <h3>{contact.twitter || "-"}</h3>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            )}
                        </div>
                        <div className="editcontact">
                            <Link to={{ pathname: `/editcontact`, state: { contact } }} style={{ textDecoration: 'none' }}>
                                <button className="editbtn">
                                    <h1>Edit Contact</h1>
                                </button>
                            </Link>
                        </div>

                        <div className="editcontact">
                            <button className="editbtn" onClick={() => deleteContact(contact)}>
                                <h1>Delete Contact</h1>
                            </button>
                        </div>

                        
                    </div>
                

                </div>

                <div className="contactfunctionality">
                    <Tabs/>
                </div>

            
            </div>
            

        </div>
    )
};

export default ContactProfile;
