<script lang="ts">
  import video from "../state/video.svelte";

  let videoElement = $state<HTMLVideoElement>();
  let isPlaying = $state(false);

  async function keyUps(e: KeyboardEvent) {
    if (videoElement!.readyState < 3 || video.state.loading) {
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
  <video
    bind:this={videoElement}
    src={video.state.videoUrl}
    controls={true}
    autoplay={false}
    onplay={() => (isPlaying = true)}
    onpause={() => (isPlaying = false)}
    class="w-full h-full"
  >
    <track kind="captions" />
  </video>
</div>
