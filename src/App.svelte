<script lang="ts">
  import Container from "./component/container.svelte";

  let value = "";
  let videoUrl = "";
  let errorMessage = "";

  function submit() {
    videoUrl = value;
  }

  function clear() {
    value = "";
  }
</script>

<main>
  <Container>
    <form on:submit|preventDefault={submit}>
      <label for="url">Enter media url</label>
      <div class="input">
        <input id="url" bind:value type="url" />

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
        {/if}
      </div>

      <p class="error_message">{errorMessage}</p>
    </form>

    {#if videoUrl.length != 0}
      <div class="video-box">
        <video src={videoUrl} autoplay={true} controls={true} />
      </div>
    {/if}
  </Container>
</main>

<style>
  main {
    display: flex;
    width: 100%;
    justify-content: center;

    margin-top: 10rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  label {
    font-size: 3rem;
    font-weight: 500;
  }

  .input {
    width: 100%;
    background-color: #404040;
    border-radius: 10px;

    font-size: 2rem;
    display: flex;
  }

  input {
    background-color: transparent;
    border: none;
    color: white;
    outline: none;
    font-family: var(--ft);
    width: 100%;
    height: 3rem;
    padding: 1rem;
    font-size: 1rem;
  }

  .input button {
    border: none;
    background-color: transparent;

    cursor: pointer;

    /* width: 100%; */
  }

  .video-box {
    margin-top: 1rem;
  }

  video {
    width: 100%;
    height: 100%;

    aspect-ratio: 16/9;
  }

  .error_message:empty {
    display: none;
  }

  .error_message {
    color: red;
    text-align: end;
  }
</style>
