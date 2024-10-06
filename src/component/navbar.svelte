<script lang="ts">
  import video from "../state/video.svelte";
  import Container from "./container.svelte";

  async function share() {
    if (video.state.value.length !== 0) {
      await navigator.share({
        title: "play video online",
        url: window.location.origin,
      });

      return;
    }

    let url = `${window.location.origin}?url=${encodeURIComponent(video.state.videoUrl)}`;

    await navigator.share({
      title: "play video online",
      url,
    });
  }
</script>

<header class="grid place-items-center h-20">
  <Container>
    <nav class="flex justify-end">
      <ul class="flex gap-6 items-center">
        <li class="hover:text-yellow-500">
          <button type="button" aria-label="share" on:click={share}>
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
            href="https://github.com/devyuji/media-stream-url">Github</a
          >
        </li>
      </ul>
    </nav>
  </Container>
</header>
