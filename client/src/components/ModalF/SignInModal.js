import React, { useState } from "react";
import "./Modal.css";
import Cookies from "js-cookie";
import Feedback from "../Feedback/Feedback";
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
  const [verifyModal, setVerifyModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailForgot, setEmailForgot] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const [failed, setFailed] = useState(false);

  const [success, setSuccess] = useState(false);

  const [passwordShown, setPasswordShown] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [forgotMesssage, setForgotMessage] = useState("");
  const [tokenMesssage, setTokenMessage] = useState("");
  const [nPassword, setNPassword] = useState("");
  const [confirmNPassword, setConfirmNPassword] = useState("");
  const [changeModal, setChangeModal] = useState(false);
  const [token, setToken] = useState("");
  const sign_in = (user) => {
    api({
      method: "POST",
      url: "/api/user/login",
      data: user,
      headers: { "X-ACCESS-TOKEN": Cookies.get("token") },
    })
      .then((response) => {
        setSuccess(true);
        makeFalse();
        // setMessage(response.data.message);
        Cookies.set("token", response.data.token);
        history.push("/home");
      })
      .catch((error) => {
        error.response &&
          setMessage(error.response.data.message || "Incorrect Password");
      });
  };

  const makeFalse = () => {
    setTimeout(() => {
      setFailed(false);
      setSuccess(false);
    }, 6000);
  }
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
    setForgotMessage(false);
    setVerifyModal(false);
    setChangeModal(false);
    setForgot(false);
  };

  const submitToken = (e) => {
    e.preventDefault();
    api({
      method: "POST",
      url: "/api/user/checkToken",
      data: {email: emailForgot, token: token},
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200){
          setForgotMessage("");
          setChangeModal(true);
          setVerifyModal(false);
        }
        else {
          setForgotMessage("Token invalid")
        }

      })
      .catch((error) => {
        setForgotMessage("Token invalid")
      });
  }

  const resendToken = (e) => {
    e.preventDefault();
    if (emailForgot ===  ""){
      setForgotMessage("Email can't be empty");
    }
    // setForgot(false);
    // setVerifyModal(true);
    else {
      api({
        method: "POST",
        url: "/api/user/requestResetPassword",
        data: {email: emailForgot},
      })
        .then((response) => {
          if (response.status === 200){
            setForgotMessage("Token have been re-sent");
            setForgot(false);
            setVerifyModal(true);
          }
          else {
            setForgotMessage("No email found");

          }

        })
        .catch((error) => {
          setForgotMessage("No email found")
        });
    }

  }

  const submitEmailForget = (e) => {
    e.preventDefault();
    if (emailForgot ===  ""){
      setForgotMessage("Email can't be empty");
    }
    // setForgot(false);
    // setVerifyModal(true);
    else {
      api({
        method: "POST",
        url: "/api/user/requestResetPassword",
        data: {email: emailForgot},
      })
        .then((response) => {
          if (response.status === 200){
            setForgotMessage("");
            setForgot(false);
            setVerifyModal(true);
          }
          else {
            setForgotMessage("No email found");

          }

        })
        .catch((error) => {
          setForgotMessage("No email found")
        });
    }
  };

  const submitChangePassword = () => {
    api({
      method: "POST",
      url: "/api/user/changeForgetPassword",
      data: {email: emailForgot, token: token, password: nPassword},
      headers: { "X-ACCESS-TOKEN": Cookies.get("token") },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200){
          alert("Password Successfully Changed");
          setForgotMessage("");         
          setChangeModal(false);
          setForgot(false);
          setVerifyModal(false);
        }
        else {
          setForgotMessage("Failed to send email")
        }

      })
      .catch((error) => {
        setForgotMessage("Failed to send email")
      });


  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const toggleForgot = () => {
    setForgot(!forgot);
  };

  if (forgot) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {success && <Feedback success message = "Successfully logged in" />}
      {failed && <Feedback message = "Failed to edit event" />}
      <div className="buttons">
        <button onClick={toggleModal} className="btn">
          Sign In
        </button>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>

          <div className="modalcontent">
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
                  name ="submit-login"
                  id="submit"
                ></input>
              </div>
              </form>
              <div className="submit">
                <div className="submit-div">
                <button onClick={toggleForgot} className="submit-btn">
                  FORGET PASSWORD
                </button>
                </div>

                {forgot && (
                  <div className="modal2">
                    {/* <div onClick={toggleForgot} className="overlay"></div> */}

                    <div className="modalcontent2">
                      <div className="headingcomp2">
                        <h2>Forgot Password</h2>
                        <hr></hr>
                      </div>

                      <form > 
                        <div className="emailbox2">
                          <h3 style = {{margin: "10px", marginBottom: "5px"}}>Enter your email address and we will send you an email with password reset confirmations.</h3>
                          <span style = {{marginBottom: "4px", color: "red"}}>{forgotMesssage}</span>
                          <input
                            placeholder="EMAIL ADDRESS"
                            value = {emailForgot}
                            type = "email"
                            onChange = {(e) => setEmailForgot(e.target.value)}
                          ></input>
                        </div>

                        <div className="submit-div">
                          <input
                            className="submit-btn2"
                            type="submit"
                            value="CONTINUE "
                            id="submit"
                            onClick = {(e) => submitEmailForget(e)}
                          ></input>
                        </div>

                          <div className="closebutton">
                            <img alt="" src="../../close.svg" onClick={toggleForgot}></img>
                          </div>
                      </form>
                    </div>
                  </div>
                )}
                { verifyModal && (
                  <div className="modal2">
                    {/* <div onClick={toggleForgot} className="overlay"></div> */}

                    <div className="modalcontent2">
                      <div className="headingcomp2">
                        <h2>Forgot Password</h2>
                        <hr></hr>
                      </div>

                      <form>
                        <div className="emailbox2">
                          <h3 style = {{margin: "10px", marginBottom: "5px"}}>Enter the token we sent you </h3>
                          <span style = {{marginBottom: "4px", color: "red"}}>{forgotMesssage}</span>

                          <input
                            placeholder="   ENTER TOKEN"
                            value = {token}
                            onChange = {(e) => setToken(e.target.value)}
                          ></input>
                        </div>

                        <div className="submit-div">
                          <input
                            style = {{marginBottom: "0px"}}
                            className="submit-btn2"
                            value="CONTINUE "
                            id="submit"
                            onClick = {(e) => submitToken(e)}
                          ></input>
                        </div>
                        
                          <button onClick = {(e) => resendToken(e)} className = "submit-btn2" style = {{width: "30%", marginTop: "0", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            Re-Send Code
                          </button>
                          <div className="closebutton">
                            <img alt="" src="../../close.svg" onClick={() => setVerifyModal(false)}></img>
                          </div>
                      </form>
                    </div>
                  </div>
                )
                }
                { changeModal && (
                  <div className="modal2">

                    <div className="modalcontent2">
                      <div className="headingcomp2">
                        <h2>Forgot Password</h2>
                        <hr></hr>
                      </div>

                      <form>
                        <div className="emailbox2">
                          <h3>Change Password</h3>
                          <input
                            placeholder="   ENTER A NEW PASSWORD"
                            value = {nPassword}
                            type = "password"
                            onChange = {(e) => setNPassword(e.target.value)}
                          ></input>
                            <input
                            placeholder="   CONFIRM YOUR NEW PASSWORD"
                            value = {confirmNPassword}
                            type = "password"
                            onChange = {(e) => setConfirmNPassword(e.target.value)}
                          ></input>
                        </div>

                        <div className="submit-div">
                          <input
                            className="submit-btn2"
                            value="CONTINUE "
                            id="submit"
                            onClick = {() => submitChangePassword()}
                          ></input>
                        </div>

                          <div className="closebutton">
                            <img alt="" src="../../close.svg" onClick={()=> setChangeModal(false)}></img>
                          </div>
                      </form>
                    </div>
                  </div>
                )
                }
                


                <div className="closebutton">
                  <img alt="" src="../../close.svg" onClick={toggleModal}></img>
                </div>
              </div>

          </div>
        </div>
      )}
    </>
  );
}
