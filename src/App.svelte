<script>
	import firebase from "firebase/app"
	import "firebase/database"

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

	const database = firebase.database()
	const usersRef = database.ref("users/")
	usersRef.on("value", snapshot => {
		console.log(snapshot.val())
	})

	let firstname = ""

	function addRandomUser() {
		var randomUserId = Math.round(Math.random() * 100)
		database.ref('users/' + randomUserId).set({
			username: firstname + randomUserId,
			firstname
		}).then(() => {
			firstname = ""
		});
	}
</script>
<div>
	<input type="text" bind:value={firstname}>
	<button on:click={() => addRandomUser()}>Add random user</button>
</div>