import React, { useState, useEffect } from "react";
//import Cookies from "js-cookie";
import api from "../../config/axiosConfig.js";
import "./Events.css";

export default function Event() {
  const [field, setField] = useState("");
  const [event_name, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [start_time, setStartTime] = useState(Date.now());
  const [end_time, setEndTime] = useState(Date.now());
  const [repeat, setRepeat] = useState("");
  const [isalert, setAlert] = useState("");
  const [notes, setNotes] = useState("");
  const [events, setevents] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [user, setUser] = useState(null);


  const addEvents = async (e) => {
    const event = {
      user_id : user.id,
      event_name: event_name,
      location: location,
      type: type,
      start_time: start_time,
      end_time: end_time,
      repeat: repeat,
      alert: isalert,
      notes: notes,
    };
    api({
      method: "POST",
      url: "/api/events/create",
      data: event,
    })
      .then(function (res) {
        if (res.status === 200) {
          setevents([...events, field]);
          setField("");
        }
        setMessage(res.data.message);
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  };


  useEffect(() => {
    api({
      method: "GET",
      url: "/api/events/",
    })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user);
          setevents(res.data.events);
          setLoading(false);
        } else {
          setFailed(true);
        }
      })
      .catch((err) => {
        setFailed(true);
      });
  }, []);


  return (
    <div>
      {failed ? (
        <h1> Failed to get event data</h1>
      ) : (
        <div>
          {loading ? (
            <h1> Loading.... </h1>
          ) : (
            <div class="addevents">
              <h1> Add a new event </h1>
              <form>
              <label style={{ color: "red" }}> {message}</label>
              <label> Event Name: </label><br></br>
              <input
                value = {event_name}
                onChange={(e) => setEventName(e.target.value)}
                required="true"
               /><br></br>
              <label> Location: </label><br></br>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required="false"
              /><br></br>
              <label> Type: </label><br></br>
              <input
                value={type}
                onChange={(e) => setType(e.target.value)}
                required="false"
              />
              <br></br>
              <label> Time: </label><br></br>
              <input
                value={start_time}
                onChange={(e) => setStartTime(e.target.value)}
                required="true"
                type="Date" //change to time later
              />
              <p>to</p>
              <input
                value={end_time}
                type="Date" //change to time later
                onChange={(e) => setEndTime(e.target.value)}
                required="true" //change to time later
              />
              <br></br>

              <label> Repeat: </label>
              <input
                value={repeat}
                onChange={(e) => setRepeat(e.target.value)} // stored as string
              /><br></br>

              <label> Alert </label>
              <input
                value={isalert}
                onChange={(e) => setAlert(e.target.value)} //stored as string
              /><br></br>

              <label> Notes </label><br></br>
              <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required="false"
              /><br></br>
              </form>

              <button onClick={addEvents}>ADD</button>
              {events.map((item, i) => (
                <li key={i}>
                  {item.preferred_name}
                  <button style={{ margin: " 0 0 0 40px" }}> Delete</button>
                </li>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
