<script lang="ts">
  import { hasPermissions } from '$lib/functions/permissions';

  const { data } = $props();
</script>

<!-- TODO: filter guilds the bot is in and show them -->
{#each (data.guilds || [])
  .filter((g) => g.owner || hasPermissions( BigInt(g.permissions), ['ManageGuild', 'ManageMessages'] ))
  .sort((a, b) => Number(b.owner || hasPermissions( BigInt(b.permissions), ['ManageGuild', 'ManageMessages'] )) - Number(a.owner || hasPermissions( BigInt(a.permissions), ['ManageGuild', 'ManageMessages'] ))) as guild, i (guild.id)}
  <div
    class="md:mx-20dvw flex items-center py-3 rounded-md hover:bg-dark transition-colors duration-200"
  >
    <a href="/guilds/{guild.id}" class="flex items-center gap-3 p-2 text-white decoration-none">
      <img
        src="https://cdn.discordapp.com/icons/{guild.id}/{guild.icon}.webp"
        alt={guild.name}
        class="rounded-md"
        width="128"
      />
      <span class="text-xl font-black">{guild.name}</span>
    </a>
    <div class="ml-auto mr-20px h-20px">
      <!-- TODO: replace this with a check if the bot is in the guild or not -->
      {#if true}
        <a
          href="/guilds/{guild.id}/dashboard"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Manage Guild
        </a>
      {:else}
        <!-- TODO: show "Add Bot" if bot not in guild -->
      {/if}
    </div>
  </div>
  {#if (data.guilds?.length ?? 0) !== i + 1}
    <hr class="w-full md:w-60dvw" />
  {/if}
{/each}
