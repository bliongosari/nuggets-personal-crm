import React, { useState } from "react";
import { useQuery } from "react-query";
import "./Contacts.css";
import { getContacts } from "./contactsAPI";
import { Link } from "react-router-dom";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { LoopCircleLoading } from "react-loadingg";
const Loading = () => <LoopCircleLoading />;

// change when have tags from backend
const tagsQueried = [
  'All',
  'Friends',
  'Colleagues',
  'Family',
  'Childhood',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      color: "#114084",
    },
  },
};

function Contacts() {
  const query = useQuery("contacts", getContacts, { staleTime: Infinity });
  const [tags, setTags] = useState(["All"]);
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState("Sort by: Date: Last to First")
  const [currentShow, setCurrentShow] = useState(0);
  const [searchedValue, setSearchedValue] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [isSearching, setIsSearching] = useState(false)
  const [temp, setTemp] =useState([]);

  const handlePageChange = (event, value) => {
    setPage(value);
    setCurrentShow((value-1)*6);
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSearch = (e) => {
    setSearchedValue(e.target.value);
    setIsSearching(true)
    if (e.target.value.length > 0){
      if (isSearching) {
        let value = (e.target.value).toLowerCase();
        let result = [];
        result = temp.filter((data) => {
          return data.full_name.toLowerCase().search(value) !== -1;
          });
          if (result){
            query.data.contacts = result;
          }
      }
      else {
 
        setTemp(query.data.contacts);
      }
    }
    else {
      query.data.contacts = temp;
      setIsSearching(false)
    }
  }

  const filter = (data) =>  {
    let filteredData = data;
    switch(sorting) {
      case "Sort by: Date: Last to First":
        filteredData = data.sort(
          (obj1, obj2) => new Date(obj2.createdOn) - new Date(obj1.createdOn)
        );
        return filteredData;
      case "Sort by: Date: First to Last":
        filteredData = data.sort(
          (obj1, obj2) => new Date(obj1.createdOn) - new Date(obj2.createdOn)
        );
        return filteredData;
      case "Sort by: Contact: A-Z":
        filteredData = data.sort(function(a, b) {
          var orderBool =a.full_name.toLowerCase() > b.full_name.toLowerCase();
          return orderBool ? 1 : -1;
      });
      return filteredData;

      case "Sort by: Contact: Z-A":
        filteredData = data.sort(function(a, b) {
          var orderBool = a.full_name.toLowerCase() < b.full_name.toLowerCase();
          return orderBool ? 1 : -1;
      });
      return filteredData;
      default:
        filteredData = data.sort(
          (obj1, obj2) => new Date(obj2.start) - new Date(obj1.start)
        );
        return filteredData;
    }
  }

  const handleSortChange = (e) => {
    setSorting(e.target.value);
    query.data.contacts = filter(query.data.contacts)
  };

  return (
    <div className="home">
        {query.isLoading && <p> <Loading /> </p>}
        {query.isError && <p> ERROR COULD NOT REACH SERVER </p>}
        {query.isSuccess &&
        <div>
      <div className="searchbarr">
        <img alt="search" src="../../searchbar.svg"></img>
        <input type="search" 
        value ={searchedValue}
        onChange={handleSearch}
        placeholder="SEARCH CONTACTS"></input>
      </div>

      <div className="addcontacts">
        <Link to={{ pathname: `addcontact`}} style={{ textDecoration: 'none' }}>
          <button className="newcontactbtnn">
            <h1>ADD NEW CONTACT</h1>
          </button>
        </Link>
      </div>
      
      <div className="contactssummary">
        <div className="summarytitle">
          <h1>{query.data.contacts ? query.data.contacts.length : 0} Contact{(query.data.contacts.length<1)||"s"}</h1>
        </div>
        <div className="sortbutton">
      <FormControl style={{maxWidth: "95px", maxHeight: "30px", borderColor: "#114084", marginLeft: "0", marginRight: "0"}}>
        <Select
          displayEmpty
          multiple
          value={tags}
          onChange={handleChange}
          style = {{height: "30px", fontSize: "12px", color: "#114084"}}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {tagsQueried.map((name) => (
            <MenuItem key={name} value={name} style = {{height: "30px", paddingLeft: "5px", color: "#114084"}}>
              <Checkbox style ={{color:"#114084"}} checked={tags.indexOf(name) > -1} />
              <ListItemText style ={{color:"#114084"}} primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl style={{marginLeft: "10px", maxWidth: "180px", maxHeight: "30px", borderColor: "#114084" }}>
          <Select
            renderValue={(selected) => selected}
            value={sorting}
            style = {{height: "30px" ,fontSize: "11px", color: "#114084"}}
            onChange={handleSortChange}
          >
            <MenuItem value="Sort by: Date: Last to First">
              Sort by: Date: Last to First
            </MenuItem>
            <MenuItem value={"Sort by: Date: First to Last"}>Sort by: Date: First to Last</MenuItem>
            <MenuItem value={"Sort by: Contact: A-Z"}>Sort by: Contact: A-Z</MenuItem>
            <MenuItem value={"Sort by: Contact: Z-A"}>Sort by: Contact: Z-A</MenuItem>
          </Select>
      </FormControl>
      </div>

      </div>

      {/* Contacts Table */}

      <div className="current-contacts-headingss">
          <h1>Avatar</h1>
          <h1>Contact</h1>
          <h1>Tags</h1>
          <h1>Date Added </h1>
      </div>

      <div className="current-contacts-table">
        
        {query.data.contacts.slice(currentShow,currentShow+6).map((contact, index) => (
          <Link to={{ pathname: `contact/${contact.full_name}`, state: { contact: contact } }} style={{ textDecoration: 'none' }}>
          <div key={contact._id}>
            {index !== 0 && <hr className="line"></hr>}
            <div className="current-contacts-r">
                <img alt="events" src="../../events.svg"></img>
                <h2 className ="contact-name"> {contact.full_name} </h2>
                <h2>{contact.tags[0] || "-"}</h2>
                <h2>{contact.createdOn.slice(0,10)}</h2>
            </div>
          </div>
          </Link>
        ))}
      <div style = {{height: "50px", display: "flex", textAlign: "center", alignItems:"center", justifyContent: "center", marginTop: "30px", marginRight: "20px"}}>
        <Stack spacing={4}>
         <Pagination count={query.data.contacts.length/6 || 1} page={page || 1} onChange={handlePageChange} />
        </Stack>
      </div>
      </div>
      </div>
    }
    </div>
  );
}

export default Contacts;
