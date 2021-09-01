import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./AllEvents";
import "./CalendarEvents.css";
import Modal from "react-modal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventForm from "./EventForm";
import EventDetail from "./EventDetail";
import React, { useState, useEffect } from "react";

const localizer = momentLocalizer(moment);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    height: "600px",
    width: "400px",
    borderRadius: "12px",
    textAlign: "center",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "100",
  },
};

function CalendarEvents(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [eventModal, setEventModal] = useState(false);
  const [eventID, setEventID] = useState(null);
  const handleSelect = ({ start, end }) => {
    // console.log(start);
    // console.log(end);
    setIsOpen(true);
  };
  const openEventModal = (event) => {
    setEventID(event);
    setEventModal(true);
  };

  return (
    <div className="calendarEvents">
      <div className="toprow">
        <button onClick={() => setIsOpen(true)} className="popup-btn">
          &#65291;
          <span>Add New Event</span>
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
        style={{ height: 500 }}
        onSelectSlot={(start, end) => handleSelect(start, end)}
        onSelectEvent={(event) => openEventModal(event)}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <button className="exitBtn" onClick={() => setIsOpen(false)}>
          <span>&times;</span>
        </button>
        <h2> Add an Event</h2>
        <div>
          <EventForm />
        </div>
      </Modal>
      <Modal
        isOpen={eventModal}
        onRequestClose={() => setEventModal(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <button className="exitBtn" onClick={() => setEventModal(false)}>
          <span>&times;</span>
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
