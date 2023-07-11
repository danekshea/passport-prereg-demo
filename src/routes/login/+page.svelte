<script>
    import { onMount } from "svelte";
	import { passportStore } from "../../store";
	import { get } from "svelte/store";
  
    onMount(async () => {
        try {
            const passport = get(passportStore);
            await passport.loginCallback();
	    } catch (err) {
		    console.error('login callback error', err);
	    }
    });
  </script>