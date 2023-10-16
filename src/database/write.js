// Importing components and modules
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  updateDoc,
  doc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

// Function that takes parameters
export async function save(fname, lname, uid) {
  console.log("CALLED");
  try {
    // Passing data to database
    const docData = {
      FirstName: fname,
      LastName: lname,
      IsActive: true,
      IsAdmin: false,
      empID: uid,
    };
    // Adding data to collection
    await addDoc(collection(db, "employee"), docData);
  } catch (error) {}
}

export function update() {}

// Function that takes parameters
export async function punchIn(date, timeIn) {
  const userId = getAuth().currentUser.uid;
  try {
    // Passing data to database
    const docData = {
      Date: date,
      TimeIn: timeIn,
      TimeOut: "Pending",
      TotalHours: "Pending",
      empID: userId,
      IsLoggedIn: true,
    };
    // Adding data to collection
    await addDoc(collection(db, "log_history"), docData);
    console.log(timeIn);
    const q = query(collection(db, "employee"), where("empID", "==", userId));
    const querySnapshot = await getDocs(q);

    // Validating if data exists in collection
    if (querySnapshot.docs.length > 0) {
      const userInfo = querySnapshot.docs[0];
      console.log("USER INFO: ", userInfo);
      // Update data in collection
      await updateDoc(doc(db, "employee", userInfo.id), {
        // Updating loggedIn state
        IsLoggedIn: true,
      });
    }
  } catch (error) {}
}

// Function that takes parameter
export async function punchOut(timeOut) {
  try {
    // Retrieving myUserId
    const userId = localStorage.getItem("myUserId");

    // Query that checks employee collection based on userId
    const qUser = query(
      collection(db, "employee"),
      where("empID", "==", userId)
    );

    // Fetches data
    const qUserSnapshot = await getDocs(qUser);

    // Validating if data exists in collection
    if (qUserSnapshot.docs.length > 0) {
      const userInfo = qUserSnapshot.docs[0];
      console.log("USER INFO: ", userInfo);
      // Update data in collection
      await updateDoc(doc(db, "employee", userInfo.id), {
        IsLoggedIn: false,
      });
    }
    // Query to retrieve the last document from the collection for the current user
    const q = query(
      collection(db, "log_history"),
      orderBy("Date", "desc"),
      orderBy("TimeIn", "desc"),
      limit(1),
      where("empID", "==", userId)
    );

    // Fetches data
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);

    // Check if any documents were retrieved by the query
    if (querySnapshot.docs.length > 0) {
      const lastDoc = querySnapshot.docs[0];
      const timeIn = querySnapshot.docs[0].data().TimeIn;
      console.log(lastDoc.id);
      const timeInDate = new Date(`1970-01-01T${timeIn}Z`);
      const timeOutDate = new Date(`1970-01-01T${timeOut}Z`);

      // Calculate the total time and format it as "hh:mm:ss"
      const timeDiff = Math.abs(timeOutDate - timeInDate);
      const totalSeconds = Math.floor(timeDiff / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const totalHoursString = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      // Update the last document with the new timeOut value and total hours
      await updateDoc(doc(db, "log_history", lastDoc.id), {
        TimeOut: timeOut,
        TotalHours: totalHoursString,
        IsLoggedIn: false,
      });

      console.log(timeOut);
    } else {
      console.log("No documents found for the current user.");
    }
  } catch (error) {
    console.error(error);
  }
}

// Function that takes parameters
export async function submitRequest(dateFrom, dateTo, comments, date, time) {
  try {
    // Passing data to database
    const docData = {
      empID: getAuth().currentUser.uid,
      DateFrom: dateFrom,
      DateTo: dateTo,
      DateCreated: date,
      TimeCreated: time,
      Comments: comments,
      Status: "Pending",
    };
    // Adding data to collection
    await addDoc(collection(db, "requests"), docData);
  } catch (error) {}
}
