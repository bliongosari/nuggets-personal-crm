import React, { useState, useEffect } from "react";
import "./Navbar.css";
import SignInModal from "../ModalF/SignInModal";
import SignUpModal from "../ModalF/SignUpModal";
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
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    api({
      method: "GET",
      url: "/api/user/notifications/",
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.contactsNotif);
          console.log(res.data.eventsNotif);
          setNotifications([...res.data.contactsNotif, ...res.data.eventsNotif]);

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
              <div className="arrow-up2"></div>
              <div className="dropdown-content">
                <List style={{ width: '100%'}}>
                  {notifications.length > 0 ? 
                  notifications.map((notif) => (
                    notif.title !== "undefined" ? 
                    <div>
                      {/* add onClick={openEvent} to the clicked event */}
                      <Button>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                              <img alt="Event" src="/../../events.svg" className="avatarimg"/>
                          </ListItemAvatar>
                          <Stack direction="row" spacing={1}>
                            <ListItemText
                              primary={notif.title}
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
                                  {<br></br>}{notif.alert}
                                </React.Fragment>
                              }
                            />
                            {/* add onClick={deleteNotif} to the clicked event */}
                            <IconButton aria-label="delete" size="small">
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
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <img alt="Event" src="/../../contacts.svg" className="avatarimg"/>
                        </ListItemAvatar>
                        <Stack direction="row" spacing={1}>
                          <ListItemText
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
                                {<br></br>}{notif.alert}
                              </React.Fragment>
                            }
                          />
                          {/* add onClick={deleteNotif} to the clicked event */}
                          <IconButton aria-label="delete" size="small">
                            <DeleteIcon fontSize="inherit"/>
                          </IconButton>
                        </Stack>
                      </ListItem>
                    </Button>
                    <Divider variant="offset" component="li" />
                  </div>
                  ))
                  :
                  <span>No Notification</span>
                }
                </List>
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
            <button className="button" onClick={logout}>
              <img alt="Log out" src="../../logout-white.svg" className="icon"></img>
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
    </div>
  );
}

export { NavbarWelcome, NavbarHome };
