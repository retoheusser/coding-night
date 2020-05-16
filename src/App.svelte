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

		// it makes sense to always scroll down when a new message has arrived
		// timeout because the DOM needs to reflect the changes first, what will in turn increase the scroll height of the "chatwindow"
		// and we want to scroll down just after that increase in scroll height has happened
		setTimeout(() => scrolldown())
	})

	let newMessage = ""
	let sender = ""
	let messages = []
	let city
	let ip
	const vipNames = ["Cyrill", "Reto", "Martin", "Kevin"]

	let chatwindow

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

	function scrolldown() {
		chatwindow.scrollIntoView(false)
	}	

	function scrollup() {
		chatwindow.scrollIntoView(true)
	}	

	function keypress(event) {
		if (event.key == "Enter") {
			sendMessage();
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

<div id="chatwindow" bind:this={chatwindow}>

	<h1 id="grad1">Hueresohn Chat</h1>
	{#each messages as message}
		<div id="chatcontent">
			<span class:vip={vipNames.includes(message.sender)}>{message.sender}: </span>
			<span>{message.message} </span>
			<span id="info">({new Date(message.timestamp).toLocaleTimeString()}, {message.ip}, {message.city})</span>
		</div>
	{/each}

	<div id="divider"></div>
	
	<div id="chatsend">
		<input type="text" maxlength="20" bind:value={sender} placeholder="Name">
		<input type="text" maxlength="161" bind:value={newMessage} placeholder="Message" on:keypress={(keypress)}>
		<button on:click={() => sendMessage()}>Send</button>
		<button on:click={() => scrollup()}>Scroll Up</button>
		<button on:click={() => scrolldown()}>Scroll Down</button>
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

#divider {
	padding: 1%;
	height: 5px;
}

  #chatsend {
margin: auto;
width: 89%;
padding-top: 4%;
padding-left: 0px;
margin-right: 10px;
position: fixed;
bottom: 0;
background-color: #f2f2f2
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