import React, { useState, useEffect } from "react";
import api from "../../config/axiosConfig.js";
import "./Home.css";

function EventsSummary() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    api({
      method: "GET",
      url: "/api/events/top10/",
    })
      .then((res) => {
        if (res.status === 200) {
          // DO NOT DELETE
          let allEvents = res.data.events;
          allEvents.forEach((event, index) => {
            allEvents[index].start = new Date(event.start).toDateString();
            allEvents[index].end = new Date(event.end).toDateString();
          });
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
    <div className="current-events">
      <h1>EVENTS IN THE NEXT 2 WEEKS</h1>
      {events.map((event) => (
        <div>
          <div className="current-events-container">
            <img alt="events" src="../../events.svg"></img>
            <h2>{event.title}</h2>
            <h3>
              {event.start} - {event.end}
            </h3>
          </div>
          <hr className="line"></hr>
        </div>
      ))}
    </div>
  );
}

export default EventsSummary;
