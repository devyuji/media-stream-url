<script lang="ts">
  import Container from "./component/container.svelte";
  import Navbar from "./component/navbar.svelte";

  let value = "";
  let videoUrl = "";
  let errorMessage = "";

  let inputElement: HTMLInputElement;

  function submit() {
    videoUrl = value;

    inputElement.blur();
  }

  async function pasteFromClipboard() {
    let text = await navigator.clipboard.readText();

    value = text;
    inputElement.focus();
  }

  function clear() {
    value = "";
    inputElement.focus();
  }

  function close() {
    videoUrl = "";
  }
</script>

<Navbar />

<main class="grid place-items-center mt-4">
  <Container>
    <form on:submit|preventDefault={submit} class="flex flex-col gap-4 w-full">
      <label for="url" class="text-4xl">Enter media url</label>
      <div
        class="h-16 w-full flex gap-2 items-center bg-gray-800 p-4 rounded-xl"
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

      <p class="error_message">{errorMessage}</p>
    </form>

    {#if videoUrl.length != 0}
      <div class="aspect-video w-full h-full">
        <div class="mb-2 flex justify-end">
          <button
            on:click={close}
            class="hover:border-white border-b-2 border-transparent"
            >close</button
          >
        </div>

        <div>
          <video
            src={videoUrl}
            autoplay={false}
            controls={true}
            class="w-full h-full"
          >
            <track kind="captions" />
          </video>
        </div>
      </div>
    {/if}
  </Container>
</main>
