import React, {useState} from "react";
import { useMutation, useQueryClient } from "react-query";
import "./AddContact.css";
import { addContact } from "./contactsAPI";
import api from "../../config/axiosConfig";
import DatePicker from "react-datepicker";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import "react-datepicker/dist/react-datepicker.css";
import Icon from '@mui/material/Icon';
import DeleteIcon from '@mui/icons-material/Delete';
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

const tagsQueried = [
  { name: 'Friends', color: "red"},
  { name: 'Colleagues', color: "blue"},
  { name: 'Family', color: "green"},
  { name: 'Childhood', color: "purple"},
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


function AddContact() {
  const classes = useStyles();
  const addContact = async (contact) => {
    if (full_name === "") {
      alert("Full name cannot be empty")
    }
    else {
    api({
      method: "POST",
      url: "/api/contacts/add",
      data: contact,
    })
      .then(function (res) {
        if (res.status === 200) {
          window.location.replace("../contacts");
          setMessage("");
        } else {
          setMessage(res.data.message);
        }
      })
      .catch(function (error) {
        setMessage("Error in adding contact")
      });
    }
  };

  const [message, setMessage] = useState("")
  const [full_name, setFullName] = useState("");
  const [image, setImage] = useState("");
  const [preferred_name, setPrefName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [relationship, setRelationship] = useState("");
  const [meeting_notes, setHowWeMet] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [linkedin, setLinkedIn] = useState("");
  const [twitter, setTwitter] = useState("");
  const [imageName, setImageName] = useState("");
  const [tags, setTags] = useState([]);

  const handleBirthdayChange = (date) => {
    setBirthday(date.target.value);
  }

  const handleImageChange = (image) => {
    if (image && image[0]) {
      let img = image[0];
      setImage(URL.createObjectURL(img));
    }
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const renderTags = (tags) => {
    let result = ""
    for (var i=0; i< tags.length; i++) {
      if (i !== 0){
        result += ", " + tags[i].name 
      }
      else {
        result += tags[i].name
      }
    }
    return result;
  }

  return (
    <div className="home">
      <div className="pagetitle">
        <h1>Add a new contact</h1>
      </div>
      

      {/* Form */}
      <div className="contacts-details-form">
      <h4 style = {{color: "red"}}>{message}</h4>
        <div className="formtitle">
          <h1>Personal Details</h1>
          <hr></hr>
        </div>

        <div className="profpic" style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <label style = {{color: "#114084", fontFamily: "AbeeZee"}}> Profile Pic</label>
          {image === "" ? <img style = {{width: "100px", height: "100px"}} alt="plus" src="../../person-blue.svg"></img> : <img style = {{width: "125px", height: "125px", objectFit: "cover", borderRadius: "50%"}}alt="second" src={image}></img> } 
        </div>

        <div className="attachimage" style = {{display: "flex", flex:"flex-wrap", width: "40%", margin: "0 auto", alignItems: "center"}}>
          {/* <button className="attachhbtn"> */}
            <input style = {{margin: "0 auto", display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center"}} type="file" name="myImage" accept="image/*" placeholder = "Attach Image" onChange={ (e) => handleImageChange(e.target.files)}/>
            <button className = "trashImage" onClick = {()=> setImage("")}>
            <DeleteIcon style = {{color:"#114084"}}/>
            </button>
          {/* </button> */}
        </div>

        <div className="details">
          <h2>Full Name:</h2>
          <input type="text" name = "fullname" onChange={(e) => setFullName(e.target.value)} />
        </div>

        <div className="details">
          <h2>Preferred Name:</h2>
          <input type="text" onChange={(e) => setPrefName(e.target.value)} />
        </div>

        <div className="detail2">
          <h2>Birthday:</h2>
          <div className="detailssinput">
          <input
            value={birthday}
            onChange={handleBirthdayChange}
            required={true}
            name="birthday"
            type="date"
          />
          </div>
        </div>

        <div className="details">
          <h2>Relationship</h2>
          <input type="text" onChange={(e) => setRelationship(e.target.value)} />
        </div>

        <div className="detail2">
          <h2>Tags:</h2>
          <FormControl 
          className={classes.root}
          variant ="outlined"style={{width: "100%", maxHeight: "30px", borderColor: "#114084", marginLeft: "0", marginRight: "0", color: "#114084"}}>
        <Select
          displayEmpty
          multiple
          value={tags}
          onChange={handleChange}
          style = {{height: "30px", border: "none", fontSize: "12px", color: "#114084"}}
          renderValue={(selected) => renderTags(selected)}
          MenuProps={MenuProps}
        >
          {tagsQueried.map((name) => (
            <MenuItem key={name} value={name} style = {{height: "30px", paddingLeft: "5px", color: "#114084"}}>
              <Checkbox style ={{color:"#114084"}} checked={tags.indexOf(name) > -1} />
              <Icon style ={{fontSize: "13px", color: name.color, marginRight: "5px"}}>circle </Icon>
              <ListItemText style ={{color:"#114084"}} primary={ name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

          
        </div>

        <div className="details">
          <h2>How we met:</h2>
          <input type="text" onChange={(e) => setHowWeMet(e.target.value)} />
        </div>

        <div className="details">
          <h2>Description:</h2>
          <input type="text" onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="details">
          <h2>Email Address:</h2>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="details">
          <h2>Phone Number:</h2>
          <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>

        <div className="details">
          <h2>LinkedIn:</h2>
          <input type="text" onChange={(e) => setLinkedIn(e.target.value)} />
        </div>

        <div className="details">
          <h2>Tweeter:</h2>
          <input type="text" onChange={(e) => setTwitter(e.target.value)} />
        </div>

        <div className="addcontacts">
          <button className="addcbtn" id = "addContactBtn" onClick={(e) => {
            addContact({
              full_name,
              preferred_name,
              birthday,
              relationship,
              tags,
              meeting_notes,
              description,
              email,
              phone_number,
              linkedin,
              twitter,
            });
          }}
          >
            <h1>Add Contact</h1>
          </button>
        </div>

        <div className="addcontacts">
          <button className="addcbtn">
            <h1>Cancel</h1>
          </button>
        </div>
      </div>

    </div>
  );
}

export default AddContact;
