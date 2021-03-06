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
import { BlockLoading } from "react-loadingg";

const Loading = () => <BlockLoading />;
const localizer = momentLocalizer(moment);

let allViews = Object.keys(Views).map((k) => Views[k]);

const eventStyleGetter = (event, start, end, isSelected) => {
  var style = {
    borderRadius: "0px",
    paddingLeft: "10px",
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

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue'
    },
  })

function CalendarEvents(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [eventModal, setEventModal] = useState(false);
  const [eventID, setEventID] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
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
            (event, index) =>  {
              allEvents[index].start = new Date(event.start);
              allEvents[index].end = new Date(event.end);
            }
          );
          setEvents(allEvents);
          setLoading(false);
        } else {

          //setFailed(true);
        }
      })
      .catch((err) => {
        //setFailed(true);
      });
  }, []);

  return loading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div className="calendarEvents">
      <div className="toprow">
        <button onClick={() => setIsOpen(true)} id= "addNewEvent" className="popup-btn">
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
        style={{ height: "80vh", marginBottom: "50px" }}
        onSelectSlot={(start, end) => handleSelect(start, end)}
        onSelectEvent={(event) => openEventModal(event)}
        popup
        components={{
          timeSlotWrapper: ColoredDateCellWrapper,
        }}
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
        <div>
          <EventDetail event={eventID} />
        </div>
      </Modal>
    </div>
  )
}

export default CalendarEvents;
