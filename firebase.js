import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseConfig } from './config'; // Make sure you have your Firebase config here


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
