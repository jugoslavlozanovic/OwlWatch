// Importing components and modules
import React from "react";
import { RiTimerLine } from "react-icons/ri";

// Importing styles
import "./main.scss";

// Function component with props passed in. It exports a Timer component that can be used to display a timer and handle timing functionality.
export default function Timer({
  time,
  isPunchedIn,
  handleReset,
  handleStartStop,
  setIsPunchedIn,
  setTime,
}) {
  // Returns Timer Component
  return (
    <div className="timerContainer">
      <div className="timeHolder">
        <span>
          <RiTimerLine />
        </span>
        <h1>{`${time.hours.toString().padStart(2, "0")}:${time.minutes
          .toString()
          .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}</h1>
      </div>

      <div>
        {!isPunchedIn && (
          <div className="punchInBtn" onClick={handleStartStop}>
            <p>Punch In</p>
          </div>
        )}
        {isPunchedIn && (
          <div className="punchOutBtn" onClick={handleReset}>
            <p>Punch Out</p>
          </div>
        )}
      </div>
    </div>
  );
}
