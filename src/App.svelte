<script lang="ts">
  import Background from './_components/Background.svelte';
  import Download from './views/Download.svelte';
  import About from './views/About.svelte';
  import Privacy from './views/Privacy.svelte';

  let currentPage: 'download' | 'about' | 'privacy' = 'download';
</script>

<main class="w-screen h-screen relative overflow-hidden">
  <!-- Background Layer -->
  <div class="absolute inset-0 z--10">
    <Background vigTrans={currentPage === 'download' || 'privacy' ? 30 : 60} />
  </div>

  <!-- Content Layer -->
  <div class="z-10 w-full h-full flex flex-col overflow-y-auto">
    <!-- Navigation -->
    <nav class="w-full mx-5 mt-5 mb-10 z-10">
      <button
        class="text-white px-4 py-2 cursor-pointer {currentPage === 'download'
          ? 'underline'
          : ''}"
        onclick={() => (currentPage = 'download')}
      >
        Download
      </button>
      <button
        class="text-white px-4 py-2 cursor-pointer {currentPage === 'about'
          ? 'underline'
          : ''}"
        onclick={() => (currentPage = 'about')}
      >
        About
      </button>
      <button
        class="text-white px-4 py-2 cursor-pointer {currentPage === 'privacy'
          ? 'underline'
          : ''}"
        onclick={() => (currentPage = 'privacy')}
      >
        Data & Privacy
      </button>
    </nav>

    <!-- Content -->
    {#if currentPage === 'download'}
      <Download />
    {:else if currentPage === 'about'}
      <About />
    {:else if currentPage === 'privacy'}
      <Privacy />
    {/if}
  </div>
</main>

<style>
</style>
