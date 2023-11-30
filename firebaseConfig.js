// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";

import Geocoder from 'react-native-geocoding';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCld8BTeJiQzVdxE1eiRv6nYozi0-xIg3I",
  authDomain: "munchmate-24d28.firebaseapp.com",
  projectId: "munchmate-24d28",
  storageBucket: "munchmate-24d28.appspot.com",
  messagingSenderId: "1086848442227",
  appId: "1:1086848442227:web:2efd6b4fd35390e74baf06"
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
  description,
  latitude,
  longitude
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
      latitude: latitude,
      longitude: longitude
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
  console.log(eventId)
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

export async function getLocationCoordinates(location) {
  try {
    const json = await Geocoder.from(location);
    const geo = json.results[0].geometry.location;
    return [geo.lat, geo.lng];
  } catch (error) {
    console.log(error);
    return [0, 0];
  }
}