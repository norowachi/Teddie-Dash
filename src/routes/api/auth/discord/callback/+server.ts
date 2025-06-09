import {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  API_URL,
  PRIVATE_API_KEY
} from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';

export async function GET({ cookies, url }) {
  const callback = decodeURIComponent(url.searchParams.get('state') || '/');
  const code = url.searchParams.get('code');

  if (!code) return redirect(302, '/api/auth/discord/login?state=' + encodeURIComponent(callback));

  const data:
    | {
        access_token: string;
        expires_in: number;
        refresh_token: string;
      }
    | undefined = await (
    await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${url.origin}/api/auth/discord/callback`
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${DISCORD_CLIENT_ID}:${DISCORD_CLIENT_SECRET}`)}`
      }
    }).catch(console.error)
  )
    ?.json()
    .catch(console.error);

  if (!data || !data.access_token)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return error(401, (data as any).error_description || 'Unauthorized');

  const user = await fetch('https://discord.com/api/v10/users/@me', {
    headers: {
      Authorization: `Bearer ${data.access_token}`
    }
  })
    .then((res) => res.json())
    .catch(console.error);

  if (!user)
    return new Response(
      JSON.stringify({
        message: 'Unauthorized'
      }),
      { status: 401 }
    );

  // store token in mongodb & store session id in cookies
  const DBresult: { sessionId: string } | undefined = await (
    await fetch(`${API_URL}/auth/discord`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: PRIVATE_API_KEY
      },
      body: JSON.stringify({
        user,
        access_token: data.access_token,
        expires_in: data.expires_in,
        refresh_token: data.refresh_token
      })
    }).catch((err) => {
      console.error('Error storing token in database:', err);
    })
  )
    ?.json()
    .catch(console.error);

  if (!DBresult) error(500, 'Failed to store token in database');

  cookies.set('sessionId', DBresult.sessionId, {
    expires: new Date(Date.now() + data.expires_in * 1000),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/'
  });

  return redirect(302, callback || '/');
}
