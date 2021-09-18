import React, { useState, useEffect } from "react";
//import Cookies from "js-cookie";
import api from "../../config/axiosConfig.js";
import "./Events.css";
import { Alert } from "react-bootstrap";
import { props } from "bluebird";

function EventEditForm(props) {
  const [allField, setAllFields] = useState({
    title: props.event.title,
    location: props.event.location,
    type: props.event.type,
    start: props.event.start,
    end: props.event.end,
    notes: props.event.notes,
    repeat: props.event.repeat,
    alert: props.event.alert,
  });

  const [field, setField] = useState("");
  const [events, setevents] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [flag, setFlag] = useState(false);

  const editEvents = async (e) => {
    api({
      method: "POST",
      url: "/api/events/edit/" + props.event._id,
      data: allField,
    })
      .then(function (res) {
        if (res.status === 200) {
          setevents([...events, field]);
          setField("");
          refreshPage();
        } else {
          setFailed(true);
        }
        setFlag(true);
        //setMessage(res.data.message);
      })
      .catch(function (error) {
        setFlag(true);
        setFailed(true);
      });
  };

  const SuccessMsg = () => <Alert variant="success">Sucessfully Edited</Alert>;
  const FailedMsg = () => <Alert variant="danger">Failed to edit</Alert>;

  const changeHandler = (e) => {
    setAllFields({ ...allField, [e.target.name]: e.target.value });
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const repeat_list = [
    "Never",
    "Every Day",
    "Every Week",
    "Every Fortnight",
    "Every Month",
    "Every Year",
  ];

  const alert_list = [
    "None",
    "At time of event",
    "5 minutes before",
    "10 minutes before",
    "15 minutes before",
    "20 minutes before",
    "1 hour before",
    "2 hours before",
    "1 day before",
    "2 days before",
    "1 week before",
  ];

  return (
    <div>
      {flag && (failed ? <FailedMsg /> : <SuccessMsg />)}
      <div className="addevents">
        <h2 className="edit-title">Edit an event</h2>
        <h3 className = "add-details">Event Details</h3>
        <form>
          <label style={{ color: "red" }}> {message}</label>
          <label> Event Name: </label>
          <br></br>
          <input name="title" onChange={changeHandler} placeholder={props.event.title}/>
          <br></br>
          <label> Location: </label>
          <br></br>
          <input name="location" onChange={changeHandler} required={false} placeholder={props.event.location}/>
          <br></br>
          <label> Type: </label>
          <br></br>
          <input name="type" onChange={changeHandler} placeholder={props.event.type}/>
          <br></br>
          <label> Time: </label>
          <br></br>
          <input
            value={allField["start"]}
            onChange={changeHandler}
            name="start"
            type="Date" //change to time later
          /> to
          <input
            value={allField["end"]}
            name="end"
            type="Date" //change to time later
            onChange={changeHandler}
          />
          <br></br>
          <label className="repeat">Repeat</label>
            <select
              name="repeat"
              value={allField["repeat"]}
              onChange={changeHandler}
              className="dragdown"
            >
              {repeat_list.map((repeat) => (
                <option name={repeat} value={repeat}>
                  {repeat}
                </option>
              ))}
            </select> 
          <br></br>
          <label className="alert">Alert</label>
            <select
              className="dragdown"
              name="alert"
              value={allField["alert"]}
              onChange={changeHandler}
            >
              {alert_list.map((alert) => (
                <option name={alert} value={alert}>
                  {alert}
                </option>
              ))}
            </select>
            <br></br>
          <label> Notes </label>
          <br></br>
          <input className="notes" name="note" onChange={changeHandler} required={false} placeholder={props.event.notes}/>
          <br></br>
        </form>

        <button onClick={editEvents} className= "add-button">ADD</button>
        
      </div>
    </div>
  );
}

export default EventEditForm;