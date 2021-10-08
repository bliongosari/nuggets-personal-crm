import api from "../../config/axiosConfig"
import Cookies from "js-cookie";

export const getContacts = async () => {
  const { data } = await api.get("/api/contacts/all");
  return data;
};

// TODO: refactor to use this api function
export const addContact = async (contact) => {
  await api({
    method: "POST",
    url: "/api/contacts/add",
    data: contact,
    headers: { "X-ACCESS-TOKEN": Cookies.get("token") },
  });
};

export const deleteContact = async (contact) => {
  await api.delete(`/api/contacts/delete/${contact._id}`);
  // TODO: Account for contact deletion failure
  window.location.replace("../contacts");
};

export const editContact = async (contact, reload) => {
  await api.put(`/api/contacts/edit/${contact._id}`, contact);
  // TODO: Account for contact edit failure
  reload ? window.location.reload() : window.location.replace("../contacts");
};
