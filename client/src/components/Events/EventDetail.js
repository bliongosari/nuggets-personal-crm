import React, { useState, useEffect } from "react";
import api from "../../config/axiosConfig.js";
import "./EventDetail.css";
import Modal from "react-modal";
import EventEditForm from "./EventEditForm";
import Feedback from "../Feedback/Feedback";
import Cookies from "js-cookie";

const customStyles = {
  content: {
    left: "50%",
    right: "auto",
    width: "325px",
    borderRadius: "12px",
    textAlign: "left",
    bottom: "auto",
    marginRight: "-50%",
    marginBottom: "10px",
    transform: "translate(-50%, -50%)",
    zIndex: "100",
    backgroundColor: "#f1f1f1",
  },
};

function EventDetail(props) {
  const [modalIsOpen, setIsOpen] = useState(true);
  const [eventModal, setEventModal] = useState(false);
  const [delEvent, setDelEvent] = useState(false);
  const [eventID, setEventID] = useState(null);
  const handleSelect = ({ start, end }) => {
    setIsOpen(true);
  };
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);

  const openEventModal = event => {
    setEventID(props.event);
    setIsOpen(false);
    setEventModal(true);
    setEventModal(false);
  };

   const toggleDelEvent = () => {
    setDelEvent(!delEvent);
  };
  
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  useEffect(() => {
    var startDate = new Date(props.event.start).toLocaleDateString('en-US');
    startDate += " " + new Date(props.event.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    setStart(startDate);
    var endDate = new Date(props.event.end).toLocaleDateString('en-US');
    endDate += " " + new Date(props.event.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    setEnd(endDate);
  }, []);

  const deleteEvent = async () => {
    console.log(Cookies.get("token"));
    console.log(props.event._id);
    api({
      method: "GET",
      url: "/api/events/delete/" + props.event._id,
    })
      .then(function (res) {
        if (res.status === 200) {
          window.location.reload(false);
          setSuccess(true);
          makeFalse();
        } else {
          console.log("ERR"+ res.data.message);
          setFailed(true);
          makeFalse();
        }
      })
      .catch(function (error) {
        console.log("ERRR"+ error);
        setFailed(true);
        makeFalse();
      });
  };

  const makeFalse = () => {
    setTimeout(() => {
      setFailed(false);
      setSuccess(false);
    }, 6000);
  }

  function parseDate(notif) {
    let hours = new Date(notif).getHours().toString();
    let minutes = new Date(notif).getMinutes().toString();
    if (hours.length === 1){
      hours = "0" + hours;
    }
    if (minutes.length === 1){
      minutes = "0" + minutes;
    }
    return new Date(notif).getDate()+"/"+new Date(notif).getMonth()+"/"+new Date(notif).getFullYear()  + " " + hours + ":" + minutes;
  }

  return (
    
    <div>
      {modalIsOpen ? 
      <div> 
      {success && <Feedback success message = "Successfully deleted event" />}
      {failed && <Feedback message = "Failed to delete event" />}
      
      <div className="event-details">
        <h2 className="detail-title"> Event Details </h2>  
        <h3 className="event-name"> Event Name: {props.event.title}</h3>
        <h3> Location: {props.event.location ? props.event.location : "-"}</h3>
        <h3> Type: {props.event.type ? props.event.type: "-"}</h3>
        <h3> Date start: {start} </h3>
        <h3> Date end: {end} </h3>
        {/* <h3> Repeat: {props.event.repeat} </h3> */}
        <h3> Alert: {new Date(props.event.alert) > new Date(0) ? parseDate(props.event.alert) : "None"} </h3>
        <h3> Notes: {props.event.notes ? props.event.notes: "-"}</h3>
        <div style ={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>

        <button className="edit-btn" onClick={openEventModal}> Edit Event </button>
        <button className="delete-btn" onClick={() => {toggleDelEvent();}}> Delete Event </button>
        {delEvent && (
          <div className="modal5">
            <div onClick={toggleDelEvent} className="overlay"></div>

            <div className="modaleventdeet-content">
              <div className="modaleventtitle">
                <h2>Confirmation</h2>
                <hr></hr>
              </div>

              <div className="closebutton">
                <img alt="" src="../../close.svg" onClick={toggleDelEvent}></img>
              </div>

              <div className="modaleventtitleee">

                <h2>Are you sure you want to delete this event?</h2>
              </div>

              <button className="editbtn3" onClick={deleteEvent}>
                <h1>Delete Event</h1>
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
      <Modal
        isOpen={eventModal}
        onRequestClose={() => setEventModal(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <button className="exitBtn" onClick={() => setEventModal(false)}>
          &times;
        </button>
      </Modal>

      </div>
      : (
      <div>
        <EventEditForm event={props.event} />
      </div>
      )} 
    </div>
  );
}

export default EventDetail;
