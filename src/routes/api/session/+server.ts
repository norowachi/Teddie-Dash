import { API_URL, PRIVATE_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';

export async function GET({ cookies }) {
  const sessionId = cookies.get('sessionId');
  if (!sessionId) return error(400, 'Bad Request|No sessionId provided');

  console.log(API_URL, PRIVATE_API_KEY);

  const SessionData: WebSession | undefined = await (
    await fetch(`${API_URL}/auth/discord?sessionId=${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: PRIVATE_API_KEY
      }
    }).catch((err) => console.error('Error getting session from database:', err))
  )
    ?.json()
    .catch(console.error);

  if (!SessionData) return error(500, 'Internal Server Error');

  return new Response(JSON.stringify(SessionData), { status: 200 });
}
