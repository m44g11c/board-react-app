import firebase from 'firebase'
const config = {
    apiKey: "apiKey",
    authDomain: "databaseURL",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId"
};
firebase.initializeApp(config);
export default firebase; 
