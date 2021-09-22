import React, { useState, useEffect } from "react";
//import Cookies from "js-cookie";
import api from "../../config/axiosConfig.js";
import "./Journal.css";
import { Alert } from "react-bootstrap";
import { props } from "bluebird";

function EditJournal(props) {
    const[allField, setAllFields] = useState({
        title: props.journal.title,
        description: props.journal.title,
        files: props.journal.files,
    });
    const [field, setField] = useState("");
    const [journals, setjournals] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const [flag, setFlag] = useState(false);
    const editJournal = async (e) => {
        api({
          method: "POST",
          url: "/api/journal/edit/" + props.journal._id,
          data: allField,
        })
          .then(function (res) {
            if (res.status === 200) {
              setjournals([...journals, field]);
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
    
      const SuccessMsg = () => <Alert variant="success">Sucessfully Edited</Alert>;
      const FailedMsg = () => <Alert variant="danger">Failed to edit</Alert>;
    
      const changeHandler = (e) => {
        setAllFields({ ...allField, [e.target.name]: e.target.value });
      };
    
      function refreshPage() {
        window.location.reload(false);
      }
      return (
        <div>
        {flag && (failed ? <FailedMsg /> : <SuccessMsg />)}
            <div className="addjournal">
            <h2 className="edit-title">Edit journal</h2>
            <h3 className="journal-detail-title"> Journal Details </h3>
                <form>
                <label>Title</label><br></br>
                <input 
                name="title"
                onChange={changeHandler}
                placeholder={props.journal.title}
                /><br></br>
                <label>Description</label><br></br>
                <input 
                name="description"
                onChange={changeHandler}
                placeholder={props.journal.description}/>
                <br></br>
                </form>
                <button className="save-btn" 
                onClick={editJournal}> Save Changes</button>
            </div>
        </div>
      );
    }
    export default EditJournal;
