<script lang="ts">
  import { onMount } from "svelte";
  import Container from "./component/container.svelte";
  import Navbar from "./component/navbar.svelte";
  import VideoPlayer from "./component/videoPlayer.svelte";
  import video from "./state/video.svelte";

  let errorMessage = $state("");
  let value = $state("");
  let isValueEmpty = $derived(value.trim().length === 0);

  let inputElement: HTMLInputElement;

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get("url");

    if (url !== null) {
      inputElement.focus();

      if (!validUrl(url)) {
        errorMessage = "not a valid url";
        return;
      }

      value = url;
      video.update({ url: url, start: true });
    }
  });

  function validUrl(url: string) {
    try {
      new URL(url);

      return true;
    } catch (err) {
      return false;
    }
  }

  function submit(e: SubmitEvent) {
    e.preventDefault();

    if (!validUrl(value)) {
      errorMessage = "not a valid url";
      return;
    }

    video.update({ url: value, start: true });

    errorMessage = "";
  }

  async function pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();

      value = text;
      inputElement.focus();
    } catch (err) {
      errorMessage = "Paste manually";
    }
  }

  function reset(e: any) {
    e.preventDefault();
    value = "";
    errorMessage = "";

    inputElement.focus();
  }
</script>

<Navbar />

<main class="grid place-items-center mt-2">
  <Container>
    <form onsubmit={submit} onreset={reset} class="flex flex-col gap-8 w-full">
      <label for="url" class="text-4xl">Enter video url</label>
      <div
        class="h-16 w-full flex gap-2 items-center bg-zinc-800 p-4 rounded-lg focus-within:border-yellow-800 border-2 border-transparent"
      >
        <input
          bind:value
          id="url"
          type="url"
          bind:this={inputElement}
          class=" w-full h-full outline-none bg-transparent"
          required
        />

        {#if !isValueEmpty}
          <button
            type="reset"
            class="focus-visible:text-yellow-500 hover:text-yellow-500"
            aria-label="reset"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><line x1="18" y1="6" x2="6" y2="18"></line><line
                x1="6"
                y1="6"
                x2="18"
                y2="18"
              ></line></svg
            >
          </button>
        {/if}
      </div>

      {#if errorMessage}
        <div>
          <p class="text-red-500">{errorMessage}</p>
        </div>
      {/if}

      <div class="flex justify-end items-center gap-4">
        <button
          type="button"
          onclick={pasteFromClipboard}
          class="hover:text-yellow-500 focus-visible:text-yellow-500 flex items-center gap-2"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path
              d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
            ></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"
            ></rect></svg
          > Paste
        </button>

        <button
          class="flex items-center gap-2 hover:text-yellow-500 focus-visible:text-yellow-500 disabled:pointer-events-none disabled:text-gray-600 disabled:cursor-not-allowed"
          type="submit"
          disabled={isValueEmpty}
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><polygon points="5 3 19 12 5 21 5 3"></polygon></svg
          > Play
        </button>
      </div>
    </form>

    {#if video.state.start}
      <VideoPlayer />
    {/if}
  </Container>
</main>

<style>
  button:focus-within {
    outline: none;
  }
</style>
