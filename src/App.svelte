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
<div id="chatwindow">
<h1 id="grad1">Hueresohn Chat</h1>
	{#each messages as message}
		<div id="chatcontent">
			<span class:vip={vipNames.includes(message.sender)}>{message.sender}: </span>
			<span>{message.message} </span>
			<span id="info">({new Date(message.timestamp).toLocaleTimeString()}, {message.ip}, {message.city})</span>
		</div>
	{/each}
</div>
<div>
<n>
</div>
<div id="chatwindow">
	<div id="chatsend">
		<input type="text" maxlength="20" bind:value={sender}>
		<input type="text" maxlength="161" bind:value={newMessage} on:keypress={(keypress)}>
		<button on:click={() => sendMessage()}>Send</button>
	</div>
</div>


<style>

.vip {
	background-color: red;
	font-weight: bold;
	color: white;
}

#info {
	font-size: 8px;
	font-weight: lighter;
	color: grey;
}

input[type=text]:focus {
  border: 3px solid #555;
  align-self: center
}

#chatwindow {
	margin: auto;
  width: 90%;
  padding: 10px;
  padding-bottom: 4%;
  border-radius: 2px;
  background-color: #f2f2f2
}

#chatcontent {
	margin: auto;
  width: 90%;
  padding: 10px;
  border-radius: 2px;
  background-color: #f2f2f2
}
  #chatsend {
margin: auto;
  border-radius: 2px;
  background-color: #f2f2f2;
position: fixed;
  bottom: 0;
}

#grad1 {
    background: -webkit-linear-gradient(left, black ,grey);
    background: -o-linear-gradient(right, black ,grey);
    background: -moz-linear-gradient(right,black ,grey);
    background: linear-gradient(to right, black ,grey);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 5vw;
	text-align: center
}
</style>