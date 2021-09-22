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
      height: "580px",
      width: "325px",
      borderRadius: "12px",
      textAlign: "left",
      bottom: "auto",
      marginRight: "-50%",
      marginBottom: "10px",
      transform: "translate(-50%, -50%)",
      zIndex: "100",
      backgroundColor: "#f1f1f1",
    },
  };

  function refreshPage() {
    window.location.reload(false);
  }

  let journalID = React.createRef();

  function handleDelete() {
    deletejournal(journalID.current.value);
  }

  const handleEdit = (item) => {
    setJournalID(item);
    setJournalModal(true);
  };
  
  const editjournal = async (id) => {
    alert(id);
    const journal = {
      title: editedField['title'],
      description: editedField['description'],
      files: editedField['files'],
    };
    api({
      method: "POST",
      url: "/api/journal/edit/" + id,
      data: journal,
    })
      .then(function (res) {
        if (res.status === 200) {
          setJournals([...journals, field]);
          setDates([...dates, field]);
          setField("");
          refreshPage();
        }
        setMessage(res.data.message);
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
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
              {/* <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                ariaHideApp={false}
                style={formStyle}
              >
                <button className="exitBtn" onClick={() => setIsOpen(false)}>
                  &times;
                </button>
                <div>
                  <AddJournal/>
                  <button onClick={() => setIsOpen(false)} className= "cancel-btn">CANCEL</button>
                </div>
              </Modal> */}
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
                        onClick={handleDelete} > Delete</button>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
              <Modal
                isOpen={JournalModal}
                onRequestClose={() => setJournalModal(false)}
                style={formStyle}
                ariaHideApp={false}
              >
                <button className="exitBtn" onClick={() => setJournalModal(false)}>
                  &times;
                </button>
                <div>
                  <EditJournal journal={journal} />
                </div>
              </Modal>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
