import axios from "axios";

const instance = axios.create({
  baseURL: "https://337a-197-243-118-202.ngrok-free.app/auth",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
