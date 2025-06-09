import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PRIVATE_API_KEY, API_URL } from '$env/static/private';
import { userGuilds, userSession } from '$lib/store.svelte';
import { get } from 'svelte/store';
import { loadUserGuilds } from '$lib';

export const load: PageServerLoad = async ({ params, fetch }) => {
  // TODO
  let guildId = params.id;
  let guildName: string | undefined;

  const accessToken = get(userSession)?.accessToken;
  if (!accessToken) {
    error(401, 'Unauthorized');
  }

  // get the user guilds from the store
  let guilds = get(userGuilds);
  // If the guild is not found, return error
  if (!guilds) {
    const loaded = await loadUserGuilds(accessToken, fetch);
    if (!loaded) return error(404, 'No guilds found');
    guilds = loaded;
  }

  // check if guild is an invite link if its not a number
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

    if (!guilds.find((u) => u.id === guildId)) {
      // If the guild is not found in the user's guilds, return error
      error(401, 'Unauthorized|You are not a member of this guild');
    }
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    guildName = guilds.find((u: any) => u.id === guildId)?.name;
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
    await fetch(`${API_URL}/${guildId}/leaderboard`, {
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

  return Object.assign(data, {
    guildName
  });
};
