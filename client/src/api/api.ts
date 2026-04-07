import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export { apiClient };
