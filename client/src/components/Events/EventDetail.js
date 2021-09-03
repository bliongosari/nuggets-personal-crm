import React, { useState, useEffect } from "react";
import api from "../../config/axiosConfig.js";

function EventDetail(props) {
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

  return (
    <div>
      <h3> Event Name: {props.event.title}</h3>
      <h3> Alert: {props.event.alert}</h3>
      <h3> Date start: {start} </h3>
      <h3> Date end: {end} </h3>
      <h3> Repeat: {props.event.repeat} </h3>
      <h3> Repeat: {props.event.alert} </h3>
      <button onClick={deleteEvent}> Delete Event </button>
    </div>
  );
}

export default EventDetail;
