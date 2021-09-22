import React, { useState, useEffect } from "react";
//import Cookies from "js-cookie";
import api from "../../config/axiosConfig.js";
import "./Journal.css";
import AddJournal from "./AddJournal";
import EditJournal from "./EditJournal";
import moment from "moment";
import Modal from "react-modal";

export default function Journal() {
  const [allField, setAllFields] = useState({
    title: '',
    description: '',
    files: [],
  });
  const [editedField, setEditedFields] = useState({
    title: '',
    description: '',
    files: [],
  });
  const [field, setField] = useState("");
  const [journals, setJournals] = useState([]);
  const [dates, setDates] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [JournalModal, setJournalModal] = useState(false);
  const [journal, setJournalID] = useState(null);

  const formStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      maxWidth: "1000",
      minWidth:"90%",
      borderRadius: "12px",
      bottom: "auto",
      marginRight: "-50%",
      marginBottom: "10px",
      transform: "translate(-50%, -50%)",
      zIndex: "100",
    },
  };

  function refreshPage() {
    window.location.reload(false);
  }

  let journalID = React.createRef();

  function handleDelete(item) {
    deletejournal(item);
  }

  const handleEdit = (item) => {
    setJournalID(item);
    setJournalModal(true);
  };

  const deletejournal = async (id) => {
    api({
      method: "GET",
      url: "/api/journal/delete/" + id
    })
      .then(function (res) {
        if (res.status === 200) {
          refreshPage();
          setField("");
        }
        setMessage(res.data.message);
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    api({
      method: "GET",
      url: "/api/journal/",
    })
      .then((res) => {
        if (res.status === 200) {
          setJournals(res.data.journals);
          setDates(res.data.dates);
          setLoading(false);
        } else {
          setFailed(true);
        }
      })
      .catch((err) => {
        setFailed(true);
      });
  }, []);


  return (
    <div>
      {failed ? (
        <h1> Failed to get journal data</h1>
      ) : (
        <div>
          {loading ? (
            <h1> Loading.... </h1>
          ) : (
            <div className="journals">
              <div className="upload">
                <button onClick={() => setIsOpen(true)} className="upload-btn">
                  &#65291;
                  <span> UPLOAD A JOURNAL</span>
                </button>
              </div>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                ariaHideApp={false}
                style={formStyle}
              >
                <div className="pagetitlee">
                  <h1>Add a new journal</h1>
                  <button className="exit-Btn" onClick={() => setIsOpen(false)}>
                      &times;
                  </button>
                </div>
                  <AddJournal/>
              </Modal>
              <div className="journal-details">
                {journals.map((item, i) => (
                  <ul>
                    <li key={i}>
                      <div className="journalDate">
                        <h1> {dates[i]} </h1>
                      </div>
                      <br></br>
                      <div  className="journalTitle">
                        <h2> {item.title} </h2>
                      </div>
                      <br></br>
                      <h2>{item.description} </h2>
                      <div className="journal-btns">
                        <button className= "edit-journal-btn" 
                        ref = {journalID} 
                        value={item}
                        onClick={() => handleEdit(item)} > Edit</button>

                        <button
                        className="delete-journal-btn" 
                        ref = {journalID} 
                        value={item._id}
                        onClick={() => handleDelete(item._id)} > Delete</button>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
              <Modal
                isOpen={JournalModal}
                onRequestClose={() => setJournalModal(false)}
                ariaHideApp={false}
                style={formStyle}
                dialogClassName="JournalModal"
              >
                <div className="pagetitlee">
                  <h1>Edit existing journal</h1>
                    <button className="exit-Btn" onClick={() => setJournalModal(false)}>
                    &times;
                    </button>
                </div>
                <EditJournal journal={journal} /> 
              </Modal>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
