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
        files: "",
    });
    const [field, setField] = useState("");
    const [journal, setjournal] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const [flag, setFlag] = useState(false);

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
        setAllFields({ ...allField, [e.target.name]: e.target.value });
    };

    function refreshPage() {
        window.location.reload(false);
    }
    return (
      <div className="home">

        <div className="pagetitlee">
          <h1>Add a new journal</h1>
        </div>

        <div className="journalentryform">
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
          <button className="addjbtn">
            <h1>Attach Files </h1>
          </button>
        </div>

        <div className="addjournal">
          <button onClick={addjournal} className="addjbtn">
            <h1>Post journal </h1>
          </button>
        </div>

        <div className="addjournal">
          <button className="addjbtn">
            <h1>Cancel</h1>
          </button>
        </div>
        
      </div>
      </div>
    );
}
export default AddJournal;