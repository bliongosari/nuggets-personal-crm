import React, {useState} from 'react';
import "./Modal.css";

export default function SignInModal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
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
              <h2>LOG IN</h2>
            </div>
            
            <div className="logInGoogle">
              <button className="continue-btn">
                Continue with Google
              </button>
            </div>

            <div className="divider">
              <hr></hr>
              <h3>OR</h3>
              <hr></hr>
            </div>

            <div className="emailbox">
              <input type="text" placeholder="   EMAIL ADDRESS" name="uname" required></input>
            </div>
            
            <div className="emailbox">
              <input type="text" placeholder="   PASSWORD" name="password" required></input>
            </div>
            
            <div class="submit-div">
                <input class="submit-btn" type="submit" value="CONTINUE " id="submit"></input>
            </div>

            <div className="submit">
              <div class="submit-div">
                <input class="submit-btn" type="submit" value="FORGET PASSWORD" id="forget-password"></input>
              </div>
            
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

