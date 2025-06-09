import { writable } from 'svelte/store';

export const userSession = writable<{
  user: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  accessToken: string;
} | null>(null);

export const userGuilds = writable<Array<{
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
}> | null>(null);
