import React, { useState, useEffect } from "react";
//import Cookies from "js-cookie";
import api from "../../config/axiosConfig.js";
import "./Journal.css";


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
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);


  const addjournal = async (e) => {
    const journal = {
      title: allField['title'],
      description: allField['description'],
      files: allField['files'],
    };
    api({
      method: "POST",
      url: "/api/journal/create",
      data: journal,
    })
      .then(function (res) {
        if (res.status === 200) {
          setJournals([...journals, field]);
          setField("");
          refreshPage();
        }
        setMessage(res.data.message);
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  };

  const changeHandler = e => {
    setAllFields({...allField, [e.target.name]: e.target.value})
  }
  const editHandler = e => {
    setEditedFields({...editedField, [e.target.name]: e.target.value})
  }

  function refreshPage() {
    window.location.reload(false);
  }

  let journalID = React.createRef();

  function handleDelete() {
    deletejournal(journalID.current.value);
  }

  function handleEdit() {
    editjournal(journalID.current.value);
    setEditedFields({editedField: [{}]});
  }
  
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
                      
              <button onClick={addjournal}>POST</button>

              {journals.map((item, i) => (
                <li key={i}>
                  {item.title}
                  <button style={{ margin: " 0 0 0 40px" }} ref = {journalID} 
                  value={item._id}
                  onClick={handleDelete} > Delete</button>
                  <form>
                    <label>Title</label><br></br>
                    <input 
                    placeholder={item.title}
                    name="title"
                    defaultValue={item.title}
                    onChange={editHandler}/><br></br>
                    <label>Description</label><br></br>
                    <input 
                    placeholder={item.description}
                    name="description"
                    defaultValue={item.description}
                    onChange={editHandler}/>
                    <br></br>
                  </form>
                  <button style={{ margin: " 0 0 0 40px" }} ref = {journalID} 
                  value={item._id}
                  onClick={handleEdit} > Edit</button>
                </li>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
