import { writable } from 'svelte/store';
import { Passport, ImmutableConfiguration, Environment } from '@imtbl/sdk';

const passportConfig = {
	baseConfig: new ImmutableConfiguration({
		environment: Environment.SANDBOX
	}),
	clientId: import.meta.env.VITE_PASSPORT_CLIENT_ID,
	redirectUri: import.meta.env.VITE_PASSPORT_REDIRECT_URL,
	logoutRedirectUri: import.meta.env.VITE_PASSPORT_LOGOUT_URL,
	audience: 'platform_api',
	scope: 'openid offline_access email transact'
};

const passport = typeof window !== 'undefined' ? new Passport(passportConfig) : undefined

export const providerStore = writable();
export const passportStore = writable(passport);
export const buttonState = writable("Connect Passport");