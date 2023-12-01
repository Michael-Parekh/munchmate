// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDED0C_ghtoxSIyIBPPlfk-AET8PKhFdhw",
  authDomain: "munchmate2.firebaseapp.com",
  projectId: "munchmate2",
  storageBucket: "munchmate2.appspot.com",
  messagingSenderId: "61117388250",
  appId: "1:61117388250:web:48fa0443ac3a02ae409ce3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export async function sendData(
  title,
  organizer,
  date,
  start_time,
  end_time,
  location,
  meal,
  allergens,
  req_attendance,
  description
) {
  try {
    const docRef = await addDoc(collection(db, "events"), {
      title: title,
      organizer: organizer,
      date: date,
      start_time: start_time,
      end_time: end_time,
      location: location,
      meal: meal,
      allergens: allergens,
      req_attendance: req_attendance,
      description: description,
      upvotes: 0,
      downvotes: 0,
    });
    console.log("Event created with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding event: ", e);
  }
}

export async function getData() {
  let res = []

  const querySnapshot = await getDocs(collection(db, "events"));
  querySnapshot.forEach((doc) => {
    res.push({ id: doc.id, ...doc.data() })
  });

  return res
}

// Fetch one specific event data with id
export async function getEventData(eventId) {
  const docRef = doc(db, "events", eventId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log("Error getting document:", error);
  }
}