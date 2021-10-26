import React, {useState} from "react";
import { Link, useParams } from "react-router-dom";
import "./ContactProfile.css";
import { deleteContact, getContacts } from "./contactsAPI";
import Tabs from './tabs';
import api from "../../config/axiosConfig";
import { useQuery } from "react-query";
import LoopCircleLoading from "react-loadingg/lib/LoopCircleLoading";
import CircleIcon from '@mui/icons-material/Circle';



function ContactProfile() {
  const tagsQueried = [
    { name: "All", color: "#58427C"},
    { name: 'Friends', color: "red"},
    { name: 'Colleagues', color: "blue"},
    { name: 'Family', color: "green"},
    { name: 'Childhood', color: "purple"},
    { name: 'Gym', color: "#36454F"},
    { name: 'Sports', color: "darkgreen"},
    { name: 'Mutuals', color: "#DC143C"},
    { name: 'Fun', color: "#5D3954"},
    { name: 'School', color: "#A7D8DE"},
    { name: 'Neighbour', color: "pink"},
    { name: 'Bar', color: "#AD6F69"},
    { name: 'Others', color: "grey"},
  ];
  
  const [reminders, setReminders] = useState(false);
  const [info, setInfo] = useState(false);
  const [dateReminder, setDateReminderReal] = useState("")
  const [reminderMessage, setReminderMessage] = useState("")

  const { id } = useParams();
  const query = useQuery("contacts", getContacts, { staleTime: Infinity });
  const contact = query.data?.contacts.find((element) => element._id === id);
  
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

  const parseTags = (tags) => {
    if (tags.split(',')[0] === "undefined"){
      return undefined;
    }
    return tags;

  }

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

  if (reminders) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  if (info) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  function parseDate(notif) {
    if (new Date(notif) > new Date(0)){
      return new Date(notif).getDate()+"/"+new Date(notif).getMonth()+"/"+new Date(notif).getFullYear();
    }
    return undefined;
  }

  if (contact === undefined) return (
    <div style = {{background: "red"}}>
      <h1> No Contact Found</h1>
    </div>
  );


  const tagsToArray = (tags) => {
    let arr = tags.split(",");
    console.log(arr)
    let final = []
    for (let tag of tagsQueried){
      if (arr.includes(tag.name)){
        final.push(tag)
      }
    }
    return final;
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
              {/* <h1>Last contacted: </h1>
              <h1>Tags:</h1> */}
              <div style = {{margin: "0 auto", marginTop: "5px", width: "250px", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center"}}>
                  {contact.tags ? 
                  tagsToArray(contact.tags).map((d) => (
                    <div style = {{display: "flex", flexDirection: "row"}}>
                    <div key={`${contact._id} ${d.name}`}>
                    <CircleIcon style = {{color: d.color, margin: "0 0.5vw", fontSize: "11px"}}/>
                     <span style = {{fontSize: "12px"}}>{d.name}</span> 
                     </div>
                     </div>
                  ))
                  
                  :  <span> {""}</span> }
                </div>
              <button onClick={toggleReminders} className="reminderbtn">
                <h2>Set reminder to contact</h2>
              </button>
          </div>

          {reminders && (
            <div className="modal1">
              <div onClick={toggleReminders} className="overlay"></div>

              <div className="modal2-content">
                <div className="modal-title">
                  <h2>Stay in touch</h2>
                  <hr/>
                </div>

                <div className="closebutton">
                  <img alt="" src="../../close.svg" onClick={toggleReminders}></img>
                </div>

                <div className="modal-body">
                  <label>Remind me via notifications on</label>
                  <h3 style ={{fontSize: "12px", color: "red"}}>{reminderMessage} </h3>
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
                    <button onClick={submitReminder} className="addbtn" style = {{width: "100px", fontSize: "13px", marginTop: "10px"}}>
                    <h1 style = {{color: "white", fontSize: "12px"}}>Add a reminder </h1>
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
                  <h3> {parseDate(contact.birthday) || "-"}</h3>
                </div>

                <div className="curr-contacts-container" >
                  <h2>Relationship:</h2>
                </div>
                <div className="curr-contacts-container" style ={{display: "flex", marginTop: "10px", maxHeight: "150px", overflow: "scroll"}}>
                  <h3>{contact.relationship || "-" }</h3>
                </div>
                <div className="curr-contacts-container" >
                  <h2>Tags</h2>
                  <h3>{parseTags(contact.tags) || "-"}</h3>
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

                    <div className="modal2-content">
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
                            <h3>{parseDate(contact.birthday) || "-"}</h3>
                          </div>

                          <div className="currr-contacts-container">
                            <h2>Relationship:</h2>
                            <h3>{contact.relationship || "-" }</h3>
                          </div>
                          <div className="currr-contacts-container">
                            <h2>Tags</h2>
                            <h3>{parseTags(contact.tags) || "-"}</h3>
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
                  <button className="editbtn" id = "editBtn">
                    <h1>Edit Contact</h1>
                  </button>
                </Link>
              </div>

              <div className="editcontact">
                <button className="editbtn" id = "deleteContact" onClick={() => deleteContact(contact)}>
                  <h1>Delete Contact</h1>
                </button>
              </div>

            </div>
          
          </div>

        <div className="contactfunctionality">
          <Tabs contact={contact}/>
        </div>
      
      </div>

    </div>
  )
};

export default ContactProfile;
