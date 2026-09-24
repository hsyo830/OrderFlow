import axios from "axios";

export const client = axios.create({
  timeout: 5000,
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
