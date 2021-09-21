import React, { useState, useEffect } from "react";
//import Cookies from "js-cookie";
import api from "../../config/axiosConfig.js";
import "./Journal.css";
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
        <div class="addjournal">
            <h1> Add a new journal </h1>
            <form>
            <label style={{ color: "red" }}> {message}</label>
            <label> Title: </label><br></br>
            <input
            name="title"
            onChange={changeHandler}
            required="true"
            /><br></br>

            <label> Description: </label><br></br>
            <input
            name="description"
            onChange={changeHandler}
            required="false"
            /><br></br>

            <label> Attach Files: </label><br></br>
            <input
            name="files"
            onChange={changeHandler}
            required="false"
            />
            <br></br>
            </form>
                    
            <button onClick={addjournal} className ="post-btn">&#65291;POST</button>
        </div>
    );
}
export default AddJournal;