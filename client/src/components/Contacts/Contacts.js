import React, { useEffect, useState } from "react";
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
import { BlockLoading } from "react-loadingg";
import Icon from '@mui/material/Icon';
import CircleIcon from '@mui/icons-material/Circle';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    // width: 200,
    // "& .MuiOutlinedInput-input": {
    //   color: "green"
    // },
    // "& .MuiInputLabel-root": {
    //   color: "green"
    // },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#114084"
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "#062d63"
    },
    "&:hover .MuiInputLabel-root": {
      color: "#062d63"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#062d63"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "#062d63"
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#062d63"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#062d63"
    }
  }
});


const Loading = () => <BlockLoading />;

// change when have tags from backend
const tagsQueried = [
  { name: "All", color: "#58427C"},
  { name: 'Friends', color: "red"},
  { name: 'Colleagues', color: "blue"},
  { name: 'Family', color: "green"},
  { name: 'Childhood', color: "purple"},
  { name: 'Gym', color: "#36454F"},
  { name: 'Sports', color: "darkgreen"},
  { name: 'Mutuals', color: "#DC143C"},
  { name: 'Fun', color: "#5D3954"},
  { name: 'School', color: "#A7D8DE"},
  { name: 'Neighbour', color: "pink"},
  { name: 'Bar', color: "#AD6F69"},
  { name: 'Others', color: "grey"},
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
  const classes = useStyles();
  const [tags, setTags] = useState([tagsQueried[0]]);
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState("")
  const [currentShow, setCurrentShow] = useState(0);
  const [searchedValue, setSearchedValue] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [isSearching, setIsSearching] = useState(false)
  const [temp, setTemp] = useState([]);
  const query = useQuery("contacts", getContacts, { staleTime: Infinity });
  useEffect(() => {
    if (query.isSuccess && !sorting) {
      query.data.contacts = filter(query.data.contacts, "Sort by: Date: New to Old")
    }
  });

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

  const filterData = (data) => {
    if (tags.some(tag => tag.name === "All")) {
      return data;
    }
    let arr = []
    for (let tag of tags) {
      arr.push(tag.name)
    }
    return data.filter(d => {
      return d.tags && d.tags.split(",").some(x => arr.includes(x));
    })
  }

  const renderTags = (tags) => {
    let result = "";
    let tags1 = tags.filter((tag) => tag.name !== "undefined" );
    for (var i=0; i< tags1.length; i++) {
      if (i !== 0) {
        result += ", " + tags1[i].name 
      }
      else {
        result += tags1[i].name
      }
    }
    // console.log(result);
    return result;
  }

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

  const filter = (data, key) =>  {
    setSorting(key);
    let filteredData = data;
    switch(key) {
      case "Sort by: Date: Old to New":
        filteredData = data.sort(
          (obj1, obj2) => new Date(obj1.createdOn) - new Date(obj2.createdOn)
        );
        return filteredData;

      case "Sort by: Date: New to Old":
        filteredData = data.sort(
          (obj1, obj2) => new Date(obj2.createdOn) - new Date(obj1.createdOn)
        );
        return filteredData;

      case "Sort by: Contact: Z-A":
        filteredData = data.sort(function(a, b) {
          var orderBool =a.full_name.toLowerCase() < b.full_name.toLowerCase();
          return orderBool ? 1 : -1;
        });
      return filteredData;

      case "Sort by: Contact: A-Z":
        filteredData = data.sort(function(a, b) {
          var orderBool = a.full_name.toLowerCase() > b.full_name.toLowerCase();
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

  const tagsToArray = (tags) => {
    let arr = tags.split(",");
    console.log(arr)
    let final = []
    for (let tag of tagsQueried){
      if (arr.includes(tag.name)){
        final.push(tag)
      }
    }
    console.log(final);
    return final;
  }

  const handleSortChange = (e) => {
    query.data.contacts = filter(query.data.contacts, e.target.value);
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
      
      <div className="addcontactsdiv">
        <Link to={{ pathname: `addcontact` }} style={{ textDecoration: 'none' }}>
          <button className="addnewbtn" id = "addnewBtn">
            <h1> &#65291; &nbsp; ADD NEW CONTACT</h1>
          </button>
        </Link>
      </div>
      
      <div className="contactssummary">
        <div className="summarytitle">
          <h1>{query.data.contacts ? query.data.contacts.length : 0} Contact{(query.data.contacts.length<1)||"s"}</h1>
        </div>
        <div className="sortbutton">
      <FormControl className={classes.root} style={{maxWidth: "95px", maxHeight: "30px", borderColor: "#114084", marginLeft: "0", marginRight: "0"}}>
        <Select
          displayEmpty
          multiple
          value={tags}
          onChange={handleChange}
          style = {{height: "30px", fontSize: "12px", color: "#114084"}}
          renderValue={(selected) => renderTags(selected)}
          MenuProps={MenuProps}
        >
          {tagsQueried.map((name) => (
            <MenuItem key={name} value={name} style = {{height: "30px", paddingLeft: "5px", color: "#114084"}}>
              <Checkbox style ={{color:"#114084"}} checked={tags.includes(name)} />
              <Icon style ={{fontSize: "13px", color: name.color, marginRight: "5px"}}>circle </Icon>
              <ListItemText style ={{color:"#114084"}} primary={name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.root} style={{marginLeft: "10px", maxWidth: "180px", maxHeight: "30px", borderColor: "#114084" }}>
          <Select
            renderValue={(selected) => selected}
            value={sorting}
            style = {{height: "30px" ,fontSize: "11px", color: "#114084"}}
            onChange={handleSortChange}
          >
            <MenuItem value={"Sort by: Date: New to Old"}>Sort by: Date: New to Old</MenuItem>
            <MenuItem value={"Sort by: Date: Old to New"}>Sort by: Date: Old to New</MenuItem>
            <MenuItem value={"Sort by: Contact: A-Z"}>Sort by: Contact: A-Z</MenuItem>
            <MenuItem value={"Sort by: Contact: Z-A"}>Sort by: Contact: Z-A</MenuItem>
          </Select>
      </FormControl>
      </div>

      </div>

      {/* Contacts Table */}

      <div className="current-contacts-headingss">
          {/* <h1>Avatar</h1> */}
          <h1>Contact</h1>
          <h1>Tags</h1>
          <h1>Date Added </h1>
      </div>

      <div className="current-contacts-table">
        
        {filterData(query.data.contacts).slice(currentShow,currentShow+6).map((contact, index) => (
          <Link key={contact._id} to={{ pathname: `contact/${contact.full_name}/${contact._id}` }} style={{ textDecoration: 'none' }}>
          <div>
            {index !== 0 && <hr className="line"></hr>}
            <div className="current-contacts-r">
                {/* <div>
                  <img alt="events" src="../../events.svg"></img>
                </div> */}
                <div className = "table-entry">
                <h2 className ="contact-name"> {contact.full_name} </h2>
                </div>
                <div className = "table-entryTags">
                  {contact.tags ? 
                  tagsToArray(contact.tags).map((d) => (
                    <div key={`${contact._id} ${d.name}`}>
                    <CircleIcon style = {{color: d.color, margin: "0 0.5vw", fontSize: "11px"}}/>
                     <span style = {{fontSize: "12px"}}>{d.name}</span> 
                     </div>
                  ))
                  
                  :  <span> { "-"}</span> }
                </div>
                <div className = "table-entry">

                <h2>{contact.createdOn.slice(0,10)}</h2>
                </div>
            </div>
          </div>
          </Link>
        ))}
      <div style = {{height: "50px", display: "flex", textAlign: "center", alignItems:"center", justifyContent: "center", marginTop: "30px", marginRight: "20px"}}>
        <Stack spacing={4}>
         <Pagination count={Math.ceil(query.data.contacts.length/6)|| 1} page={page || 1} onChange={handlePageChange} />
        </Stack>
      </div>
      </div>
      </div>
    }
    </div>
  );
}

export default Contacts;