import "./App.scss";
import React, { useState, useEffect } from "react";
import LoginPage from "./Pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import MainScreen from "./Pages/MainScreen";
import PunchInPage from "./Pages/PunchIn";
import LogHistoryPage from "./Pages/LogHistory";
import RequestPage from "./Pages/Request";
import LeaveRequest from "./Pages/Request/LeaveRequest";
import RequestHistory from "./Pages/Request/RequestHistory";
import NotFoundPage from "./Pages/NotFound";
import Alert from "./Components/Alert";
import * as database from "./database";

function App() {
  // State to keep track of current time
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // const [isMounted, setIsMounted] = useState(true);
  // State to keep track of whether user is currently punched in or not
  const [isPunchedIn, setIsPunchedIn] = useState(false);

  // State to keep track of the time the user punched in
  // eslint-disable-next-line
  const [currentTime, setCurrentTime] = useState(0);

  // State to keep track of whether user has entered valid input in LeaveRequest component
  const [validation, setValidation] = useState(false);
  const [alertClass, setAlertClass] = useState("");
  const [message, setMessage] = useState("");

  // Get the current date and time when the component mounts
  var today = new Date();
  var date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");

  var nowTime =
    today.getHours().toString().padStart(2, "0") +
    ":" +
    today.getMinutes().toString().padStart(2, "0") +
    ":" +
    today.getSeconds().toString().padStart(2, "0");
  // eslint-disable-next-line
  useEffect(() => {
    if (localStorage.getItem("myUserId")) {
      database.timerCheck().then((result) => {
        if (result === 0) {
          setIsPunchedIn(false);
          setTime({
            hours: 0,
            minutes: 0,
            seconds: 0,
          });
        } else if (result.timeOut === "Pending") {
          const dbTime = new Date(result.date + "T" + result.timeIn);

          const now = new Date();
          const diffInMilliseconds = now.getTime() - dbTime.getTime();

          const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
          const hours = Math.floor(diffInSeconds / 3600);
          const minutes = Math.floor((diffInSeconds % 3600) / 60);
          const seconds = diffInSeconds % 60;

          setTime({
            hours: hours,
            minutes: minutes,
            seconds: seconds,
          });
          setIsPunchedIn(true);
        }
      });
    } else {
      setTime({
        hours: 0,
        minutes: 0,
        seconds: 0,
      });

      setIsPunchedIn(false);
    }
  }, []);

  useEffect(() => {
    // This useEffect hook runs when isPunchedIn or time state changes

    let interval = null;

    // If user is currently punched in, start a setInterval to update the time every second
    if (isPunchedIn) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = { ...prevTime };
          newTime.seconds++;
          if (newTime.seconds === 60) {
            newTime.seconds = 0;
            newTime.minutes++;
          }
          if (newTime.minutes === 60) {
            newTime.minutes = 0;
            newTime.hours++;
          }
          return newTime;
        });
      }, 1000);

      // If user is not punched in and the seconds on the time state is not 0, clear the setInterval
    } else if (!isPunchedIn && time.seconds !== 0) {
      clearInterval(interval);
    }

    // Return a cleanup function to clear the setInterval
    return () => clearInterval(interval);
  }, [isPunchedIn, time]);

  // Store time in local storage

  // if (isMounted) {
  //     setTime({
  //       hours: Number(localStorage.getItem("hours")),
  //       minutes: Number(localStorage.getItem("minutes")),
  //       seconds: Number(localStorage.getItem("seconds")),
  //     });
  //     setIsPunchedIn(true);
  //     setIsMounted(false);
  //   }
  // } else {
  //   localStorage.setItem("hours", JSON.stringify(time.hours));
  //   localStorage.setItem("minutes", JSON.stringify(time.minutes));
  //   localStorage.setItem("seconds", JSON.stringify(time.seconds));
  // }

  const handleStartStop = () => {
    var newDate = new Date();
    var newTime =
      newDate.getHours().toString().padStart(2, "0") +
      ":" +
      newDate.getMinutes().toString().padStart(2, "0") +
      ":" +
      newDate.getSeconds().toString().padStart(2, "0");

    database.punchIn(date, newTime);

    // setCurrentTime(newTime);
    setIsPunchedIn(true);

    setMessage("You have punched in!");
    setAlertClass("visible");

    setTimeout(() => {
      setAlertClass("hidden");
    }, 3000);
  };

  const handleReset = () => {
    database.punchOut(nowTime);
    setIsPunchedIn(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setCurrentTime("");
    setMessage("You have punched out!");
    setAlertClass("visible");

    setTimeout(() => {
      setAlertClass("hidden");
    }, 3000);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              timerCheck={database.timerCheck}
              setTime={setTime}
              time={nowTime}
              setIsPunchedIn={setIsPunchedIn}
              setAlertClass={setAlertClass}
              setMessage={setMessage}
            />
          }
        />
        <Route path="/home" element={<MainScreen isPunchedIn={isPunchedIn} />}>
          <Route
            path=""
            element={
              <PunchInPage
                handleReset={handleReset}
                handleStartStop={handleStartStop}
                time={time}
                isPunchedIn={isPunchedIn}
                setIsPunchedIn={setIsPunchedIn}
                setTime={setTime}
              />
            }
          />
          <Route path="log-history" element={<LogHistoryPage />} />
          <Route path="request" element={<RequestPage />}>
            <Route
              path=""
              element={
                <LeaveRequest
                  setValidation={setValidation}
                  validation={validation}
                  date={date}
                  setAlertClass={setAlertClass}
                  setMessage={setMessage}
                />
              }
            />
            <Route path="history" element={<RequestHistory />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Alert message={message} alertClass={alertClass} />
    </div>
  );
}

export default App;
