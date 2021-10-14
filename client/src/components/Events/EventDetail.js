import React, { useState, useEffect } from "react";
import api from "../../config/axiosConfig.js";
import "./EventDetail.css";
import Modal from "react-modal";
import EventEditForm from "./EventEditForm";
import Feedback from "../Feedback/Feedback";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    height: "580px",
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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [eventModal, setEventModal] = useState(false);
  const [eventID, setEventID] = useState(null);
  const handleSelect = ({ start, end }) => {
    setIsOpen(true);
  };
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);

  const openEventModal = event => {
    setEventID(props.event);
    setEventModal(true);
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
          setFailed(true);
          makeFalse();
        }
      })
      .catch(function (error) {
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
    return new Date(notif).getDate()+"/"+new Date(notif).getMonth()+"/"+new Date(notif).getFullYear()  + " " + new Date(notif).getHours() + ":" + new Date(notif).getMinutes();
  }

  return (
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
        <button className="edit-btn" onClick={openEventModal}> Edit Event </button>
        <button className="delete-btn" onClick={deleteEvent}> Delete Event </button>
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
        <div>
          <EventEditForm event={props.event} />
        </div>
      </Modal>
    </div>
  );
}

export default EventDetail;
