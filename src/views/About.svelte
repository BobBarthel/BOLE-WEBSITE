<script lang="ts">
  import { Info } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { crossfade, fade, scale, slide } from 'svelte/transition';

  let angle = 0;
  let animationFrame: number;
</script>

<div
  class="w-full justify-center flex z-10 gap-4 relative"
  in:fade={{ duration: 150 }}
  out:fade={{ duration: 0 }}
>
  <div
    class="relative p-8 bg-black rounded-lg rainbow w-[90%] sm:w-[60%] text-white flex flex-col"
    role="region"
    aria-labelledby="about-title"
  >
    <div class="flex items-center mb-2">
      <Info size={20} class="mr-2" />
      <span class="text-sm font-semibold">About Us</span>
    </div>
    <h1 id="about-title" class="text-4xl font-bold mb-2">BOLE BERLIN</h1>
    <p class="text-sm text-gray-300 mb-4">
      Hi, we are Bob, a Chemistry Master's student at FU Berlin, and Lennart, a
      Computer Science Bachelor's student at HU Berlin. We like make things all
      the way from software to clothing and music.<br /> <br /> Recently, we
      collaborated with FU Berlin's AG Christmann to develop <b>Pre-Review</b>,
      a software that speeds up the correction of chemistry student reports.<br
      /> <br /> We hope you enjoy.
    </p>
    <p class="text-sm text-gray-300 mt-4">
      Contact us at: <br />
      Bob Barthel <br />
      Am Waldhaus 40A, 14129 Berlin, Germany <br />
      Email:
      <a href="mailto:bob@bole.berlin" class="underline hover:text-gray-100"
        >bob@bole.berlin</a
      >
    </p>
  </div>
</div>

<style>
  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  .rainbow::after,
  .rainbow::before {
    content: '';
    position: absolute;
    height: calc(100% + 5px);
    width: calc(100% + 5px);
    background-image: conic-gradient(
      from var(--angle),
      #ff4545,
      #00ff99,
      #006aff,
      #ff0095,
      #ff4545
    );
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    z-index: -1;
    padding: 3px;
    border-radius: 10px;
    animation: 3s spin linear infinite;
  }
  .rainbow::before {
    filter: blur(4rem);
    opacity: 0.7;
  }
  @keyframes spin {
    from {
      --angle: 0deg;
    }
    to {
      --angle: 360deg;
    }
  }
</style>
