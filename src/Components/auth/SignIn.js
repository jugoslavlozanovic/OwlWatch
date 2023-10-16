// Importing components and modules
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
// Importing styles
import "./styles.scss";

export default function SignIn() {
  // Creating hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Handles the sign in process for a user.
   * This function prevents the default form submission behavior and uses Firebase's
   * signInWithEmailAndPassword method to authenticate the user with the provided email and password.
   * If the authentication is successful, the userCredential object is logged to the console
   * along with a success message. If the authentication fails, the error object is logged to the console.
   * @param {Object} e - The event object.
   */
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        console.log("successfully logged-in");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Returns sign in component
  return (
    <div className="sign-in">
      <form onSubmit={signIn} className="form-container">
        <h1>Login</h1>
        <input
          className="input-group"
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        <input
          className="input-group"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
