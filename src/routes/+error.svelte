<script lang="ts">
  import { page } from '$app/state';
</script>

<div class="h-screen flex items-center justify-center">
  <span class="status">{page.status}</span>
  <div class="message flex flex-col justify-center items-start">
    {#each page.error?.message.split(/\|/g) || [] as line, i (i)}
      {#if !i}
        <code class="uppercase opacity-80">{line}</code>
      {:else}
        <h1>{line}</h1>
      {/if}
    {/each}
  </div>
</div>

<style>
  .status {
    font-weight: 200;
    font-size: 3rem;
    line-height: 1;
    position: relative;
  }
  .message {
    border-left: 1px solid #666;
    padding: 0 0 0 1rem;
    margin: 0 0 0 1rem;
    min-height: 2.5rem;
  }
  .message > * {
    font-weight: 400;
    font-size: 1em;
    margin: 0;
  }
</style>
