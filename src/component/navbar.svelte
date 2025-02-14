<script lang="ts">
  import video from "../state/video.svelte";
  import Container from "./container.svelte";
  import Settings from "./settings.svelte";

  let openSetting = $state(false);

  async function share() {
    if (video.state.url.length === 0) {
      await navigator.share({
        title: "play video online",
        url: window.location.origin,
      });

      return;
    }

    let url = `${window.location.origin}?url=${encodeURIComponent(video.state.url)}`;

    await navigator.share({
      title: "play video online",
      url,
    });
  }

  function toggleSetting() {
    openSetting = !openSetting;
  }
</script>

<header class="grid place-items-center h-20">
  <Container>
    <nav class="flex justify-end">
      <ul class="flex gap-6 items-center">
        <li class="hover:text-yellow-500">
          <button aria-label="setting" onclick={toggleSetting}>
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><circle cx="12" cy="12" r="3"></circle><path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              ></path></svg
            >
          </button>
        </li>
        <li class="hover:text-yellow-500">
          <button type="button" aria-label="share" onclick={share}>
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><circle cx="18" cy="5" r="3"></circle><circle
                cx="6"
                cy="12"
                r="3"
              ></circle><circle cx="18" cy="19" r="3"></circle><line
                x1="8.59"
                y1="13.51"
                x2="15.42"
                y2="17.49"
              ></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"
              ></line></svg
            >
          </button>
        </li>
        <li>
          <a
            class="hover:text-yellow-500"
            href="https://github.com/devyuji/media-stream-url"
            aria-label="github"
          >
            <svg
              viewBox="0 0 24 24"
              height="18"
              width="18"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              ></path></svg
            ></a
          >
        </li>
      </ul>
    </nav>
  </Container>
</header>

{#if openSetting}
  <Settings onClose={toggleSetting} />
{/if}
