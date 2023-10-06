import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDsbnviI138iw_ut7qcP4BOQPHdWd44kS8",
  authDomain: "codblog-bed07.firebaseapp.com",
  projectId: "codblog-bed07",
  storageBucket: "codblog-bed07.appspot.com",
  messagingSenderId: "1059247087399",
  appId: "1:1059247087399:web:6e3d4e9a22f4562f7a5302",
  measurementId: "G-G6SSGH8SRR"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
import React from 'react'

function firebase() {
  return (
    <div>
      
    </div>
  )
}

export default firebase

export { db, app, auth };