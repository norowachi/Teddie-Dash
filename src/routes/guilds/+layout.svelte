<script lang="ts">
  import { cookieConsent } from '$lib/store.svelte.js';
  import type { LayoutProps } from './$types';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';

  let { children, data }: LayoutProps = $props();
</script>

{#if $cookieConsent !== 1}
  <div class="flex flex-col gap-5 h-100dvh justify-center items-center">
    <span class="text-center max-w-350px">
      to access this page you need to accept our cookies policy and log in with your discord account
    </span>
    <a
      href={void 0}
      class="cursor-pointer py-2 px-3 text-black border-none bg-cyan hover:bg-blue-4 hover:text-black rounded-md decoration-none transition-colors duration-150"
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
