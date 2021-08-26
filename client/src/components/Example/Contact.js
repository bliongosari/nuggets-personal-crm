import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Contact() {
  const [field, setField] = useState("");
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const addContacts = async (e) => {
    const contact = {
      full_name: field,
      preferred_name: field,
    };
    axios({
      method: "POST",
      url: "http://localhost:8080/api/contacts/add",
      headers: {
        "X-ACCESS-TOKEN": Cookies.get("token"),
      },
      data: contact,
    })
      .then(function (res) {
        if (res.status === 200) {
          setContacts([...contacts, field]);
          setField("");
        }
        setMessage(res.data.message);
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/contacts/all",
      headers: {
        "X-ACCESS-TOKEN": Cookies.get("token"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setContacts(res.data.contacts);
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
        <h1> Failed to get contact data</h1>
      ) : (
        <div>
          {loading ? (
            <h1> Loading.... </h1>
          ) : (
            <div>
              <h1> Contacts</h1>
              <label style={{ color: "red" }}> {message}</label>
              <label> Add a contact: </label>
              <input
                value={field}
                onChange={(e) => setField(e.target.value)}
                required="true"
              ></input>
              <button onClick={addContacts}>ADD</button>
              {contacts.map((item, i) => (
                <li key={i}>
                  {item.preferred_name}
                  <button style={{ margin: " 0 0 0 40px" }}> Delete</button>
                </li>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
