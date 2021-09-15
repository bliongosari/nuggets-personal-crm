import React from "react";
import { useQuery } from "react-query";
import "./Contacts.css";
import { getContacts } from "./contactsAPI";
import { Link } from "react-router-dom";

function Contacts() {
  const query = useQuery('contacts', getContacts, { staleTime: Infinity });
  return (
    <div className="home">

      <div className="searchbar">
        <img alt="search" src="../../searchbar.svg"></img>
        <input type="text" placeholder="SEARCH CONTACTS"></input>
      </div>

      <div className="addcontacts">
      <Link to={{ pathname: `addcontact`}} style={{ textDecoration: 'none' }}>
        <button className="addbtn">
          <img alt="plus" src="../../whiteadd.svg"></img>
          <h1>ADD NEW CONTACT</h1>
        </button>
        </Link>
      </div>
      
      <div className="contactssummary">
        <div className="summarytitle">
          <h1>(num) Contacts</h1>
        </div>
        <div className="summarybutton">
          <button className="sortbtn">
            <h1>SORT</h1>
            <img alt="sort" src="../../sort.svg"></img>
        </button>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="current-contacts">
        <div className="current-contacts-headings">
          <h1>Avatar</h1>
          <h1>Contact</h1>
          <h1>Description</h1>
        </div>
        {query.isLoading && <p> Loading ... </p>}
        {query.isError && <p> ERROR COULD NOT REACH SERVER </p>}
        {query.isSuccess && query.data.contacts.slice(0,4).map((contact, index) => (
          <div key={contact._id}>
            {index !== 0 && <hr className="line"></hr>}
            <div className="current-contacts-container">
              <img alt="events" src="../../events.svg"></img>
              <h2> {contact.full_name} </h2>
              <h3>Blablabla</h3>
            </div>
          </div>
        ))}
        <div className="contacts-summary-container">
          <div className="summarytitle">
            <h2>Page 2 of 2</h2>
          </div>
          <div className="navbutton">
            <button className="backbtn">
              <img alt="back" src="../../back.svg"></img>
              <h1>Back</h1>
            </button>

            <button className="backbtn">
              <h1>Next</h1>
              <img alt="next" src="../../nextt.svg"></img>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Contacts;
