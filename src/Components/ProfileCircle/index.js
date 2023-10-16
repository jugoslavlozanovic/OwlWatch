// Importing components and modules
import React, { useState, useEffect } from "react";
import ProfileImage from "../../Assets/avatar-male.png";
import { NavLink } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Importing styles
import "./main.scss";

// ProfileCircle function that receives parameter
export default function ProfileCircle({ isPunchedIn }) {
  // Creating hooks
  const [isShowing, setIsShowing] = useState(false);
  const [imageClass, setImageClass] = useState();
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState();

  // This effect updates the profile picture class based on whether the user is punched in or not
  useEffect(() => {
    if (isPunchedIn) {
      setImageClass("punchedIn");
    } else {
      setImageClass("");
    }
  }, [isPunchedIn]);

  // This effect retrieves the user's ID when they log in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        console.log("user is not logged in");
      }
    });
    return unsubscribe;
  }, []);

  // This effect fetches data from the Firebase database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "employee"),
          where("empID", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const logs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(logs);
      } catch (error) {
        console.log(error);
      }
    };

    // This condition ensures that data is only fetched when a user is logged in and has a unique ID
    if (userId) {
      fetchData();
    }
  }, [userId, data]);

  // Returns ProfileCircle Component
  return (
    <div className="profileCircleContainer">
      {isShowing && (
        <div className="profileMenu">
          <p>
            {data[0].FirstName} {data[0].LastName}
          </p>
          <NavLink
            to="/"
            onClick={() => {
              localStorage.clear();
            }}
          >
            <span>
              <AiOutlineLogout />
            </span>
            Sign Out
          </NavLink>
        </div>
      )}
      <img
        src={ProfileImage}
        alt="Profile"
        onClick={() => setIsShowing(!isShowing)}
        className={imageClass}
      />
    </div>
  );
}
