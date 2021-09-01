import React from "react";

function EventDetail(props) {
  return (
    <div>
      <h3> ID: {props.event.id}</h3>
      <h3> Event Name: {props.event.title}</h3>
    </div>
  );
}

export default EventDetail;
