// Importing components and modules
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import * as database from "../../database";

// Importing styles
import "./styles.scss";

export default function SignUp() {
  // Creating hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  /**
   * Handles the sign-up process for a user.
   * This function prevents the default form submission behavior and uses Firebase's
   * createUserWithEmailAndPassword method to create an account with the provided email and password.
   * If the account creation is successful, the userCredential object is logged to the console along with
   * a success message. The function then uses the Firebase Realtime Database to save the user's first name,
   * last name, and uid under the "users" node.   *
   * @param {Object} e - The event object.
   */
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        console.log(userCredential);
        const uid = userCredential.user.uid;
        console.log("Sucessfully created an account");

        database.save(firstName, lastName, uid);
      }
    );
  };

  // Returns sign up component
  return (
    <div className="sign-in">
      <form onSubmit={signUp} className="form-container">
        <h1>Create your account</h1>
        <input
          className="input-group"
          type="text"
          placeholder="Enter your First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <br />
        <input
          className="input-group"
          type="text"
          placeholder="Enter your Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>
        <br />
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
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
