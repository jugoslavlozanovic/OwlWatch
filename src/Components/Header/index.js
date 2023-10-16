// Importing components and modules
import React from "react";

// Importing styles
import "./main.scss";

// Header function that receives parameter
export default function Header({ title }) {
  return (
    <div className="headerContainer">
      <h1>{title}</h1>
    </div>
  );
}
