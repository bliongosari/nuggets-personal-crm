import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";

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
    axios
      .post("http://localhost:8080/api/user/sign-up", user)
      .then(function (response) {
        console.log(response);
        setMessage(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const requestLogin = async (e) => {
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
              <h2> {message}</h2>
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

            <form onSubmit={requestLogin}>
              <div className="namediv">
                <div className="namebox">
                  <input
                    type="text"
                    placeholder="  FIRST NAME"
                    name="firstname"
                    value={firstname}
                    required
                    onChange={(e) => setFirstname(e.target.value)}
                  ></input>
                </div>

                <div className="namebox">
                  <input
                    type="text"
                    value={lastname}
                    placeholder="  LAST NAME"
                    name="lastname"
                    required
                    onChange={(e) => setLastname(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="emailbox">
                <input
                  type="text"
                  value={email}
                  placeholder="  EMAIL ADDRESS"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>

              <div className="emailbox">
                <input
                  type="text"
                  placeholder="  CREATE PASSWORD"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>

              <div className="emailbox">
                <input
                  type="text"
                  placeholder="  CONFIRM PASSWORD"
                  name="confirm-password"
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
