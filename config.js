// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyD_4-oVzkSRlhkxam5AZzm8iSVCul-94Qo",
  authDomain: "cg-app-b635a.firebaseapp.com",
  projectId: "cg-app-b635a",
  storageBucket: "cg-app-b635a.appspot.com",
  messagingSenderId: "1087987127518",
  appId: "1:1087987127518:web:919ca3c9426eee4b5c5e4f",
  measurementId: "G-V8T8FC8Z94"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}