<script lang="ts">
  import { Download, ChevronDown, ChevronUp, HeartCrack } from 'lucide-svelte';
  import WindowsIcon from '../icons/WindowsIcon.svelte';
  import AppleIcon from '../icons/AppleIcon.svelte';
  import LinuxIcon from '../icons/LinuxIcon.svelte';
  import { onMount } from 'svelte';
  import { crossfade, fade, scale, slide } from 'svelte/transition';

  type OSOption = 'Windows (x64)' | 'Mac (M Series)' | 'Mac (Intel)' | 'Other';

  let selectedOS: OSOption;
  let downloadUrl: string;
  let isOpen = false;

  const options = [
    { label: 'Windows (x64)', icon: WindowsIcon },
    { label: 'Mac (M Series)', icon: AppleIcon },
    { label: 'Mac (Intel)', icon: AppleIcon },
    { label: 'Other', icon: LinuxIcon },
  ] as const;

  function selectOption(o: (typeof options)[number]) {
    selectedOS = o.label;
    isOpen = false;
  }

  const urlMap: Record<OSOption, string> = {
    'Windows (x64)': '/Pre-Review-Setup-0.0.4-x64.exe',
    'Mac (M Series)': '/Pre-Review-0.0.4-arm64.dmg',
    'Mac (Intel)': '/Pre-Review-0.0.4-x64.dmg',
    Other: '',
  };

  let angle = 0;
  let animationFrame: number;

  onMount(() => {
    const ua = navigator.userAgent;
    if (ua.includes('Win')) {
      selectedOS = 'Windows (x64)';
    } else if (ua.includes('Mac')) {
      selectedOS = 'Mac (M Series)';
    } else {
      selectedOS = 'Windows (x64)'; // Default to Windows if not detected
    }
  });

  $: downloadUrl = urlMap[selectedOS] ?? '';
</script>

<div
  class="w-full justify-center flex flex-col items-center z-10 gap-4 relative"
  in:fade={{ duration: 150 }}
  out:fade={{ duration: 0 }}
>
  {#if selectedOS === 'Other'}
    <a
      href="mailto:bob@bole.berlin?subject=OS%20or%20arch%20request:"
      download
      class="relative p-8 bg-black rounded-lg rainbow w-[70%] sm:w-[40%] text-white flex flex-col"
    >
      <div class="absolute top-4 right-4 text-xs text-gray-300 font-mono">
        alpha-v0.0.4
      </div>
      <div class="flex items-center mb-2">
        <HeartCrack size={20} class="mr-2" />
        <span class="text-sm font-semibold">Unavailable</span>
      </div>
      <span class="text-4xl font-bold mb-2">Pre‑Review</span>
      <span class="text-sm text-gray-300"
        >Click here to send us an email requesting a specific architecture or
        operating system. We will be happy to help you.</span
      >
    </a>
  {:else}
    <a
      href={downloadUrl}
      download
      class="relative p-8 bg-black rounded-lg rainbow w-[70%] sm:w-[40%] text-white flex flex-col"
    >
      <div class="absolute top-4 right-4 text-xs text-gray-300 font-mono">
        alpha-v0.0.4
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
  {/if}

  <!-- custom dropdown -->
  <div
    class="relative p-8 bg-black rounded-lg rainbow w-[70%] sm:w-[40%] text-white flex flex-col"
  >
    <!-- trigger button -->
    <div class="">
      <button
        class="w-full bg-black text-white rounded-lg flex items-center gap-2 justify-between"
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
        class="z-11 mt-2 w-full bg-black text-white rounded-lg overflow-y-auto overflow-x-none max-h-32 scrollable"
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
