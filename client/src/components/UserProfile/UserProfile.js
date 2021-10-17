import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { BlockLoading } from "react-loadingg";
import api from "../../config/axiosConfig.js";
import Cookies from "js-cookie";
import Alert from 'react-bootstrap/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Loading = () => <BlockLoading />;

function UserProfile() {
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [image, setImage] = useState("");
  const [changePasswordMsg, setChangePasswordMsg] = useState("");
  const [oldPassword, setOldPassword] = useState("")
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const requestChangePassword = async (e) => {
    let pattern="[a-zA-Z ]+";
    if(password.match(pattern) && passwordConfirmation.match(pattern)){
      if (password === passwordConfirmation && oldPassword !== "password"){
        sendChangePasswordReq();
      }
      else {
        setChangePasswordMsg("Old password cannot be the same as new password")
      }
    }
    else {
      setChangePasswordMsg("Password must contain atleast one alphabet character, one numerical digit (0-9), and at least 8 characters")
    }

    e.preventDefault();
  };

  const showEditProfile = () =>  {
    if (editProfile) {
      var letters = /^[A-Za-z]+$/;
      if(firstname.match(letters) && lastname.match(letters))
        {
          editProfileReq();
        }
      else
        {
          setEditMessage("Only alphabetical allowed")
        }

    }
    else {
      setEditProfile(!editProfile);
    }
  }
  const showChangePassword = () => setChangePassword(!changePassword);

  const [editMessage, setEditMessage] = useState("");
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

  const editProfileReq = async (e) => {
    api({
      method: "POST",
      url: "/api/user/edit/",  
      data: {
        firstname: firstname,
        lastname: lastname
      }
    })
      .then(function (res) {
        if (res.status === 200) {
          setFirstname("")
          setLastname("")
          setEditMessage("")
          window.location.reload(false);
        } else {
          setEditMessage("Failed. Try again")
        } 
        // setFlag(true);
        //setMessage(res.data.message);
      })
      .catch(function (error) {
        setEditMessage("Failed. Try again")
        // setFlag(true);
        // setFailed(true);
      });
  };

  const sendChangePasswordReq = async (e) => {
    console.log(password);
    api({
      method: "POST",
      url: "/api/user/changePassword/",  
      data: {
        oldPassword: oldPassword,
        password: password
      }
    })
      .then(function (res) {
        if (res.status === 200) {
          setPassword("")
          setOldPassword("")
          setPasswordConfirmation("")
          setChangePasswordMsg("Successfully Changed")
          setTimeout(() => {
            setChangePasswordMsg("")
          }, 5000);
          return;
          // window.location.reload(false);
        } else {
          setChangePasswordMsg(res.data.message);
        }
        // setFlag(true);
        //setMessage(res.data.message);
      })
      .catch(function (error) {
        setChangePasswordMsg("Failed. Try again")
        // setFlag(true);
        // setFailed(true);
      });
  };

  const handleImageChange = (image) => {
    if (image && image[0]) {
      let img = image[0];
      setImage(URL.createObjectURL(img));
    }
  }

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
        <button className="button" onClick={() => setEditProfile(true)}>
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
      {editProfile && (
        
        <div className="popup">
          <div style ={{textAlign: "center"}}className="box">
            <span className="close-icon" onClick={() => setEditProfile(false)}>
              <img alt="close" src="../../close.svg"></img>
            </span>
            <div className="profpic" style = {{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px", marginBottom: "10px"}}>
              {image === "" ? <img style = {{width: "100px", height: "100px"}} alt="plus" src="../../person-blue.svg"></img> : <img style = {{width: "125px", height: "125px", objectFit: "cover", borderRadius: "50%"}}alt="second" src={image}></img> } 
            </div>
            
            <h1 className="popup-header">Edit Profile</h1>

            <div className="attachimage" style = {{display: "flex", flex:"flex-wrap", width: "85%", margin: "0 auto", alignItems: "center", marginTop: "15px", marginBottom: "15px"}}>
              {/* <button className="attachhbtn"> */}
                <input style = {{margin: "0 auto", display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center"}} type="file" name="myImage" accept="image/*" placeholder = "Attach Image" onChange={ (e) => handleImageChange(e.target.files)}/>
                <button className = "trashImage" onClick = {()=> setImage("")}>
                <DeleteIcon style = {{color:"#114084", height: "100%"}}/>
                </button>
              {/* </button> */}
            </div>

            <span style ={{ color: "red", margin: "0 auto", fontSize: "14px"}}>{editMessage}</span>
            <div className="popup-text">
            <input
                    type="firstname"
                    placeholder=" ENTER A NEW FIRST NAME | Must only be alphabetical characters"
                    pattern="[a-zA-Z ]+"
                    oninvalid="this.setCustomValidity('Please enter only alphabetical characters')"
                    oninput=" this.setCustomValidity('')"
                    name="firstname"
                    value={firstname}
                    required
                    onChange={(e) => setFirstname(e.target.value)}
                  ></input>
            </div>
            <div className="popup-text">
            <input
                    type="lastname"
                    pattern="[a-zA-Z ]+"
                    oninvalid="this.setCustomValidity('Please enter only alphabetical characters')"
                    oninput=" this.setCustomValidity('')"
                    value={lastname}
                    placeholder=" ENTER A NEW LAST NAME   | Must only be alphabetical characters"
                    name="lastname"
                    required
                    onChange={(e) => setLastname(e.target.value)}
                  ></input>
            </div>
            <div className="centered-button">
              <button className="button" id = "editProfileBtn" onClick={showEditProfile}>
                <img alt="Edit" src="../../edit.svg" className="icon"></img>
                EDIT PROFILE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change password popup */}
      {changePassword && (
        <div className="popup">
          <div className="box">
            <span className="close-icon" onClick={showChangePassword}>
              <img alt="close" src="../../close.svg"></img>
            </span>
            <div className="profpic" style = {{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px", marginBottom: "10px"}}>
              {image === "" ? <img style = {{width: "100px", height: "100px"}} alt="plus" src="../../person-blue.svg"></img> : <img style = {{width: "125px", height: "125px", objectFit: "cover", borderRadius: "50%"}}alt="second" src={image}></img> } 
            </div>
            <h1 className="popup-header">CHANGE PASSWORD</h1>
            <div style = {{textAlign:"center"}}>
            <span style = {{color: "red"}}>{changePasswordMsg}</span>
            </div>

            {/* <form onSubmit={requestChangePassword}> */}
            <div className="popup-text">
              <input
                  type="password"
                  placeholder="  ENTER YOUR CURRENT PASSWORD  | Must contain atleast 8 characters with one digit, and one character"
                  name="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="popup-text">
              <input
                  type="password"
                  placeholder="  CREATE NEW PASSWORD  | Must contain atleast 8 characters with one digit, and one character"
                  name="password"
                  pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
                  oninvalid="this.setCustomValidity('Must contain atleast one alphabet character, one numerical digit (0-9), and at least 8 characters')"
                  oninput="this.setCustomValidity('')"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="popup-text">
              <input
                  type="password"
                  placeholder="  CONFIRM PASSWORD"
                  name="confirm-password"
                  pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
                  oninvalid="this.setCustomValidity('Must contain atleast one alphabet character, one numerical digit (0-9), and at least 8 characters')"
                  oninput="this.setCustomValidity('')"
                  required
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>
            {/* <div className="centered-button">
              <button className="button">
                <img alt="Edit" src="../../edit.svg" className="icon">CHANGE PASSWORD</img>
                <input
                  class="submit-btn"
                  type="submit"
                  value="CHANGE PASSWORD"
                  id="submit"
                ></input>
              </button>
            </div> */}
            <div className="centered-button">
              <button className="button" id = "editProfileBtn" onClick={showChangePassword} onSubmit={requestChangePassword}>
                <img alt="Edit" src="../../edit.svg" className="icon"></img>
                CHANGE PASSWORD
              </button>
            </div>
            {/* </form> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
