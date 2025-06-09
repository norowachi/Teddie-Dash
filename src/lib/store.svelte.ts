import { writable } from 'svelte/store';

export const userSession = writable<
  | {
      user: {
        id: string;
        username: string;
        avatarUrl: string;
      };
      accessToken: string;
    }
  | undefined
>();

export const userGuilds = writable<
  | Array<{
      id: string;
      name: string;
      icon: string | null;
      owner: boolean;
      permissions: string;
    }>
  | undefined
>();

export const cookieConsent = writable<0 | 1 | 2 | undefined>();
