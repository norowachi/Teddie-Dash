<script lang="ts">
  import { page } from '$app/state';
</script>

<!-- links -->

<div class="flex flex-col mt-5 ml-2 mb-3 pl-2 b-l-solid b-coolgray rounded-sm space-y-3">
  <a href="/guilds/{page.params.id}/leaderboard">Leaderboard</a>
  <a href="/guilds/{page.params.id}/dashboard">Dashboard</a>
</div>
<a class="b-l-solid b-coolgray-6 pl-2 py-1 rounded-sm" href="/guilds"> Back to Guilds </a>
