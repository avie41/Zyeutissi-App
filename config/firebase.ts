import { initializeApp } from "firebase/app";


// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCP51ixfgSPXxO0mn2PBM2_DdbkZ5tCQpo",
    authDomain: "zyeutissi-app.firebaseapp.com",
    databaseURL: "https://zyeutissi-app-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "zyeutissi-app",
    storageBucket: "zyeutissi-app.appspot.com",
    messagingSenderId: "281151332018",
    appId: "1:281151332018:web:73f05305163b53ec5cf3ab",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);