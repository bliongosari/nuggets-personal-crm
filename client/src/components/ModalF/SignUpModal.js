import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";
import api from "../../config/axiosConfig.js";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Feedback from "../Feedback/Feedback";

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

//export function
export default function SignUpModal() {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [message, setMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);

  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);

  const sign_up = (user) => {
    api({
      method: "POST",
      url: "/api/user/sign-up",
      data: user,
    })
      .then(function (response) {
        console.log(response);
        setSuccess(true);
        makeFalse();
        setEmail("");
        setFirstname("");
        setLastname("");
        setPassword("");
        setPasswordConfirmation("");
        refreshPage();
      })
      .catch(function (error) {
        setFailed(true);
        makeFalse();
        setMessage(error.response.data.message);
      });
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  function refreshPage() {
    window.location.reload(false);
  }


  const requestSignUp = async (e) => {
    e.preventDefault();
    const user = {
      email,
      firstname,
      lastname,
      password,
      passwordConfirmation,
    };
    sign_up(user);
  };

  const makeFalse = () => {
    setTimeout(() => {
      setFailed(false);
      setSuccess(false);
    }, 6000);
  }

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
        {success && <Feedback success message = "Successfully signed up. An email confirmation has been sent" />}
      {failed && <Feedback message = "Failed to sign up " />}
      <div className="buttonss">
        <button onClick={toggleModal} className="btn">
          Sign Up
        </button>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>

          <div className="modalcontent3">
            <div className="headingcomp">
              <img alt="" src="../../person.svg" onClick={toggleModal}></img>
              <h2 style={{ color: "red" }}> {message}</h2>
              <h2>CREATE ACCOUNT</h2>
            </div>


            <form onSubmit={requestSignUp}>
              <div className="namediv">
                <div className="namebox">
                  <input
                    type="firstname"
                    placeholder="  FIRST NAME   | Must only be alphabetical characters"
                    pattern="[a-zA-Z ]+"
                    oninvalid="this.setCustomValidity('Please enter only alphabetical characters')"
                    oninput=" this.setCustomValidity('')"
                    name="firstname"
                    value={firstname}
                    required
                    onChange={(e) => setFirstname(e.target.value)}
                  ></input>
                </div>

                <div className="namebox">
                  <input
                    type="lastname"
                    pattern="[a-zA-Z ]+"
                    oninvalid="this.setCustomValidity('Please enter only alphabetical characters')"
                    oninput=" this.setCustomValidity('')"
                    value={lastname}
                    placeholder="  LAST NAME   | Must only be alphabetical characters"
                    name="lastname"
                    required
                    onChange={(e) => setLastname(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="emailbox">
                <input
                  type="email"
                  pattern="(\w\.?)+@[\w\.-]+\.\w+"
                  value={email}
                  placeholder="  EMAIL ADDRESS  | Must be in the format of name@domain."
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>

              <div className="emailbox">
                <input
                  type={passwordShown ? "text": "password"}
                  placeholder="  CREATE PASSWORD  | Must contain atleast 8 characters with one digit, and one character"
                  name="password"
                  pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
                  oninvalid="this.setCustomValidity('Must contain atleast one alphabet character, one numerical digit (0-9), and at least 8 characters')"
                  oninput="this.setCustomValidity('')"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                                <i className = "eyeBtn" style ={{marginLeft: "-40px", width: "40px"}} onClick = {() => setPasswordShown(!passwordShown)}> {passwordShown ? eye: eyeSlash}</i>
              </div>

              <div className="emailbox">
                <input
                  type={passwordConfirmShown ? "text": "password"}
                  placeholder="  CONFIRM PASSWORD"
                  name="confirm-password"
                  pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
                  oninvalid="this.setCustomValidity('Must contain atleast one alphabet character, one numerical digit (0-9), and at least 8 characters')"
                  oninput="this.setCustomValidity('')"
                  required
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                ></input>
                <i className = "eyeBtn" style ={{marginLeft: "-40px", width: "40px"}} onClick = {() => setPasswordConfirmShown(!passwordConfirmShown)}> {passwordConfirmShown ? eye: eyeSlash}</i>
              </div>

              {/* <div className="confirmationbox">
                <h2>
                  <input type="checkbox"></input> &nbsp; &nbsp; By creating an
                  account, you agree to the Terms and Conditions
                </h2>
              </div> */}

              <div class="submit-div">
                <input
                  class="submit-btn3"
                  type="submit"
                  value="CREATE ACCOUNT"
                  id="submit"
                ></input>
              </div>
            </form>

            <div className="closebutton">
              <img alt="" src="../../close.svg" onClick={toggleModal}></img>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
