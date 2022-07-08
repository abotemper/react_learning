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
    apiKey: "AIzaSyBFHkl8Gl6OIn_Nen2a8b-WiB6JcsdIvkg",
    authDomain: "cooking-382c2.firebaseapp.com",
    projectId: "cooking-382c2",
    storageBucket: "cooking-382c2.appspot.com",
    messagingSenderId: "169015003436",
    appId: "1:169015003436:web:c0c82593bdb5f76b52c489"
  };

  //init firebase
  initializeApp(firebaseConfig)

  //init services
  const projectFirestore =  getFirestore()
  


  export { projectFirestore }
