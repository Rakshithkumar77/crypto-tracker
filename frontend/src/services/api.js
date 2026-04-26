import axios from "axios";

const api = axios.create({
  baseURL: "http://3.110.60.247:5000/api",
});

export default api;