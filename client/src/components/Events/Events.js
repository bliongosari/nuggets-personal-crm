import React, { useState, useEffect } from "react";
//import Cookies from "js-cookie";
import api from "../../config/axiosConfig.js";
import "./Events.css";


export default function Event() {
  const [allField, setAllFields] = useState({
    event_name: '',
    location: '',
    type: '',
    start_time: Date.now(),
    end_time: Date.now(),
    notes:''
  });
  const [editedField, setEditedFields] = useState({
    event_name: '',
    location: '',
    type: '',
    start_time: Date.now(),
    end_time: Date.now(),
    repeat: '',
    alert: '',
    notes:''
  });
  const [field, setField] = useState("");
  const [events, setevents] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [user, setUser] = useState(null);
  const[repeat_list, setRepeatList] = useState([]);
  const[alert_list, setAlertList] = useState([]);
  const [repeat, setRepeat] = useState("");
  const [isalert, setAlert] = useState("");


  const addEvents = async (e) => {
    const event = {
      user_id: user.id,
      event_name: allField['event_name'],
      location: allField['location'],
      type: allField['type'],
      start_time: allField['start_time'],
      end_time: allField['end_time'],
      repeat: repeat,
      alert: isalert,
      notes: allField['notes'],
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
          refreshPage();
        }
        setMessage(res.data.message);
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  };

  const changeHandler = e => {
    setAllFields({...allField, [e.target.name]: e.target.value})
  }

  function handleEdit() {
    editevent(eventID.current.value);
    setEditedFields({editedField: [{}]});
  }

  function refreshPage() {
    window.location.reload(false);
  }

  let eventID = React.createRef();

  function handleClick() {
    deleteEvent(eventID.current.value);
  }

  
  const deleteEvent = async (id) => {
    api({
      method: "GET",
      url: "/api/events/delete/" + id,
    })
      .then(function (res) {
        if (res.status === 200) {
          refreshPage();
          setField("");
        }
        setMessage(res.data.message);
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  };

  const editevent = async (id) => {
    alert(id);
    const event = {
      user_id: user.id,
      event_name: editedField['event_name'],
      location: editedField['location'],
      type: editedField['type'],
      start_time: editedField['start_time'],
      end_time: editedField['end_time'],
      repeat: editedField['repeat'],
      alert: editedField['isalert'],
      notes: editedField['notes'],
    };
    api({
      method: "POST",
      url: "/api/events/edit/" + id,
      data: event,
    })
      .then(function (res) {
        if (res.status === 200) {
          setevents([...events, field]);
          setField("");
          refreshPage();
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
          setRepeatList(res.data.repeat_list);
          setAlertList(res.data.alert_list);
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
                name="event_name"
                onChange={changeHandler}
                required="true"
               /><br></br>
              <label> Location: </label><br></br>
              <input
                name="location"
                onChange={changeHandler}
                required="false"
              /><br></br>
              <label> Type: </label><br></br>
              <input
                name="type"
                onChange={changeHandler}
                required="false"
              />
              <br></br>
              <label> Time: </label><br></br>
              <input
                onChange={changeHandler}
                required="true"
                name="start_time"
                type="Date" //change to time later
              />
              <p>to</p>
              <input
                name="end_time"
                type="Date" //change to time later
                onChange={changeHandler}
                required="true" 
              />
              <br></br>
              <label>Repeat</label>
              <ul>
                {repeat_list.map(repeat =>
                  <li type="none">
                    <input
                    type="checkbox"
                    name="repeat"
                    onChange={(e) => setRepeat({repeat}.repeat)}>         
                    </input>
                    <label>{repeat}</label>
                  </li>
                )}
              </ul>

              <label> Alert </label>
              <ul>
                {alert_list.map(isalert =>
                  <li type="none">
                    <input
                    type="checkbox"
                    onChange={(e) => setAlert({isalert}.alert)}>         
                    </input>
                    <label>{isalert}</label>
                  </li>
                )}
              </ul>

              <label> Notes </label><br></br>
              <input
                name="note"
                onChange={changeHandler}
                required="false"
              /><br></br>
              </form>
                      
              <button onClick={addEvents}>ADD</button>

              {events.map((item, i) => (
                <li key={i}>
                  {item.event_name}
                  <button style={{ margin: " 0 0 0 40px" }} ref = {eventID} 
                  value={item._id}
                  onClick={handleClick} > Delete</button>
                </li>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
