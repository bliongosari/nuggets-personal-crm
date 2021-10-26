import React, { useState, useEffect } from "react";
//import Cookies from "js-cookie";
import api from "../../config/axiosConfig.js";
import "./Events.css";
import { Alert } from "react-bootstrap";
import { props } from "bluebird";
import Feedback from "../Feedback/Feedback";

function EventEditForm(props) {

  const [allField, setAllFields] = useState({
    title: props.event.title,
    location: props.event.location,
    type: props.event.type,
    start: props.event.start,
    end: props.event.end,
    notes: props.event.notes,
    // repeat: props.event.repeat,
    alert: props.event.alert,
  });

  // "None",
  // "At time of event",
  // "5 minutes before",
  // "10 minutes before",
  // "15 minutes before",
  // "20 minutes before",
  // "1 hour before",
  // "2 hours before",
  // "1 day before",
  // "2 days before",
  // "1 week before",
  useEffect(() => {
    //console.log(new Date(allField["alert"]));
    if (!props.event.alert) {
      setAllFields({ ...allField, "alert": "None" });
    }
    const days = parseInt((new Date(props.event.start).getTime() - new Date(props.event.alert).getTime()) / (1000 * 60 * 60 * 24));
    const hours = parseInt(Math.abs(new Date(props.event.start).getTime() - new Date(props.event.alert).getTime()) / (1000 * 60 * 60) % 24);
    const minutes = parseInt(Math.abs(new Date(props.event.start).getTime() - new Date(props.event.alert).getTime()) / (1000 * 60) % 60);
    if (days === 7){
      setAllFields({ ...allField, "alert": "1 week before"});
      return;
    }
    else if (days === 1){
      setAllFields({ ...allField, "alert": "1 day before"});
      return;
    }
    else if (days === 2){
      setAllFields({ ...allField, "alert": "2 days before"});
      return;
    }
    else if (hours === 1){
      setAllFields({ ...allField, "alert": "1 hour before" });
      return;
    }
    else if (hours === 2){
      setAllFields({ ...allField, "alert":"2 hours before"});
      return;
    }
    else if (minutes === 0){
      setAllFields({ ...allField, "alert": "At time of event"});
      return;
    }
    else if (minutes === 5){
      setAllFields({ ...allField, "alert": "5 minutes before" });
      return;
    }
    else if (minutes === 10){
      setAllFields({ ...allField, "alert": "10 minutes before" });
      return;
    }
    else if (minutes === 15){
      setAllFields({ ...allField, "alert": "15 minutes before" });
      return;
    }
    else if (minutes === 20){
      setAllFields({ ...allField, "alert": "20 minutes before" });
      return;
    }
  }, []);

  const changeToTime = (data) => {
    const start = new Date(data);
    start.setMinutes(start.getMinutes() - start.getTimezoneOffset());
    return start.toISOString().slice(0,16);
  }

  const [field, setField] = useState("");
  const [events, setevents] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [flag, setFlag] = useState(false);

  const editEvents = async (e) => {
    if (new Date(allField.start) >= new Date(allField.end)){
      setMessage("End date must be after start date")
    }
    else if (allField.title === "" || !allField.title){
      setMessage("Event name must not be empty")
    } 
    else {
    api({
      method: "POST",
      url: "/api/events/edit/" + props.event._id,
      data: allField,
    })
      .then(function (res) {
        console.log(res);
        if (res.status === 200) {
          setevents([...events, field]);
          setField("");
          setSuccess(true);
          makeFalse();
          refreshPage();
        } else {
          setFailed(true);
          makeFalse();
        }
        setFlag(true);
        //setMessage(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        setFlag(true);
        setFailed(true);
        makeFalse();
      });
            
    }
  };

  const makeFalse = () => {
    setTimeout(() => {
      setFailed(false);
      setSuccess(false);
    }, 6000);
  }
  const SuccessMsg = () => <Alert variant="success">Sucessfully Edited</Alert>;
  const FailedMsg = () => <Alert variant="danger">Failed to edit</Alert>;

  const changeHandler = (e) => {
    console.log(allField["alert"]);
    setAllFields({ ...allField, [e.target.name]: e.target.value });
    console.log(allField["alert"]);
  };

  function refreshPage() {
    window.location.reload(false);
  }

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
    <>
    {success && <Feedback success message = "Successfully edited event" />}
    {failed && <Feedback message = "Failed to edit event" />}
    <div className="addevents">      
        <h2 className="edit-title">Edit an event</h2>
        <form>
          <label style={{ color: "red" }}> {message}</label>
          <label> Event Name: </label>
          <br></br>
          <input name="title" 
                onChange={changeHandler} 
                placeholder={props.event.title}/>
          <br></br>
          <label> Location: </label>
          <br></br>
          <input name="location" 
                onChange={changeHandler}
                placeholder={props.event.location} />
          <br></br>
          <label> Type: </label>
          <br></br>
          <input name="type" 
                onChange={changeHandler}
                placeholder={props.event.type} />
          <br></br>
          <label> Time: </label>
          <br></br>
          <input
            // value={allField["start"]}
            onChange={changeHandler}
            name="start"
            value = {changeToTime(allField.start)}
            type="datetime-local" 
          /> to
          <input
            // value={allField["end"]}
            name="end"
            type="datetime-local"
            value = {changeToTime(allField.end)}
            placeholder={new Date(props.event.end)}
            onChange={changeHandler}
          />

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
          <input className="notes" 
                name="note" 
                onChange={changeHandler} 
                placeholder={props.event.notes}
                required={false} 
                />
          <br></br>
        </form>

        <button onClick={editEvents} className= "add-button">Save Changes</button>
        
    </div>
    </>
  );
}

export default EventEditForm;
