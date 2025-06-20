import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

let TOKEN = null;

const persistRoot = localStorage.getItem("persist:root");
if (persistRoot) {
  try {
    const user = JSON.parse(JSON.parse(persistRoot).user);
    TOKEN = user?.currentUser?.accessToken || null;
  } catch (err) {
    console.error("Failed to parse token:", err);
  }
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});