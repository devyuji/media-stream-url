<script lang="ts">
  import { video } from "../store";

  let videoElement: HTMLVideoElement;

  let isPlaying = false;

  async function keyUps(e: KeyboardEvent) {
    if (videoElement.readyState < 3) {
      return;
    }

    switch (e.code) {
      case "KeyK":
        if (isPlaying) {
          videoElement.pause();
        } else {
          await videoElement.play();
        }
        break;

      case "KeyF":
        if (window.innerHeight === screen.height) {
          document.exitFullscreen();
        } else {
          await videoElement.requestFullscreen();
        }
        break;

      default:
        break;
    }
  }
</script>

<svelte:window on:keyup={keyUps} />

<div class="w-full aspect-video my-6 bg-black">
  <video
    bind:this={videoElement}
    src={$video.source}
    controls={true}
    autoplay={false}
    on:play={() => (isPlaying = true)}
    on:pause={() => (isPlaying = false)}
    class="w-full h-full"
  >
  </video>
</div>
