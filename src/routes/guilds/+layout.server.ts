import { loadUserGuilds } from '$lib';
import { error } from '@sveltejs/kit';

export async function load({ cookies, fetch }) {
  const sessionId = cookies.get('sessionId');
  if (!sessionId) return { session: null };

  const session: WebSession | undefined = await (await fetch('/api/session').catch(console.error))
    ?.json()
    .catch(console.error);

  if (!session) {
    return error(500, 'Internal Server Error|Failed to retrieve session from database');
  }

  const guilds = await loadUserGuilds(sessionId, fetch);

  return { session, guilds };
}
