import axios from "axios";
import Cookies from "js-cookie";

var axiosURL = "";

if (window.location.href.includes("localhost")) {
  axiosURL = "http://localhost:8080";
} else {
  axiosURL = "https://nuggets-personal-crm.scm.azurewebsites.net";
}

const api = axios.create({
  baseURL: axiosURL,
});

export default api;
