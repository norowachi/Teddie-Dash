import { DISCORD_CLIENT_ID } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export async function GET({ cookies, url }) {
  // state
  const callback = encodeURIComponent(url.searchParams.get('state') || '/');
  if (cookies.get('sessionId')) return redirect(303, decodeURIComponent(callback));
  
  const redirect_uri = encodeURIComponent(`${url.origin}/api/auth/discord/callback`);
  const scopes = ['identify', 'guilds'].join('%20');
  const authLink = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=${scopes}&state=${callback}`;
  
  return redirect(302, authLink);
}
