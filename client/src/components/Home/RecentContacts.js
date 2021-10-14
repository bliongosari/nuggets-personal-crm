import React, { useState, useEffect } from "react";
import api from "../../config/axiosConfig.js";
import "./Home.css"
import { Link } from "react-router-dom";

function RecentConctacts() {
  const [contacts, setContacts] = useState([]);
  const [current, setCurrent] = useState([]);
  const [currentIndex, setIndex] = useState(0);
  const [max, setMax] = useState(false);
  const [noContacts, setNoContacts] = useState(false);

  const moveRight = () => {
    if (currentIndex === 6){
        setMax(true);
    }  
    else {
        setCurrent(contacts.slice(currentIndex+3, currentIndex+6))
        setIndex(currentIndex+3);
        if (currentIndex === 3){
            setMax(true);
        }
    }
  }
  const moveLeft = () => {
    if (currentIndex === 0){
        setMax(false);
    }
    else {
    setIndex(currentIndex-3);
    setCurrent(contacts.slice(currentIndex, currentIndex+3))
    if (currentIndex === 3){
        setMax(false);
    }
    }
  }
  useEffect(() => {
    api({
      method: "GET",
      url: "/api/contacts/recent/",
    })
      .then((res) => {
        if (res.status === 200) {
          // DO NOT DELETE
          let recent = res.data.contacts;
          if (recent.length == 0){
              setNoContacts(true);
          }
          setContacts(recent);
          setCurrent(recent.slice(0,3));
        } else {
          //setFailed(true);
        }
      })
      .catch((err) => {
        //setFailed(true);
      });
  }, []);

    return (
        <div className="new-contacts" style = {{minHeight: "20vh"}}>
            <span className ="header-left">RECENTLY ADDED CONTACTS</span>
            <Link to = "/addcontact">
            <button className="next1 round">&#43;</button>
            </Link>
            
        { noContacts ? (
            <div>
            <div className ="no-contacts-container"> <h3> No contacts yet!  Click <Link to = "/addcontact"> here</Link> to add more.  </h3></div>
            </div>
            ) : (
        <div className="new-contacts-container">
          {current.map((contact) => (
          <Link key={contact._id} to={{ pathname: `contact/${contact.full_name}/${contact._id}` }} style={{ textDecoration: 'none' }}>
            <div className="eachContact">
              <div style = {{margin: "0 auto",width: "33%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <div className="square" style = {{marginLeft: "0", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: "20px"}}> {contact.preferred_name[0] || contact.full_name[0]}</div>
              <h3 style = {{marginTop: "6px"}}>{contact.preferred_name || contact.full_name}</h3>
              </div>
            </div>
          </Link>
          ))}
          {/* {max ? (
          <button className="next" onClick ={moveLeft}>
          <img alt="before" src="../../next.svg" className="next"></img>
        </button>
          ) : (
              <div>
          <button className="next" onClick ={moveRight}>
            <img alt="next" src="../../next.svg" className="next"></img>
          </button>
          </div>
          )}  */}
          </div>
        )}
        
      </div>
    )
}

export default RecentConctacts