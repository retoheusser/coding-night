// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDv6G4-wIglSabuO7pOnURVmuVsKIPa8I0",
    authDomain: "stack-41d10.firebaseapp.com",
    databaseURL: "https://stack-41d10.firebaseio.com",
    projectId: "stack-41d10",
    storageBucket: "stack-41d10.appspot.com",
    messagingSenderId: "615325640466",
    appId: "1:615325640466:web:6c36b6edde828231c835cb",
    measurementId: "G-2BJ4KVC8SB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var randomUserId = Math.round(Math.random() * 100)
var database = firebase.database()
database.ref('users/' + randomUserId).set({
    username: "Michi" + randomUserId
});