// Importing components and modules
import React from "react";
// Importing styles
import "./main.scss";

// Alert function that receives parameters
export default function Alert({ alertClass, message }) {
  return (
    <div className={"alert " + alertClass}>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
}
