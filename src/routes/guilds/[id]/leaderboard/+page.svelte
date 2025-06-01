<script lang="ts">
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();

  // Sort users by XP in descending order
  const sortedUsers = data.users.sort((a, b) => b.xp - a.xp);
</script>

<div class="p-4">
  <h1 class="text-2xl font-bold mb-4">Leaderboard</h1>
  <div class="space-y-4">
    {#each sortedUsers as user, index}
      <div class="flex px-4 bg-gray-100 rounded-lg shadow-md">
        <div class="flex items-center justify-between pr-2 rounded-t-lg font-black">
          #{index + 1}
        </div>
        <div class="flex items-center w-full">
          <img
            src={user.avatar}
            alt="{user.username}'s avatar"
            class="w-12 h-12 rounded-full mr-4"
          />
          <div class="flex-1">
            <h2 class="text-lg font-semibold">{user.username}</h2>
            <p class="text-sm text-gray-500">Level: {user.level}</p>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold">{user.xp} XP</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
