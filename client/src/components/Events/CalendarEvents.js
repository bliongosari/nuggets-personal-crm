import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
//import events from "./AllEvents";
import "./CalendarEvents.css";
import Modal from "react-modal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventForm from "./EventForm";
import EventDetail from "./EventDetail";
import React, { useState, useEffect } from "react";
import api from "../../config/axiosConfig.js";

const localizer = momentLocalizer(moment);

let allViews = Object.keys(Views).map((k) => Views[k]);

const eventStyleGetter = (event, start, end, isSelected) => {
  var style = {
    backgroundColor: "#1c1c1c",
    borderRadius: "0px",
    opacity: 0.7,
    color: "white",
    border: "0px",
    paddingLeft: "10px",
    borderRadius: "10px",
  };
  return {
    style: style,
  };
};

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

function CalendarEvents(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [eventModal, setEventModal] = useState(false);
  const [eventID, setEventID] = useState(null);
  const [events, setEvents] = useState([]);
  const handleSelect = ({ start, end }) => {
    setIsOpen(true);
  };
  const openEventModal = (event) => {
    setEventID(event);
    setEventModal(true);
  };

  useEffect(() => {
    api({
      method: "GET",
      url: "/api/events/",
    })
      .then((res) => {
        if (res.status === 200) {
          // DO NOT DELETE
          let allEvents = res.data.events;
          allEvents.forEach(
            (event, index) => (allEvents[index].start = new Date(event.start))
          );
          setEvents(allEvents);
        } else {
          //setFailed(true);
        }
      })
      .catch((err) => {
        //setFailed(true);
      });
  }, []);

  return (
    <div className="calendarEvents">
      <div className="toprow">
        <button onClick={() => setIsOpen(true)} className="popup-btn">
          &#65291;
          <span> Add New Event</span>
        </button>{" "}
      </div>
      <Calendar
        className="calendar"
        selectable
        localizer={localizer}
        events={events}
        step={15}
        timeslots={8}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 550 }}
        onSelectSlot={(start, end) => handleSelect(start, end)}
        onSelectEvent={(event) => openEventModal(event)}
        popup
        eventPropGetter={eventStyleGetter}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <button className="exitBtn" onClick={() => setIsOpen(false)}>
          &times;
        </button>
        <div>
          <EventForm />
          <button onClick={() => setIsOpen(false)} className= "cancel-button">CANCEL</button>
        </div>
      </Modal>
      <Modal
        isOpen={eventModal}
        onRequestClose={() => setEventModal(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <button className="exitBtn" onClick={() => setEventModal(false)}>
          &times;
        </button>
        <h2> Event Details </h2>
        <div>
          <EventDetail event={eventID} />
        </div>
      </Modal>
    </div>
  );
}

export default CalendarEvents;
