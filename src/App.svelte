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
	const chatRef = database.ref("chat/")
	chatRef.on("value", snapshot => {
		messages = Object.values(snapshot.val() || {})
	})

	let newMessage = ""
	let sender = "Anonymous"
	let messages = []

	function sendMessage() {
		const newMessageRef = database.ref('chat/').push()
		newMessageRef.set({
			message: newMessage,
			sender,
			timestamp: (new Date()).toISOString()
		})
		newMessage=""
	}

	function keypress(event) {
		if (event.key == "Enter") {
			sendMessage()
		}
	}
</script>
<div>
	{#each messages as message}
		<div>{message.sender}: {message.message} ({new Date(message.timestamp).toLocaleTimeString()})</div>
	{/each}
	<input type="text" bind:value={sender}>
	<input type="text" bind:value={newMessage} on:keypress={(keypress)}>
	<button on:click={() => sendMessage()}>Send</button>
</div>