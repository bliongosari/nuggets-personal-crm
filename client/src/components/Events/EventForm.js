import React, { useState, useEffect } from "react";
//import Cookies from "js-cookie";
import api from "../../config/axiosConfig.js";
import "./Events.css";
import { Alert } from "react-bootstrap";

function EventForm() {
  const [allField, setAllFields] = useState({
    title: "",
    location: "",
    type: "",
    start: Date.now(),
    end: Date.now(),
    notes: "",
    repeat: "",
    alert: "",
  });

  const [field, setField] = useState("");
  const [events, setevents] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [flag, setFlag] = useState(false);

  const addEvents = async (e) => {
    api({
      method: "POST",
      url: "/api/events/create",
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

  const SuccessMsg = () => <Alert variant="success">Sucessfully Added</Alert>;
  const FailedMsg = () => <Alert variant="danger">Failed to add</Alert>;

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
        <h2 className="add-title">Add a new event</h2>
        <h3 className = "add-details">Event Details</h3>
        <form>
          <label style={{ color: "red" }}> {message}</label>
          <label> Event Name: </label>
          <br></br>
          <input name="title" onChange={changeHandler} required={true} />
          <br></br>
          <label> Location: </label>
          <br></br>
          <input name="location" onChange={changeHandler} required={false} />
          <br></br>
          <label> Type: </label>
          <br></br>
          <input name="type" onChange={changeHandler} required={false} />
          <br></br>
          <label> Time: </label>
          <br></br>
          <input
            value={allField["start"]}
            onChange={changeHandler}
            required={true}
            name="start"
            type="datetime-local" //change to time later
          /> to
          <input
            value={allField["end"]}
            name="end"
            type="datetime-local" //change to time later
            onChange={changeHandler}
            required={true}
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
          <input className="notes" name="note" onChange={changeHandler} required={false} />
          <br></br>
        </form>

        <button onClick={addEvents} className= "add-button">ADD</button>
        
      </div>
    </div>
  );
}

export default EventForm;
