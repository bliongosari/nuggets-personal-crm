import React, {useState} from 'react';
import "./Modal.css";

export default function SignUpModal() {
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
              <h2>CREATE ACCOUNT</h2>
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

            <div className="namediv">
                <div className="namebox">
                    <input type="text" placeholder="  FIRST NAME" name="fname" required></input>
                </div>

                <div className="namebox">
                    <input type="text" placeholder="  LAST NAME" name="lname" required></input>
                </div>
            </div>
            
            
            <div className="emailbox">
              <input type="text" placeholder="  EMAIL ADDRESS" name="password" required></input>
            </div>

            <div className="emailbox">
              <input type="text" placeholder="  CREATE PASSWORD" name="password" required></input>
            </div>

            <div className="emailbox">
              <input type="text" placeholder="  CONFIRM PASSWORD" name="password" required></input>
            </div>
            
            <div className="confirmationbox">
               
                <h2><input type="checkbox"></input> &nbsp; &nbsp; By creating an account, you agree to the Terms and Conditions</h2>
            </div>

            <div class="submit-div">
                <input class="submit-btn" type="submit" value="CREATE ACCOUNT" id="submit"></input>
            </div>
            
            <div className="closebutton">
            <img alt="" src="../../close.svg" onClick={toggleModal}></img>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}

