import React, {useState} from "react";
import { useMutation, useQueryClient } from "react-query";
import { addContact, editContact } from "./contactsAPI";
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
import "./AddContact.css";
import { useHistory } from "react-router-dom";
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


function EditContact(props) {
  const classes = useStyles();
  const { contact } = props.location.state;
  const [full_name, setFullName] = useState(contact.full_name);
  const [image, setImage] = useState("");
  const [preferred_name, setPrefName] = useState(contact.preferred_name);
  const [birthday, setBirthday] = useState(contact.birthday);
  const [relationship, setRelationship] = useState(contact.relationship);
  const [meeting_notes, setHowWeMet] = useState(contact.meeting_notes);
  const [description, setDescription] = useState(contact.description);
  const [email, setEmail] = useState(contact.email);
  const [phone_number, setPhoneNumber] = useState(contact.phone_number);
  const [linkedin, setLinkedIn] = useState(contact.linkedin);
  const [twitter, setTwitter] = useState(contact.twitter);
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const handleBirthdayChange = (date) => {
    setBirthday(date.target.value);
  }

  const handleImageChange = (image) => {
    setImage(image)
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log(tags);
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
        <h1>Edit existing contact</h1>
      </div>

      {/* Form */}
      <div className="contacts-details-form">
        <div className="formtitle">
          <h1>Personal Details</h1>
          <hr></hr>
        </div>

        <div className="profpic">
          <img alt="plus" src="../../person-blue.svg"></img>
        </div>

        <div className="attachimage">
          <button className="attachhbtn">
            <input type="file" name="myImage" accept="image/*" placeholder = "Attach Image" onChange={ (e) => handleImageChange(e.target.files)}/>
          </button>
        </div>

        <div className="details">
          <h2>Full Name:</h2>
          <input type="text" name = "fullname" value={full_name} onChange={(e) => setFullName(e.target.value)} />
        </div>

        <div className="details">
          <h2>Preferred Name:</h2>
          <input type="text" value={preferred_name} onChange={(e) => setPrefName(e.target.value)} />
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
          <input type="text" value={relationship} onChange={(e) => setRelationship(e.target.value)} />
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
          <input type="text" value={meeting_notes} onChange={(e) => setHowWeMet(e.target.value)} />
        </div>

        <div className="details">
          <h2>Description:</h2>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="details">
          <h2>Email Address:</h2>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="details">
          <h2>Phone Number:</h2>
          <input type="text" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>

        <div className="details">
          <h2>LinkedIn:</h2>
          <input type="text" value={linkedin} onChange={(e) => setLinkedIn(e.target.value)} />
        </div>

        <div className="details">
          <h2>Tweeter:</h2>
          <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
        </div>

        <div className="addcontacts">
          <button className="addcbtn" id = "editSubmitBtn" onClick={(e) => {
            editContact({
              ...contact,
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
            <h1>Save Changes</h1>
          </button>
        </div>

        <div className="addcontacts">
          <button className="addcbtn" onClick={() => history.push(`/contact/${contact.full_name}/${contact._id}`)}>
            <h1>Cancel</h1>
          </button>
        </div>
      </div>

    </div>
  );
}

export default EditContact;
