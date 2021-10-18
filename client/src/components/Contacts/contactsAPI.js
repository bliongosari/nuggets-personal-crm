import api from "../../config/axiosConfig"
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

export const getContacts = async () => {
  const { data } = await api.get("/api/contacts/all");
  return data;
};

// TODO: refactor to use this api function
export const addContact = async (contact) => {
  try {
    await api({
      method: "POST",
      url: "/api/contacts/add",
      data: contact,
      headers: { "X-ACCESS-TOKEN": Cookies.get("token") },
    });
    return true;
  } catch (err) {
    return false;
  }

};

export const deleteContact = async (contact) => {
  try {
  await api.delete(`/api/contacts/delete/${contact._id}`);
  // TODO: Account for contact deletion failure
  window.location.replace("../../contacts");
  return true;
  } catch (err) {
    return false;
  }
};

export const editContact = async (contact, reload) => {
  try {
  await api.put(`/api/contacts/edit/${contact._id}`, contact);
  // TODO: Account for contact edit failure
  // TODO: Reloading to contacts is necessary to avoid state loss?
  // window.location.replace("../../contacts");
  //window.location.replace(`/contact/${contact.full_name}/${contact._id}`);
  return true;
  } catch (err) {
    return false;
  }
};
