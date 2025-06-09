import { API_URL, PRIVATE_API_KEY } from '$env/static/private';
import { loadUserGuilds, loadUserSession } from '$lib';
import { error, redirect } from '@sveltejs/kit';

export async function load({ cookies, fetch }) {
  const sessionId = cookies.get('sessionId');
  if (!sessionId) redirect(303, '/api/auth/discord/login');

  const DBresult = await loadUserSession({ API_URL, PRIVATE_API_KEY }, sessionId, fetch);

  if (!DBresult) {
    return error(500, 'Failed to retrieve session from database');
  }

  await loadUserGuilds(DBresult.accessToken, fetch);
}
