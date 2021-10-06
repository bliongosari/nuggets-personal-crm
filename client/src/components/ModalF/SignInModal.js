import React, { useState } from "react";
import "./Modal.css";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import api from "../../config/axiosConfig.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;
//import { login, logout } from "../../redux/slices/userSlice";

export default function SignInModal() {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const [passwordShown, setPasswordShown] = useState(false);

  const sign_in = (user) => {
    api({
      method: "POST",
      url: "/api/user/login",
      data: user,
      headers: { "X-ACCESS-TOKEN": Cookies.get("token") },
    })
      .then((response) => {
        setMessage(response.data.message);
        Cookies.set("token", response.data.token);
        history.push("/home");
      })
      .catch((error) => {
        error.response &&
          setMessage(error.response.data.message || "Incorrect Password");
      });
  };

  const requestLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    const user = {
      email,
      password,
    };
    sign_in(user);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <div className="buttons">
        <button onClick={toggleModal} className="btn">
          Sign In
        </button>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>

          <div className="modal-content">
            <div className="headingcomp">
              <img alt="" src="../../person.svg" onClick={toggleModal}></img>
              <h2 style={{ color: "red" }}> {message}</h2>
              <h2>LOG IN</h2>
            </div>
{/* 
            <div className="logInGoogle">
              <button className="continue-btn">Continue with Google</button>
            </div>

            <div className="divider">
              <hr></hr>
              <h3>OR</h3>
              <hr></hr>
            </div> */}
            <form onSubmit={requestLogin}>
              <div className="emailbox">
                <input
                  type="text"
                  pattern="(\w\.?)+@[\w\.-]+\.\w+"
                  placeholder="   EMAIL ADDRESS"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
              </div>

              <div className="emailbox">
                <input
                  type= {passwordShown ? "text": "password"}
                  placeholder="   PASSWORD"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
              
                <i className = "eyeBtn" style ={{marginLeft: "-40px", width: "40px"}} onClick = {() => setPasswordShown(!passwordShown)}> {passwordShown ? eye: eyeSlash}</i>
              </div>

              <div className="submit-div">
                <input
                  className="submit-btn"
                  type="submit"
                  value="CONTINUE "
                  id="submit"
                ></input>
              </div>

              <div className="submit">
                <div className="submit-div">
                  <input
                    className="submit-btn"
                    type="submit"
                    value="FORGET PASSWORD"
                    id="forget-password"
                  ></input>
                </div>

                <div className="closebutton">
                  <img alt="" src="../../close.svg" onClick={toggleModal}></img>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
