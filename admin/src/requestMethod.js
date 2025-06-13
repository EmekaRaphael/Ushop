// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token;

// export const publicRequest = axios.create({
//     baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         Authorization: `Bearer ${TOKEN}`,
//     },
// });

import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

// Safely get token from localStorage
const getToken = () => {
  try {
    const persistRoot = localStorage.getItem("persist:root");
    if (!persistRoot) return null;
    
    const userState = JSON.parse(persistRoot).user;
    if (!userState) return null;
    
    const currentUser = JSON.parse(userState).currentUser;
    return currentUser?.token || null;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

// Add request interceptor to attach token dynamically
userRequest.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);