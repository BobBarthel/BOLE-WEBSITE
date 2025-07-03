<script lang="ts">
  import Background from './_components/Background.svelte';
  import Download from './views/Download.svelte';
  import About from './views/About.svelte';

  let currentPage: 'download' | 'about' = 'download';
</script>

<main class="w-screen h-screen relative min-h-[700px]">
  <!-- Background Layer -->
  <div class="absolute inset-0 z--10">
    <Background vigTrans={currentPage === 'download' ? 30 : 60} />
  </div>

  <!-- Content Layer -->
  <div
    class="relative z-20 w-full h-full flex flex-col justify-center items-center"
  >
    <!-- Navigation -->
    <nav class="absolute top-4 left-4 z-30">
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
    </nav>

    <!-- Content -->
    {#if currentPage === 'download'}
      <Download />
    {:else if currentPage === 'about'}
      <About />
    {/if}
  </div>
</main>

<style>
</style>
