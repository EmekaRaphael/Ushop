// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

// export const publicRequest = axios.create({
//     baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         token: `Bearer ${TOKEN}`,
//     },
// });


// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/";
// // const TOKEN = localStorage.getItem("jwtToken");
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

// export const publicRequest = axios.create({
//     baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         token: `Bearer ${TOKEN}`,
//     },
// });


// import axios from "axios";

// // Set base URL for API
// const BASE_URL = "http://localhost:5000/api/";

// // You can dynamically retrieve the token, for example from localStorage
// const TOKEN = localStorage.getItem("jwtToken"); // Retrieve token from localStorage or Redux store

// // Public request instance (for public endpoints)
// export const publicRequest = axios.create({
//     baseURL: BASE_URL,
// });

// // User request instance (for authenticated endpoints)
// export const userRequest = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         Authorization: `Bearer ${TOKEN}`, // Include the token in the Authorization header
//     },
// });



// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/"
// const TOKEN = 
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDI0MGM3OTExOTBiYzAzZDJhMjE2OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0OTgyNzk4NiwiZXhwIjoxNzUwMDg3MTg2fQ.r6-A-6V8eemQr5XyQqaHWwUreh8yRgCuMaTTTzXuaP4"

// export const publicRequest = axios.create({
//     baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//     baseURL: BASE_URL,
//     header: {
//         token: `Bearer ${TOKEN}`
//     },
// });


import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

let TOKEN = "";
try {
  const root = JSON.parse(localStorage.getItem("persist:root"));
  const user = root?.user && JSON.parse(root.user);
  TOKEN = user?.currentUser?.accessToken || "";
} catch (err) {
  console.warn("Unable to retrieve token from localStorage", err);
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
