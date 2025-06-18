import { redirect } from '@sveltejs/kit';

export async function load({ cookies, url }) {
  const sessionId = cookies.get('sessionId');
  const callback = decodeURIComponent(url.searchParams.get('state') || url.pathname || '/');

  if (!sessionId) redirect(302, '/api/auth/discord/login?state=' + encodeURIComponent(callback));
}
