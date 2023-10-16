import React from "react";
import logo from "../../Assets/logo_white.png";
import LoginForm from '../../Components/LoginForm';
import "./main.scss";

function LoginPage({ timerCheck, setTime, time, setIsPunchedIn, setAlertClass, setMessage }) {
  return (
    <div className="loginContainer">
      <div className="logoContainer">
        <img src={logo} alt="Owl Watch Logo"></img>
        <p>Owl Watch</p>
      </div>
      <div className="formContainer">
        <h1>LOGIN</h1>
        <LoginForm
          timerCheck={timerCheck}
          setTime={setTime}
          time={time}
          setIsPunchedIn={setIsPunchedIn}
          setAlertClass={setAlertClass}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
}

export default LoginPage;