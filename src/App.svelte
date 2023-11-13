<script lang="ts">
  let url = "";
  let videoUrl = "";

  function submit() {
    videoUrl = url;
  }
</script>

<main>
  <div class="box">
    <form on:submit|preventDefault={submit}>
      <label for="url">Enter media url</label>
      <input id="url" bind:value={url} type="url" />
    </form>

    {#if videoUrl.length != 0}
      <div class="video-box">
        <video src={videoUrl} autoplay={true} controls={true} />
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .box {
    margin-top: 10rem;
    width: 50%;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  label {
    font-size: 2rem;
  }

  input {
    padding: 1.2rem;
    border-radius: 10px;
  }

  .video-box {
    margin-top: 1rem;
  }

  video {
    width: 100%;
  }
</style>
