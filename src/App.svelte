<script lang="ts">
  import { onMount } from "svelte";
  import Container from "./component/container.svelte";
  import Navbar from "./component/navbar.svelte";

  let value = "";
  let videoUrl = "";
  let errorMessage = "";
  let videoStatus: "loading" | "ready" | "error" = "loading";

  let inputElement: HTMLInputElement;
  let videoElement: HTMLVideoElement;

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get("url");

    if (url !== null) {
      value = url;
      videoUrl = url;
      inputElement.focus();
    }
  });

  function submit() {
    videoUrl = value;

    if (videoUrl == value) {
      errorMessage = "";
    }

    videoStatus = "loading";
    inputElement.blur();
  }

  async function pasteFromClipboard() {
    let text = await navigator.clipboard.readText();

    value = text;
    inputElement.focus();
  }

  async function copyLink() {
    let url = `${window.location.origin}?url=${encodeURIComponent(videoUrl)}`;

    await navigator.clipboard.writeText(url);
  }

  function clear() {
    value = "";
    inputElement.focus();
  }

  function close() {
    videoUrl = "";
    errorMessage = "";
    videoStatus = "loading";
  }

  function onKeyDown(e: any) {}
</script>

<svelte:window on:keydown={onKeyDown} />

<Navbar />

<main class="grid place-items-center mt-4">
  <Container>
    <form on:submit|preventDefault={submit} class="flex flex-col gap-4 w-full">
      <label for="url" class="text-4xl">Enter video url</label>
      <div
        class="h-16 w-full flex gap-2 items-center bg-zinc-800 p-4 rounded-xl"
      >
        <input
          id="url"
          bind:value
          type="url"
          bind:this={inputElement}
          class=" w-full h-full outline-none bg-transparent"
        />

        {#if value.length != 0}
          <button type="button" on:click={clear}>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="white"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><line x1="18" y1="6" x2="6" y2="18" /><line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
              /></svg
            >
          </button>
        {:else}
          <button type="button" on:click={pasteFromClipboard}>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><path
                d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
              /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg
            >
          </button>
        {/if}
      </div>

      <p class="text-red-600">{errorMessage}</p>
    </form>

    {#if videoUrl.length != 0}
      <div class="aspect-video w-full h-full">
        <div class="mb-2 flex gap-2 justify-end">
          <button
            on:click={copyLink}
            class="hover:border-white border-b-2 border-transparent"
            >copy link</button
          >

          <button
            on:click={close}
            class="hover:border-white border-b-2 border-transparent"
            >close</button
          >
        </div>

        <div class="relative w-full h-full">
          <video
            bind:this={videoElement}
            src={videoUrl}
            autoplay={false}
            controls={true}
            on:loadeddata={() => {
              if (
                videoElement.readyState === 3 ||
                videoElement.readyState === 4
              ) {
                videoStatus = "ready";
              }
            }}
            on:error={() => {
              errorMessage = "Check the video url. Unable to play the video";
              videoStatus = "error";
            }}
            class="w-full h-full"
          >
            <track kind="captions" />
          </video>

          {#if videoStatus === "loading"}
            <div
              class="absolute w-full h-full bg-black/70 top-0 left-0 right-0 grid place-items-center"
            >
              <div class="flex items-center gap-2">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg> Loading..
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </Container>
</main>
