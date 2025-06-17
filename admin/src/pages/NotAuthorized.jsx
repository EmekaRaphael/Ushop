import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux"; 
import { useHistory } from "react-router-dom";

const NotAuthorized = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {

    dispatch(logout());
    localStorage.removeItem("persist:root");
    localStorage.removeItem("jwtToken");


    const timeout = setTimeout(() => {
      history.push("/login");
    }, 20000);

    return () => clearTimeout(timeout);
  }, [dispatch, history]);

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1 style={{ fontSize: "2rem", color: "#d32f2f" }}>Not Authorized ⛔</h1>
      <p>You will be redirected to the login page shortly...</p>
      <p>If the redirect does not happen, <strong>click the button below</strong>:</p>
      <button
        onClick={() => history.push("/login")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        Go to Login
      </button>
    </div>
  );
};

export default NotAuthorized;


// import React from "react";
// import { Link } from "react-router-dom";

// const NotAuthorized = () => {
//   return (
//     <div style={{
//       height: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       flexDirection: "column",
//       textAlign: "center"
//     }}>
//       <h1>403 - Not Authorized ⛔</h1>
//       <p>You do not have permission to access this page.</p>
//       <Link to="/login" style={{ marginTop: "20px", color: "#1976d2", textDecoration: "underline" }}>
//         Go to Login
//       </Link>
//     </div>
//   );
// };

// export default NotAuthorized;
