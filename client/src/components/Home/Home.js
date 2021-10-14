import React, { useState, useEffect } from "react";
import "./Home.css";
import { LoopCircleLoading } from "react-loadingg";
import EventsSummary from "./EventsSummary";
import Feedback from "../Feedback/Feedback";
import RecentContacts from "./RecentContacts";
import api from "../../config/axiosConfig.js";
import { Link } from "react-router-dom";

const Loading = () => <LoopCircleLoading />;

function Home() {
  const [loading, setLoading] = useState(true);
  const [numContacts, setNumContacts] = useState(0);
  const [numEvents, setNumEvents] = useState(0);
  const [numJournal, setNumJournal] = useState(0);

  useEffect(() => {
    api({
      method: "GET",
      url: "/api/user/numDetails/",
    })
      .then((res) => {
        if (res.status === 200) {
          // DO NOT DELETE
          setNumContacts(res.data.contacts);
          setNumEvents(res.data.events);
          setNumJournal(res.data.journal);
          setLoading(false);
        } else {
          //setFailed(true);
        }
      })
      .catch((err) => {
        //setFailed(true);
      });
  }, []);


  return loading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div className="homeMain">
      {/* Summary Table */}
      <div className="summary summary-container" style = {{height: "10vh", justifyContent: "space-around", alignItems: "center", display: "flex"}}>
        <Link to ="/journal" style={{ textDecoration: 'none' }}>
        <div>
          <h1>{numJournal}</h1>
          <h2>JOURNAL</h2>
        </div>
        </Link>
        <Link to ="/events" style={{ textDecoration: 'none' }}>
        <div>
          <h1>{numEvents}</h1>
          <h2>EVENTS</h2>
        </div>
        </Link>
        <Link to ="/contacts" style={{ textDecoration: 'none' }}>
        <div>
          <h1>{numContacts}</h1>
          <h2>CONTACTS</h2>
        </div>
        </Link>
      </div>

      <EventsSummary />

      {/* Contacts Table */}
      <RecentContacts />
    </div>
  );
}

export default Home;
