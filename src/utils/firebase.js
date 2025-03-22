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

export const getGameRef = (gameId) => {
    return firestore.collection("game").doc(gameId)
}

export const saveClaim = (gameId, claimName, userName, userId, claimPoints, size) => {
    const gameRef = getGameRef(gameId);
    let updateObj;
    if (size > 3) {
        if (claimName === "fullHouse") {
            updateObj = {
                [`claims.${claimName}`]: userName,
                [`players.${userId}.points`]: firebase.firestore.FieldValue.increment(claimPoints),
                [`players.${userId}.v`]: firebase.firestore.FieldValue.increment(1),
                [`players.${userId}.p`]: firebase.firestore.FieldValue.increment(claimPoints),
                totalPoints: firebase.firestore.FieldValue.increment(claimPoints)
            }
        } else {
            updateObj = {
                [`claims.${claimName}`]: userName,
                [`players.${userId}.points`]: firebase.firestore.FieldValue.increment(claimPoints),
                [`players.${userId}.p`]: firebase.firestore.FieldValue.increment(claimPoints),
                totalPoints: firebase.firestore.FieldValue.increment(claimPoints)
            }
        }
    } else {
        updateObj = {
            [`claims.${claimName}`]: userName,
            [`players.${userId}.points`]: firebase.firestore.FieldValue.increment(claimPoints),
            totalPoints: firebase.firestore.FieldValue.increment(claimPoints)
        }
    }
    return firestore.runTransaction(function (transaction) {
        return transaction.get(gameRef).then(function (game) {
            if (!game.exists) {
                return Promise.reject("Game does not exist!");
            }
            if (!game.data().claims[claimName]) {
                transaction.update(gameRef, updateObj);
            } else {
                return Promise.reject("Already claimed by someone faster than you!");
            }
        });
    });
}

export const saveChosenDraw = (gameId, num, statement, userId) => {
    const gameRef = getGameRef(gameId);
    return gameRef.update({
        dreq: num,
        c: statement,
        [`players.${userId}.points`]: firebase.firestore.FieldValue.increment(-1),
        totalPoints: firebase.firestore.FieldValue.increment(-1)
    });
}

export const joinGame = (gameId, userId, name, v, p, myTNums, shouldReset) => {

    // randomize myTNums
    let j;
    for(let i=0; i<myTNums.length-1; i++) {
        j = Math.floor(Math.random() * myTNums.length);
        [myTNums[i], myTNums[j]] = [myTNums[j], myTNums[i]];
    }
    
    const gameRef = getGameRef(gameId);
    p = p || 1;
    const updateBody = {
        [`players.${userId}`]: { name, points: 1, v, p },
        [`playersNums.${userId}`]: myTNums
    };
    if(shouldReset) {
        updateBody.totalPoints = firebase.firestore.FieldValue.increment(1)
    }
    return gameRef.update(updateBody);
}

export default firebase;