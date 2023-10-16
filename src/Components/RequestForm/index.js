// Importing components and modules
import React, { useState } from "react";
import * as database from "../../database";

// Importing styles
import "./main.scss";

export default function RequestForm({
  validation,
  setValidation,
  setAlertClass,
  setMessage,
}) {
  // Creating hooks
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [comments, setComments] = useState("");

  // Create a new Date object to get the current date and time
  var today = new Date();

  // Extract the date from the current date object and format it in the YYYY-MM-DD format
  var date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");

  // Extract the time from the current date object and format it in the HH:MM:SS format
  var nowTime =
    today.getHours().toString().padStart(2, "0") +
    ":" +
    today.getMinutes().toString().padStart(2, "0") +
    ":" +
    today.getSeconds().toString().padStart(2, "0");

  const submitRequestForm = (event) => {
    event.preventDefault();

    // Validates no empty fields
    if (dateFrom === "" || dateTo === "" || comments === "") {
      setValidation(true);
      return;
    }

    // Change states based on validation
    setValidation(false);
    setDateFrom("");
    setDateTo("");
    setComments("");
    setMessage("Your request has been submitted!");
    setAlertClass("visible");

    // Show an alert message for 5 seconds
    setTimeout(() => {
      setAlertClass("hidden");
    }, 5000);

    // Call the submitRequest function from the 'database' object and pass in the values for dateFrom, dateTo, comments, date, and nowTime as arguments. This function submits a new request to the database with the given information.
    database.submitRequest(dateFrom, dateTo, comments, date, nowTime);
  };

  // Returns RequestForm component
  return (
    <div className="requestFormContainer">
      <div className="formRequestHeader">
        <p>Leave Request</p>
      </div>
      <form className="requestForm" onSubmit={submitRequestForm}>
        <div className="dateContainer">
          <label htmlFor="dateFrom">From </label>
          <input
            type="date"
            id="dateFrom"
            min={date}
            value={dateFrom}
            onChange={(event) => {
              setDateFrom(event.target.value);
            }}
          ></input>
          <label htmlFor="dateTo"> to </label>
          <input
            type="date"
            id="dateTo"
            min={dateFrom || date}
            value={dateTo}
            onChange={(event) => {
              setDateTo(event.target.value);
            }}
          ></input>
        </div>
        <label htmlFor="comments">Comments:</label>
        <textarea
          id="comments"
          value={comments}
          onChange={(event) => {
            setComments(event.target.value);
          }}
        ></textarea>
        {validation && (
          <p className="validation">Please fill in all the fields!</p>
        )}
        <button>Submit</button>
      </form>
    </div>
  );
}
