// src/api/axios.ts
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5224/api/v1";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token from localStorage by default (but we will read from auth context)
// keep fallback here for quick scripts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
