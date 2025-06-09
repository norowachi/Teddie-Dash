<script>
  import { ChevronLeft, ChevronRight } from '@lucide/svelte';

  let { rows, perPage, trimmedRows = $bindable(), currentPage = $bindable(0) } = $props();

  let totalRows = $derived(rows.length);

  let totalPages = $derived(Math.ceil(totalRows / perPage));
  let start = $derived(currentPage * perPage);
  let end = $derived(currentPage === totalPages - 1 ? totalRows - 1 : start + perPage - 1);

  $effect(() => (trimmedRows = rows.slice(start, end + 1)));
</script>

<div class="flex items-center justify-center pointer-events-all">
  <button
    class="flex"
    onclick={() => (currentPage -= 1)}
    disabled={currentPage === 0 ? true : false}
    aria-label="left arrow icon"
    aria-describedby="prev"
  >
    <ChevronLeft color="#000000" />
  </button>
  <span id="prev" class="sr-only">Load previous {perPage} rows</span>
  <p class="mx-[1rem]">{start + 1} - {end + 1} of {totalRows}</p>
  <button
    class="flex"
    onclick={() => (currentPage += 1)}
    disabled={currentPage === totalPages - 1 ? true : false}
    aria-label="right arrow icon"
    aria-describedby="next"
  >
    <ChevronRight color="#000000" />
  </button>
  <span id="next" class="sr-only">Load next {perPage} rows</span>
</div>
