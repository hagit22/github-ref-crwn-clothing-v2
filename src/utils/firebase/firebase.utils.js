import firebase from 'firebase/compat/app'

//import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import 'firebase/compat/auth' // WHY IS THIS REQUIRED IF NOT REFERENCED DIRECTLY

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


// The web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqos8Ef9fs6um9g63pd9vrovFvc9sTGls",
    authDomain: "crwn-clothing-db-cd60d.firebaseapp.com",
    projectId: "crwn-clothing-db-cd60d",
    storageBucket: "crwn-clothing-db-cd60d.appspot.com",
    messagingSenderId: "576253256045",
    appId: "1:576253256045:web:a02f94a526edb476df3a64"
  };
  
  // Initialize Firebase
  const myFirebaseApp = firebase.initializeApp(firebaseConfig);


//-----------------------------------------------------------

// Firebase AUTHENTICATION

  const myAuthProvider = new firebase.auth.GoogleAuthProvider();  

  myAuthProvider.setCustomParameters({
    prompt: "select_account"
  });


// sign-in with popup fails for me because the browser blocks the popup (I didnt succeed to prevent this using browser settings)
// therefore I also defined below, sign-in with redirect

//export const signInWithGooglePopup = firebase.auth().signInWithPopup(myAuthProvider);
//export const signInWithGooglePopup = null; // so that we dont get error message of 'popup blocked'

// maybe I should change this to: ==> anonymous function
// anonymous function will not be executed as 'side-effect'in the initial import done upon app startup!!
export const signInWithGooglePopup = () => firebase.auth().signInWithPopup(myAuthProvider);

// signInWithRedirect was not part of this course tutorial. I just experimented with it on my own.
/*export const signInWithGoogleRedirect = firebase.auth().signInWithRedirect(myAuthProvider);*/
export const signInWithGoogleRedirect = () => firebase.auth().signInWithRedirect(myAuthProvider);


//-----------------------------------------------------------

// Firestore DATA-BASE

// Updated tutorial: https://www.geeksforgeeks.org/how-to-use-firestore-database-in-reactjs/

export const db = getFirestore(myFirebaseApp);

export const createUserDocumentFromAuth = async (userAuthObject) => {

  // First we create a document reference even if there is no document yet,
  // And even if there is no collection ==> (the firebase will create the 'users' collection when needed)
  const userDocRef = doc(db, 'users', userAuthObject.uid) // we derive and assign a unique id from the currently authenticated user
  console.log ("userDocRef = %O", userDocRef)

  // access to the document 'snapshot' to check if the document actually exists already!
  // the snpapshot has a 'path' derived from 'users' string and a string of the unique uid which we assigned.
  const userSnapshot = await getDoc(userDocRef)
  console.log ("userSnapshot = %O", userSnapshot)
  console.log ("Does userSnapshot exist: %o", userSnapshot.exists())

  // if a document for this user DOES NOT already exist!
  if ( ! userSnapshot.exists()) { 

    const { displayName, email } = userAuthObject   // Deconstruction !!
    const createdAt = new Date()

    // sets document data derived from authenticated user
    try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        })
    }
    catch(error) {
      console.log ("setDoc error is: ", error.message)
    }
  }

  return userDocRef // Returns the reference whether it was created just now or already existed!
}






