import api from "../../config/axiosConfig"
import Cookies from "js-cookie";

export const getContacts = async () => {
  const { data } = await api({
    method: "GET",
    url: "/api/contacts/all",
  })
  return data;
}

export const addContact = async (contact) => {
  await api.post("/api/contacts/add", contact);
}
