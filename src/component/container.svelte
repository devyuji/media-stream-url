<div class="container">
  <slot />
</div>

<style>
  .container {
    width: 40rem;

    overflow: hidden;
  }

  @media (max-width: 700px) {
    .container {
      width: 90%;
    }
  }
</style>
