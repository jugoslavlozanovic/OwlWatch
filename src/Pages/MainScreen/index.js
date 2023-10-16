import React, { useState, useEffect } from "react";
import MainMenu from "../../Components/MainMenu";
import logo from "../../Assets/logo_white.png";
import ProfileCircle from "../../Components/ProfileCircle";
import { Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "./main.scss";

export default function MainScreen({ isPunchedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  const [burgerOpen, setBurgerOpen] = useState("closed");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setBurgerOpen("closed");
    }
    else {
      setBurgerOpen('open');
    }
  }, [isOpen])

  return (
    <div className="pageContainer">
      <div className="burgerContainer">
        <GiHamburgerMenu
          className={"burger " + burgerOpen}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </div>
      {isOpen && (
        <div className="mainMenuContainer">
          <div>
            <div className="logoDiv">
              <img src={logo} alt="Owl Watch Logo"></img>
              <p>Owl Watch</p>
            </div>
            <MainMenu />
          </div>
          <ProfileCircle isPunchedIn={isPunchedIn} />
        </div>
      )}
      <div className="contentContainer">
        <Outlet />
      </div>
    </div>
  );
}
