import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore' 
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCQaAKtgVHhf-RkQ7V-N8pJe9s_uC2A-9E",
    authDomain: "readinglistapp-5f118.firebaseapp.com",
    projectId: "readinglistapp-5f118",
    storageBucket: "readinglistapp-5f118.appspot.com",
    messagingSenderId: "801642248020",
    appId: "1:801642248020:web:72511185825e5607e83ac1"
  };

  //init firebase
  initializeApp(firebaseConfig)

//init firestore
  const db = getFirestore()

  //init firebase auth

  const auth = getAuth()

  export{ db, auth }