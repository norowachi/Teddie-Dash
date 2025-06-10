<script lang="ts">
  import { toAbbrev } from '$lib';
  import Pagination from '$lib/components/Pagination.svelte';
  import { writable } from 'svelte/store';
  import type { PageProps } from './$types';
  import DiscordIdentity from '$lib/components/DiscordIdentity.client.svelte';
  import { onMount } from 'svelte';
  import { error } from '@sveltejs/kit';

  const { data }: PageProps = $props();

  let ShowAll = writable(false);
  let list = writable<typeof data.users>([]);
  let currentPage = writable(0);
  let guildName = $state(data.guildName);

  ShowAll.subscribe((value) => {
    list.set(
      (value ? data.users : data.users?.filter((user) => !user.hidden))?.sort((a, b) => b.xp - a.xp)
    );
    currentPage.set(0);
  });

  const users = writable<typeof data.users>($list);

  const currentUser = data.users?.find((u) => u.id === data.session?.user.id);

  onMount(async () => {
    if (!data.session) return error(404, 'Not Found');

    // If the guild is not found, return error
    if (!data.guilds) return error(404, "Not Found|Couldn't find any guilds");

    const thisGuild = data.guilds?.find((u) => u.id === data.guildId);
    if (!thisGuild) {
      // If the guild is not found in the user's guilds, return error
      error(403, 'Forbidden|You are not a member of this guild');
    }

    guildName = thisGuild.name;
  });
</script>

<svelte:head>
  <title>{guildName || 'Teddie'} Leaderboard</title>
</svelte:head>

<div class="px-4">
  <h1 class="text-center text-2xl font-bold mb-2">{guildName} Leaderboard</h1>
  <DiscordIdentity
    avatarUrl={data.session?.user.avatarUrl}
    username={data.session?.user.username}
  />
  <div class="flex justify-between items-center mb-2">
    <div class="inline-flex items-center">
      <label class="mr-2 text-sm" for="hide-checkbox">Show hidden users:</label>
      <input id="hide-checkbox" type="checkbox" bind:checked={$ShowAll} class="h-4 w-4 m-0" />
    </div>
    {#if currentUser}
      <span class="ml-2 text-sm">
        Your Rank: {(data.users?.indexOf(currentUser) ?? 0) + 1}
        {#if currentUser.hidden}
          <br />
          (Hidden)
        {/if}
      </span>
    {/if}
  </div>
  <div class="mb-4">
    <Pagination
      rows={$list}
      perPage={25}
      bind:trimmedRows={$users}
      bind:currentPage={$currentPage}
    />
  </div>
  <div class="space-y-2">
    <!-- Sort users by XP in descending order -->
    {#each $users || [] as user, i (i)}
      <div
        title="{user.xp} XP"
        class="flex px-4 rounded-lg shadow-#a78b99 border-violet b-solid b-1px b-y-0 shadow-sm select-none"
        class:bg-gray-800={!user.hidden}
        class:bg-gray-700={user.hidden}
        class:opacity-80={user.hidden}
        class:!bg-violet-800={user.id === data.session?.user.id}
      >
        <div class="flex items-center justify-between pr-2 rounded-t-lg font-black">
          #{($list?.indexOf(user) ?? 0) + 1}
        </div>
        <div class="flex items-center w-full">
          <img
            src={user.avatar}
            alt="{user.username}'s avatar"
            class="w-12 h-12 rounded-full mr-4 pointer-events-none"
          />
          <div class="flex-1">
            <h2 class="text-lg font-semibold">{user.username}</h2>
            <p class="text-sm text-gray-400">Level: {user.level}</p>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold">
              {toAbbrev(user.xp)} <span class="text-md font-normal opacity-70">XP</span>
            </p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
