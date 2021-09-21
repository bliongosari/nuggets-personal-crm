import api from "../../config/axiosConfig"
import Cookies from "js-cookie";

export const getContacts = async () => {
  const { data } = await api.get("/api/contacts/all");
  return data;
}

export const addContact = async (contact) => {
  await api({
    method: "POST",
    url: "/api/contacts/add",
    data: contact,
    headers: { "X-ACCESS-TOKEN": Cookies.get("token") },
  });
}
