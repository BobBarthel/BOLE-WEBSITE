<script lang="ts">
  import { Info } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let angle = 0;
  let animationFrame: number;

  onMount(() => {
    const updateAngle = () => {
      angle = (angle + 1) % 360;
      animationFrame = requestAnimationFrame(updateAngle);
    };
    animationFrame = requestAnimationFrame(updateAngle);
    return () => cancelAnimationFrame(animationFrame);
  });
</script>

<div
  class="w-full justify-center flex z-10 gap-4 relative mb-20"
  in:fade={{ duration: 150 }}
  out:fade={{ duration: 0 }}
>
  <div
    class="relative p-8 bg-black rounded-lg rainbow w-[90%] sm:w-[70%] text-white flex flex-col"
    role="region"
    aria-labelledby="privacy-title"
  >
    <div class="flex items-center mb-2">
      <Info size={20} class="mr-2" />
      <span class="text-sm font-semibold">Privacy Policy</span>
    </div>
    <h1 id="privacy-title" class="text-4xl font-bold mb-2">Pre-Review</h1>
    <p class="text-sm text-gray-300 mb-4">
      At BOLE BERLIN, we value your privacy. This policy explains how we handle
      your data in the <b>Pre-Review</b> app and on our website, in compliance with
      GDPR and German data protection laws. Last updated: July 4, 2025.
    </p>

    <h2 class="text-lg font-semibold mb-2">1. Who We Are</h2>
    <p class="text-sm text-gray-300 mb-4">
      BOLE BERLIN<br />
      Am Waldhaus 40A, 14129 Berlin, Germany<br />
      Email:
      <a href="mailto:bob@bole.berlin" class="underline hover:text-gray-100"
        >bob@bole.berlin</a
      ><br />
      Contact: Bob Barthel
    </p>

    <h2 class="text-lg font-semibold mb-2">2. Data We Collect</h2>
    <p class="text-sm text-gray-300 mb-4">
      <b>App (Pre-Review):</b><br />
      - <b>PDFs and User Details</b>: PDF files (including content), your name,
      and email address are saved to provide correction services and manage your
      account.<br />
      - <b>Usage Statistics</b>: Number of app accesses, the time reports are
      submitted, and request durations are saved to improve performance.<br />
      <b>Website:</b> Our website does not collect or track data (no cookies or
      analytics). It is hosted on GitHub's servers, which may collect technical
      data (e.g., IP addresses). See
      <a
        href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
        class="underline hover:text-gray-100">GitHub's Privacy Statement</a
      >.
    </p>

    <h2 class="text-lg font-semibold mb-2">3. How We Use Your Data</h2>
    <p class="text-sm text-gray-300 mb-4">
      - We store PDF content, names, and email addresses to let you access your
      files and account anytime (contract necessity, Art. 6(1)(b) GDPR).<br />
      - We analyze usage statistics to enhance the app's functionality (legitimate
      interests, Art. 6(1)(f) GDPR).
    </p>

    <h2 class="text-lg font-semibold mb-2">4. Data Storage</h2>
    <p class="text-sm text-gray-300 mb-4">
      All data (PDF content, user details, statistics) is stored indefinitely on
      our self-hosted servers in the EU at the FU Berlin, accessed via a
      Cloudflare Tunnel, to ensure availability. You can request deletion
      anytime (see Section 6).
    </p>

    <h2 class="text-lg font-semibold mb-2">5. Data Sharing</h2>
    <p class="text-sm text-gray-300 mb-4">
      We do not share your data with third parties, except if required by law
      (e.g., court orders). Our servers are self-managed, and Cloudflare's
      Tunnel ensures secure data transmission without third-party access.
    </p>

    <h2 class="text-lg font-semibold mb-2">6. Your Rights</h2>
    <p class="text-sm text-gray-300 mb-4">
      Under GDPR, you can:<br />
      - Access, correct, or delete your data.<br />
      - Restrict or object to processing (e.g., statistics).<br />
      - Request data portability.<br />
      - Complain to a supervisory authority, e.g., Berlin Commissioner for Data Protection
      and Freedom of Information (<a
        href="https://www.datenschutz-berlin.de"
        class="underline hover:text-gray-100">www.datenschutz-berlin.de</a
      >).<br />
      Contact us at
      <a href="mailto:bob@bole.berlin" class="underline hover:text-gray-100"
        >bob@bole.berlin</a
      > to exercise your rights.
    </p>

    <h2 class="text-lg font-semibold mb-2">7. Security</h2>
    <p class="text-sm text-gray-300 mb-4">
      We use encryption, access controls, and regular audits to protect your
      data, hosted securely on our EU-based servers.
    </p>

    <h2 class="text-lg font-semibold mb-2">8. Cookies</h2>
    <p class="text-sm text-gray-300 mb-4">
      The app and website do not use cookies or trackers. GitHub's hosting may
      involve technical data collection (see their privacy policy).
    </p>

    <h2 class="text-lg font-semibold mb-2">9. Local Storage</h2>
    <p class="text-sm text-gray-300 mb-4">
      Our Electron app uses localStorage to store user settings, account
      information (e.g., login credentials or preferences), and content directly
      on your device. This ensures a seamless and personalized experience
      without relying on constant server communication. A portion of this data,
      such as user preferences, may be securely transmitted to our servers for
      backup purposes, allowing you to restore your settings if you switch
      devices or reinstall the app. We do not share this data with third
      parties. You can clear locally stored data at any time by resetting the
      app or clearing its local storage via your device settings. Upon account
      deletion, all associated backups are permanently removed from our servers.
    </p>

    <h2 class="text-lg font-semibold mb-2">10. Updates</h2>
    <p class="text-sm text-gray-300">
      We may update this policy. Changes will be posted here, with significant
      updates notified via email or in the app.
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
