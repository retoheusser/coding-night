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
	const vipNames = ["Cyrill", "Reto", "Martin", "Kevin"]

	function sendMessage() {
		getIpAddress().then(ipObject => {
			const newMessageRef = database.ref('chat/').push()
			newMessageRef.set({
				message: newMessage,
				sender,
				timestamp: (new Date()).toISOString(),
				ip: ipObject.query,
				city: ipObject.city
			})
			newMessage=""
		})
	}

	function keypress(event) {
		if (event.key == "Enter") {
			sendMessage()
		}
	}

	function getIpAddress() {
		return fetch("http://ip-api.com/json").then(resp => {
			if (resp.status == 200) {
				return resp.json()
			} else {
				throw "shit"
			}
		})
	}
</script>
<div>
	{#each messages as message}
		<div>
			<span class:vip={vipNames.includes(message.sender)}>{message.sender}: </span>
			<span>{message.message} </span>
			<span>({new Date(message.timestamp).toLocaleTimeString()}, {message.ip}, {message.city})</span>
		</div>
	{/each}
	<input type="text" bind:value={sender}>
	<input type="text" bind:value={newMessage} on:keypress={(keypress)}>
	<button on:click={() => sendMessage()}>Send</button>
</div>

<style>
.vip {
	background-color: red;
	font-weight: bold;
	color: white;
}
</style>