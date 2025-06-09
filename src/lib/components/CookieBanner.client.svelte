<script lang="ts">
  import { cookieConsent } from '$lib/store.svelte';

  const storage = localStorage.getItem('cookieConsent');
  cookieConsent.set(!storage ? 0 : storage === 'accepted' ? 1 : 2);
</script>

<div
  class="hidden fixed bottom-1 left-0 mx-2 sm:max-w-300px w-auto rounded-md sm:w-40dvw bg-#444"
  class:flex={$cookieConsent === 0}
  class:hidden={$cookieConsent !== 0}
>
  <div class="flex flex-col items-center justify-between p-4">
    <p class="text-sm text-light">
      This website uses cookies to enhance the user experience. By continuing to use this site, you
      agree to our use of cookies.
    </p>
    <div class="flex flex-row items-center justify-around w-full">
      <button
        class="cursor-pointer mt-0 bg-blue-5 text-white px-4 py-2 rounded hover:bg-blue-6 b-tl-coolgray b-br-blue-6 active:b-tl-blue-6 active:b-br-coolgray"
        onclick={() => {
          cookieConsent.set(1);
        }}
      >
        Accept
      </button>
      <button
        class="cursor-pointer mt-0 bg-red-6 text-white px-4 py-2 rounded hover:bg-red-7 b-tl-coolgray b-br-red-7 active:b-tl-red-7 active:b-br-coolgray"
        onclick={() => {
          cookieConsent.set(2);
        }}
      >
        Reject
      </button>
    </div>
  </div>
</div>
