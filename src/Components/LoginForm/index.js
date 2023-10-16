// Importing components and modules
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

// Importing styles
import "./main.scss";

export default function LoginForm({
  timerCheck,
  setTime,
  setIsPunchedIn,
  setAlertClass,
  setMessage,
}) {
  // Initialize the useNavigate method and store it in a variable
  const navigate = useNavigate();
  // Creating hooks.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   *Sign in function that authenticates the user using Firebase's signInWithEmailAndPassword method,
   *navigates the user to the home page upon successful authentication, and checks the user's punch status.
   *@param {object} e - The event object.
   *@returns {void}
   */
  const signIn = (e) => {
    e.preventDefault();
    // Use Firebase's signInWithEmailAndPassword method to authenticate the user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        console.log("successfully logged-in");

        // Navigate to the home page
        navigate("/home");

        // Store the user ID in local storage
        localStorage.setItem("myUserId", userCredential.user.uid);

        // Check the user's current punch status using the timerCheck function
        timerCheck().then((result) => {
          if (result === 0) {
            setIsPunchedIn(false);
            setTime({
              hours: 0,
              minutes: 0,
              seconds: 0,
            });
          }
          // If the user is currently punched in, calculate and set the time since their last punch
          else if (result.timeOut === "Pending") {
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
      })
      // Handle any authentication errors that occur
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setMessage("User not found");
        } else if (error.code === "auth/wrong-password") {
          setMessage("Wrong password");
        }
        // Show an alert message for 5 seconds
        setAlertClass("visible");
        setTimeout(() => {
          setAlertClass("hidden");
        }, 5000);
      });
  };

  // Returns Login Form Component
  return (
    <>
      <form onSubmit={signIn} className="loginForm">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
}
