<script lang="ts">
  import { page } from '$app/state';
</script>

<nav class="bg-gray-700 text-white flex items-center justify-between px-4 py-0.5 h-35px">
  {#if page.data.session?.user.username}
    <p>
      Welcome,
      <strong>{page.data.session?.user.username}</strong>!
    </p>
    <a
      href={void 0}
      onclick={() => {
        fetch('/api/auth/discord/logout', {
          method: 'DELETE'
        });
        return location.reload();
      }}
      class="text-cyan hover:text-cyan-6 decoration-none hover:underline cursor-pointer"
    >
      Logout
    </a>
  {:else}
    <a
      href="/api/auth/discord/login?state={encodeURIComponent(page.url.pathname)}"
      class="ml-auto text-cyan hover:text-cyan-6 decoration-none hover:underline">Login</a
    >
  {/if}
</nav>
