import React, { useState, useEffect } from "react";
import api from "../../config/axiosConfig.js";
import "./Home.css";
import { Link } from "react-router-dom";


function EventsSummary() {
  const [events, setEvents] = useState([]);
  const [curEvents, setCurEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(false);
  const [curIndex, setCurIndex] = useState(0);
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
          if (allEvents.length == 0){
            setNoEvents(true);
          }
          setEvents(allEvents);
          setCurEvents(allEvents.slice(0,3));
        } else {
          //setFailed(true);
        }
      })
      .catch((err) => {
        //setFailed(true);
      });
  }, []);

  const back = ()=> {
    if (curIndex == 0) {
    }
    else {
    setCurEvents(events.slice(curIndex-3, curIndex));
    setCurIndex(curIndex-3);
    }
  }

  const next = () => {
    if (curIndex <= events.length - 3){
   setCurEvents(events.slice(curIndex+3, curIndex+6));
   setCurIndex(curIndex+3);
    }
  }

  return (
    <div className="current-events">
      <div className ="current-events-title">
      <span>EVENTS IN THE NEXT 2 WEEKS</span>
      </div>
      {noEvents ? (
        <div className = "no-events-container"> <h3> No events in the next 2 weeks!</h3></div>
      ): (
        <div>
      {curEvents.map((event) => (
        // <Link to={{ pathname: `product/${event.id}`, state: { product } }}>
        <div>
          <div className="current-contacts-r">
            <img alt="events" src="../../events.svg"></img>
            <h4>{event.title}</h4>
            <h5>
              {event.start} - {event.end}
            </h5>
          </div>
          <hr className="line1"></hr>
        </div>
        // </Link>
      ))}
      <div className = "eventsBtns">
      <button onClick = {back} className="previous1 round">&#8249;</button>
      <span> {curIndex/3 + 1}/{Math.ceil(events.length/3)}</span>
      <button onClick ={next} className="next1 round">&#8250;</button>
      </div>
      </div>
      )}
    </div>
  );
}

export default EventsSummary;
