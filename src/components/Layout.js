import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="layout">
      <div className="sidebar">
        {loggedIn ? (
          <div className="login-info">
            <p>Welcome, {username}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="login-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
        <h2>Menu</h2>
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/activity-forecast" activeClassName="active">
              Schedule Activities
            </NavLink>
          </li>
          <li>
            <NavLink to="/schedule-reconciliation" activeClassName="active">
              Schedule Reconciliation
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="main">{children}</div>
    </div>
  );
};

export default Layout;
