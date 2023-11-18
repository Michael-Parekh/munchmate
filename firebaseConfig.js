// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

import { collection, addDoc } from "firebase/firestore";

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

export async function sendData() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}