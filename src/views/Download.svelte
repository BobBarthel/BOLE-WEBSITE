<script lang="ts">
  import { Download, ChevronDown, ChevronUp } from 'lucide-svelte';
  import WindowsIcon from '../icons/WindowsIcon.svelte';
  import AppleIcon from '../icons/AppleIcon.svelte';
  import LinuxIcon from '../icons/LinuxIcon.svelte';
  import { onMount } from 'svelte';
  import { crossfade, fade, scale, slide } from 'svelte/transition';

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
    Windows: '/testWindows.txt',
    'Mac (M Series)': '/testMac.txt',
    'Mac (Intel)': '/testMac.txt',
    'Linux (x64)': '/testLinux.txt',
    'Linux (x86)': '/testLinux.txt',
    'Linux (arm64)': '/testLinux.txt',
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
  });

  $: downloadUrl = urlMap[selectedOS] ?? '';
</script>

<div
  class="w-full h-full flex flex-col justify-center items-center z-20 gap-4 relative"
  in:fade={{ duration: 150 }}
  out:fade={{ duration: 0 }}
>
  <a
    href={downloadUrl}
    download
    class="relative p-8 bg-black rounded-lg rainbow w-80 text-white flex flex-col"
  >
    <div class="absolute top-4 right-4 text-xs text-gray-300 font-mono">
      alpha-v0.0.1
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
    <div class="">
      <button
        class="w-full bg-black text-white p-5 rounded-lg flex items-center gap-2 justify-between"
        onclick={() => (isOpen = !isOpen)}
      >
        <div class="flex items-center gap-2">
          <svelte:component
            this={options.find((o) => o.label === selectedOS)?.icon}
            className="w-4 h-4 shrink-0"
          />
          <span>{selectedOS}</span>
        </div>
        {#if isOpen}
          <ChevronUp class="w-4 h-4 shrink-0" />{:else}
          <ChevronDown class="w-4 h-4 shrink-0" />
        {/if}
      </button>
    </div>

    <!-- dropdown panel -->
    {#if isOpen}
      <ul
        class="z-50 mt-2 w-full bg-black text-white rounded-lg overflow-y-auto overflow-x-none max-h-32 scrollable"
        transition:slide={{ duration: 200 }}
      >
        {#each options as option}
          <li>
            <button
              type="button"
              class="flex items-center gap-2 bg-black px-4 py-3 hover:bg-gray-800 cursor-pointer w-full text-left border-0"
              onclick={() => selectOption(option)}
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
  button {
    border: none;
    appearance: none;
    cursor: pointer;
  }

  li {
    list-style: none;
  }

  /* Apply to the scrollable element (e.g., your <ul>) */
  .scrollable {
    /* Hide scrollbar by default */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge */
  }

  /* Show scrollbar only when scrolling (WebKit browsers) */
  .scrollable:hover,
  .scrollable:active {
    scrollbar-width: thin; /* Firefox */
    -ms-overflow-style: auto; /* IE/Edge */
  }

  /* WebKit browsers (Chrome, Safari, Edge) */
  .scrollable::-webkit-scrollbar {
    width: 8px; /* Thin scrollbar */
    height: 8px;
  }

  /* Hide track */
  .scrollable::-webkit-scrollbar-track {
    background: transparent; /* No visible track */
  }

  /* White thumb with lower opacity */
  .scrollable::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3); /* White with 30% opacity */
    border-radius: 4px; /* Rounded edges */
  }
</style>
