import axios from "axios";

const base = process.env.REACT_APP_API_URL ?? "http://localhost:5000/api";

const api = axios.create({
  baseURL: base,
  timeout: 7000,
});

export default api;
