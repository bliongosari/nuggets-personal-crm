import "./Notification.css";
import api from "../../config/axiosConfig";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from "react";


function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [pastNotifications, setPastNotifications] = useState([]);
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
  return (
    <>
        <div className="mainnn-content">
            <div className="notif-header">
                <h1>Notifications</h1>
            </div>


            <div className="notiftable">
                <div className="notiftablecontent">
                    <IconButton aria-label="delete" size="small">
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                    <div className="notifdesc">
                        <h3><span>Notif Type</span></h3>
                        <h1>Notif Title</h1>
                        <h2>Notif Description</h2>
                    </div>
                    <h1>5 Oct 2019 9:35am</h1>
                </div>
                <hr className="notifline"></hr>
                <div className="notiftablecontent">
                    <IconButton aria-label="delete" size="small">
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                    <div className="notifdesc">
                        <h3><span>Notif Type</span></h3>
                        <h1>Notif Title</h1>
                        <h2>Notif Description</h2>
                    </div>
                    <h1>5 Oct 2019 9:35am</h1>
                </div>
                <hr className="notifline"></hr>
                <div className="notiftablecontent">
                    <IconButton aria-label="delete" size="small">
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                    <div className="notifdesc">
                        <h3><span>Notif Type</span></h3>
                        <h1>Notif Title</h1>
                        <h2>Notif Description</h2>
                    </div>
                    <h1>5 Oct 2019 9:35am</h1>
                </div>
                <hr className="notifline"></hr>
                <div className="notiftablecontent">
                    <IconButton aria-label="delete" size="small">
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                    <div className="notifdesc">
                        <h3><span>Notif Type</span></h3>
                        <h1>Notif Title</h1>
                        <h2>Notif Description</h2>
                    </div>
                    <h1>5 Oct 2019 9:35am</h1>
                </div>
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
