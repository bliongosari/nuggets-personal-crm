import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = (
  window.location.href.includes("localhost")
  ? "http://localhost:8080"
  : "https://nuggets-personal-crm.azurewebsites.net"
);
axios.defaults.headers.common = { "X-ACCESS-TOKEN": Cookies.get("token") };

export default axios;