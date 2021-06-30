import firebase from 'firebase';

require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCxwX_eN_KW5AtnRufwXMqanPTE9pNvZ6k",
    authDomain: "garbage-sos.firebaseapp.com",
    projectId: "garbage-sos",
    storageBucket: "garbage-sos.appspot.com",
    messagingSenderId: "1003787414093",
    appId: "1:1003787414093:web:ab4198d41e665a623eca04"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
