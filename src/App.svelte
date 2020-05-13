<script>
	import firebase from "firebase/app"
	import "firebase/database"
	import {onMount} from "svelte"

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
	let city
	let ip
	const vipNames = ["Cyrill", "Reto", "Martin", "Kevin"]

	function sendMessage() {
		if (!newMessage || !sender) {
			return
		}
		const newMessageRef = database.ref('chat/').push()
		newMessageRef.set({
			message: newMessage,
			sender,
			timestamp: (new Date()).toISOString(),
			ip,
			city
		})
		newMessage=""
	}

	function keypress(event) {
		if (event.key == "Enter") {
			sendMessage()
		}
	}

	onMount(() => {
		fetch("https://extreme-ip-lookup.com/json").then(response => {
			if (response.status == 200) {
				return response.json()
			} else {
				throw "shit"
			}
		}).then(extremeIpLookup => {
			city = extremeIpLookup.city
			ip = extremeIpLookup.query
		})
	})

</script>
<div>
<h1>Hueresohn Chat</h1>
	{#each messages as message}
		<div>
			<span class:vip={vipNames.includes(message.sender)}>{message.sender}: </span>
			<span>{message.message} </span>
			<span>({new Date(message.timestamp).toLocaleTimeString()}, {message.ip}, {message.city})</span>
		</div>
	{/each}
	<input type="text" maxlength="20" bind:value={sender}>
	<input type="text" maxlength="161" bind:value={newMessage} on:keypress={(keypress)}>
	<button on:click={() => sendMessage()}>Send</button>
</div>

<style>
.vip {
	background-color: red;
	font-weight: bold;
	color: white;
}
</style>