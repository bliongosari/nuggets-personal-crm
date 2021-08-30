import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import api from "../../config/axiosConfig.js";
//import { login, logout } from "../../redux/slices/userSlice";

export default function SignInModal() {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const sign_in = (user) => {
    api({
      method: "POST",
      url: "/api/user/login",
      data: user,
      headers: { "X-ACCESS-TOKEN": Cookies.get("token") }
    })
      .then(function (res) {
        setMessage(res.data.message);
        Cookies.set("token", res.data.token);
        api.defaults.headers.common = { "X-ACCESS-TOKEN": res.data.token };
        history.push("/home");
      })
      .catch(function (error) {
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

            <div className="logInGoogle">
              <button className="continue-btn">Continue with Google</button>
            </div>

            <div className="divider">
              <hr></hr>
              <h3>OR</h3>
              <hr></hr>
            </div>
            <form onSubmit={requestLogin}>
              <div className="emailbox">
                <input
                  type="text"
                  placeholder="   EMAIL ADDRESS"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
              </div>

              <div className="emailbox">
                <input
                  type="text"
                  placeholder="   PASSWORD"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
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
