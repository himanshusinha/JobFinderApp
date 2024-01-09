import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';

/* These is the firebase configuration file */
const firebaseConfig = {
  apiKey: 'AIzaSyDixz8YA4jzrjtUdgk-k3OxaZ9feg6HPAk',
  authDomain: 'jobfinderapp-cec36.firebaseapp.com',
  projectId: 'jobfinderapp-cec36',
  storageBucket: 'jobfinderapp-cec36.appspot.com',
  messagingSenderId: '221310298097',
  appId: '1:221310298097:web:58b80ace47e753ee96c650',
  measurementId: 'G-JQ5PY3HXZD',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
};
