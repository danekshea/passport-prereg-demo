<script>
	import PassportLogo from '../comps/PassportLogo.svelte';
	import { buttonState, passportStore, providerStore } from '../store';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { get } from 'svelte/store';
	import { fade } from 'svelte/transition';
    import { Spinner } from 'flowbite-svelte';
    import dotenv from "dotenv";
    dotenv.config();

	let text = '';
	let buttonAppear = false;

	/**
	 * @param {string} words
	 * @param {boolean} buttonBool
	 * @param {boolean} timingBeginning
	 */
	async function typeOut(words, buttonBool, timingBeginning) {
		let i = 0;
		text = ''; // Initialize text to be an empty string
		timingBeginning ? (buttonAppear = buttonBool) : (buttonAppear = buttonAppear);
		const typingEffect = setInterval(() => {
			if (i < words.length) {
				text += words[i];
				i++;
			} else {
				clearInterval(typingEffect);
				timingBeginning ? (buttonAppear = buttonAppear) : (buttonAppear = buttonBool);
			}
		}, 100); // Change the speed of typing effect here
	}
	async function login() {
	try {
		buttonState.update(() => 'Connecting...');
		const passport = get(passportStore);
		let provider = await passport.connectImxSilent();
		console.log('provider after silent connect', provider);
		if (!provider) {
			try {
				provider = await passport.connectImx();
				console.log('provider after popup connect', provider);
			} catch (err) {
				// Error handling for user closing the popup
				if (err.message === 'AUTHENTICATION_ERROR: Popup closed by user') {
					buttonState.update(() => 'Connect');
					return;
				} else {
					console.log(err);
					throw err; // re-throw error to handle it in the outer catch block
				}
			}
		}
		providerStore.set(provider);
		const token = await passport.getIdToken();
		const userinfo = await passport.getUserInfo();
		const email = userinfo?.email;
		//axios request
		const response = await axios.post(
			import.meta.env.VITE_API_REGISTER_URL,
			{ dataKey: 'dataValue' },
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
		typeOut(`You're in, ${email}`, false, true);
	} catch (err) {
		if (err.response?.status === 400 && err.response.data.message === 'Member Exists') {
			buttonAppear = false;
			typeOut("You're already in the system, captain.", false, true);
		} else {
			typeOut('Error...', true, false);
		}
		console.error('Error during login:', err);
	}
}


	onMount(() => {
		typeOut('Ready to fight among the stars?', true, false);
	});
</script>

<main class="main-container">
	<div class="typing">{text}<span /></div>
	<div class="button-container">
    {#if buttonAppear == true}
        {#if $buttonState != "Connecting..."}
            <button in:fade={{ duration: 1000 }} on:click={login} class="connectbutton"
                ><PassportLogo />{$buttonState}</button>
        {:else}
            <button class="connectbutton"><div class="spinner-container"><Spinner size="6" color="white" /></div>{$buttonState}</button>
        {/if}
	{:else}
		<button class="connectbutton placeholder" />
	{/if}
    </div>
	<div class="social-icons">
		<a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
			<img width="40" height="40" src="facebook.svg" />
		</a>
		<a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer">
			<img width="40" height="40" src="twitter.svg" />
		</a>
		<a href="https://discord.gg/your-invite" target="_blank" rel="noopener noreferrer">
			<img width="40" height="40" src="discord.svg" />
		</a>
	</div>
	<div class="github-logo">
		<a href="https://github.com/danekshea/passport-prereg-demo" target="_blank">
			<img src="/github.png" alt="GitHub logo" />
		</a>
	</div>
</main>

<style>
	.main-container {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.typing {
		color: rgb(230, 225, 80); /* The Matrix-style green */
		font-family: 'Courier New', Courier, monospace;
		font-size: 60px; /* Change to your desired size */
		font-weight: 500;
		white-space: pre-wrap; /* This will allow the text to wrap and form new lines */
        background-color:#0d0d0d76;
        border-radius: 15px;
        padding: 5px 5px 5px 5px;
        line-height: 1;
	}

	.typing span {
		background-color: lime;
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		50% {
			background-color: transparent;
		}
	}
	.connectbutton {
		color: #0d0d0d;
		background-image: linear-gradient(137deg, #f191fa, #83e3f0);
		min-width: 140px;
		background-color: #0d0d0d;
		border: 0px #0d0d0d;
		border-radius: 48px;
		margin-left: 0;
		margin-right: 0;
		padding: 8px 20px 8px 16px;
		font-weight: 400;
		font-size: 18px;
		text-decoration: none;
		display: flex;
		align-items: center;
	}
	.social-icons {
		position: fixed;
		bottom: 0;
		display: flex;
		gap: 1rem;
		justify-content: center; /* Center icons horizontally */
		width: 100%; /* Take up full width of the container */
		padding: 1rem; /* Padding to give some space from the edge */
        background-color: #0d0d0d76;
	}
	.social-icons a {
		color: #0d0d0d; /* Change to your desired color */
		transition: color 0.3s ease;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.social-icons a:hover {
		color: #f191fa; /* Change to your desired hover color */
	}

	.github-logo {
		position: fixed;
		bottom: 0;
		right: 0;
		padding: 15px;
	}
	.github-logo img {
		width: 40px;
		height: 40px;
	}
    .placeholder {
    visibility: hidden; /* Makes the button invisible */
}
.button-container {
    height:50px;
}
.spinner-container {
	padding: 5px;
  }
</style>
