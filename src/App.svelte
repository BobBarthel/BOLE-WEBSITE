<script lang="ts">
  import { Download, ChevronDown } from 'lucide-svelte';
  import WindowsIcon from './icons/WindowsIcon.svelte';
  import AppleIcon from './icons/AppleIcon.svelte';
  import LinuxIcon from './icons/LinuxIcon.svelte';
  import { onMount } from 'svelte';
  import { flip } from 'svelte/animate';
  import { slide, fade } from 'svelte/transition';

  type OSOption =
    | 'Windows'
    | 'Mac (M Series)'
    | 'Mac (Intel)'
    | 'Linux (x64)'
    | 'Linux (x86)'
    | 'Linux (arm64)';

  let selectedOS: OSOption;
  let downloadUrl: string;
  let isOpen = false;

  const options = [
    { label: 'Windows', icon: WindowsIcon },
    { label: 'Mac (M Series)', icon: AppleIcon },
    { label: 'Mac (Intel)', icon: AppleIcon },
    { label: 'Linux (x64)', icon: LinuxIcon },
    { label: 'Linux (x86)', icon: LinuxIcon },
    { label: 'Linux (arm64)', icon: LinuxIcon },
  ] as const;

  function selectOption(o: (typeof options)[number]) {
    selectedOS = o.label;
    isOpen = false;
  }

  const urlMap: Record<OSOption, string> = {
    Windows: '/testdocument.txt',
    'Mac (M Series)': '/testdocument.txt',
    'Mac (Intel)': '/testdocument.txt',
    'Linux (x64)': '/testdocument.txt',
    'Linux (x86)': '/testdocument.txt',
    'Linux (arm64)': '/testdocument.txt',
  };

  let angle = 0;
  let animationFrame: number;

  onMount(() => {
    const ua = navigator.userAgent;
    if (ua.includes('Win')) {
      selectedOS = 'Windows';
    } else if (ua.includes('Mac')) {
      selectedOS = 'Mac (M Series)';
    } else if (ua.includes('Linux')) {
      selectedOS = 'Linux (x64)';
    } else {
      selectedOS = 'Windows';
    }

    const update = () => {
      angle = (angle + 1) % 360;
      const rainbows = document.querySelectorAll<HTMLElement>('.rainbow');
      console.log(
        `[gradient] frame: angle=${angle}°, found ${rainbows.length} .rainbow elements`
      );

      rainbows.forEach((el, idx) => {
        el.style.setProperty('--angle', `${angle}deg`);
        const applied = getComputedStyle(el).getPropertyValue('--angle').trim();
        console.log(`  → [el ${idx}] --angle = ${applied}`);
      });

      animationFrame = requestAnimationFrame(update);
    };

    console.log('[gradient] Starting animation loop');
    update();

    return () => {
      console.log('[gradient] Cancelling animation');
      cancelAnimationFrame(animationFrame);
    };
  });

  $: downloadUrl = urlMap[selectedOS] ?? '';
</script>

<main class="w-screen h-screen bg-black overflow-hidden relative">
  <!-- vignette -->
  <div
    class="absolute inset-0 pointer-events-none z-10"
    style="background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.95) 70%);"
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

  <!-- content -->
  <div
    class="w-full h-full flex flex-col justify-center items-center z-20 gap-4 relative"
  >
    <a
      href={downloadUrl}
      download
      class="relative p-8 bg-black rounded-lg rainbow w-80 text-white flex flex-col"
    >
      <div class="absolute top-4 right-4 text-xs text-gray-300 font-mono">
        v0.0.1
      </div>
      <div class="flex items-center mb-2">
        <Download size={20} class="mr-2" />
        <span class="text-sm font-semibold">Download</span>
      </div>
      <span class="text-4xl font-bold mb-2">Pre‑Review</span>
      <span class="text-sm text-gray-300"
        >Discover a smarter, faster way to correct student reports.</span
      >
    </a>

    <!-- custom dropdown -->
    <div class="rainbow relative w-80">
      <!-- trigger button -->
      <button
        class="w-full bg-black text-white p-5 rounded-lg flex items-center gap-2 justify-between"
        on:click={() => (isOpen = !isOpen)}
      >
        <div class="flex items-center gap-2">
          <svelte:component
            this={options.find((o) => o.label === selectedOS)?.icon}
            className="w-4 h-4 shrink-0"
          />
          <span>{selectedOS}</span>
        </div>
        <ChevronDown class="w-4 h-4 shrink-0" />
      </button>

      <!-- dropdown panel -->
      {#if isOpen}
        <ul
          class="rainbow z-50 mt-2 w-full bg-black text-white rounded-lg overflow-y-auto max-h-32"
          transition:slide={{ duration: 200 }}
        >
          {#each options as option}
            <li>
              <button
                type="button"
                class="flex items-center gap-2 bg-black px-4 py-3 hover:bg-gray-800 cursor-pointer w-full text-left border-0"
                on:click={() => selectOption(option)}
              >
                <svelte:component
                  this={option.icon}
                  className="w-4 h-4 shrink-0"
                />
                {option.label}
              </button>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</main>

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

  button {
    border: none;
    appearance: none;
    cursor: pointer;
  }

  li {
    list-style: none;
  }
</style>
