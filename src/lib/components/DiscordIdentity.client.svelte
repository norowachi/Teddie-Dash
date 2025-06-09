<script lang="ts">
  import { page } from '$app/state';

  const { avatarUrl, username } = $props();
</script>

<div class="flex justify-center">
  <p class="flex items-center text-md text-gray-400">
    Signed in as
    <img src={avatarUrl} alt="avatar" class="w-7 mx-2 rounded-full" loading="eager" />
    <span class="text-white">{username}</span>
    <a
      href="/api/auth/discord/login?state={encodeURIComponent(page.url.pathname)}"
      class="ml-1 text-blue-500 hover:text-blue-700">Not you?</a
    >
  </p>
</div>
