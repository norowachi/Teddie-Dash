<script lang="ts">
  import { cookieConsent, userGuilds, userSession } from '$lib/store.svelte.js';
  import type { LayoutProps } from './$types';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { loadUserGuilds } from '$lib';

  let { children, data }: LayoutProps = $props();

  if (data.session) {
    userSession.set(data.session);
    if ($userGuilds) {
      const guilds = await loadUserGuilds(data.session.accessToken, fetch);
      userGuilds.set(guilds);
    }
  }
</script>

{#if $cookieConsent !== 1}
  <div class="flex flex-col gap-5 h-full justify-center items-center">
    <span class="text-center max-w-350px">
      to access this page you need to accept our cookies policy and log in with your discord account
    </span>
    <a
      href={void 0}
      class="cursor-pointer py-2 px-3 text-black border-none bg-cyan hover:bg-blue-4 rounded-md decoration-none transition-colors duration-150"
      onclick={() => {
        cookieConsent.set(1);
        if (!data.session)
          goto(`/api/auth/discord/login?state=${encodeURIComponent(page.url.pathname)}`);
      }}
    >
      Accept Cookies & Login
    </a>
  </div>
{:else}
  {@render children()}
{/if}
