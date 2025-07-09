import React from "react";
import "./topbar.css";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import Language from "@mui/icons-material/Language";
import Settings from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";
import { useHistory } from "react-router-dom";

export default function Topbar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/login"); // redirect to login page
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Ushop Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div
            className="topbarIconContainer"
            onClick={handleLogout}
            title="Logout"
            style={{ cursor: "pointer" }}
          >
            <LogoutIcon />
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}