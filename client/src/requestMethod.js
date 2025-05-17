import axios from "axios";

// Set base URL for API
const BASE_URL = "http://localhost:5000/api/";

// You can dynamically retrieve the token, for example from localStorage
const TOKEN = localStorage.getItem("jwtToken"); // Retrieve token from localStorage or Redux store

// Public request instance (for public endpoints)
export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

// User request instance (for authenticated endpoints)
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`, // Include the token in the Authorization header
    },
});



// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/"
// const TOKEN = 
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NmEzZDRjMDIxM2ZiYTJkZDEyOWZmZiIsImlhdCI6MTc0MjMxMTIyNiwiZXhwIjoxNzUwMDg3MjI2fQ.SZ4ExgHfXSpoQaB3Z5ipITU0J1pZhPTTA5Pmsa9SeQ0"

// export const publicRequest = axios.create({
//     baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//     baseURL: BASE_URL,
//     header: {
//         token: `Bearer ${TOKEN}`
//     },
// });