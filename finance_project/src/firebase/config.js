import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs,
    onSnapshot, addDoc, deleteDoc, doc,
    query, where, orderby, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    OnAuthStateChanged
} from 'firebase/auth'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDI0qolCZdkDkPM0CcXA_Tcb8TG4Mlrpwo",
    authDomain: "mymoney-d863b.firebaseapp.com",
    projectId: "mymoney-d863b",
    storageBucket: "mymoney-d863b.appspot.com",
    messagingSenderId: "118505478180",
    appId: "1:118505478180:web:c0d11c85b8ad55573360b1"
  };

  //init firebase
  initializeApp(firebaseConfig)

  //init services
  const projectFirestore =  getFirestore()

  const projectAuth = getAuth()

  const timestamp = serverTimestamp()
  


  export { projectFirestore, projectAuth, timestamp }