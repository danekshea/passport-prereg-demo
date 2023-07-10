<script>
    import PassportLogo from '../comps/PassportLogo.svelte';
    import { login } from '../auth';
    import { buttonState } from '../store';
    import { onMount } from 'svelte';
    let text = '';

    onMount(() => {
        const words = 'Are you ready, anon?';
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < words.length) {
                text += words[i];
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 150); // Change the speed of typing effect here
    });

</script>
<main class="main-container">
    <div class="typing">{text}<span></span></div>
    <button on:click={login} class="connectbutton"><PassportLogo />{$buttonState}</button>
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
        white-space: pre-wrap; /* This will allow the text to wrap and form new lines */
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
</style>