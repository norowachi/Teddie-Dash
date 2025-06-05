import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PRIVATE_API_KEY } from '$env/static/private';

export const load: PageServerLoad = async ({ params, fetch }) => {
  // TODO
  const guildId = params.id;
  const data = await fetch(`https://api.noro.cc/757135707327299604/${guildId}/leaderboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: PRIVATE_API_KEY
    }
  });

  if (data) {
    return (await data.json()) as {
      users: Array<{
        id: string;
        username: string;
        avatar: string;
        xp: number;
        level: number;
        hidden: boolean;
      }>;
    };
  }

  error(404, 'Not found');
};
