import React, { useState, useEffect } from "react";
import api from "../../config/axiosConfig.js";
import "./EventDetail.css";
import Modal from "react-modal";
import EventEditForm from "./EventEditForm";


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

  const openEventModal = event => {
    setEventID(props.event._id);
    setEventModal(true);
  };
  
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  useEffect(() => {
    console.log(props.event);
    setStart(new Date(props.event.start).toLocaleDateString("en-US"));
    setEnd(new Date(props.event.end).toLocaleDateString("en-US"));
  }, []);

  const deleteEvent = async () => {
    api({
      method: "GET",
      url: "/api/events/delete/" + props.event._id,
    })
      .then(function (res) {
        if (res.status === 200) {
          window.location.reload(false);
          alert("Sucessfully Deleted");
        } else {
          alert("Failed to Delete");
        }
      })
      .catch(function (error) {
        alert("Failed to Delete");
      });
  };

  const editEvent = async () => {
    api({
      method: "GET",
      url: "/api/events/edit/" + props.event._id,
    })
      .then(function (res) {
        if (res.status === 200) {
          window.location.reload(false);
          alert("Sucessfully Edited");
        } else {
          alert("Failed to Edit");
        }
      })
      .catch(function (error) {
        alert("Failed to Edit");
      });
  };

  return (
    <div>
      <div className="event-details">
        <h2 className="detail-title"> Event Details </h2>  
        <h3> Event Name: <br></br> {props.event.title}</h3>
        <h3> Alert: {props.event.alert}</h3>
        <h3> Date start: {start} </h3>
        <h3> Date end: {end} </h3>
        <h3> Repeat: {props.event.repeat} </h3>
        <h3> Repeat: {props.event.alert} </h3>
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
          <EventEditForm event={props.event._id} />
        </div>
      </Modal>
    </div>
  );
}

export default EventDetail;
