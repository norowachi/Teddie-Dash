import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ params, fetch }) => {
  // TODO
  let guildId = params.id;
  let guildName: string | undefined;

  const session: WebSession | undefined = await (await fetch('/api/session').catch(console.error))
    ?.json()
    .catch(console.error);
  if (!session?.accessToken) {
    error(401, 'Unauthorized');
  }
  const accessToken = session.accessToken;

  if (isNaN(Number(guildId))) {
    const result: { guild: { id: string; name: string } } | undefined = await (
      await fetch(`https://discord.com/api/v10/invites/${guildId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }).catch(console.error)
    )
      ?.json()
      .catch(console.error);
    // If the invite is not found, result will be undefined
    if (!result || !result.guild) error(404, 'Not found');

    guildName = result.guild.name;
    guildId = result.guild.id;
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
    await fetch(`${env.API_URL}/${guildId}/leaderboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: env.PRIVATE_API_KEY
      }
    }).catch(console.error)
  )
    ?.json()
    .catch(console.error);

  // If the data is not found, return error
  if (!data || !data.users.length) error(404, 'Not found');

  return {
    users: data.users,
    guildId,
    guildName
  };
};
