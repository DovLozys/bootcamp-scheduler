import React from "react";
import "./Navbar.css";
import menuicon from "./menu-icon.png";
import defaultuser from "./default-user.png";
import logo from "./final-logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="nav-bar">
        <Link to="/host-event">
          <img src={menuicon} alt="menu-icon" className="menu-icon" />
        </Link>

        <Link to="/">
          <div className="logo-container">
            <img src={logo} alt="final-logo" className="logo" />
          </div>
        </Link>
        <Link to="/profile">
          <img src={defaultuser} alt="default-user" className="default-user" />
        </Link>
      </nav>
    </div>
  );
}
