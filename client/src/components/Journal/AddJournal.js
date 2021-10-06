import React, { useState, useEffect } from "react";
//import Cookies from "js-cookie";
import api from "../../config/axiosConfig.js";
import "./NewJournal.css";
import { Alert } from "react-bootstrap";

function AddJournal() {
    const[allField, setAllFields] = useState({
        title: "",
        description:"",
        createdOn: Date.now(),
        files: [],
    });
    const [field, setField] = useState("");
    const [journal, setjournal] = useState([]);
    const files = [];
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const [flag, setFlag] = useState(false);

    const handleSubmit = async(e) => {
      allField["files"] = files;
      addjournal(e);
    };
    
    const addjournal = async (e) => {
        api({
            method: "POST",
            url: "/api/journal/create",
            data: allField,
          })
            .then(function (res) {
              if (res.status === 200) {
                setjournal([...journal, field]);
                setField("");
                refreshPage();
              } else {
                setFailed(true);
              }
              setFlag(true);
              //setMessage(res.data.message);
            })
            .catch(function (error) {
              setFlag(true);
              setFailed(true);
            });
    };
    const SuccessMsg = () => <Alert variant="success">Sucessfully Added</Alert>;
    const FailedMsg = () => <Alert variant="danger">Failed to add</Alert>;

    const changeHandler = (e) => {
        if(e.target.name == "files") {
          files.push(e.target.value);
        }
        else{ 
          setAllFields({ ...allField, [e.target.name]: e.target.value });
        }
    };

    function refreshPage() {
        window.location.reload(false);
    }
    return (
      <div>
          <div className="journalentryform">
            <form>
            <div className="formtitlee">
              <h1>Journal Details</h1>
              <hr></hr>
            </div>

            <div className="detailstitle">
              <h2>Title:</h2>
              <input name="title"
                onChange={changeHandler}
                required="true"></input>
            </div>

            <div className="detailsdesc">
              <h2>Description:</h2>
              <input name="description"
                onChange={changeHandler}
                required="false"></input>
            </div>

            <div className="addjournal">
              <label for="files[0][uploaded]" class="addjbtn">ATTACH FILES</label>
              <input type="file" name="files" id="files" onChange={changeHandler}/>
              <button onClick={handleSubmit} className="addjbtn">
                <h1>+ POST </h1>
              </button>
            </div>
            </form>
          </div>
      </div>
    );
}

export default AddJournal;