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

export const getPlayRef = (game_id) => {
    return firestore.collection("play").doc(game_id)
}

export const getCallRef = (game_id) => {
    return firestore.collection("call").doc(game_id)
}

export const saveClaim = (game_id, claimName, userName, userId, claimPoints, size) => {
    
    const gameRef = getPlayRef(game_id);
    
    const updateObj = {
        [`claims.${claimName}`]: userName,
        [`players.${userId}.points`]: firebase.firestore.FieldValue.increment(claimPoints)
    }
    
    if (size > 3) {
        updateObj[`players.${userId}.p`] = firebase.firestore.FieldValue.increment(claimPoints)
        if (claimName === "fullHouse") updateObj[`players.${userId}.v`] = firebase.firestore.FieldValue.increment(1);
    }
    
    return firestore.runTransaction(async (transaction) => transaction.get(gameRef)
        .then(game => {
            if (!game.exists) return Promise.reject("Game does not exist!");
            if (!game.data().claims[claimName]) return transaction.update(gameRef, updateObj);
            return Promise.reject("Sorry! Just claimed by someone else.");
        })
    );
}

export default firebase;