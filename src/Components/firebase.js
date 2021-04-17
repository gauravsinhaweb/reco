import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA8ocd_sUNi4CIr70n0sXlQc_oaKo9CDuM",
  authDomain: "prospareto-2a912.firebaseapp.com",
  projectId: "prospareto-2a912",
  storageBucket: "prospareto-2a912.appspot.com",
  messagingSenderId: "697820510952",
  appId: "1:697820510952:web:5e986c8ecf7220eaf8275d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
