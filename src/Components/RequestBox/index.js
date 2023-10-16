// Importing components and modules
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Importing styles
import "./main.scss";

export default function RequestBox({ requestHistory }) {
  // Creating hooks
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState();

  // useEffect to get logged-in user ID
  useEffect(() => {
    const auth = getAuth(); // Get Firebase auth instance
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Listen for auth state changes
      if (user) {
        setUserId(user.uid);
      } else {
        console.log("user is not logged in");
      }
    });
    // unsubscribe from auth state changes when component unmounts
    return unsubscribe;
  }, []);

  // useEffect to fetch requests data based on logged-in user ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "requests"),
          where("empID", "==", userId),
          orderBy("DateCreated", "asc"),
          orderBy("TimeCreated", "asc")
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

    // if user ID is available
    if (userId) {
      // fetch requests data
      fetchData();
    }
  }, [userId]); // re-run effect when user ID changes

  // variable to store CSS class for table row
  let classTable = "";
  // variable to store CSS class for table cell
  let cellClass = "";

  // Returns Request Box Component
  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <td>From</td>
            <td>To</td>
            <td>Comment</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {data.length < 1 && (
            <tr>
              <td colSpan={4}>YOU HAVE NO REQUESTS</td>
            </tr>
          )}
          {data.map((item, i) => {
            if (i % 2 === 1) {
              classTable = "secondItem";
            }

            if (item.Status === "Approved") {
              cellClass = "approved";
            }

            if (item.Status === "Declined") {
              cellClass = "declined";
            }

            if (item.Status === "Pending") {
              cellClass = "";
            }

            if (i % 2 !== 1) {
              classTable = "";
            }

            return (
              <tr key={i} className={classTable}>
                <td>{item.DateFrom}</td>
                <td>{item.DateTo}</td>
                <td>{item.Comments}</td>
                <td className={cellClass}>{item.Status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
