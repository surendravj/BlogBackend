const firebase = require('firebase-admin');

const serviceAccount = require('../projectsurendra-8f809-firebase-adminsdk-lao5b-a45c5f01b6.json');


module.exports = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://projectsurendra-8f809.firebaseio.com"
});