import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
  // TODO
  const guildId = params.id;
  const data = await fetch(`https://api.noro.cc/757135707327299604/${guildId}/leaderboard`);

  if (data) {
    return (await data.json()) as {
      users: Array<{ id: string; username: string; avatar: string; xp: number; level: number }>;
    };
  }

  error(404, 'Not found');
};
