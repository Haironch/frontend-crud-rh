import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-crud-rh.onrender.com/api",
});

export default api;
