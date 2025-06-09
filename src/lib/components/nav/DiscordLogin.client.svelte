<script>
  import { page } from '$app/state';
  import { cookieConsent } from '$lib/store.svelte';
  import { TriangleAlert } from '@lucide/svelte';
</script>

{#if $cookieConsent === 1}
  <a href="/api/auth/discord/login?state={encodeURIComponent(page.url.pathname)}"> Login</a>
{:else}
  <button
    onclick={() => {
      alert('You have to accept the cookies to be able to login');
      cookieConsent.set(0);
    }}
    class="cursor-pointer"
  >
    <TriangleAlert /> Login
  </button>
{/if}
