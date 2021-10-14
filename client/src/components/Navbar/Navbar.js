import React, { useState, useEffect } from "react";
import "./Navbar.css";
import SignInModal from "../ModalF/SignInModal";
import SignUpModal from "../ModalF/SignUpModal";
import EventDetail from "../Events/EventDetail";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { ClickAwayListener } from '@mui/material';
import api from "../../config/axiosConfig.js";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
//import { useHistory } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    height: "580px",
    width: "325px",
    borderRadius: "12px",
    textAlign: "left",
    bottom: "auto",
    marginRight: "-50%",
    marginBottom: "10px",
    transform: "translate(-50%, -50%)",
    zIndex: "100",
    backgroundColor: "#f1f1f1",
  },
};

function NavbarWelcome() {
  return (
    <div className="navbar">
      <img alt="logo" src="../../logo.svg" className="logo-welcome"></img>
      <h1 className="title-welcome">NUGGETS</h1>
      <SignInModal />
      <SignUpModal />
    </div>
  );
}



function NavbarHome() {
  const history = useHistory();
  const [sidebar, setSidebar] = useState(false);
  const [dropdownUser, setdropdownUser] = useState(false);
  const [dropdownNotif, setdropdownNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [pastNotifications, setPastNotifications] = useState([]);
  const [confirmation, setConfirmation] = useState(false);
  const [eventDetail, setEventDetail] = useState(false);
  const [notifSelected, setNotifSelected] = useState({});

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


  const logout = async (e) => {
    Cookies.remove("token");
    history.push("/");
  };

  const showSidebar = () => setSidebar(!sidebar);

  const showDropdownUser = () => {
    setdropdownUser(!dropdownUser);
  };

  const showDropdownNotif = () => {
    setdropdownNotif(!dropdownNotif);
  };
  const closeEventDetail = () => {
    setEventDetail(false);
    setdropdownNotif(true);
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
          showDropdownNotif(true);
        } else {
          console.log("error")
        }
      })
      .catch((err) => {
        console.log("error2")
        //setFailed(true);
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


  const showConfirmation = () => setConfirmation(!confirmation);

  const modal_logout = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height:'30%',
    width: '70%',
    maxWidth: '400px',
    maxHeight: '200px',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#f1f1f1',
    borderRadius: '30px',
    boxShadow: 24,
    padding: 2
  };

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
    <div>
      <div className="navbar">
        
        {/* Navigation Bar after Log in */}
        <button className="menu-button" onClick={showSidebar}>
          <img alt="menu" src="../../menu.svg" className="menu-button"></img>
        </button>
        <div className="logo-home">
          <img alt="logo" src="../../logo.svg" className="logo-home"></img>
          <h1 className="title-home">NUGGETS</h1>
        </div>
        {/* Notifications Button */}
        <div className="dropdown">
          <img
            alt="notification"
            src="../../notification.svg"
            className="notif-button"
            onClick={showDropdownNotif}
          ></img>
          {dropdownNotif && (
            <ClickAwayListener onClickAway={() => {setdropdownNotif(false)}}>
            <div>

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
              
              <div className="arrow-up2"></div>
              <div className="dropdown-content" style = {{maxHeight: "650px", overflowY: "scroll"}}>
                <List style={{ width: '100%'}}>
                  
                {( pastNotifications.length <= 0 && notifications.length <= 0) 
                &&  <span style = {{height: "50px", display: "flex", alignItems: "center", justifyContent: "center", margin: "10px"}}>No Notification</span>}
                {pastNotifications.length > 0 &&
                  pastNotifications.map((notif) => (
                    notif.title !== undefined ? 
                    // passed events labeled red
                    <div>
                      <Button>
                        <ListItem alignItems="flex-start" style ={{padding: "0", width: "270px"}}>
                        <Stack direction="row" spacing={1} padding style = {{display: "flex", width: "100%", justifyContent: "space-between"}}>
                            <ListItemText
                             onClick = {() => openEvent(notif)}
                              primary={"Event: " + notif.title}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                  Alert at: {parseDate(notif.alert)}
                                  </Typography>

                                  {<br></br>}
                                  <span style = {{marginLeft: "90px", marginTop: "5px",color: "white" , background: "red", paddingLeft: "3%", paddingRight: "3%"}}> MISSED </span>
                                </React.Fragment>
                              }
                            />
                            <IconButton onClick = {() => deleteNotif(notif)} style = {{zIndex: "2"}} aria-label="delete" size="small">
                              <DeleteIcon fontSize="inherit"/>
                            </IconButton>
                          </Stack>
                        </ListItem>
                      </Button>
                      <Divider variant="offset" component="li" />
                    </div> :
                    <div>
                    {/* add onClick={openEvent} to the clicked event */}
                    <Button>
                      <ListItem alignItems="flex-start" style ={{ padding: "0", width: "270px"}}>
                      <Stack direction="row" spacing={1} padding style = {{display: "flex", width: "100%", justifyContent: "space-between"}}>
                          <ListItemText
                          onClick = {() => openContactNotif(notif)}
                            primary="Contact"
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {notif.full_name}
                                </Typography>
                                {<br></br>}Alert at: {parseDateContact(notif.alert)}
                                <span style = {{marginLeft: "90px", marginTop: "5px",color: "white" , background: "red", paddingLeft: "3%", paddingRight: "3%"}}> MISSED </span>
                              </React.Fragment>
                            }
                          />
                          {/* add onClick={deleteNotif} to the clicked event */}
                          <IconButton onClick = {() => deleteContactNotif(notif)} aria-label="delete" size="small"  onClick = {() => deleteNotif(notif)}>
                            <DeleteIcon fontSize="inherit"/>
                          </IconButton>
                        </Stack>
                      </ListItem>
                    </Button>
                    <Divider variant="offset" component="li" />
                  </div>
                  ))}
                  {notifications.length > 0 && 
                  notifications.map((notif) => (
                    notif.title !== undefined ? 
                    // passed events labeled grey for not opened green for opened
                    <div>
                      <Button>
                        <ListItem alignItems="flex-start" style ={{padding: "0", width: "270px"}}>
                        <Stack direction="row" spacing={1} padding style = {{display: "flex", width: "100%", justifyContent: "space-between"}}>
                            <ListItemText
                             onClick = {() => openEvent(notif)}
                              primary={"Event: " + notif.title}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {new Date(notif.start).toDateString()}
                                  </Typography>
                                  {<br></br>}Alert at: {parseDate(notif.alert)}
                                  {<br></br>}

                                  {notif.notification_opened ? 
                                  <span style = {{marginLeft:"40px", marginTop: "5px",color: "white" , background: "grey", paddingLeft: "3%", paddingRight: "3%"}}> UPCOMING(OPENED) </span> :
                                  <span style = {{marginLeft:"77px", marginTop: "5px",color: "white" , background: "green", paddingLeft: "3%", paddingRight: "3%"}}> UPCOMING </span>                                   
                                  }
                                </React.Fragment>
                              }
                            />
                            <IconButton onClick = {() => deleteNotif(notif)} style = {{zIndex: "2"}} aria-label="delete" size="small">
                              <DeleteIcon fontSize="inherit"/>
                            </IconButton>
                          </Stack>
                        </ListItem>
                      </Button>
                      <Divider variant="offset" component="li" />
                    </div> :
                    <div>
                    {/* add onClick={openEvent} to the clicked event */}
                    <Button>
                        <ListItem style ={{ display: "flex", justifyContent: "space-between", padding: "0", width: "270px"}}>
                          <Stack direction="row" spacing={1} padding style = {{display: "flex", width: "100%", justifyContent: "space-between"}}>
                            <ListItemText
                             onClick = {() => openContactNotif(notif)}
                              primary={"Contact"}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {(notif.full_name)}
                                  </Typography>
                                  {<br></br>}Alert at: {parseDateContact(notif.alert)}
                                  {<br></br>}
                                  {notif.notification_opened ? 
                                  <span style = {{marginLeft: "80px", marginTop: "5px",color: "white" , background: "grey", paddingLeft: "3%", paddingRight: "3%"}}> UPCOMING(OPENED) </span> :
                                  <span style = {{marginLeft: "77px", marginTop: "5px",color: "white" , background: "green", paddingLeft: "3%", paddingRight: "3%"}}> UPCOMING </span>                                   
                                  }
                                </React.Fragment>
                              }
                            />
                            <IconButton onClick = {() => deleteContactNotif(notif)} style = {{flex: "flex-end", zIndex: "2"}} aria-label="delete" size="small">
                              <DeleteIcon fontSize="inherit"/>
                            </IconButton>
                          </Stack>
                        </ListItem>
                      </Button>
                    <Divider variant="offset" component="li" />
                  </div>
                  ))
                }
                </List>
                <div style = {{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <span class ="seeAll" style ={{textAlign: "center", marginBottom: "5px"}}> <a href ="\notifications"> See All </a> </span>
                </div>
              </div>
            </div>

            </ClickAwayListener>
          )}
        </div>

        {/* User Button */}
        <div className="dropdown">
          <img
            alt="user"
            src="../../user.svg"
            className="user-button"
            onClick={showDropdownUser}
          ></img>
          {dropdownUser && (
            <ClickAwayListener onClickAway={() => {setdropdownUser(false)}}>
            <div>
              <div className="arrow-up"></div>
              <div className="dropdown-content1">
                <div className="dropdown-container">
                  <Link to="/user-profile">
                    <img alt="user" src="../../person-blue.svg"></img>
                    <span>View Profile</span>
                  </Link>
                </div>
                <Divider variant="offset"/>
                <div className="dropdown-container">
                  <button className="logout" onClick={showConfirmation}>
                    <img alt="user" src="../../logout.svg"></img>
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            </div>
            </ClickAwayListener>
          )}
        </div>
      </div>

      {/* Logout confirmation popup */}
      <Modal
        open={confirmation}
        onClose={showConfirmation}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modal_logout}>
          <span className="close-icon" onClick={showConfirmation}>
            <img alt="close" src="../../close.svg"></img>
          </span>
          <h1 className="logout-header"> Confirmation </h1>
          <Divider variant="offset"/>
          <h2 className="logout-header2">Are you sure you want to log out?</h2>
          <div className="logout-button">
            <button className="butttonn" onClick={logout}>
              {/* <img alt="Log out" src="../../logout-white.svg" className="icon"></img> */}
              Log out
            </button>
          </div>
        </Box>
      </Modal>



      {/* Collapse Sidebar */}
      {!sidebar && (
        <div className="sidebar">
          <div className="sidebar-container">
            <Link to="/home">
              <img alt="" src="../../home.svg"></img>
            </Link>
          </div>
          <div className="sidebar-container">
            <Link to="/journal">
              <img alt="" src="../../journal.svg"></img>
            </Link>
          </div>
          <div className="sidebar-container">
            <Link to="/events">
              <img alt="" src="../../events.svg"></img>
            </Link>
          </div>
          <div className="sidebar-container">
            <Link to="/contacts">
              <img alt="" src="../../contacts.svg"></img>
            </Link>
          </div>
          <div className="sidebar-container">
            <button onClick={showConfirmation}>
              <img alt="" src="../../logout.svg"></img>
            </button>
          </div>
        </div>
      )}

      {/* Expand Sidebar */}
      {sidebar && (
        <ClickAwayListener onClickAway={() => {setSidebar(false)}}>
        <div>
          <div className="sidebar1">
            <div className="sidebar-container">
              <Link to="/home">
                <img alt="" src="../../home.svg"></img>
                <span>Home</span>
              </Link>
            </div>
            <div className="sidebar-container">
              <Link to="/journal">
                <img alt="" src="../../journal.svg"></img>
                <span>Journal</span>
              </Link>
            </div>
            <div className="sidebar-container">
              <Link to="/events">
                <img alt="" src="../../events.svg"></img>
                <span>Events</span>
              </Link>
            </div>
            <div className="sidebar-container">
              <Link to="/contacts">
                <img alt="" src="../../contacts.svg"></img>
                <span>Contacts</span>
              </Link>
            </div>
            <div className="sidebar-container">
              <button onClick={showConfirmation}>
                <img alt="" src="../../logout.svg"></img>
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
        </ClickAwayListener>
      )}
      <div> 
      </div>
    </div>
  );
}

export { NavbarWelcome, NavbarHome };