import { writable } from 'svelte/store';

export const cookieConsent = writable<0 | 1 | 2 | undefined>();
