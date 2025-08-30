import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBSrQiziy65VjSRygLHNnpyR3jECtYBdXY",
    authDomain: "browsie.firebaseapp.com",
    databaseURL: "https://browsie.firebaseio.com",
    projectId: "browsie",
    storageBucket: "browsie.appspot.com",
    messagingSenderId: "1017417120567",
    appId: "1:1017417120567:web:236fdfa7953ae66dc178b2"
};

firebase.initializeApp(firebaseConfig); // initialize firebase

export const firestore = firebase.firestore(); // initiatize firestore

export const FieldValue = firebase.firestore.FieldValue;

export default firebase;