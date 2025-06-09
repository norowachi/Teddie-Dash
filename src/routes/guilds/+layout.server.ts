import { API_URL, PRIVATE_API_KEY } from '$env/static/private';
import { loadUserSession } from '$lib';
import { error, redirect } from '@sveltejs/kit';

export async function load({ cookies, url, fetch }) {
  const sessionId = cookies.get('sessionId');
  console.log('Session ID:', sessionId);
  const callback = decodeURIComponent(url.searchParams.get('state') || '/');
  if (!sessionId) redirect(303, '/api/auth/discord/login?state=' + encodeURIComponent(callback));

  const DBresult = await loadUserSession({ API_URL, PRIVATE_API_KEY }, sessionId, fetch);

  if (!DBresult) {
    return error(500, 'Failed to retrieve session from database');
  }
}
