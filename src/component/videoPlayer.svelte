<script lang="ts">
  import video from "../state/video.svelte";

  let videoElement = $state<HTMLVideoElement>();
  let isPlaying = $state(false);
  let loading = $state(true);

  async function keyUps(e: KeyboardEvent) {
    if (videoElement!.readyState < 3) {
      return;
    }

    switch (e.code) {
      case "KeyK":
        if (isPlaying) {
          videoElement!.pause();
        } else {
          await videoElement!.play();
        }
        break;

      case "KeyF":
        if (window.innerHeight === screen.height) {
          document.exitFullscreen();
        } else {
          await videoElement!.requestFullscreen();
        }
        break;

      default:
        break;
    }
  }
</script>

<svelte:window on:keyup={keyUps} />

<div class="w-full max-h-96 aspect-video my-6 bg-black">
  <div
    class={`w-full h-full grid place-items-center ${loading ? "" : "hidden"}`}
  >
    <p class="text-center">LOADING...</p>
  </div>

  <!-- svelte-ignore a11y_media_has_caption -->
  <video
    bind:this={videoElement}
    src={video.state.url}
    controls={true}
    autoplay={false}
    onplay={() => (isPlaying = true)}
    onpause={() => (isPlaying = false)}
    oncanplay={() => {
      loading = false;
    }}
    oncanplaythrough={() => {
      loading = false;
    }}
    onloadstart={() => (loading = true)}
    onwaiting={() => (loading = true)}
    class={`w-full h-full ${loading ? "hidden" : ""}`}
  >
  </video>
</div>
