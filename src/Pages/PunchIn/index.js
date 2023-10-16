import Header from "../../Components/Header";
import React from "react";
import Timer from '../../Components/Timer';

export default function PunchInPage({handleReset, handleStartStop, time, isPunchedIn, setIsPunchedIn, setTime}) {
    return (
      <div>
        <Header title="Time Logger" />
        <Timer
          handleReset={handleReset}
          handleStartStop={handleStartStop}
          time={time}
          isPunchedIn={isPunchedIn}
          setIsPunchedIn={setIsPunchedIn}
          setTime={setTime}
        />
      </div>
    );
}