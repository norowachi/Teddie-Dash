<script lang="ts">
  import { toAbbrev } from '$lib';
  import Pagination from '$lib/components/Pagination.svelte';
  import { writable } from 'svelte/store';
  import type { PageProps } from './$types';
  import DiscordIdentity from '$lib/components/DiscordIdentity.client.svelte';
  import { userSession } from '$lib/store.svelte';

  const { data }: PageProps = $props();

  let ShowAll = writable(false);
  let list = writable<typeof data.users>();
  let currentPage = writable(0);

  ShowAll.subscribe((value) => {
    list.set(
      (value ? data.users : data.users.filter((user) => !user.hidden)).sort((a, b) => b.xp - a.xp)
    );
    currentPage.set(0);
  });

  const users = writable<typeof data.users>($list);
</script>

<svelte:head>
  <title>{data.guildName || 'Teddie'} Leaderboard</title>
</svelte:head>

<div class="px-4">
  <h1 class="text-center text-2xl font-bold mb-4">{data.guildName} Leaderboard</h1>
  {#if $userSession}
    <DiscordIdentity
      avatarUrl={$userSession?.user.avatarUrl}
      username={$userSession?.user.username}
    />
  {/if}
  <div class="flex items-center mb-2">
    <label class="mr-2 text-sm" for="hide-checkbox">Show hidden users:</label>
    <input
      id="hide-checkbox"
      type="checkbox"
      bind:checked={$ShowAll}
      class="h-4 w-4 border-gray-300 rounded-full"
    />
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
    {#each $users as user, i (i)}
      <div
        title="{user.xp} XP"
        class="flex px-4 rounded-lg shadow-#a78b99 border-violet b-solid b-1px b-y-0 shadow-sm select-none"
        class:bg-gray-800={!user.hidden}
        class:bg-gray-700={user.hidden}
        class:opacity-80={user.hidden}
      >
        <div class="flex items-center justify-between pr-2 rounded-t-lg font-black">
          #{$list.indexOf(user) + 1}
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
