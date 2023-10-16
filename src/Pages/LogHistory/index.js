import Header from "../../Components/Header";
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./main.scss";

export default function LogHistoryPage() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "log_history"),
          where("empID", "==", userId),
          orderBy("Date", "asc"),
          orderBy("TimeIn", "asc")
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

    if (userId) {
      fetchData();
    }
  }, [userId]);

  let classTable = "";

  return (
    <>
      <Header title="Log History" />
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <td>Date</td>
              <td>Time In</td>
              <td>Time Out</td>
              <td>Total Time</td>
            </tr>
          </thead>
          <tbody>
            {data.length < 1 && (
              <tr>
                <td colSpan={4}>NO DATA RECORDED</td>
              </tr>
            )}
            {data.map((item, index) => {
              if (index % 2 === 1) {
                classTable = "secondItem";
              }

              if (index % 2 !== 1) {
                classTable = "";
              }

              return (
                <tr key={item.id} className={classTable}>
                  <td>{item.Date}</td>
                  <td>{item.TimeIn}</td>
                  <td>{item.TimeOut}</td>
                  <td>{item.TotalHours}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
