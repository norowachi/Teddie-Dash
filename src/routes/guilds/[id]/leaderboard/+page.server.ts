import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PRIVATE_API_KEY } from '$env/static/private';

export const load: PageServerLoad = async ({ params, fetch }) => {
  // TODO
  let guildId = params.id;

  // check if guild is an invite link if its not a number
  if (isNaN(Number(guildId))) {
    const result: { guild_id: string } | undefined = await (
      await fetch(`https://discord.com/api/v10/invites/${guildId}`).catch(console.error)
    )
      ?.json()
      .catch(console.error);
    // If the invite is not found, result will be undefined
    if (!result || !result.guild_id) error(404, 'Not found');

    guildId = result.guild_id;
  }

  const data: {
    users: Array<{
      id: string;
      username: string;
      avatar: string;
      xp: number;
      level: number;
      hidden: boolean;
    }>;
  } = await (
    await fetch(`https://api.noro.cc/757135707327299604/${guildId}/leaderboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: PRIVATE_API_KEY
      }
    }).catch(console.error)
  )
    ?.json()
    .catch(console.error);

  // If the data is not found, return error
  if (!data) error(404, 'Not found');

  return data;
};
