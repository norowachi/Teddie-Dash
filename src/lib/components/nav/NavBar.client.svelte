<script lang="ts">
  import { page } from '$app/state';
  import { cookieConsent } from '$lib/store.svelte';
  import DiscordLogin from './DiscordLogin.client.svelte';
</script>

<nav class="bg-gray-700 text-white flex items-center justify-between px-4 py-0.5 h-35px">
  {#if $cookieConsent === 1 && page.data.session?.user.username}
    <p>
      Welcome,
      <strong>{page.data.session?.user.username}</strong>!
    </p>
    <a
      href={void 0}
      onclick={async () => {
        await fetch('/api/auth/discord/logout', {
          method: 'DELETE'
        });
        return location.reload();
      }}
      class="text-cyan hover:text-cyan-6 decoration-none hover:underline cursor-pointer"
    >
      Logout
    </a>
  {:else}
    <div class="ml-auto">
      <DiscordLogin />
    </div>
  {/if}
</nav>
