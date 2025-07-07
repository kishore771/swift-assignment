import React from "react";
import "./Header.css";

const Header = ({ user, onProfileClick }) => {
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "NA";

  return (
    <header className="custom-header">
      <div className="left-section logo-container">
        <img
          src="https://i.postimg.cc/ht2gf2Kr/63c80d6f415bdfb57509f56e-5fc7ad2ded1767b08813a7b5-logo-1.png"
          alt="SWIFT Logo"
          className="logo"
        />
        <p className="logo-text">WIFT</p>
      </div>
      <div className="right-section">
        <div className="user-initials">{initials}</div>
        <span className="nav-user-name" onClick={onProfileClick}>
          {user?.name || "User"}
        </span>
      </div>
    </header>
  );
};

export default Header;
