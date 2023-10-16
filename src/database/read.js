// Importing components and modules
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

export async function load() {
  try {
    // Get all documents from the "employee" collection
    const querySnapshot = await getDocs(collection(db, "employee"));
    const data = [];
    // Iterate through the documents and push the data to the array
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        // id: doc.id
      });
    });
    return data;
  } catch (error) {
    // Throw an error if the loading process fails
    throw new Error("Failed to Load the database");
  }
}

export async function loadByParameter(tableName) {
  try {
    const userId = getAuth().currentUser.uid;
    // Query to find data based on userID
    const q = query(collection(db, tableName), where("empID", "==", userId));
    const querySnapshot = await getDocs(q);
    const data = [];
    // Iterate through the documents and push the data to the array
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    return data;
  } catch (error) {}
}

// Check if the user is logged in and get their latest timer history
export async function timerCheck() {
  try {
    const userId = localStorage.getItem("myUserId");
    const qUser = query(
      collection(db, "employee"),
      where("empID", "==", userId)
    );
    const qUserSnap = await getDocs(qUser);

    // If the user is logged in
    if (
      qUserSnap.docs.length > 0 &&
      qUserSnap.docs[0].data().IsLoggedIn === true
    ) {
      // Query the database for the user's latest timer history
      const q = query(
        collection(db, "log_history"),
        orderBy("Date", "desc"),
        orderBy("TimeIn", "desc"),
        limit(1),
        where("empID", "==", userId)
      );
      const querySnapshot = await getDocs(q);

      // If the user has timer history
      if (querySnapshot.docs.length > 0) {
        const timeOut = querySnapshot.docs[0].data().TimeOut;
        const timeIn = querySnapshot.docs[0].data().TimeIn;
        const date = querySnapshot.docs[0].data().Date;
        const returnResult = { timeOut: timeOut, timeIn: timeIn, date: date };
        return returnResult;
      } else {
        // If the user has no timer history
        return 0;
      }
    } else {
      // If the user is not logged in
      return 0;
    }
  } catch (error) {
    // If there is an error
    console.error("this is the error: ", error);
  }
}
