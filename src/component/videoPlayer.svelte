<script lang="ts">
  import { video } from "../store";
</script>

<div class="w-full aspect-video my-6">
  <video src={$video.source} controls={true} class="w-full h-full"></video>
</div>
