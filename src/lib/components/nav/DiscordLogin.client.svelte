<script>
  import { page } from '$app/state';
  import { cookieConsent } from '$lib/store.svelte';
  import { TriangleAlert } from '@lucide/svelte';
</script>

{#if $cookieConsent === 1}
  <a
    class="text-cyan hover:text-cyan-6 decoration-none hover:underline"
    href="/api/auth/discord/login?state={encodeURIComponent(page.url.pathname)}"
  >
    Login
  </a>
{:else}
  <button
    onclick={() => {
      alert('You have to accept the cookies to be able to login');
      cookieConsent.set(0);
    }}
    class="flex items-center cursor-pointer space-x-2 py-1.5 px-2 text-black border-none rounded-md decoration-none transition-colors duration-150"
  >
    <TriangleAlert class="h-5" /> Login
  </button>
{/if}
