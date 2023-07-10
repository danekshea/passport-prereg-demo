<script>
    import PassportLogo from '../comps/PassportLogo.svelte';
    import { login } from '../auth';
    import { buttonState } from '../store';

</script>
<main class="main-container">
    <button on:click={login} class="connectbutton largerText"><PassportLogo />{$buttonState}</button>
</main> 
<style>
    .main-container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: white;
}

:global(.connectbutton) {
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
    text-decoration: none;
    display: flex;
    align-items: center;
}
</style>