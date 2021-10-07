import React, { useState, useEffect } from "react";
//import Cookies from "js-cookie";
import api from "../../config/axiosConfig.js";
import { useQuery } from "react-query";
import "./Journal.css";
import AddJournal from "./AddJournal";
import EditJournal from "./EditJournal";
import moment from "moment";
import Modal from "react-modal";
import { LoopCircleLoading } from "react-loadingg";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Loading = () => <LoopCircleLoading />;


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
  const [originalJournals, setOriginalJournals] = useState([]);
  const [dates, setDates] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [JournalModal, setJournalModal] = useState(false);
  const [journal, setJournalID] = useState(null);

  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState("")
  const [currentShow, setCurrentShow] = useState(0);
  const [searchedValue, setSearchedValue] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [isSearching, setIsSearching] = useState(false)
  const [temp, setTemp] =useState([]);
  const [q, setQ] = useState("");

  const formStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      maxWidth: "90%",
      minWidth: "50%",
      borderRadius: "12px",
      bottom: "auto",
      marginRight: "-50%",
      marginBottom: "10px",
      transform: "translate(-50%, -50%)",
      zIndex: "100",
    },
  };

  function parseDates(journals) {
    let parsedDates = [];
    var i=0;
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    for(i=0; i<journals.length;i++) {
      var date = new Date(journals[i].createdOn);
      parsedDates[i] = date.toLocaleDateString('en-US', options);
    }
    setDates(parsedDates);
  }
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
          setOriginalJournals(res.data.journals);
          setDates(res.data.dates);
          setSorting("Sort by: Date: Newest to Oldest");
          setLoading(false);
        } else {
          setFailed(true);
        }
      })
      .catch((err) => {
        setFailed(true);
      });
  }, []);

  const query = useQuery("journals", journals, {
    staleTime: Infinity,
  });

  const handlePageChange = (event, value) => {
    setPage(value);
    setCurrentShow((value-1)*6);
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(q);
    }
  }

  const handleSearch = (e) => {
    setSearchedValue(e.target.value);
    setIsSearching(true)
    if (e.target.value.length > 0){
      if (isSearching) {
        let value = e.target.value.toLowerCase();
        let result = [];
        result = temp.filter((journals) => {
          return (journals.title.toLowerCase().search(value) !== -1 || 
          journals.description.toLowerCase().search(value) !== -1);
        });
        if (result){
          setJournals(result);
        }
      }
      else {
        setTemp(originalJournals);
        setJournals(originalJournals);
      }
    }
    else {
      setJournals(originalJournals);
      setIsSearching(false)
    }
  }
  
  const handleSortChange = (e) => {
    setSorting(e.target.value);
    if(e.target.value=="Sort by: Title: A-Z") {
      journals.sort(function(a, b) {
          var orderBool = a.title.toLowerCase() > b.title.toLowerCase();
          return orderBool ? 1 : -1;
      });
      setJournals(journals);
      parseDates(journals);
      return journals;
    }
    if(e.target.value=="Sort by: Title: Z-A") {
      journals.sort(function(a, b) {
        var orderBool =a.title.toLowerCase() < b.title.toLowerCase();
        return orderBool ? 1 : -1;
      });
      setJournals(journals);
      parseDates(journals);
      return journals;
    }
    if(e.target.value=="Sort by: Date: Oldest to Newest") {
      journals.sort(
        (obj1, obj2) => new Date(obj1.createdOn) - new Date(obj2.createdOn)
      );
      setJournals(journals);
      parseDates(journals);
      return journals;
    }
    if(e.target.value=="Sort by: Date: Newest to Oldest") {
      journals.sort(
        (obj1, obj2) => new Date(obj2.createdOn) - new Date(obj1.createdOn)
      );
      setJournals(journals);
      parseDates(journals);
      return journals;
    }
  };

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
              <div className="search-journal-bar">
                <img alt="search" src="../../searchbar.svg"></img>
                <input type="search" 
                value ={searchedValue}
                onChange={handleSearch}
                placeholder="SEARCH JOURNAL"></input>
              </div>
              <div className="sortJournal">
                <button type="button" autocomplete="off" readonly="readonly" role="button" 
                id="sort-by-button" aria-controls="sort-by-dropdown"></button>
               <FormControl>
                    <Select
                      renderValue={(selected) => selected}
                      value={sorting}
                      className="sort-by-button"
                      style={{color: "#114084", fontSize: "12px"}}
                      onChange={handleSortChange}
                    >
                      <MenuItem value="Sort by: Date: Newest to Oldest">Sort by: Date: Newest to Oldest</MenuItem>
                      <MenuItem value="Sort by: Date: Oldest to Newest">Sort by: Date: Oldest to Newest</MenuItem>
                      <MenuItem value="Sort by: Title: A-Z">Sort by: Title: A-Z</MenuItem>
                      <MenuItem value="Sort by: Title: Z-A">Sort by: Title: Z-A</MenuItem>
                    </Select>
               </FormControl>
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
                {journals.slice(currentShow,currentShow+6).map((item, i) => (
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
                      
                    </li>
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
                  </ul>
                ))}
              </div>
              <div style = {{height: "50px", display: "flex", textAlign: "center", alignItems:"center", justifyContent: "center", marginTop: "30px", marginRight: "20px"}}>
                <Stack spacing={4}>
                <Pagination count={Math.ceil(journals.length/6)|| 1} page={page || 1} onChange={handlePageChange} />
                </Stack>
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
