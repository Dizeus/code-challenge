import axios from "axios";

const api = axios.create({
  baseURL: "https://interview.switcheo.com/",
});

export default api;
