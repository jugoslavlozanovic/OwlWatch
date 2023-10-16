import Header from "../../Components/Header";
import React from "react";
import { Outlet, NavLink } from 'react-router-dom';
import './main.scss';

export default function RequestPage() {
  return (
    <div className="formPageContainer">
      <Header title="Request" />
      <nav className="requestMenu">
        <NavLink to="" end>Leave Request</NavLink>
        <NavLink to="/home/request/history">Request History</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
