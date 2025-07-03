<script lang="ts">
  import { Info } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { fade, scale, slide } from 'svelte/transition';

  let angle = 0;
  let animationFrame: number;

  onMount(() => {
    const update = () => {
      angle = (angle + 1) % 360;
      const rainbows = document.querySelectorAll<HTMLElement>('.rainbow');
      console.log(
        `[gradient] frame: angle=${angle}°, found ${rainbows.length} .rainbow elements`
      );

      rainbows.forEach((el, _idx) => {
        el.style.setProperty('--angle', `${angle}deg`);
        const applied = getComputedStyle(el).getPropertyValue('--angle').trim();
      });

      animationFrame = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  });
</script>

<div
  class="w-full h-full flex flex-col justify-center items-center z-20 gap-4 relative"
  in:scale
  out:fade={{ duration: 0 }}
>
  <div
    class="relative p-8 bg-black rounded-lg rainbow w-80 sm:w-100 text-white flex flex-col"
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
  .rainbow {
    position: relative;
    --angle: 10deg;
  }

  .rainbow::before,
  .rainbow::after {
    content: '';
    position: absolute;
    width: calc(100% + 5px);
    height: calc(100% + 5px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    background-image: conic-gradient(
      from var(--angle),
      #ff4545,
      #00ff99,
      #006aff,
      #ff0095,
      #ff4545
    );
    z-index: -1;
  }

  .rainbow::before {
    filter: blur(4rem);
    opacity: 0.7;
  }
</style>
