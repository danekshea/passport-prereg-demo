import { providerStore, passportStore, buttonState } from './store';
import { get } from 'svelte/store';
import axios from 'axios';

export async function login() {
	try {
		buttonState.update(() => 'Logging in...');
		const passport = get(passportStore);
		let provider = await passport.connectImxSilent();
		console.log('provider after silent connect', provider);
		if (!provider) {
			provider = await passport.connectImx();
			console.log('provider after popup connect', provider);
		}
		providerStore.set(provider);
		const token = await passport.getIdToken();
		//axios request
		const response = await axios.post(
			'http://127.0.0.1:3000/register',
			{ dataKey: 'dataValue' },
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
		console.log('response', response);
		buttonState.update(() => 'Registered');
	} catch (err) {
		console.error('Error during login:', err);
	}
}

export async function handleLoginCallback() {
	try {
		console.log('login callback');
		const passport = get(passportStore);
		await passport.loginCallback();
	} catch (err) {
		console.error('login callback error', err);
	}
}
