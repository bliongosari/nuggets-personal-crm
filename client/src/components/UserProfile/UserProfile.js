import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { LoopCircleLoading } from "react-loadingg";
import api from "../../config/axiosConfig.js";
import Cookies from "js-cookie";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const Loading = () => <LoopCircleLoading />;

function UserProfile() {
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const showEditProfile = () => setEditProfile(!editProfile);
  const showChangePassword = () => setChangePassword(!changePassword);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      api({
        method: "GET",
        url: "/api/user/info",
        headers: {
          "X-ACCESS-TOKEN": Cookies.get("token"),
        },
      })
        .then((res) => {
          if (res.status === 200) {
            const user = {
              email: res.data.email,
              firstname: res.data.firstname,
              lastname: res.data.lastname,
            };
            setUser(user);
            setLoading(false);
          } else {
            setFailed(true);
          }
        })
        .catch((err) => {
          setFailed(true);
        });
    }, 500);
  });

  const modal_box = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height:'60%',
    width: '80%',
    maxWidth: '400px',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#f1f1f1',
    borderRadius: '30px',
    boxShadow: 24,
    padding: 2
  };

  return loading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div className="user-profile">
      {/* User profile page */}
      <div className="background">
        <img alt="User" src="../../user.svg" className="user-image"></img>
        <h1 className="user-full-name">
          {user.firstname + " " + user.lastname}
        </h1>
      </div>

      <div className="grid-container">
        <h1 className="user-data-spec">FIRST NAME:</h1>
        <h2 className="user-data">{user.firstname}</h2>
        <h1 className="user-data-spec">LAST NAME:</h1>
        <h2 className="user-data">{user.lastname}</h2>
        <h1 className="user-data-spec">EMAIL ADDRESS:</h1>
        <h2 className="user-data">{user.email}</h2>
      </div>

      {/* Edit profile button */}
      <div className="button-container">
        <button className="button" onClick={showEditProfile}>
          <img alt="Edit" src="../../edit.svg" className="icon"></img>Edit
          Profile
        </button>
      </div>

      {/* Change password button */}
      <div className="button-container">
        <button className="button1" onClick={showChangePassword}>
          <img alt="Edit" src="../../edit.svg" className="icon"></img>Change
          Password
        </button>
      </div>

      {/* Edit profile popup */}
      <Modal open={editProfile}
        onClose={showEditProfile}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modal_box}>
          <span className="close-icon" onClick={showEditProfile}>
              <img alt="close" src="../../close.svg"></img>
            </span>
            <img alt="User" src="../../user.svg" className="user-image"></img>
            <h1 className="popup-header">EDIT PROFILE</h1>
            <div className="popup-text">
              <input
                type="text"
                placeholder="ENTER A NEW FIRST NAME"
              />
            </div>
            <div className="popup-text">
              <input
                type="text"
                placeholder="ENTER A NEW LAST NAME"
              />
            </div>
            <div className="popup-text">
              <input
                type="text"
                placeholder="ENTER A NEW EMAIL ADDRESS"
              />
            </div>
            <div className="centered-button">
              <button className="button" onClick={showEditProfile}>
                <img alt="Edit" src="../../edit.svg" className="icon"></img>
                CHANGE PROFILE
              </button>
            </div>
        </Box>
      </Modal>

      {/* Change password popup */}
      <Modal open={changePassword}
        onClose={showChangePassword}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modal_box}>
          <span className="close-icon" onClick={showChangePassword}>
              <img alt="close" src="../../close.svg"></img>
            </span>
            <img alt="User" src="../../user.svg" className="user-image"></img>
            <h1 className="popup-header">CHANGE PASSWORD</h1>
            <div className="popup-text">
              <input
                type="text"
                placeholder="ENTER CURRENT PASSWORD"
              />
            </div>
            <div className="popup-text">
              <input
                type="text"
                placeholder="ENTER A NEW PASSWORD"
              />
            </div>
            <div className="popup-text">
              <input
                type="text"
                placeholder="CONFIRM NEW PASSWORD"
              />
            </div>
            <div className="centered-button">
              <button className="button" onClick={showChangePassword}>
                <img alt="Edit" src="../../edit.svg" className="icon"></img>
                CHANGE PASSWORD
              </button>
            </div>
        </Box>
      </Modal>
    </div>
  );
}

export default UserProfile;
