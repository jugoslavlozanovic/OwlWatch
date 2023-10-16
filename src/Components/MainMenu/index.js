// Importing components and modules
import React from "react";
import { CiTimer } from "react-icons/ci";
import { BsClockHistory } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";
import { NavLink } from "react-router-dom";

// Importing styles
import "./main.scss";

// Returns MainMenu Component
export default function MainMenu() {
  return (
    <nav className="mainMenu">
      <NavLink to="" end>
        <span>
          <CiTimer />
        </span>
        <p>Time Logger</p>
      </NavLink>
      <NavLink to="/home/log-history">
        <span>
          <BsClockHistory />
        </span>
        <p>Log History</p>
      </NavLink>
      <NavLink to="/home/request">
        <span>
          <FiHelpCircle />
        </span>
        <p>Request</p>
      </NavLink>
    </nav>
  );
}
