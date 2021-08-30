import React, { useState, useEffect } from "react";
import api from "../../config/axiosConfig.js";
import Cookies from "js-cookie";

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
    api({
      method: "POST",
      url: "/api/contacts/add",
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
    api({
      method: "GET",
      url: "/api/contacts/all",
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
