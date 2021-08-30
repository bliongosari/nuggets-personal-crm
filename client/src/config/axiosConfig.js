import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = (
  window.location.href.includes("localhost")
  ? "http://localhost:8080"
  : "http://nuggets-personal-crm.azurewebsites.net"
);

export default axios;
