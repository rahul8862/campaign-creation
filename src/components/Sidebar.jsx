import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaListAlt, FaCog } from "react-icons/fa";

export default function Sidebar() {
  const loc = useLocation();
  return (
    <aside className="sidebar" aria-label="Sidebar">
      <div className="logo">RK</div>

      <Link to="/" title="Landing">
        <div
          className={`nav-btn ${loc.pathname === "/" ? "active" : ""}`}
          aria-hidden
        >
          <FaHome />
        </div>
      </Link>

      <Link to="/campaigns" title="Campaigns">
        <div
          className={`nav-btn ${
            loc.pathname.startsWith("/campaigns") ? "active" : ""
          }`}
          aria-hidden
        >
          <FaListAlt />
        </div>
      </Link>

      <Link to="/settings" title="Settings">
        <div className="nav-btn" aria-hidden>
          <FaCog />
        </div>
      </Link>

      <div style={{ flex: 1 }}></div>

      <div style={{ fontSize: 12, color: "#cbd5e1" }}>Rahul</div>
    </aside>
  );
}
