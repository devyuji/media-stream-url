<script lang="ts">
  import video from "../state/video.svelte";

  let isPlaying = $state(false);
  let loading = $state(true);
  let isControllerShowing = $state(true);
  let errorMessage = $state("");
  let duration = $state({
    total: "00:00",
    current: "00:00",
  });
  let progress = $state("0%");

  let controllerTimeout: any;

  let videoElement: HTMLVideoElement;
  let videContainerEle: HTMLDivElement;
  let progressContainerEle: HTMLDivElement;

  const CONTROLLER_TIMEOUT = 3000;

  // responsible for showing controller when video is paused
  $effect(() => {
    if (!isPlaying || loading) {
      if (controllerTimeout) {
        controllerTimeout = clearTimeout(controllerTimeout);
      }

      showContoller();
      return;
    }

    hideController();
  });

  async function keyUps(e: KeyboardEvent) {
    if (videoElement!.readyState < 3) {
      return;
    }

    switch (e.code) {
      case "Space":
      case "KeyK":
        togglePlay();
        break;

      case "KeyF":
        await fullScreen();
        break;

      case "KeyJ":
        seekBackward();
        break;

      case "KeyL":
        seekForward();
        break;

      default:
        break;
    }
  }

  function toggleController() {
    if (isControllerShowing || !isPlaying) return;

    isControllerShowing = true;

    hideController();
  }

  function showContoller() {
    isControllerShowing = true;
  }

  function hideController() {
    console.log("here");

    controllerTimeout = setTimeout(() => {
      isControllerShowing = false;
    }, CONTROLLER_TIMEOUT);
  }

  async function fullScreen() {
    if (window.innerHeight === screen.height) {
      document.exitFullscreen();
    } else {
      await videContainerEle!.requestFullscreen();
    }
  }

  async function togglePlay() {
    if (loading) return;

    if (isPlaying) videoElement.pause();
    else videoElement.play();
  }

  function formatTime(timeInSeconds: number) {
    if (isNaN(timeInSeconds)) return "00:00";

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    // If video is longer than an hour, show hours
    if (hours > 0) {
      return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    }

    return `${padZero(minutes)}:${padZero(seconds)}`;
  }

  // Add leading zero to numbers less than 10
  function padZero(number: number) {
    return number < 10 ? `0${number}` : number;
  }

  function seekForward() {
    if (formatTime(videoElement.currentTime) === duration.total) return;
    isControllerShowing = true;

    updateCurrentTime(videoElement.currentTime + 10);
  }

  function seekBackward() {
    if (duration.current === "00:00") return;
    isControllerShowing = true;

    updateCurrentTime(videoElement.currentTime - 10);
  }

  function updateProgressBar() {
    const percentage = (videoElement.currentTime / videoElement.duration) * 100;
    progress = percentage + "%";
  }

  function updateCurrentTime(time: number) {
    videoElement.currentTime = time;
    duration.current = formatTime(time);
  }

  function seek(e: MouseEvent) {
    const rect = progressContainerEle.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;

    const calculateTime = pos * videoElement.duration;

    updateCurrentTime(calculateTime);
    updateProgressBar();
  }

  function handleMouse(e: MouseEvent) {
    if (loading || !isPlaying) return;

    showContoller();

    if (controllerTimeout) {
      controllerTimeout = clearTimeout(controllerTimeout);
    }

    hideController();
  }
</script>

<svelte:window on:keyup={keyUps} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_media_has_caption -->

<div
  class="w-full aspect-video my-6 bg-black"
  bind:this={videContainerEle}
  onclick={toggleController}
  onmousemove={handleMouse}
>
  <div class={`w-full h-full relative`}>
    <video
      bind:this={videoElement}
      src={video.state.url}
      controls={false}
      autoplay={false}
      onplay={() => (isPlaying = true)}
      onpause={() => (isPlaying = false)}
      oncanplay={() => {
        loading = false;
      }}
      oncanplaythrough={() => {
        loading = false;
      }}
      onloadstart={() => {
        loading = true;
      }}
      onwaiting={() => {
        loading = true;
      }}
      onloadedmetadata={() => {
        const d = videoElement.duration;

        if (isNaN(d)) return;

        duration.total = formatTime(d);
      }}
      ontimeupdate={() => {
        updateProgressBar();

        duration.current = formatTime(videoElement.currentTime);
      }}
      class={`w-full h-full`}
    >
    </video>

    <!-- controller  -->
    <div
      class={`absolute bg-black/50 w-full p-3 h-full flex flex-col justify-end top-0 left-0 right-0 z-10 transition-opacity duration-1000  ${isControllerShowing ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} `}
    >
      <!-- controller buttons top  -->
      <div
        class="w-full h-[90%] grid place-items-center relative"
        onclick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
      >
        <div
          class={`top-[55%] left-[50%] -translate-x-[50%] -translate-y-[-55%] absolute ${loading ? "" : "hidden"}`}
        >
          {#if errorMessage}
            <p>{errorMessage}</p>
          {:else}
            <p class="text-center">LOADING...</p>
          {/if}
        </div>
      </div>

      <!-- controller buttons bottom  -->
      <div class=" w-full grid gap-3 place-items-center p-3">
        <!-- current time and total time -->
        <div class="flex items-center justify-between w-full">
          <p>{duration.current}</p>
          <p>{duration.total}</p>
        </div>

        <!-- progress -->
        <div
          bind:this={progressContainerEle}
          class="w-full h-1.5 transition-all rounded-md bg-white cursor-pointer relative overflow-hidden"
          ondragstart={(e) => {
            e.preventDefault();
          }}
          onclick={seek}
        >
          <div
            class="w-0 h-full bg-yellow-500 transition-[width] duration-100"
            id="progressBar"
            style={`width : ${progress}`}
          ></div>
        </div>

        <!-- button  -->
        <div class="w-full flex gap-2 items-center">
          <div class="flex gap-2 items-center">
            <button aria-label="play/pause" onclick={togglePlay}>
              {#if isPlaying}
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><rect x="6" y="4" width="4" height="16"></rect><rect
                    x="14"
                    y="4"
                    width="4"
                    height="16"
                  ></rect></svg
                >
              {:else}
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  ><polygon points="5 3 19 12 5 21 5 3"></polygon></svg
                >
              {/if}
            </button>

            <button aria-label="seek backward" onclick={seekBackward}>
              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><polyline points="1 4 1 10 7 10"></polyline><path
                  d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
                ></path></svg
              >
            </button>

            <button aria-label="seek forward" onclick={seekForward}>
              <svg
                viewBox="0 0 24 24"
                width="25"
                height="25"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><polyline points="23 4 23 10 17 10"></polyline><path
                  d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"
                ></path></svg
              >
            </button>
          </div>

          <div class="ml-auto">
            <button aria-label="fullscreen" onclick={fullScreen}>
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path
                  d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                ></path></svg
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* progress {
    background-color: white;
    -webkit-appearance: none;

    accent-color: #eab305;
  }

  progress::-webkit-progress-bar {
    background-color: white;
  }

  progress::-webkit-progress-value {
    background-color: #eab305;
  }

  progress::-moz-progress-bar {
    background-color: #eab305;
  } */
</style>
