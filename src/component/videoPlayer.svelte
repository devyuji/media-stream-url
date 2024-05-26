<script lang="ts">
  import { video } from "../store";
</script>

<div class="w-full aspect-video my-6 bg-black">
  <video
    src={$video.source}
    controls={true}
    autoplay={false}
    class="w-full h-full"
  >
  </video>
</div>
