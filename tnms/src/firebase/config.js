// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFWP0fAFoQRwmx_gIHGdCJIzNWx82V8Tc",
  authDomain: "react-chart-firebase-demo.firebaseapp.com",
  projectId: "react-chart-firebase-demo",
  storageBucket: "react-chart-firebase-demo.firebasestorage.app",
  messagingSenderId: "159678134998",
  appId: "1:159678134998:web:810598b247e41313c16777",
  measurementId: "G-N9RWVR7MB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);  //  파이어스토어 데이터베이스를 사용하기위한

export const auth = getAuth(app);  //  파이어베이스 인증기능을 사용하기위한

// 로그인유지

//  browerLocalPersistence - 브라우저를 종료해도 유지