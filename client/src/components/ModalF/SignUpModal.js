import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";
import api from "../../config/axiosConfig.js";
import Cookies from "js-cookie";

//export function
export default function SignUpModal() {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [message, setMessage] = useState("");

  const sign_up = (user) => {
    api({
      method: "POST",
      url: "/api/user/sign-up",
      data: user,
    })
      .then(function (response) {
        setMessage(response.data.message);
        setEmail("");
        setFirstname("");
        setLastname("");
        setPassword("");
        setPasswordConfirmation("");
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  };

  const toggleModal = () => {
    setModal(!modal);
  };

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

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <div className="buttonss">
        <button onClick={toggleModal} className="btn">
          Sign Up
        </button>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>

          <div className="modal-content">
            <div className="headingcomp">
              <img alt="" src="../../person.svg" onClick={toggleModal}></img>
              <h2 style={{ color: "red" }}> {message}</h2>
              <h2>CREATE ACCOUNT</h2>
            </div>

            <div className="logInGoogle">
              <button className="continue-btn">Continue with Google</button>
            </div>

            <div className="divider">
              <hr></hr>
              <h3>OR</h3>
              <hr></hr>
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
                  type="password"
                  placeholder="  CREATE PASSWORD  | Must contain atleast 8 characters with one digit, and one character"
                  name="password"
                  pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
                  oninvalid="this.setCustomValidity('Must contain atleast one alphabet character, one numerical digit (0-9), and at least 8 characters')"
                  oninput="this.setCustomValidity('')"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>

              <div className="emailbox">
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
                ></input>
              </div>

              <div className="confirmationbox">
                <h2>
                  <input type="checkbox"></input> &nbsp; &nbsp; By creating an
                  account, you agree to the Terms and Conditions
                </h2>
              </div>

              <div class="submit-div">
                <input
                  class="submit-btn"
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
