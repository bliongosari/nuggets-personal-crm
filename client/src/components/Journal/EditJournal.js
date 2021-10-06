import React, { useState, useEffect } from "react";
//import Cookies from "js-cookie";
import api from "../../config/axiosConfig.js";
import "./NewJournal.css";
import { Alert } from "react-bootstrap";
import { props } from "bluebird";

function EditJournal(props) {
    const[allField, setAllFields] = useState({
        title: props.journal.title,
        description: props.journal.title,
        files: props.journal.files,
    });
    const oldFiles = props.journal.files;
    const [field, setField] = useState("");
    const [journals, setjournals] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const [flag, setFlag] = useState(false);
    const [JournalModal, setJournalModal] = useState(false);
    const files =[];
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
    
      const handleSubmit = async(e) => {
        allField["files"] = files;
        editJournal(e);
      };
      const SuccessMsg = () => <Alert variant="success">Sucessfully Edited</Alert>;
      const FailedMsg = () => <Alert variant="danger">Failed to edit</Alert>;
    
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
            <div className="formtitlee">
              <h1>Journal Details</h1>
            </div>
            <form>
              <div className="detailstitle">
                <h2>Title:</h2>
                <input name="title"
                onChange={changeHandler}
                placeholder={props.journal.title}></input>
              </div>
              <div className="detailsdesc">
                <h2>Description:</h2>
                <input name="description"
                  onChange={changeHandler}
                  placeholder={props.journal.description}></input>
              </div>
              <div className="addjournal">
                <label for="files" class="addjbtn">ATTACH FILES</label>
                <input type="file" name="files" id="files" onChange={changeHandler}/>
              </div>
              <div className="addjournal">
                <button onClick={handleSubmit} className="addjbtn">
                  <h1>SAVE CHANGES </h1>
                </button>
              </div>
              </form>
            </div>
        </div>
      );
    }
    export default EditJournal;
