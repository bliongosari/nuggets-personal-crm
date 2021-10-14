import "./Notification.css";
import api from "../../config/axiosConfig";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EventDetail from "../Events/EventDetail";
import { useHistory } from "react-router-dom";

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [pastNotifications, setPastNotifications] = useState([]);
    const [eventDetail, setEventDetail] = useState(false);
    const [notifSelected, setNotifSelected] = useState({});
    const history = useHistory();
    function arrayEditOpened(arr, item) { 
        let index = arr.findIndex((itm => itm._id === item._id));
        arr[index].notification_opened = true;
      }

    function parseDate(notif) {
        return new Date(notif).getDate()+"/"+new Date(notif).getMonth()+"/"+new Date(notif).getFullYear()  + " " + new Date(notif).getHours() + ":" + new Date(notif).getMinutes();
      }
    
      function parseDateContact(notif) {
        return new Date(notif).getDate()+"/"+new Date(notif).getMonth()+"/"+new Date(notif).getFullYear();
      }

      const closeEventDetail = () => {
        setEventDetail(false);
      }
      const openEvent = (notif) => {
        setNotifSelected(notif);
        setEventDetail(true);
        
        if (!notif.notification_opened) {
          api({
            method: "POST",
            url: "/api/events/open-notif/" + notif._id
          })
            .then((res) => {
              if (res.status === 200) {
                arrayEditOpened(notifications, notif);
              } else {
                console.log("error")
              }
            })
            .catch((err) => {
              console.log("error2")
              //setFailed(true);
            });
        }
      }
    
      const deleteNotif = (notif) => {
        api({
          method: "POST",
          url: "/api/events/delete-notif/" + notif._id
        })
          .then((res) => {
            if (res.status === 200) {
              let currentNotif = arrayRemove(notifications, notif);
              setNotifications([...currentNotif]);
            } else {
              console.log("error")
            }
          })
          .catch((err) => {
            console.log("error2")
            //setFailed(true);
          });
      }

      const deleteContactNotif = (notif) => {
        // alert(notif.full_name);
        // setNotifSelected(notif);
        // setEventDetail(true);
        // console.log(notif);
          api({
            method: "POST",
            url: "/api/contacts/delete-notif/" + notif._id
          })
            .then((res) => {
              if (res.status === 200) {
                let currentNotif = arrayRemove(notifications, notif);
                setNotifications([...currentNotif]);
                // window.location.reload(false);
              } else {
                console.log("error")
              }
            })
            .catch((err) => {
              console.log("error2")
              //setFailed(true);
            });
      }
    
      function arrayRemove(arr, item) { 
        return arr.filter(function(ele){ 
            return ele !== item; 
        });
      }
    

  const openContactNotif = (notif) => {
    setNotifSelected(notif);
    // setEventDetail(true);
    // console.log(notif);
    if (!notif.notification_opened) {
      api({
        method: "POST",
        url: "/api/contacts/open-notif/" + notif._id
      })
        .then((res) => {
          if (res.status === 200) {

            arrayEditOpened(notifications, notif);
          } else {
            console.log("error")
          }
        })
        .catch((err) => {
          console.log("error2")
          //setFailed(true);
        });
    }
    history.push("/contact/" + notif.full_name + "/" + notif.user_id);
  }

    
    useEffect(() => {
        api({
          method: "GET",
          url: "/api/user/notifications/",
        })
          .then((res) => {
            if (res.status === 200) {
              // console.log(res.data.eventsNotif);
              setPastNotifications([...res.data.pastNotif]);
              setNotifications([...res.data.eventsNotif]);
    
            } else {
              console.log("error")
              //setFailed(true);
            }
          })
          .catch((err) => {
            console.log("error2")
            //setFailed(true);
          });
      }, []);

      const modal_events = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        height:'460px',
        width: '325px',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#f1f1f1',
        borderRadius: '30px',
        boxShadow: 24,
        padding: 2
      };
    
  return (

    <>
        <div className="mainnn-content">
            <div className="notif-header">
                <h1>Notifications</h1>
            </div>
            <div className="notiftable" style = {{maxHeight: "1000px", yOverflow: "scroll"}}>

            <Modal
              open={eventDetail}
              onClose={() => closeEventDetail()}
              ariaHideApp={false}
              >
              <Box sx={modal_events}>
                <span className="close-icon" onClick={() => closeEventDetail()}>
                  <img alt="close" src="../../close.svg"></img>
                </span>
                <EventDetail event = {notifSelected}/>
              </Box>
            </Modal>

                {( pastNotifications.length <= 0 && notifications.length <= 0) 
                && <div style = {{height: "200px", display: "flex", alignItems: "center", justifyContent: "center"}}><span style = {{margin: "0 auto"}}>No Notification</span> </div>}
                {pastNotifications.length > 0 &&
                  pastNotifications.map((notif) => (
                    notif.title !== undefined ? 
                    <div>
                    <hr className="notifline"></hr>
                    <div className="notiftablecontent">
                        <IconButton aria-label="delete" size="small" onClick = {() => {deleteNotif(notif)}}>
                            <DeleteIcon fontSize="inherit"/>
                        </IconButton>
                        <div className="notifdesc" onClick = {() => openEvent(notif)}>
                            <h3><span style = {{background: "red"}}>MISSED</span></h3>
                            <h1>Event: {notif.title}</h1>
                            <h2>Open or Delete this notification to remove</h2>
                        </div>
                        <h1 onClick = {() => openEvent(notif)}>{parseDate(notif.alert)}</h1> 
                     </div>
                     </div>

                    // passed events labeled red
                 :
                    // else
                    <div>
                     <hr className="notifline"></hr>
                    <div className="notiftablecontent">
                        <IconButton aria-label="delete" size="small" onClick = {() => deleteContactNotif(notif)}>
                            <DeleteIcon fontSize="inherit"/>
                        </IconButton>
                        <div className="notifdesc" onClick = {() => openContactNotif(notif)}>
                            <h3><span style = {{background: "red"}}>MISSED</span></h3>
                            <h1>Contact {notif.full_name}</h1>
                            <h2>Open or Delete this notification to remove</h2>
                        </div>
                        <h1 onClick = {() => openContactNotif(notif)} >{parseDateContact(notif.alert)}</h1>
                     </div>
                     </div>
                  ))}


                {notifications.length > 0 &&
                  notifications.map((notif) => (
                    notif.title !== undefined ? 
                    <div>
                    <hr className="notifline"></hr>
                    <div className="notiftablecontent">
                        <IconButton aria-label="delete" size="small" onClick = {() => {deleteNotif(notif)}}>
                            <DeleteIcon fontSize="inherit"/>
                        </IconButton>
                        <div className="notifdesc" onClick = {() => openEvent(notif)}>
                            {notif.notification_opened ? 
                            <h3><span style = {{background: "grey"}}> UPCOMING (OPENED)</span></h3>
                            : <h3><span style = {{background: "green"}}> UPCOMING </span></h3> }

                            <h1>Event: {notif.title}</h1>
                            <h2>Open or Delete this notification to remove</h2>
                        </div>
                        <h1 onClick = {() => openEvent(notif)}>{parseDate(notif.alert)}</h1>
                     </div>
                     </div>

                    // passed events labeled red
                 :
                    // else
                    <div>
                     <hr className="notifline"></hr>
                    <div className="notiftablecontent">
                        <IconButton aria-label="delete" size="small" onClick = {() => {deleteContactNotif(notif)}} >
                            <DeleteIcon fontSize="inherit"/>
                        </IconButton>
                        <div className="notifdesc" onClick = {() => openContactNotif(notif)}  >
                        {notif.notification_opened ? 
                            <h3><span style = {{background: "grey"}}> UPCOMING (OPENED)</span></h3>
                            : <h3><span style = {{background: "green"}}> UPCOMING </span></h3> }
                            <h1>Contact {notif.full_name}</h1>
                            <h2>Open or Delete this notification to remove</h2>
                        </div>
                        <h1 onClick = {() => openContactNotif(notif)}>{parseDateContact(notif.alert)}</h1>
                     </div>
                     </div>
                  ))}
            </div>

            {/* <div className="notiftablecontent">
                <h2>Notif Type</h2>
                <h2>Notif Desc</h2>
                <h2>Thursday, 5 October 2021 &nbsp; &nbsp; &nbsp; <img alt="" src="../../close.svg"></img></h2>
                
            </div> */}
            {/* <hr className="line"></hr> */}
        </div>
    </>
  );
}

export default Notification;
