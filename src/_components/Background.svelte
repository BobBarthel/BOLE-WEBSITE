<script lang="ts">
  export let vigTrans = 30;
</script>

<div class="w-screen h-screen bg-black overflow-hidden relative">
  <!-- vignette -->
  <div
    class="absolute inset-0 pointer-events-none z-10"
    style="background: radial-gradient(circle at center, transparent {vigTrans}%, rgba(0,0,0,0.95) 70%);"
  ></div>

  <!-- tiled text -->
  <div class="absolute inset-0 overflow-hidden z-0">
    {#each Array(20) as _, row}
      {#each Array(20) as _, col}
        <div
          class="text-gray-800 font-bold text-4xl select-none"
          style="
            position: absolute;
            transform: rotate(45deg);
            left: {col * 300 - 1500}px;
            top: {row * 150 - 750}px;
            opacity: 0.2;
            white-space: nowrap;
          "
        >
          BOLE BERLIN
        </div>
      {/each}
    {/each}
  </div>
</div>

<style>
</style>
