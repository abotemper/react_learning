import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp ,Timestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage, ref } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAIso8OcpGXAnpG-0lGWJRAdO0NkvKiP2c",
    authDomain: "thedojosite-f125d.firebaseapp.com",
    projectId: "thedojosite-f125d",
    storageBucket: "thedojosite-f125d.appspot.com",
    messagingSenderId: "31288871447",
    appId: "1:31288871447:web:b8ad179a723df1e2b62a52"
  };

  // init firebase
  const app = initializeApp(firebaseConfig)

  // init services
  const projectFirestore =  getFirestore(app)
  const projectAuth = getAuth(app)
  const projectStorage = getStorage(app)

  //timestamp
  const timestamp = Timestamp
  

  export { projectFirestore, projectAuth, timestamp, projectStorage }